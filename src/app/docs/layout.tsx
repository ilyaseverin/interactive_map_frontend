import type { Metadata } from "next";

// SEO мета-теги для страницы документации
export const metadata: Metadata = {
  title: "Документация по встраиванию",
  description:
    "Узнайте, как встроить интерактивную карту России на ваш сайт. Генератор кода встраивания, API документация, примеры использования iframe, настройка параметров карты и кластеризации.",
  openGraph: {
    title: "Документация - Интерактивная карта России",
    description:
      "Встройте интерактивную карту с кластеризацией на свой сайт за 2 минуты",
    type: "website",
    locale: "ru_RU",
    url: "/docs",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
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
