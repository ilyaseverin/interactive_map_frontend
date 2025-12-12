import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

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

export default function HistoryPage() {
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
          <h1 className="text-[20px] md:text-[30px] lg:text-[36px] font-bold font-montserrat text-black leading-[1.219] mb-[23px] md:mb-[30px]">
            История Липецкой области в годы Великой Отечественной войны
          </h1>

          <div className="prose max-w-none">
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-700 mb-4 md:mb-6 leading-relaxed">
              Липецкая область внесла значительный вклад в победу в Великой
              Отечественной войне. С территории области на фронт ушли тысячи
              липчан, многие из которых не вернулись домой.
            </p>

            <h2 className="text-[18px] md:text-[24px] lg:text-[28px] font-semibold text-gray-900 mt-6 md:mt-8 mb-4 md:mb-6">
              Статистика по муниципальным образованиям
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
              <div className="bg-red-50 p-4 md:p-6 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2 md:mb-3 text-[16px] md:text-[18px]">
                  Липецк
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-1">
                  Ушедших на фронт: данные уточняются
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  Погибших: данные уточняются
                </p>
              </div>

              <div className="bg-red-50 p-4 md:p-6 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2 md:mb-3 text-[16px] md:text-[18px]">
                  Елец
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-1">
                  Ушедших на фронт: данные уточняются
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  Погибших: данные уточняются
                </p>
              </div>

              <div className="bg-red-50 p-4 md:p-6 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2 md:mb-3 text-[16px] md:text-[18px]">
                  Другие районы
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Данные собираются и будут добавлены позднее
                </p>
              </div>
            </div>

            <div className="mt-8 md:mt-12 p-6 md:p-8 bg-gray-100 rounded-lg">
              <p className="text-sm md:text-base text-gray-600 italic">
                Раздел находится в разработке. Здесь будет представлена
                подробная информация об истории Липецкой области в годы Великой
                Отечественной войны с детальной статистикой по муниципальным
                образованиям.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
