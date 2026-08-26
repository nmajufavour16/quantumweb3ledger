import { Inter } from "next/font/google";
import "./globals.css";
import ClientGoogleTranslate from "../components/ClientGoogleTranslate";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "QFS Ledger | Secure Web3 Digital Asset Wallet",
  description: "Secure, institutional-grade crypto wallet for managing and tracking your digital assets safely.",
  keywords: ["financial ledger", "crypto wallet", "QFS", "digital assets", "portfolio tracking", "secure wallet"],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[var(--background)] text-slate-100 antialiased selection:bg-blue-500/30 selection:text-white min-h-screen relative`}>
        <div className="relative z-10">
          {children}
        </div>
        
        <ClientGoogleTranslate />
      </body>
    </html>
  );
}
