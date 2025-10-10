import type { Metadata } from "next";

// SEO мета-теги для страницы встраивания
export const metadata: Metadata = {
  title: "Встраиваемая карта",
  description:
    "Интерактивная карта России для встраивания на сайты. Поддержка кастомизации позиции, зума и кластеризации точек. Легкая интеграция через iframe.",
  robots: {
    index: false, // Не индексируем embed страницу
    follow: false,
  },
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
