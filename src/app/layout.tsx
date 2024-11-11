import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import HandleClick from "@/lib/utils/HandleClick";
import { Navbar } from "@/components/layout";
import { SpeedInsights } from '@vercel/speed-insights/next';
import favicon from '../../public/favicon/favicon.ico';

export const metadata: Metadata = {
  title: "MoviesHQ",
  description: "Site To get Movies Details",
  icons: [{ rel: "icon", url: favicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navbar />
        <HandleClick />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
