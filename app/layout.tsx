import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yoga Ossingen",
  description: "Ihr Yoga Partner in Ossingen",
};

import { cms, Navigation } from "@/cms";
import Navbar from "./components/Navbar";
import { unstable_noStore as noStore } from 'next/cache';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  noStore();
  let navItems: any[] = [];
  try {
    // Fetch the main navigation entry
    // We assume there is a singleton or we take the first one found
    const navEntry = await cms.get({ type: Navigation });
    if (navEntry && navEntry.items) {
      navItems = navEntry.items;
    }
  } catch (error) {
    console.error("Failed to fetch navigation:", error);
  }

  // Fallback items if CMS is empty (for initial setup)
  if (navItems.length === 0) {
    navItems = [
      { label: 'Home', link: '/' },
      { label: 'Yoga & Angebot', link: '/angebot' },
      { label: 'Über mich', link: '/ueber-mich' },
      { label: 'Kontakt', link: '/kontakt' },
    ];
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar items={navItems} />
        {children}
      </body>
    </html>
  );
}
