import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";
import I18nProvider from "@/components/I18nProvider";
import { Locale } from "@/lib/i18n/dictionaries";

const breeSerif = localFont({
  src: "../../../public/fonts/BreeSerif-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-bree-serif",
});
const cabin = localFont({
  src: "../../../public/fonts/Cabin-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-cabin",
});
const cabinCondensed = localFont({
  src: [
    {
      path: "../../../public/fonts/CabinCondensed-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/CabinCondensed-Medium.ttf",
      weight: "500",
      style: "normal",
    }
  ],
  variable: "--font-cabin-condensed",
});
const ubuntuCondensed = localFont({
  src: "../../../public/fonts/UbuntuCondensed-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-ubuntu-condensed",
});

export const metadata: Metadata = {
  title: "Leveling the Playing Field",
  description: "Equipment checkout application for organizations working with the non-profit Leveling the Playing Field",
};

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: JSX.Element;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang}>
      <body
        className={`${breeSerif.variable} ${cabin.variable} ${cabinCondensed.variable} ${ubuntuCondensed.variable} antialiased bg-white-dark`}
      >
        <AuthProvider>
          <I18nProvider locale={params.lang}>{children}</I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
