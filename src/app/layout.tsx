import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { ReduxProvider } from "@/store/ReduxProvider";

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
    default: "Интерактивная Карта Боевой славы Липецкой области",
    template: "%s | Интерактивная Карта Боевой славы Липецкой области",
  },
  description:
    "Интерактивная карта России с автоматической кластеризацией точек, встраиванием на сайты и публичным API. Исследуйте достопримечательности городов России.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  // Иконки и фавиконы
  // Next.js автоматически обрабатывает favicon.ico из app/ (не нужно указывать в metadata)
  // Остальные иконки указываем явно, так как они находятся в public/
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  // Web App Manifest для PWA и Android устройств
  // Android иконки (android-chrome-192x192.png) обрабатываются через manifest
  manifest: "/site.webmanifest",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    title: "Интерактивная Карта Боевой славы Липецкой области",
    description:
      "Интерактивная карта России с автоматической кластеризацией точек, встраиванием на сайты и публичным API",
    siteName: "Интерактивная Карта Боевой славы Липецкой области",
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
        <ReduxProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
