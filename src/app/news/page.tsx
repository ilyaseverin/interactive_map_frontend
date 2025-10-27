"use client";

import { NewsListResponse } from "@/types/strapi";
import Link from "next/link";
import NewsCard from "@/components/cards/NewsCard";
import { useEffect, useState } from "react";

// Функция для получения новостей из Strapi
async function getNews(
  page: number = 1,
  pageSize: number = 9,
  category?: string
): Promise<NewsListResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  try {
    const categoryFilter = category
      ? `&filters[basic_info][category][$eq]=${encodeURIComponent(category)}`
      : "";

    const res = await fetch(
      `${apiUrl}/api/news?pagination[page]=${page}&pagination[pageSize]=${pageSize}${categoryFilter}&populate[basic_info]=*&populate[content_info]=*&populate[media][populate][cover]=true&populate[media][populate][gallery]=true&populate[media][populate][video_links]=*&populate[meta_info][populate][tags]=*&sort=basic_info.published_at_date:desc`,
      {
        cache: "no-store", // Всегда без кэша
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch news:", res.status, res.statusText);
      return { data: [], meta: {} };
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    return { data: [], meta: {} };
  }
}

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
  const [newsData, setNewsData] = useState<NewsListResponse>({
    data: [],
    meta: {},
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const pageSize = 9;

  useEffect(() => {
    setIsLoading(true);
    getNews(currentPage, pageSize, category).then((data) => {
      setNewsData(data);
      setIsLoading(false);
    });
  }, [currentPage, category]);

  const newsList = newsData.data;
  const totalPages = newsData.meta?.pagination?.pageCount || 1;

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
      <main className="w-full max-w-[1920px] mx-auto px-4 lg:px-[69px] pt-[37px] lg:pt-[39px]">
        {/* Хлебные крошки */}
        <nav className="flex items-center gap-[14px] mb-[37px] lg:mb-[37px] text-[20px] font-normal font-montserrat leading-[1.219]">
          <Link href="/home" className="text-black hover:text-[#1D4E89]">
            Главная
          </Link>
          <span className="text-black">&gt;</span>
          <span className="text-black">Новости</span>
        </nav>

        {/* Заголовок и Кнопка Назад */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-[51px] lg:mb-[57px]">
          {/* Заголовок */}
          <h1 className="text-[40px] font-bold font-montserrat text-black leading-[1.219] mb-4 lg:mb-0">
            Новости
          </h1>

          {/* Кнопка Назад */}
          <Link
            href="/home"
            className="inline-flex items-center justify-center gap-[9px] px-[24px] py-[16px] bg-[#C62828] hover:bg-[#B71C1C] text-[#EDF3F7] text-[20px] font-medium font-montserrat rounded-[12px] transition-colors leading-[1.219] self-start lg:self-auto"
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

        {/* Категории и Фото/Видео на одной линии */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-0 mb-[64px] lg:mb-[64px]">
          {/* Категории */}
          <div className="flex flex-row gap-[23px]">
            <button
              onClick={() => {
                setCategory(undefined);
                setCurrentPage(1);
              }}
              className={`px-[20px] py-[12px] md:px-[20px] md:py-[12px] lg:px-[65px] lg:py-4 rounded-[10px] md:rounded-[10px] lg:rounded-[9px] text-[16px] md:text-[16px] lg:text-[20px] font-normal font-montserrat leading-[1.875] md:leading-[1.875] lg:leading-[1.219] transition-colors flex items-center justify-center ${
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
              className={`px-[20px] py-[12px] md:px-[20px] md:py-[12px] lg:px-[65px] lg:py-4 rounded-[10px] md:rounded-[10px] lg:rounded-[9px] text-[16px] md:text-[16px] lg:text-[20px] font-normal font-montserrat leading-[1.875] md:leading-[1.875] lg:leading-[1.219] transition-colors flex items-center justify-center ${
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
              className={`px-[20px] py-[12px] md:px-[20px] md:py-[12px] lg:px-[65px] lg:py-4 rounded-[10px] md:rounded-[10px] lg:rounded-[9px] text-[16px] md:text-[16px] lg:text-[20px] font-normal font-montserrat leading-[1.875] md:leading-[1.875] lg:leading-[1.219] transition-colors flex items-center justify-center ${
                category === "Региональные"
                  ? "bg-[#1D4E89] text-[#FFFEFE]"
                  : "bg-white text-[#1D4E89] border border-[#1D4E89] hover:bg-gray-50"
              }`}
            >
              Региональные
            </button>
          </div>

          {/* Кнопки Фотоальбомы / Видео */}
          <div className="flex gap-[15px]">
            <Link
              href="/photo-albums"
              className="inline-flex items-center justify-center px-[20px] py-[12px] md:px-[20px] md:py-[12px] lg:px-[24px] lg:py-4 rounded-[10px] md:rounded-[10px] lg:rounded-[12px] bg-white text-[#1D4E89] text-[16px] md:text-[16px] lg:text-[20px] font-normal font-montserrat border border-[#1D4E89] hover:bg-gray-50 transition-colors leading-[1.875] md:leading-[1.875] lg:leading-[1.219]"
            >
              К фотоальбомам
            </Link>
            <Link
              href="/videos"
              className="inline-flex items-center justify-center px-[20px] py-[12px] md:px-[20px] md:py-[12px] lg:px-[24px] lg:py-4 rounded-[10px] md:rounded-[10px] lg:rounded-[12px] bg-white text-[#1D4E89] text-[16px] md:text-[16px] lg:text-[20px] font-normal font-montserrat border border-[#1D4E89] hover:bg-gray-50 transition-colors leading-[1.875] md:leading-[1.875] lg:leading-[1.219]"
            >
              К видео
            </Link>
          </div>
        </div>

        {/* Блок новостей */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">Загрузка...</div>
          </div>
        ) : newsList.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">Новостей пока нет</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-[30px] gap-y-[25px] mb-[88px] lg:mb-[88px] px-[47px] md:px-[138px] lg:px-0">
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
          <div className="flex items-center justify-center gap-[36px] mb-[150px] lg:mb-[150px] px-4 md:px-[90px] lg:px-0">
            {/* Кнопка Назад */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`inline-flex items-center justify-center w-[132px] h-[48px] px-[12px] py-[20px] md:w-[132px] md:h-[48px] md:px-[12px] md:py-[20px] lg:w-auto lg:px-[24px] lg:py-[16px] rounded-[10px] md:rounded-[10px] lg:rounded-[12px] text-[16px] md:text-[16px] lg:text-[20px] font-medium font-montserrat transition-colors leading-[1.219] ${
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
                    className={`inline-flex items-center justify-center w-[51px] h-[48px] md:w-[51px] md:h-[48px] lg:w-auto lg:min-w-[56px] lg:px-[24px] lg:py-[16px] px-[12px] py-[20px] rounded-[10px] md:rounded-[10px] lg:rounded-[10px] text-[16px] md:text-[16px] lg:text-[20px] font-normal font-montserrat transition-colors leading-[1.219] ${
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
              className={`inline-flex items-center justify-center w-[132px] h-[48px] px-[12px] py-[20px] md:w-[132px] md:h-[48px] md:px-[12px] md:py-[20px] lg:w-auto lg:px-[24px] lg:py-[16px] rounded-[10px] md:rounded-[10px] lg:rounded-[12px] text-[16px] md:text-[16px] lg:text-[20px] font-medium font-montserrat transition-colors leading-[1.219] ${
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
