import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BackButton } from "@/components/buttons";
import { getStrapiApiUrl } from "@/utils/strapiUrl";
import type { BattleGloryHistory } from "@/types/strapi";
import { parseContentParagraphsHtml } from "@/utils/textUtils";

export const fetchCache = "force-no-store";

// Получить историю из Strapi
async function getBattleGloryHistory(): Promise<BattleGloryHistory | null> {
  try {
    const res = await fetch(
      `${getStrapiApiUrl("battle-glory-history")}?publicationState=live`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch battle glory history:", res.status);
      return null;
    }

    const data = await res.json();

    if (!data.data) {
      return null;
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching battle glory history:", error);
    return null;
  }
}

export const metadata: Metadata = {
  title: "История Липецкой области в годы ВОВ | Карта Боевой Славы",
  description:
    "История Липецкой области в годы Великой Отечественной войны. Статистика по муниципальным образованиям, количество ушедших на фронт и погибших липчан.",
  keywords: [
    "история Липецкой области",
    "Великая Отечественная война",
    "ВОВ",
    "Липецкая область",
    "статистика ВОВ",
    "муниципальные образования",
  ],
  openGraph: {
    title: "История Липецкой области в годы ВОВ",
    description:
      "История Липецкой области в годы Великой Отечественной войны с детальной статистикой по муниципальным образованиям",
    type: "website",
    locale: "ru_RU",
  },
  alternates: {
    canonical: "/battle-glory/history",
  },
};

export default async function HistoryPage() {
  const history = await getBattleGloryHistory();

  // Разбиваем контент на параграфы
  const contentParagraphs = parseContentParagraphsHtml(history?.content);

  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      {/* Основной контент */}
      <main className="w-full max-w-[1920px] mx-auto px-[19px] md:px-[36px] lg:px-[63px] pt-[15px] md:pt-[20px] lg:pt-[40px]">
        {/* Хлебные крошки */}
        <Breadcrumbs
          className="mb-[30px] lg:mb-[30px] lg:pl-[17px]"
          items={[
            { label: "Главная", href: "/home" },
            { label: "Карта", href: "/battle-glory" },
            { label: "История Липецкой области в годы ВОВ" },
          ]}
        />

        {/* Белая карточка с контентом */}
        <div className="bg-white/90 rounded-[10px] md:rounded-[15px] p-[19px] md:p-[36px] lg:px-[80px] lg:py-[60px] mb-[83px]">
          {/* Мобилка/планшет: заголовок и кнопка */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between mb-[28px]">
              <h1 className="text-[20px] md:text-[30px] font-bold font-montserrat text-black leading-[1.219]">
                История Липецкой области в годы Великой Отечественной войны
              </h1>
              <div className="flex-shrink-0">
                <div className="md:hidden">
                  <BackButton
                    href="/battle-glory"
                    variant="icon"
                    ariaLabel="Назад к карте"
                  />
                </div>
                <div className="hidden md:block">
                  <BackButton href="/battle-glory" />
                </div>
              </div>
            </div>
          </div>

          {/* Десктоп: заголовок слева, кнопка справа */}
          <div className="hidden lg:block">
            <div className="flex items-start justify-between mb-[23px]">
              <h1 className="text-[40px] font-bold font-montserrat text-black leading-[1.219]">
                История Липецкой области в годы Великой Отечественной войны
              </h1>
              <div className="flex-shrink-0">
                <BackButton href="/battle-glory" />
              </div>
            </div>
          </div>

          {/* Текст истории */}
          {contentParagraphs.length > 0 && (
            <div className="xl:px-[40px] 2xl:px-[96px] pt-[25px] md:pt-[40px] lg:pt-[64px]">
              <div className="mb-[25px] md:mb-[40px] lg:mb-[46px] space-y-[36px] [&_a]:underline [&_a]:text-[#1d4e89] [&_a:hover]:opacity-70">
                {contentParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-[12px] md:text-[16px] lg:text-[24px] font-normal md:font-medium font-montserrat text-black leading-[1.666] md:leading-[1.5625] lg:leading-[1.458] whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  >
                  </p>
                ))}
              </div>
            </div>
          )}

          {contentParagraphs.length === 0 && (
            <div className="xl:px-[40px] 2xl:px-[96px] pt-[25px] md:pt-[40px] lg:pt-[64px]">
              <div className="text-center py-[40px] md:py-[60px] lg:py-[80px]">
                <p className="text-[16px] md:text-[20px] lg:text-[24px] font-normal md:font-medium font-montserrat text-[#666666] leading-[1.5]">
                  В стадии наполнения
                </p>
              </div>
            </div>
          )}

          {/* Нижняя часть: кнопка назад */}
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-6 pt-[25px] md:pt-[40px] lg:pt-[64px]">
            <BackButton href="/battle-glory" />
          </div>
        </div>
      </main>
    </div>
  );
}
