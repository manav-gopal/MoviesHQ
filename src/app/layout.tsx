import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import HandleClick from "@/lib/utils/HandleClick";
import { Navbar } from "@/components/layout";
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
