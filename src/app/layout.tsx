import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CompanionLoader } from "@/components/companion/CompanionLoader";
import { profile } from "@/data/profile";
import { createMetadata } from "@/lib/metadata";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/Geist.ttf",
  weight: "100 900",
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMono.ttf",
  weight: "100 900",
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  ...createMetadata(),
  verification: {
    google: "0lV3EMyO4KKoy_dX236RThK2NnByF8mxdgZGKNkO1Bo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const companionFlag = process.env.PORTFOLIO_COMPANION;
  const showCompanion = companionFlag === "1" || (companionFlag !== "0" && process.env.NODE_ENV === "development");
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          {showCompanion && <CompanionLoader whatsapp={profile.whatsappUrl} />}
        </ThemeProvider>
      </body>
    </html>
  );
}
