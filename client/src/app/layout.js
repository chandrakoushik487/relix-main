import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>RELIX - Relief Intelligence Exchange</title>
        <meta name="description" content="AI-powered disaster response coordination" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
