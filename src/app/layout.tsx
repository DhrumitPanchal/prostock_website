import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AOSInit } from "../app/Aos";
import { Toaster } from "sonner";
export const metadata = {
  title: "Prostock",
  description:
    "ProStock simplifies stock trading, allowing users to easily buy, sell, and invest in the stock market with ease and confidence.",
  keywords:
    "ProStock, Pro Stock, PROSTOCK, PRO STOCK, prostocks, pro stock trading, stock trading, stock market, online stock trading, easy stock trading, affordable stock trading, buy stock, sell stock, invest in stocks, stock trading platform, stock market education, stock trading strategies, stock trading knowledge, learn stock trading, beginner stock trading, expert stock trading, stock market course, stock market guide, stock investment, stock market tips, stock trading for beginners, stock market education platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AOSInit />
      <head>
        <meta charSet="utf-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="layout, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="30 days" />
        <link rel="icon" sizes="any" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="any" href="/favicon.png" />
      </head>
      <body>
        <Toaster />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
