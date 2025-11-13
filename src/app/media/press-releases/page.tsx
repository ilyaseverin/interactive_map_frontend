"use client";

import type { PressReleaseListResponse } from "@/types/strapi";
import Link from "next/link";
import PressReleaseCard from "@/components/cards/PressReleaseCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useState } from "react";
import { useGetPressReleasesQuery } from "@/services/strapiApi";

// Функция для форматирования даты
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Клиентский компонент
export default function PressReleasesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;

  const {
    data: pressReleasesData,
    isFetching,
    isError,
  } = useGetPressReleasesQuery({ page: currentPage, pageSize });

  const fallbackData: PressReleaseListResponse = { data: [], meta: {} };
  const mergedData = pressReleasesData ?? fallbackData;

  const pressReleasesList = mergedData.data;
  const totalPages = mergedData.meta?.pagination?.pageCount || 1;
  const isLoading = isFetching;

  // Генерация номеров страниц для пагинации
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Если страниц мало, показываем все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Всегда показываем первую страницу
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Показываем страницы вокруг текущей
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Всегда показываем последнюю страницу
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      {/* Основной контент */}
      <main className="w-full max-w-[1920px] mx-auto pt-[37px] md:pt-[39px] lg:pt-[39px]">
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

            {/* Кнопка Назад - мобильная версия (только иконка, outlined) */}
            <Link
              href="/home"
              className="md:hidden inline-flex items-center justify-center w-[34px] h-[34px] rounded-[7px] border border-[#C62828] hover:bg-[#C62828] active:bg-[#B71C1C] active:scale-95 transition-all duration-150 group"
            >
              <svg
                width="18"
                height="13"
                viewBox="0 0 18 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-180"
              >
                <path
                  d="M2 6.5L16 6.5"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  className="stroke-[#C62828] group-hover:stroke-white group-active:stroke-white"
                />
                <path
                  d="M10 1.5L16 6.5L10 11.5"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-[#C62828] group-hover:stroke-white group-active:stroke-white"
                />
              </svg>
            </Link>

            {/* Кнопки - планшет и десктоп, справа */}
            <div className="hidden md:flex items-center gap-[15px]">
              {/* Кнопка Назад - планшет и десктоп */}
              <Link
                href="/home"
                className="inline-flex items-center justify-center gap-[10px] px-[24px] py-[16px] h-[48px] border border-[#C62828] text-[#C62828] text-[16px] lg:text-[20px] font-normal font-montserrat rounded-[10px] lg:rounded-[12px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219]"
              >
                <svg
                  width="33"
                  height="25"
                  viewBox="0 0 33 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 13L28 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13 6L6 13L13 20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Назад
              </Link>

              {/* Кнопка К фотоальбомам - только на десктопе */}
              <Link
                href="/media/photo-albums"
                className="hidden lg:inline-flex items-center justify-center px-[24px] py-[16px] h-[48px] text-[#C62828] border border-[#C62828] text-[20px] font-normal font-montserrat rounded-[12px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219]"
              >
                К фотоальбомам
              </Link>
            </div>
          </div>

          {/* Кнопка К фотоальбомам - мобильная версия */}
          <Link
            href="/media/photo-albums"
            className="md:hidden inline-flex items-center justify-center px-[25px] py-[10px] h-[35px] text-[#C62828] border border-[#C62828] text-[12px] font-normal font-montserrat rounded-[8px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219]"
          >
            К фотоальбомам
          </Link>

          {/* Кнопка К фотоальбомам - только на планшете, слева ниже */}
          <Link
            href="/media/photo-albums"
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
            {(() => {
              // Дублируем карточки, чтобы показать минимум 10
              const minCards = 10;
              const displayCards = [];

              if (pressReleasesList.length > 0) {
                let cardIndex = 0;
                for (
                  let i = 0;
                  i < Math.max(minCards, pressReleasesList.length);
                  i++
                ) {
                  const pressRelease =
                    pressReleasesList[cardIndex % pressReleasesList.length];
                  const coverUrl = pressRelease.media?.cover?.url;
                  const fullCoverUrl = coverUrl
                    ? coverUrl.startsWith("http")
                      ? coverUrl
                      : `${
                          process.env.NEXT_PUBLIC_STRAPI_URL ||
                          "http://localhost:1337"
                        }${coverUrl}`
                    : "/images/news/news-1.png";

                  const source = pressRelease.basic_info.author
                    ? `Источник: ${pressRelease.basic_info.author}`
                    : "Источник: РЦПГ РФ";

                  displayCards.push(
                    <PressReleaseCard
                      key={`${pressRelease.id}-${i}`}
                      image={fullCoverUrl}
                      date={formatDate(
                        pressRelease.basic_info.published_at_date
                      )}
                      source={source}
                      title={pressRelease.title}
                      description={pressRelease.content_info?.excerpt || ""}
                      href={`/media/press-releases/${pressRelease.slug}`}
                    />
                  );

                  cardIndex++;
                }
              }

              return displayCards;
            })()}
          </div>
        )}

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-[20px] md:gap-[36px] mb-[60px] md:mb-[150px] lg:mb-[150px] px-[19px] md:px-[34px] lg:px-[69px]">
            {/* Кнопка Назад - мобильная */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`md:hidden inline-flex items-center justify-center w-[35px] h-[35px] rounded-[7px] transition-colors ${
                currentPage === 1
                  ? "bg-[#DBDBDB] cursor-not-allowed"
                  : "bg-[#C62828] hover:bg-[#B71C1C]"
              }`}
            >
              <svg
                width="14"
                height="0"
                viewBox="0 0 14 0"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 0L0 0"
                  stroke={currentPage === 1 ? "#B8B8B8" : "#FFFFFF"}
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Кнопка Назад - планшет и десктоп */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`hidden md:inline-flex items-center justify-center px-[20px] py-[12px] md:w-[132px] md:h-[48px] lg:w-auto lg:px-[24px] lg:py-[16px] rounded-[10px] lg:rounded-[12px] text-[16px] lg:text-[20px] font-medium font-montserrat transition-colors leading-[1.219] ${
                currentPage === 1
                  ? "bg-[#DBDBDB] text-[#B8B8B8] cursor-not-allowed"
                  : "bg-[#C62828] text-[#EDF3F7] hover:bg-[#B71C1C]"
              }`}
            >
              Назад
            </button>

            {/* Номера страниц */}
            <div className="flex items-center gap-[4px]">
              {getPageNumbers().map((page, index) => {
                if (page === "...") {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-[10px] md:px-[15px] lg:px-[16px] text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat text-black"
                    >
                      ...
                    </span>
                  );
                }

                const pageNum = page as number;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`inline-flex items-center justify-center w-[35px] h-[35px] md:w-[51px] md:h-[48px] lg:w-auto lg:min-w-[56px] lg:px-[24px] lg:py-[16px] rounded-[8px] md:rounded-[10px] lg:rounded-[10px] text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat transition-colors leading-[1.219] ${
                      currentPage === pageNum
                        ? "bg-[#C62828] text-[#EDF3F7]"
                        : "bg-white text-black border border-[#C62828] hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Кнопка Вперед - мобильная */}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`md:hidden inline-flex items-center justify-center w-[35px] h-[35px] rounded-[7px] transition-colors ${
                currentPage === totalPages
                  ? "bg-[#DBDBDB] cursor-not-allowed"
                  : "bg-[#C62828] hover:bg-[#B71C1C]"
              }`}
            >
              <svg
                width="14"
                height="0"
                viewBox="0 0 14 0"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0L14 0"
                  stroke={currentPage === totalPages ? "#B8B8B8" : "#FFFFFF"}
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Кнопка Вперед - планшет и десктоп */}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`hidden md:inline-flex items-center justify-center px-[20px] py-[12px] md:w-[132px] md:h-[48px] lg:w-auto lg:px-[24px] lg:py-[16px] rounded-[10px] lg:rounded-[12px] text-[16px] lg:text-[20px] font-medium font-montserrat transition-colors leading-[1.219] ${
                currentPage === totalPages
                  ? "bg-[#DBDBDB] text-[#B8B8B8] cursor-not-allowed"
                  : "bg-[#C62828] text-[#EDF3F7] hover:bg-[#B71C1C]"
              }`}
            >
              Вперед
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
