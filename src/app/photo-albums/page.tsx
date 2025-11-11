"use client";

import type { NewsListResponse } from "@/types/strapi";
import Link from "next/link";
import PhotoAlbumCard from "@/components/cards/PhotoAlbumCard";
import { useState } from "react";
import { useGetPhotoAlbumsQuery } from "@/services/strapiApi";

// Клиентский компонент
export default function PhotoAlbumsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 18;

  const {
    data: albumsData,
    isFetching,
    isError,
  } = useGetPhotoAlbumsQuery({
    page: currentPage,
    pageSize,
  });

  const fallbackData: NewsListResponse = { data: [], meta: {} };
  const mergedData = albumsData ?? fallbackData;

  // Фильтруем только новости с галереей
  const albumsList = mergedData.data.filter(
    (news) => news.media?.gallery && news.media.gallery.length > 0
  );
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
      <main className="w-full max-w-[1920px] mx-auto pt-[15px] md:pt-[20px] lg:pt-[30px]">
        {/* Хлебные крошки */}
        <nav className="px-[19px] md:px-[36px] lg:px-[80px] flex items-center gap-[5px] md:gap-[12px] lg:gap-[14px] mb-[15px] md:mb-[20px] lg:mb-[30px] text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat leading-[1.219]">
          <Link href="/home" className="text-black hover:text-[#1D4E89]">
            Главная
          </Link>
          <span className="text-black">&gt;</span>
          <Link href="/news" className="text-black hover:text-[#1D4E89]">
            Новости
          </Link>
          <span className="text-black">&gt;</span>
          <span className="text-black">Фотоальбомы</span>
        </nav>

        {/* Заголовок и Кнопка Назад */}
        <div className="px-[19px] md:px-[36px] lg:px-[80px] flex flex-row items-center justify-between mb-[25px] md:mb-[40px] lg:mb-[60px]">
          {/* Заголовок */}
          <h1 className="text-[20px] md:text-[30px] lg:text-[40px] font-bold font-montserrat text-black leading-[1.219]">
            Фотоальбомы
          </h1>

          {/* Кнопка Назад - мобильная (только иконка) */}
          <Link
            href="/news"
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
                d="M2 7L16 7"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                className="stroke-[#C62828] group-hover:stroke-white group-active:stroke-white"
              />
              <path
                d="M10 2L16 7L10 12"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-[#C62828] group-hover:stroke-white group-active:stroke-white"
              />
            </svg>
          </Link>

          {/* Кнопка Назад - планшет и десктоп (с текстом) */}
          <Link
            href="/news"
            className="hidden md:inline-flex items-center justify-center gap-[10px] px-[24px] py-[16px] md:px-[24px] md:py-[12px] border border-[#C62828] text-[#C62828] text-[16px] md:text-[16px] lg:text-[20px] font-normal font-montserrat rounded-[12px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219]"
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
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M20 2L27 9L20 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Назад
          </Link>
        </div>

        {/* Блок фотоальбомов */}
        {isError ? (
          <div className="px-[19px] md:px-[36px] lg:px-[80px] flex justify-center items-center py-20">
            <div className="text-base md:text-xl text-gray-600">
              Не удалось загрузить фотоальбомы. Попробуйте обновить страницу.
            </div>
          </div>
        ) : isLoading ? (
          <div className="px-[19px] md:px-[36px] lg:px-[80px] flex justify-center items-center py-20">
            <div className="text-base md:text-xl text-gray-600">
              Загрузка...
            </div>
          </div>
        ) : albumsList.length === 0 ? (
          <div className="px-[19px] md:px-[36px] lg:px-[80px] flex justify-center items-center py-20">
            <div className="text-base md:text-xl text-gray-600">
              Фотоальбомов пока нет
            </div>
          </div>
        ) : (
          <div className="px-[19px] md:px-[36px] lg:px-[80px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[15px] md:gap-x-[18px] md:gap-y-[36px] lg:gap-x-[30px] lg:gap-y-[39px] mb-[30px] md:mb-[50px] lg:mb-[88px]">
            {Array.from({ length: Math.max(10, albumsList.length) }).map(
              (_, i) => {
                const news = albumsList[i % albumsList.length];

                // Получаем обложку или первое фото из галереи
                const coverUrl =
                  news.media?.cover?.url ||
                  news.media?.gallery?.[0]?.url ||
                  "/images/news/news-1.png";
                const fullCoverUrl = coverUrl.startsWith("http")
                  ? coverUrl
                  : `${
                      process.env.NEXT_PUBLIC_STRAPI_URL ||
                      "http://localhost:1337"
                    }${coverUrl}`;

                return (
                  <PhotoAlbumCard
                    key={`${news.id}-${i}`}
                    image={fullCoverUrl}
                    title={news.title}
                    href={`/photo-albums/${news.slug}`}
                  />
                );
              }
            )}
          </div>
        )}

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-[20px] md:gap-[36px] mb-[60px] md:mb-[150px] lg:mb-[150px] px-[29px] md:px-[90px]">
            {/* Кнопка Назад - мобильная */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`md:hidden inline-flex items-center justify-center w-[35px] h-[35px] rounded-[7px] transition-all duration-150 ${
                currentPage === 1
                  ? "bg-[#DBDBDB] cursor-not-allowed"
                  : "bg-[#C62828] hover:bg-[#B71C1C] active:scale-95"
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
              className={`hidden md:inline-flex items-center justify-center px-[20px] py-[12px] rounded-[10px] text-[16px] md:text-[16px] lg:text-[20px] font-medium font-montserrat transition-colors leading-[1.219] ${
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
                    className={`inline-flex items-center justify-center w-[35px] h-[35px] md:min-w-[51px] md:h-[48px] px-[10px] md:px-[20px] py-[10px] md:py-[12px] rounded-[8px] md:rounded-[10px] text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat transition-all duration-150 leading-[1.219] active:scale-95 ${
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
              className={`md:hidden inline-flex items-center justify-center w-[35px] h-[35px] rounded-[7px] transition-all duration-150 ${
                currentPage === totalPages
                  ? "bg-[#DBDBDB] cursor-not-allowed"
                  : "bg-[#C62828] hover:bg-[#B71C1C] active:scale-95"
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
              className={`hidden md:inline-flex items-center justify-center px-[20px] py-[12px] rounded-[10px] text-[16px] md:text-[16px] lg:text-[20px] font-medium font-montserrat transition-colors leading-[1.219] ${
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
