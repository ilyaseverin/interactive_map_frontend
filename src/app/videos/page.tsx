"use client";

import Link from "next/link";
import VideoCard from "@/components/cards/VideoCard";
import MediaModal from "@/components/modals/MediaModal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useState } from "react";
import { useGetVideosQuery } from "@/services/strapiApi";
import type { NewsListResponse } from "@/types/strapi";
import { getRelativeTime } from "@/utils/dateUtils";

export default function VideosPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string;
    title: string;
    date?: string;
    isVKVideo?: boolean;
    videoName?: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pageSize = 18;

  const {
    data: videosData,
    isFetching,
    isError,
  } = useGetVideosQuery({
    page: currentPage,
    pageSize,
  });

  const fallbackData: NewsListResponse = { data: [], meta: {} };
  const mergedData = videosData ?? fallbackData;

  // Фильтруем только новости с видео
  const videosList = mergedData.data.filter(
    (news) => news.media?.video_links && news.media.video_links.length > 0
  );

  const totalPages = mergedData.meta?.pagination?.pageCount || 1;
  const isLoading = isFetching;

  // Функция для открытия попапа с видео
  const handleVideoClick = (
    videoUrl: string,
    title: string,
    date?: string,
    isVKVideo?: boolean,
    videoName?: string
  ) => {
    setSelectedVideo({ url: videoUrl, title, date, isVKVideo, videoName });
    setIsModalOpen(true);
  };

  // Функция для закрытия попапа
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  // Генерация номеров страниц для пагинации
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

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
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/home" },
            { label: "Новости", href: "/news" },
            { label: "Видео" },
          ]}
          className="px-[19px] md:px-[36px] lg:px-[80px] mb-[15px] md:mb-[20px] lg:mb-[30px]"
        />

        {/* Заголовок и Кнопка Назад */}
        <div className="px-[19px] md:px-[36px] lg:px-[80px] flex flex-row items-center justify-between mb-[25px] md:mb-[40px] lg:mb-[60px]">
          {/* Заголовок */}
          <h1 className="text-[20px] md:text-[30px] lg:text-[40px] font-bold font-montserrat text-black leading-[1.219]">
            Видео
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

        {/* Блок видео */}
        {isError ? (
          <div className="px-[19px] md:px-[36px] lg:px-[80px] flex justify-center items-center py-20">
            <div className="text-base md:text-xl text-gray-600">
              Не удалось загрузить видео. Попробуйте обновить страницу.
            </div>
          </div>
        ) : isLoading ? (
          <div className="px-[19px] md:px-[36px] lg:px-[80px] flex justify-center items-center py-20">
            <div className="text-base md:text-xl text-gray-600">
              Загрузка...
            </div>
          </div>
        ) : videosList.length === 0 ? (
          <div className="px-[19px] md:px-[36px] lg:px-[80px] flex justify-center items-center py-20">
            <div className="text-base md:text-xl text-gray-600">
              Видео пока нет
            </div>
          </div>
        ) : (
          <div className="px-[19px] md:px-[36px] lg:px-[60px] xl:px-[72px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-[20px] md:gap-x-[18px] md:gap-y-[18px] xl:gap-x-[60px] xl:gap-y-[39px] mb-[30px] md:mb-[50px] lg:mb-[88px]">
            {Array.from({ length: Math.max(15, videosList.length) }).map(
              (_, i) => {
                const news = videosList[i % videosList.length];
                const video = news.media?.video_links?.[0];

                if (!video) return null;

                // Получаем обложку или cover
                const thumbnailUrl =
                  news.media?.cover?.url || "/images/news/news-1.png";
                const fullThumbnailUrl = thumbnailUrl.startsWith("http")
                  ? thumbnailUrl
                  : `${
                      process.env.NEXT_PUBLIC_STRAPI_URL ||
                      "http://localhost:1337"
                    }${thumbnailUrl}`;

                // Получаем URL видео
                const videoUrl = video.video_file?.url || video.url || "";
                const fullVideoUrl = videoUrl.startsWith("http")
                  ? videoUrl
                  : `${
                      process.env.NEXT_PUBLIC_STRAPI_URL ||
                      "http://localhost:1337"
                    }${videoUrl}`;

                const relativeDate = news.basic_info?.published_at_date
                  ? getRelativeTime(news.basic_info.published_at_date)
                  : undefined;

                // Получаем имя файла видео
                const videoFileName = video.video_file?.name;

                return (
                  <div
                    key={`${news.id}-${i}`}
                    onClick={() =>
                      handleVideoClick(
                        fullVideoUrl,
                        news.title,
                        relativeDate,
                        video.open_in_vk,
                        videoFileName
                      )
                    }
                    className="cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-150"
                  >
                    <VideoCard
                      thumbnail={fullThumbnailUrl}
                      title={news.title}
                      date={relativeDate}
                      duration="2:02"
                      alt={news.media?.cover?.alternativeText || news.title}
                    />
                  </div>
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

      {/* Попап для просмотра видео */}
      {selectedVideo && (
        <MediaModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          mediaUrl={selectedVideo.url}
          title={selectedVideo.title}
          date={selectedVideo.date}
          alt={selectedVideo.title}
          mediaType="video"
          isVKVideo={selectedVideo.isVKVideo}
          mediaName={selectedVideo.videoName}
        />
      )}
    </div>
  );
}
