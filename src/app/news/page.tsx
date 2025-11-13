"use client";

import type { NewsListResponse } from "@/types/strapi";
import Link from "next/link";
import NewsCard from "@/components/cards/NewsCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useState } from "react";
import { useGetNewsQuery } from "@/services/strapiApi";

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
export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<string | undefined>(undefined);

  const pageSize = 9;

  const {
    data: newsData,
    isFetching,
    isError,
  } = useGetNewsQuery({
    page: currentPage,
    pageSize,
    category,
  });

  const fallbackData: NewsListResponse = { data: [], meta: {} };
  const mergedData = newsData ?? fallbackData;

  const newsList = mergedData.data;
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
          items={[{ label: "Главная", href: "/home" }, { label: "Новости" }]}
          className="px-[19px] md:px-[36px] lg:px-[69px] mb-[15px] md:mb-[20px] lg:mb-[27px]"
        />

        {/* Заголовок и Кнопка Назад */}
        <div className="px-[19px] md:px-[36px] lg:px-[69px] flex flex-col md:flex-row md:items-start md:justify-between mb-[10px] md:mb-[20px] lg:mb-[27px] relative">
          {/* Заголовок */}
          <h1 className="text-[20px] md:text-[30px] lg:text-[40px] font-bold font-montserrat text-black leading-[1.219] mb-0 md:mb-0">
            Новости
          </h1>

          {/* Кнопка Назад - мобильная (только иконка) */}
          <Link
            href="/home"
            className="absolute top-0 right-[30px] md:hidden inline-flex items-center justify-center w-[34px] h-[34px] rounded-[7px] bg-[#C62828] hover:bg-[#B71C1C] transition-colors"
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
                d="M2 7L16 7"
                stroke="white"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                d="M10 2L16 7L10 12"
                stroke="white"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* Кнопка Назад - планшет и десктоп (с текстом) */}
          <Link
            href="/home"
            className="hidden md:inline-flex items-center justify-center gap-[10px] px-[24px] py-[16px] bg-[#C62828] hover:bg-[#B71C1C] text-[#EDF3F7] text-[16px] md:text-[16px] lg:text-[20px] font-medium font-montserrat rounded-[12px] transition-colors leading-[1.219]"
          >
            <svg
              width="33"
              height="25"
              viewBox="0 0 29 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180 md:w-[22px] md:h-[13px]"
            >
              <path
                d="M2 9L27 9"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M20 2L27 9L20 16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Назад
          </Link>
        </div>

        {/* Категории и Фото/Видео - мобильная версия (в три ряда) */}
        <div className="px-[19px] md:hidden flex flex-col gap-[5px] mb-[30px] max-w-full overflow-hidden">
          {/* Первый ряд: кнопка "Все" */}
          <div className="flex">
            <button
              onClick={() => {
                setCategory(undefined);
                setCurrentPage(1);
              }}
              className={`px-[25px] py-[10px] h-[40px] rounded-[8px] text-[12px] font-normal font-montserrat leading-[2.5] transition-colors flex items-center justify-center whitespace-nowrap ${
                category === undefined
                  ? "bg-[#1D4E89] text-[#FFFEFE]"
                  : "bg-white text-[#1D4E89] border border-[#1D4E89] hover:bg-gray-50"
              }`}
            >
              Все
            </button>
          </div>

          {/* Второй ряд: "Главные" и "Региональные" */}
          <div className="flex gap-[5px]">
            <button
              onClick={() => {
                setCategory("Главные");
                setCurrentPage(1);
              }}
              className={`px-[25px] py-[10px] h-[40px] rounded-[8px] text-[12px] font-normal font-montserrat leading-[2.5] transition-colors flex items-center justify-center whitespace-nowrap ${
                category === "Главные"
                  ? "bg-[#1D4E89] text-[#FFFEFE]"
                  : "bg-white text-[#1D4E89] border border-[#1D4E89] hover:bg-gray-50"
              }`}
            >
              Главные
            </button>
            <button
              onClick={() => {
                setCategory("Региональные");
                setCurrentPage(1);
              }}
              className={`px-[25px] py-[10px] h-[40px] w-[153px] rounded-[8px] text-[12px] font-normal font-montserrat leading-[2.5] transition-colors flex items-center justify-center whitespace-nowrap ${
                category === "Региональные"
                  ? "bg-[#1D4E89] text-[#FFFEFE]"
                  : "bg-white text-[#1D4E89] border border-[#1D4E89] hover:bg-gray-50"
              }`}
            >
              Региональные
            </button>
          </div>

          {/* Третий ряд: Фотоальбомы и Видео */}
          <div className="flex gap-[5px] min-w-0">
            <Link
              href="/photo-albums"
              className="inline-flex items-center justify-center px-[25px] py-[10px] h-[40px] rounded-[8px] bg-white text-[#C62828] text-[12px] font-normal font-montserrat border border-[#C62828] hover:bg-gray-50 transition-colors leading-[1] whitespace-nowrap min-w-0 flex-shrink"
            >
              К фотоальбомам
            </Link>
            <Link
              href="/videos"
              className="inline-flex items-center justify-center px-[25px] py-[10px] h-[40px] rounded-[8px] bg-white text-[#C62828] text-[12px] font-normal font-montserrat border border-[#C62828] hover:bg-gray-50 transition-colors leading-[1] whitespace-nowrap min-w-0 flex-shrink"
            >
              К видео
            </Link>
          </div>
        </div>

        {/* Категории и Фото/Видео - планшет (в два ряда) */}
        <div className="hidden md:flex lg:hidden px-[36px] flex-col gap-[12px] mb-[64px]">
          {/* Категории */}
          <div className="flex flex-row gap-[14px] flex-wrap">
            <button
              onClick={() => {
                setCategory(undefined);
                setCurrentPage(1);
              }}
              className={`px-[20px] py-[12px] min-h-[48px] rounded-[10px] text-[16px] font-normal font-montserrat leading-[1.875] transition-colors flex items-center justify-center whitespace-nowrap ${
                category === undefined
                  ? "bg-[#1D4E89] text-[#FFFEFE]"
                  : "bg-white text-[#1D4E89] border border-[#1D4E89] hover:bg-gray-50"
              }`}
            >
              Все
            </button>
            <button
              onClick={() => {
                setCategory("Главные");
                setCurrentPage(1);
              }}
              className={`px-[20px] py-[12px] min-h-[48px] rounded-[10px] text-[16px] font-normal font-montserrat leading-[1.875] transition-colors flex items-center justify-center whitespace-nowrap ${
                category === "Главные"
                  ? "bg-[#1D4E89] text-[#FFFEFE]"
                  : "bg-white text-[#1D4E89] border border-[#1D4E89] hover:bg-gray-50"
              }`}
            >
              Главные
            </button>
            <button
              onClick={() => {
                setCategory("Региональные");
                setCurrentPage(1);
              }}
              className={`px-[20px] py-[12px] min-h-[48px] rounded-[10px] text-[16px] font-normal font-montserrat leading-[1.875] transition-colors flex items-center justify-center whitespace-nowrap ${
                category === "Региональные"
                  ? "bg-[#1D4E89] text-[#FFFEFE]"
                  : "bg-white text-[#1D4E89] border border-[#1D4E89] hover:bg-gray-50"
              }`}
            >
              Региональные
            </button>
          </div>

          {/* Кнопки Фотоальбомы / Видео */}
          <div className="flex gap-[14px] flex-wrap">
            <Link
              href="/photo-albums"
              className="inline-flex items-center justify-center px-[20px] py-[12px] min-h-[48px] rounded-[10px] bg-white text-[#C62828] text-[16px] font-normal font-montserrat border border-[#C62828] hover:bg-gray-50 transition-colors leading-[1.875] whitespace-nowrap"
            >
              К фотоальбомам
            </Link>
            <Link
              href="/videos"
              className="inline-flex items-center justify-center px-[20px] py-[12px] min-h-[48px] rounded-[10px] bg-white text-[#C62828] text-[16px] font-normal font-montserrat border border-[#C62828] hover:bg-gray-50 transition-colors leading-[1.875] whitespace-nowrap"
            >
              К видео
            </Link>
          </div>
        </div>

        {/* Категории и Фото/Видео - десктоп (в одну линию) */}
        <div className="hidden lg:flex px-[69px] flex-row items-start justify-between gap-0 mb-[64px]">
          {/* Категории */}
          <div className="flex flex-row gap-[23px] flex-wrap">
            <button
              onClick={() => {
                setCategory(undefined);
                setCurrentPage(1);
              }}
              className={`px-[40px] xl:px-[65px] py-3 xl:py-4 min-h-[48px] xl:h-auto rounded-[9px] text-[18px] xl:text-[20px] font-normal font-montserrat leading-[1.219] transition-colors flex items-center justify-center whitespace-nowrap ${
                category === undefined
                  ? "bg-[#1D4E89] text-[#FFFEFE]"
                  : "bg-white text-[#1D4E89] border border-[#1D4E89] hover:bg-gray-50"
              }`}
            >
              Все
            </button>
            <button
              onClick={() => {
                setCategory("Главные");
                setCurrentPage(1);
              }}
              className={`px-[40px] xl:px-[65px] py-3 xl:py-4 min-h-[48px] xl:h-auto rounded-[9px] text-[18px] xl:text-[20px] font-normal font-montserrat leading-[1.219] transition-colors flex items-center justify-center whitespace-nowrap ${
                category === "Главные"
                  ? "bg-[#1D4E89] text-[#FFFEFE]"
                  : "bg-white text-[#1D4E89] border border-[#1D4E89] hover:bg-gray-50"
              }`}
            >
              Главные
            </button>
            <button
              onClick={() => {
                setCategory("Региональные");
                setCurrentPage(1);
              }}
              className={`px-[40px] xl:px-[65px] py-3 xl:py-4 min-h-[48px] xl:h-auto rounded-[9px] text-[18px] xl:text-[20px] font-normal font-montserrat leading-[1.219] transition-colors flex items-center justify-center whitespace-nowrap ${
                category === "Региональные"
                  ? "bg-[#1D4E89] text-[#FFFEFE]"
                  : "bg-white text-[#1D4E89] border border-[#1D4E89] hover:bg-gray-50"
              }`}
            >
              Региональные
            </button>
          </div>

          {/* Кнопки Фотоальбомы / Видео */}
          <div className="flex gap-[15px] flex-wrap">
            <Link
              href="/photo-albums"
              className="inline-flex items-center justify-center px-[20px] xl:px-[24px] py-3 xl:py-4 min-h-[48px] xl:h-auto rounded-[12px] bg-white text-[#C62828] text-[18px] xl:text-[20px] font-normal font-montserrat border border-[#C62828] hover:bg-gray-50 transition-colors leading-[1.219] whitespace-nowrap"
            >
              К фотоальбомам
            </Link>
            <Link
              href="/videos"
              className="inline-flex items-center justify-center px-[20px] xl:px-[24px] py-3 xl:py-4 min-h-[48px] xl:h-auto rounded-[12px] bg-white text-[#C62828] text-[18px] xl:text-[20px] font-normal font-montserrat border border-[#C62828] hover:bg-gray-50 transition-colors leading-[1.219] whitespace-nowrap"
            >
              К видео
            </Link>
          </div>
        </div>

        {/* Блок новостей */}
        {isError ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">
              Не удалось загрузить новости. Попробуйте обновить страницу.
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">Загрузка...</div>
          </div>
        ) : newsList.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">Новостей пока нет</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-0 md:gap-x-[18px] lg:gap-x-[30px] gap-y-[25px] md:gap-y-[25px] lg:gap-y-[25px] mb-[60px] px-[19px] md:px-[36px] lg:px-[69px]">
            {(() => {
              // Дублируем карточки, чтобы показать минимум 9 для демонстрации (3x3 сетка)
              const minCards = 10;
              const displayCards = [];

              if (newsList.length > 0) {
                let cardIndex = 0;
                for (let i = 0; i < Math.max(minCards, newsList.length); i++) {
                  const news = newsList[cardIndex % newsList.length];
                  const coverUrl = news.media?.cover?.url;
                  const fullCoverUrl = coverUrl
                    ? coverUrl.startsWith("http")
                      ? coverUrl
                      : `${
                          process.env.NEXT_PUBLIC_STRAPI_URL ||
                          "http://localhost:1337"
                        }${coverUrl}`
                    : "/images/news/news-1.png";

                  displayCards.push(
                    <NewsCard
                      key={`${news.id}-${i}`}
                      image={fullCoverUrl}
                      date={formatDate(news.basic_info.published_at_date)}
                      title={news.title}
                      description={news.content_info?.excerpt || ""}
                      href={`/news/${news.slug}`}
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
          <div className="flex items-center justify-center gap-[20px] md:gap-[36px] mb-[60px] md:mb-[150px] lg:mb-[150px] px-[19px] md:px-[36px] lg:px-[69px]">
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
