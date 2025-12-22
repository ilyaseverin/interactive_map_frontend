"use client";

import type { PressReleaseListResponse } from "@/types/strapi";
import Link from "next/link";
import PressReleaseCard from "@/components/cards/PressReleaseCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import { BackButton } from "@/components/buttons";
import { useState } from "react";
import { useGetPressReleasesQuery } from "@/services/strapiApi";
import { getResponsiveImageUrl, getStrapiMediaUrl } from "@/utils/strapiUrl";
import { formatDate } from "@/utils/dateUtils";

// Клиентский компонент
export default function PressReleasesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;

  const {
    data: pressReleasesData,
    isFetching,
    isError,
  } = useGetPressReleasesQuery({ page: currentPage, pageSize, minimal: true });

  const fallbackData: PressReleaseListResponse = { data: [], meta: {} };
  const mergedData = pressReleasesData ?? fallbackData;

  const pressReleasesList = mergedData.data;
  const totalPages = mergedData.meta?.pagination?.pageCount || 1;
  const isLoading = isFetching;

  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      {/* Основной контент */}
      <main className="w-full max-w-[1920px] mx-auto pt-[15px] md:pt-[20px] lg:pt-[40px]">
        {/* Хлебные крошки */}
        <Breadcrumbs
          items={[{ label: "Главная", href: "/home" }, { label: "Для СМИ" }]}
          className="px-[19px] md:px-[34px] lg:px-[69px] mb-[15px] md:mb-[20px] lg:mb-[27px]"
        />

        {/* Заголовок и кнопки */}
        <div className="px-[19px] md:px-[34px] lg:px-[69px] relative mb-[15px] md:mb-[30px] lg:mb-[27px]">
          {/* Заголовок и кнопка Назад */}
          <div className="flex items-center justify-between mb-[15px] md:mb-0">
            {/* Заголовок */}
            <h1 className="text-[20px] md:text-[30px] lg:text-[40px] font-bold font-montserrat text-black leading-[1.219] md:mb-[20px]">
              Пресс-релизы
            </h1>

            {/* Кнопка Назад - мобильная версия (только иконка) */}
            <div className="md:hidden">
              <BackButton href="/home" variant="icon" />
            </div>

            {/* Кнопки - планшет и десктоп, справа */}
            <div className="hidden md:flex items-center gap-[15px]">
              {/* Кнопка Назад - планшет и десктоп */}
              <BackButton href="/home" variant="default" />

              {/* Кнопка К фотоальбомам - только на десктопе */}
              <Link
                href="/photo-albums?source=press"
                className="hidden lg:inline-flex items-center justify-center px-[24px] py-[16px] h-[48px] text-[#C62828] border border-[#C62828] text-[20px] font-normal font-montserrat rounded-[12px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219]"
              >
                К фотоальбомам
              </Link>
            </div>
          </div>

          {/* Кнопка К фотоальбомам - мобильная версия */}
          <Link
            href="/photo-albums?source=press"
            className="md:hidden inline-flex items-center justify-center px-[25px] py-[10px] h-[35px] text-[#C62828] border border-[#C62828] text-[12px] font-normal font-montserrat rounded-[8px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219]"
          >
            К фотоальбомам
          </Link>

          {/* Кнопка К фотоальбомам - только на планшете, слева ниже */}
          <Link
            href="/photo-albums?source=press"
            className="hidden md:inline-flex lg:hidden items-center justify-center px-[24px] py-[16px] h-[48px] text-[#C62828] border border-[#C62828] text-[16px] font-normal font-montserrat rounded-[10px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219]"
          >
            К фотоальбомам
          </Link>
        </div>

        {/* Блок пресс-релизов */}
        {isError ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">
              Не удалось загрузить пресс-релизы. Попробуйте обновить страницу.
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">Загрузка...</div>
          </div>
        ) : pressReleasesList.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">Пресс-релизов пока нет</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-0 md:gap-x-[20px] lg:gap-x-[30px] gap-y-[25px] md:gap-y-[52px] lg:gap-y-[25px] mb-[60px] md:mb-[30px] lg:mb-[60px] px-[19px] md:px-[34px] lg:px-[69px]">
            {pressReleasesList.map((pressRelease) => {
              const fullCoverUrl = getResponsiveImageUrl(
                pressRelease.media?.cover,
                "medium"
              );

              const source = pressRelease.basic_info.author
                ? `Источник: ${pressRelease.basic_info.author}`
                : "Источник: РЦПГ РФ";

              return (
                <PressReleaseCard
                  key={pressRelease.id}
                  image={fullCoverUrl || "/images/news/news-1.png"}
                  date={formatDate(pressRelease.basic_info.published_at_date)}
                  source={source}
                  title={pressRelease.title}
                  description={pressRelease.content_info?.excerpt || ""}
                  href={`/press-releases/${pressRelease.slug}`}
                />
              );
            })}
          </div>
        )}

        {/* Пагинация */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="px-[19px] md:px-[34px] lg:px-[69px]"
        />
      </main>
    </div>
  );
}
