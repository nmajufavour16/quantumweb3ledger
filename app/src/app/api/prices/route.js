import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Cache in memory for 30 seconds
let cachedPrices = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30 * 1000;

const BASELINE_PRICES = {
  bitcoin: { usd: 83500.00, usd_24h_change: 0.5 },
  ethereum: { usd: 2690.00, usd_24h_change: 0.8 },
  binancecoin: { usd: 755.00, usd_24h_change: -0.5 },
  solana: { usd: 119.00, usd_24h_change: 0.7 },
  ripple: { usd: 1.50, usd_24h_change: 1.2 },
  cardano: { usd: 0.25, usd_24h_change: 0.5 },
  'avalanche-2': { usd: 11.25, usd_24h_change: 9.3 },
  dogecoin: { usd: 0.094, usd_24h_change: 1.0 },
  polkadot: { usd: 1.18, usd_24h_change: 1.8 },
  'matic-network': { usd: 0.12, usd_24h_change: 1.9 },
  chainlink: { usd: 14.60, usd_24h_change: -2.5 },
  litecoin: { usd: 67.50, usd_24h_change: -1.7 },
  tether: { usd: 1.00, usd_24h_change: 0.01 }
};

const COIN_MAP = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  BNB: 'binancecoin',
  SOL: 'solana',
  XRP: 'ripple',
  ADA: 'cardano',
  AVAX: 'avalanche-2',
  DOGE: 'dogecoin',
  DOT: 'polkadot',
  MATIC: 'matic-network',
  POL: 'matic-network',
  LINK: 'chainlink',
  LTC: 'litecoin',
  USDT: 'tether'
};

export async function GET() {
  const now = Date.now();
  if (cachedPrices && now - lastFetchTime < CACHE_DURATION) {
    return NextResponse.json(cachedPrices, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      }
    });
  }

  // Attempt 1: CoinPaprika (fast, free, comprehensive top crypto tickers)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch('https://api.coinpaprika.com/v1/tickers?quotes=USD', {
      signal: controller.signal,
      next: { revalidate: 30 },
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'QFS-Ledger/1.0'
      }
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const prices = { ...BASELINE_PRICES };
        for (const item of data) {
          const sym = item.symbol?.toUpperCase();
          const mappedId = COIN_MAP[sym];
          if (mappedId) {
            prices[mappedId] = {
              usd: Number(item.quotes?.USD?.price || 0),
              usd_24h_change: Number(item.quotes?.USD?.percent_change_24h || 0)
            };
          }
        }
        cachedPrices = prices;
        lastFetchTime = now;
        return NextResponse.json(prices, {
          headers: {
            'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
          }
        });
      }
    }
  } catch (err) {
    console.warn('CoinPaprika price fetch failed, trying secondary source:', err.message);
  }

  // Attempt 2: CryptoCompare
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,SOL,XRP,ADA,AVAX,DOGE,DOT,MATIC,LINK,LTC,USDT&tsyms=USD', {
      signal: controller.signal,
      next: { revalidate: 30 }
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json.RAW) {
        const prices = { ...BASELINE_PRICES };
        for (const [sym, data] of Object.entries(json.RAW)) {
          const mappedId = COIN_MAP[sym.toUpperCase()];
          if (mappedId && data.USD) {
            prices[mappedId] = {
              usd: Number(data.USD.PRICE || 0),
              usd_24h_change: Number(data.USD.CHANGEPCT24HOUR || 0)
            };
          }
        }
        cachedPrices = prices;
        lastFetchTime = now;
        return NextResponse.json(prices);
      }
    }
  } catch (err) {
    console.warn('CryptoCompare price fetch failed, using baseline:', err.message);
  }

  // Fallback: Return cached or baseline prices so site never breaks
  return NextResponse.json(cachedPrices || BASELINE_PRICES, {
    headers: {
      'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
    }
  });
}
