import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'], // choose what you actually need
  display: 'swap',
})

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
      <body className={`${nunito.className}`}>
        <Navbar items={navItems} />
        {children}
      </body>
    </html>
  );
}
