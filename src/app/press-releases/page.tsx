"use client";

import type { PressReleaseListResponse } from "@/types/strapi";
import PressReleaseCard from "@/components/cards/PressReleaseCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import { BackButton, SecondaryButton } from "@/components/buttons";
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

        {/* Заголовок и Кнопка Назад */}
        <div className="px-[19px] md:px-[34px] lg:px-[69px] flex flex-col md:flex-row md:items-start md:justify-between mb-[10px] md:mb-[20px] lg:mb-[27px] relative">
          {/* Заголовок */}
          <h1 className="text-[20px] md:text-[30px] lg:text-[40px] font-bold font-montserrat text-black leading-[1.219] mb-0 md:mb-0">
            Пресс-релизы
          </h1>

          {/* Кнопка Назад */}
          <div className="absolute top-1/2 -translate-y-1/2 right-[19px] md:static md:translate-y-0">
            <BackButton href="/home" variant="red" />
          </div>
        </div>

        {/* Кнопка К фотоальбомам - мобильная версия */}
        <div className="px-[19px] md:hidden flex gap-[5px] pt-[10px] mb-[20px] max-w-full overflow-hidden">
          <SecondaryButton href="/photo-albums?source=press" variant="mobile" className="min-w-0 flex-shrink">
            К фотоальбомам
          </SecondaryButton>
        </div>

        {/* Кнопка К фотоальбомам - планшет */}
        <div className="hidden md:flex lg:hidden px-[34px] flex-row gap-[14px] mb-[40px] flex-wrap">
          <SecondaryButton href="/photo-albums?source=press" variant="tablet">
            К фотоальбомам
          </SecondaryButton>
        </div>

        {/* Кнопка К фотоальбомам - десктоп */}
        <div className="hidden lg:flex px-[69px] flex-row items-start justify-end gap-0 mb-[50px]">
          <div className="flex gap-[15px] flex-wrap">
            <SecondaryButton href="/photo-albums?source=press" variant="desktop">
              К фотоальбомам
            </SecondaryButton>
          </div>
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
