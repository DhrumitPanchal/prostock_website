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
        {/* <!-- Meta Pixel Code --> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '569375935598283');
fbq('track', 'PageView');
`,
          }}
        ></script>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=569375935598283&ev=PageView&noscript=1"
/>`,
          }}
        ></noscript>
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
