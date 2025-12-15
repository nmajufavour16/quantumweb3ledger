import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ClientGoogleTranslate from "../components/ClientGoogleTranslate";
import Navbar from "../components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "400",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Quantum Security - Advanced Crypto Portfolio Tracking",
  description: "Track your crypto assets with precision",
  keywords: ["crypto", "portfolio", "tracking", "cryptocurrency", "ledger"],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${poppins.className} font-sans antialiased`}>
        <Navbar />

        {children}
        <ClientGoogleTranslate />
      </body>
    </html>
  );
}
