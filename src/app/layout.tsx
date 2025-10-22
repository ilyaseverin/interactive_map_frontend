import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Интерактивная карта с кластеризацией",
    template: "%s | Интерактивная карта России",
  },
  description:
    "Интерактивная карта России с автоматической кластеризацией точек, встраиванием на сайты и публичным API. Исследуйте достопримечательности городов России.",
  keywords: [
    "интерактивная карта",
    "карта России",
    "кластеризация точек",
    "достопримечательности России",
    "геолокация",
    "MapLibre",
    "встраивание карты",
  ],
  authors: [{ name: "Интерактивная карта России" }],
  creator: "Интерактивная карта России",
  publisher: "Интерактивная карта России",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  // Open Graph
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    title: "Интерактивная карта России с кластеризацией",
    description:
      "Интерактивная карта России с автоматической кластеризацией точек, встраиванием на сайты и публичным API",
    siteName: "Интерактивная карта России",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Интерактивная карта России",
    description:
      "Интерактивная карта с кластеризацией точек и встраиванием на сайты",
  },

  // Роботы поисковиков
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Viewport должен быть отдельным экспортом в Next.js 15
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
