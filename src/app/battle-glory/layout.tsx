import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Карта Боевой Славы Липецкой области",
  description:
    "Интерактивная карта памятников, мемориалов, мемориальных досок и воинских захоронений Липецкой области времен Великой Отечественной войны. История региона в годы ВОВ.",
  keywords: [
    "карта боевой славы",
    "Липецкая область",
    "памятники ВОВ",
    "мемориалы",
    "воинские захоронения",
    "Великая Отечественная война",
    "история Липецкой области",
    "мемориальные доски",
  ],
  openGraph: {
    title: "Карта Боевой Славы Липецкой области",
    description:
      "Памятники, мемориалы и места воинской славы времен Великой Отечественной войны",
    type: "website",
    locale: "ru_RU",
  },
  alternates: {
    canonical: "/battle-glory",
  },
};

export default function BattleGloryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
