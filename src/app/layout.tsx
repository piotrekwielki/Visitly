import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";

import { SiteHeader } from "@/components/layout/site-header";
import "@/app/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope"
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono"
});

export const metadata: Metadata = {
  title: "Visitly",
  description: "Marketplace and business operating system for appointment-based services."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${manrope.variable} ${plexMono.variable}`} lang="en">
      <body className={`${manrope.className} antialiased`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
