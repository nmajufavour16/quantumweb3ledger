'use client';
import { useState, useEffect } from 'react';
import {QRCodeSVG} from 'qrcode.react';
import { Copy, Check } from 'lucide-react';

export default function ReceiveScreen() {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [walletAddress, setWalletAddress] = useState('');
  const [copied, setCopied] = useState(false);
  const HBAR_ADDRESS = 'AMHPkYgh96EMYXdpWF4mQnVPXM1AyEqcuQi4QFmMCnKS';

  const cryptoOptions = [
    { symbol: 'BTC', name: 'Bitcoin', address: 'bc1qceukg999uk9az2ydngla0v7mxvn7ex33cmwq4m' },
    { symbol: 'XLM', name: 'Stellar (XLM)', address: 'GAHVGPTRJJDGL5MTQJ6KMHPRCYPW7AMZBEXXYVUV6EQOULYMB3ZLJDTT' },
    { symbol: 'XRP', name: 'Ripple (XRP)', address: 'rpJaC4ZcBTZat63DheN9yaHenSnNvy64qg' },
    { symbol: 'USDT', name: 'Tether (USDT-ERC20)', address: '0xBfB57658744bD67cfF27a3AB997c927AE909853F' },
    { symbol: 'HBAR', name: 'Hedera (HBAR)', address: HBAR_ADDRESS },
  ];

  useEffect(() => {
    const crypto = cryptoOptions.find(c => c.symbol === selectedCrypto) || cryptoOptions[0];
    setWalletAddress(crypto.address);
  }, [selectedCrypto]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-800/50 p-6 rounded-2xl border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-6">Receive Cryptocurrency</h2>
      
      <div className="mb-6">
        <label className="block text-gray-400 mb-2">Select Cryptocurrency</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {cryptoOptions.map((crypto) => (
            <button
              key={crypto.symbol}
              onClick={() => setSelectedCrypto(crypto.symbol)}
              className={`p-3 rounded-xl border ${
                selectedCrypto === crypto.symbol
                  ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                  : 'border-white/10 hover:border-white/20 text-white'
              } transition-all`}
            >
              {crypto.name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/5 p-6 rounded-xl mb-6">
        <div className="flex justify-center mb-4">
          <QRCodeSVG
            value={walletAddress}
            size={200}
            level="H"
            includeMargin={true}
            renderAs="svg"
            bgColor="transparent"
            fgColor="#fff"
          />
        </div>
        
        <div className="relative">
          <input
            type="text"
            value={walletAddress}
            readOnly
            className="w-full bg-gray-900/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm"
          />
          <button
            onClick={handleCopy}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-2 rounded-lg"
          >
            {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
          </button>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-400">
          Send only {selectedCrypto} to this address. Sending any other cryptocurrency may result in permanent loss.
        </p>
      </div>
    </div>
  );
}
