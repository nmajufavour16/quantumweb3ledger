import { Inter } from "next/font/google";
import "./globals.css";
import ClientGoogleTranslate from "../components/ClientGoogleTranslate";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Quantum Financial Ledger (QFL) | Sovereign Web3 Digital Asset Ledger",
  description: "Institutional-grade quantum-resistant financial ledger. Multi-chain asset tracking, zero-knowledge verification, and hardware-grade security protocols.",
  keywords: ["financial ledger", "quantum ledger", "crypto ledger", "institutional web3", "portfolio tracking", "secure wallet", "proof of reserve"],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#030712] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-white min-h-screen relative`}>
        {/* Background glow effects */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-[120px] rounded-full" />
          <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] bg-indigo-500/5 blur-[140px] rounded-full" />
          <div className="absolute bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-cyan-500/5 blur-[140px] rounded-full" />
        </div>

        <div className="relative z-10">
          {children}
        </div>
        
        <ClientGoogleTranslate />
      </body>
    </html>
  );
}
