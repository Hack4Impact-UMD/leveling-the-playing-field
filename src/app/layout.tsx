import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const breeSerif = localFont({
  src: "./fonts/BreeSerif-Regular.ttf",
  variable: "--font-bree-serif",
  weight: "400", 
  style: "normal",
});
const cabinCondensed = localFont({
  src: "./fonts/CabinCondensed-Regular.ttf",
  variable: "--font-cabin-condensed",
  weight: "400", 
  style: "normal",
});
export const metadata: Metadata = {
  title: "Leveling the Playing Field",
  description: "Equipment checkout application for organizations working with the non-profit Leveling the Playing Field",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${breeSerif.variable} ${cabinCondensed.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
