import type { Metadata } from "next";

// SEO мета-теги для страницы документации
export const metadata: Metadata = {
  title: "Документация по встраиванию",
  description:
    "Узнайте, как встроить интерактивную карту России на ваш сайт. Генератор кода встраивания, API документация, примеры использования iframe, настройка параметров карты и кластеризации.",
  keywords: [
    "документация",
    "встраивание карты",
    "iframe",
    "API",
    "интеграция карты",
    "генератор кода",
    "примеры встраивания",
    "параметры карты",
  ],
  openGraph: {
    title: "Документация - Интерактивная карта России",
    description:
      "Встройте интерактивную карту с кластеризацией на свой сайт за 2 минуты",
    type: "website",
    locale: "ru_RU",
    url: "/docs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Документация - Интерактивная карта",
    description: "Встройте карту на свой сайт с помощью простого iframe кода",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "/docs",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
