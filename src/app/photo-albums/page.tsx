"use client";

import { NewsListResponse } from "@/types/strapi";
import Link from "next/link";
import PhotoAlbumCard from "@/components/cards/PhotoAlbumCard";
import { useEffect, useState } from "react";

// Функция для получения новостей с фотогалереями из Strapi
async function getPhotoAlbums(
  page: number = 1,
  pageSize: number = 18
): Promise<NewsListResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  try {
    const res = await fetch(
      `${apiUrl}/api/news?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate[basic_info]=*&populate[media][populate][cover]=true&populate[media][populate][gallery]=true&sort=basic_info.published_at_date:desc`,
      {
        cache: "no-store", // Всегда без кэша
      }
    );

    if (!res.ok) {
      console.error(
        "Failed to fetch photo albums:",
        res.status,
        res.statusText
      );
      return { data: [], meta: {} };
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching photo albums:", error);
    return { data: [], meta: {} };
  }
}

// Клиентский компонент
export default function PhotoAlbumsPage() {
  const [albumsData, setAlbumsData] = useState<NewsListResponse>({
    data: [],
    meta: {},
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const pageSize = 18;

  useEffect(() => {
    setIsLoading(true);
    getPhotoAlbums(currentPage, pageSize).then((data) => {
      setAlbumsData(data);
      setIsLoading(false);
    });
  }, [currentPage]);

  // Фильтруем только новости с галереей
  const albumsList = albumsData.data.filter(
    (news) => news.media?.gallery && news.media.gallery.length > 0
  );
  const totalPages = albumsData.meta?.pagination?.pageCount || 1;

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
      <main className="w-full max-w-[1920px] mx-auto pt-[37px] lg:pt-[39px]">
        {/* Хлебные крошки */}
        <nav className="px-4 sm:px-6 lg:px-[76px] flex items-center gap-[14px] mb-[37px] lg:mb-[37px] text-[20px] font-normal font-montserrat leading-[1.219]">
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
        <div className="px-4 sm:px-6 lg:px-[80px] flex flex-col lg:flex-row lg:items-start lg:justify-between mb-[58px] lg:mb-[58px]">
          {/* Заголовок */}
          <h1 className="text-[40px] font-bold font-montserrat text-black leading-[1.219] mb-4 lg:mb-0">
            Фотоальбомы
          </h1>

          {/* Кнопка Назад */}
          <Link
            href="/news"
            className="inline-flex items-center justify-center gap-[10px] px-[24px] py-[16px] border border-[#C62828] text-[#C62828] text-[20px] font-normal font-montserrat rounded-[12px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219] self-start lg:self-auto"
          >
            <svg
              width="29"
              height="17"
              viewBox="0 0 29 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180"
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
        {isLoading ? (
          <div className="px-4 sm:px-6 lg:px-[63px] flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">Загрузка...</div>
          </div>
        ) : albumsList.length === 0 ? (
          <div className="px-4 sm:px-6 lg:px-[63px] flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">Фотоальбомов пока нет</div>
          </div>
        ) : (
          <div className="px-4 sm:px-6 lg:px-[63px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-[39px] mb-[88px] lg:mb-[88px]">
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
          <div className="flex items-center justify-center gap-[36px] mb-[150px] lg:mb-[150px]">
            {/* Кнопка Назад */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`inline-flex items-center justify-center px-[24px] py-[16px] rounded-[12px] text-[20px] font-medium font-montserrat transition-colors leading-[1.219] ${
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
                      className="px-[16px] text-[20px] font-normal font-montserrat text-black"
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
                    className={`inline-flex items-center justify-center min-w-[56px] px-[24px] py-[16px] rounded-[10px] text-[20px] font-normal font-montserrat transition-colors leading-[1.219] ${
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

            {/* Кнопка Вперед */}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`inline-flex items-center justify-center px-[24px] py-[16px] rounded-[12px] text-[20px] font-medium font-montserrat transition-colors leading-[1.219] ${
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
