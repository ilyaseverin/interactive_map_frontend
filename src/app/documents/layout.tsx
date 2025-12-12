import type { Metadata } from "next";

// SEO мета-теги для страницы документов
export const metadata: Metadata = {
  title: "Документы - Патриот Центр 48",
  description:
    "Документы Регионального центра подготовки граждан Российской Федерации к военной службе и военно-патриотического воспитания населения Липецкой области. Реестры, методические рекомендации.",
  openGraph: {
    title: "Документы - Патриот Центр 48",
    description:
      "Документы и реестры Регионального центра патриотического воспитания Липецкой области",
    type: "website",
    locale: "ru_RU",
    url: "/documents",
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
    canonical: "/documents",
  },
};

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

