"use client";

import { useGetActivityComplexesQuery } from "@/services/strapiApi";
import ActivityComplexCard from "@/components/cards/ActivityComplexCard";
import { ActivityComplexCategory } from "@/types/strapi";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useState } from "react";
import { getActivityComplexRoute } from "@/utils/activityComplexRoutes";

// Порядок отображения комплексов согласно макету
const COMPLEX_ORDER: ActivityComplexCategory[] = [
  "Антимонопольный комплекс",
  "Антинаркотическая кампания",
  "Противодействие терроризму",
  "Антикоррупционная деятельность",
];

export default function ActivityPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const {
    data: complexesData,
    isLoading,
    error,
    isError,
  } = useGetActivityComplexesQuery({
    pageSize: 100,
  });

  // Логирование для отладки
  if (isError) {
    console.error("Ошибка загрузки комплексов:", error);
  }
  if (complexesData) {
    console.log("Данные комплексов:", complexesData);
  }

  // Сортируем комплексы согласно порядку из макета
  const sortedComplexes = complexesData?.data
    ? [...complexesData.data].sort((a, b) => {
        const indexA = COMPLEX_ORDER.indexOf(
          a.category as ActivityComplexCategory
        );
        const indexB = COMPLEX_ORDER.indexOf(
          b.category as ActivityComplexCategory
        );
        // Если категория не найдена в порядке, ставим в конец
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      })
    : [];

  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      {/* Основной контент */}
      <main className="w-full max-w-[1920px] mx-auto pt-[15px] md:pt-[20px] lg:pt-[40px]">
        {/* Хлебные крошки */}
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/home" },
            { label: "Деятельность центра" },
          ]}
          className="px-[19px] md:px-[36px] lg:px-[80px] mb-[15px] md:mb-[20px] lg:mb-[30px]"
        />

        {/* Заголовок */}
        <div className="px-[19px] md:px-[36px] lg:px-[80px] mb-[30px] md:mb-[40px] lg:mb-[50px]">
          <h1 className="text-[20px] md:text-[30px] lg:text-[40px] font-bold font-montserrat text-black leading-[1.219]">
            Деятельность центра
          </h1>
        </div>

        {/* Complexes Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20 px-[19px] md:px-[36px] lg:px-[80px]">
            <p className="text-gray-600 text-lg">Загрузка...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 px-[19px] md:px-[36px] lg:px-[80px]">
            <p className="text-red-600 text-lg mb-4">Ошибка загрузки данных</p>
            <p className="text-gray-600 text-sm">
              {error && "data" in error
                ? JSON.stringify(error.data)
                : "Не удалось загрузить комплексы деятельности центра"}
            </p>
          </div>
        ) : sortedComplexes.length > 0 ? (
          <div className="px-[19px] md:px-[36px] lg:px-[80px] pb-[30px] md:pb-[40px] lg:pb-[60px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[15px] md:gap-[30px] lg:gap-[50px] max-w-[1720px]">
              {sortedComplexes.map((complex, index) => (
                <div
                  key={complex.id}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="w-full"
                >
                  <ActivityComplexCard
                    title={complex.title}
                    category={complex.category as ActivityComplexCategory}
                    href={
                      complex.category
                        ? getActivityComplexRoute(
                            complex.category as ActivityComplexCategory
                          )
                        : "/activity"
                    }
                    isHovered={hoveredIndex === index}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 px-[19px] md:px-[36px] lg:px-[80px]">
            <p className="text-gray-600 text-lg">
              Комплексы деятельности центра не найдены
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
