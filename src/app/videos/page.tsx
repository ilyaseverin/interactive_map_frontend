"use client";

import Link from "next/link";
import VideoCard from "@/components/cards/VideoCard";
import MediaModal from "@/components/modals/MediaModal";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetProjectsQuery, useGetVideosQuery } from "@/services/strapiApi";
import type {
  NewsItem,
  NewsListResponse,
  ProjectItem,
  ProjectListResponse,
} from "@/types/strapi";
import { getRelativeTime } from "@/utils/dateUtils";
import { getResponsiveImageUrl, getStrapiMediaUrl } from "@/utils/strapiUrl";
import { withSearchParams } from "@/utils/withSearchParams";

function VideosPage() {
  const searchParams = useSearchParams();
  const sourceParam = (searchParams.get("source") || "news") as
    | "news"
    | "projects";
  const source = sourceParam === "projects" ? "projects" : "news";

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
    isFetching: isNewsFetching,
    isError: isNewsError,
  } = useGetVideosQuery(
    {
      page: currentPage,
      pageSize,
      minimal: true,
    },
    { skip: source !== "news" }
  );

  const {
    data: projectsData,
    isFetching: isProjectsFetching,
    isError: isProjectsError,
  } = useGetProjectsQuery(
    {
      page: currentPage,
      pageSize,
      minimal: true,
    },
    { skip: source !== "projects" }
  );

  const isError = isNewsError || isProjectsError;
  const isLoading = isNewsFetching || isProjectsFetching;

  const {
    videosList,
    totalPages,
  }: { videosList: (NewsItem | ProjectItem)[]; totalPages: number } =
    useMemo(() => {
      if (source === "projects") {
        const fallback: ProjectListResponse = { data: [], meta: {} };
        const merged = (projectsData ?? fallback) as ProjectListResponse;

        const items =
          merged.data?.filter(
            (project: ProjectItem) =>
              project.media?.videos && project.media.videos.length > 0
          ) || [];

        const pages =
          merged.meta?.pagination?.pageCount &&
          merged.meta.pagination.pageCount > 0
            ? merged.meta.pagination.pageCount
            : 1;

        return { videosList: items, totalPages: pages };
      }

      const fallback: NewsListResponse = { data: [], meta: {} };
      const merged = (videosData ?? fallback) as NewsListResponse;

      const items =
        merged.data?.filter(
          (news: NewsItem) =>
            news.media?.video_links && news.media.video_links.length > 0
        ) || [];

      const pages =
        merged.meta?.pagination?.pageCount &&
        merged.meta.pagination.pageCount > 0
          ? merged.meta.pagination.pageCount
          : 1;

      return { videosList: items, totalPages: pages };
    }, [projectsData, source, videosData]);

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

  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      {/* Основной контент */}
      <main className="w-full max-w-[1920px] mx-auto pt-[15px] md:pt-[20px] lg:pt-[40px]">
        {/* Хлебные крошки */}
        <Breadcrumbs
          items={
            source === "projects"
              ? [
                  { label: "Главная", href: "/home" },
                  { label: "Наши проекты", href: "/projects" },
                  { label: "Видео" },
                ]
              : [
                  { label: "Главная", href: "/home" },
                  { label: "Новости", href: "/news" },
                  { label: "Видео" },
                ]
          }
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
            href={source === "projects" ? "/projects" : "/news"}
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
            href={source === "projects" ? "/projects" : "/news"}
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
            {videosList.map((item) => {
              if (source === "projects") {
                const project = item as ProjectItem;
                const video = project.media?.videos?.[0];

                if (!video) return null;

                const thumbnail =
                  project.media?.cover || project.media?.gallery?.[0];

                const fullThumbnailUrl =
                  getResponsiveImageUrl(thumbnail, "medium") ||
                  "/images/news/news-1.png";

                // Приоритет: сначала загруженное видео, потом ссылка
                const videoFileUrl = video.video_file?.url;
                const videoLinkUrl = video.url;
                const videoToUse = videoFileUrl || videoLinkUrl || "";

                const isExternalVideo = videoLinkUrl
                  ? (videoLinkUrl.includes("youtube.com") ||
                      videoLinkUrl.includes("youtu.be") ||
                      videoLinkUrl.includes("rutube.ru") ||
                      videoLinkUrl.includes("vk.com"))
                  : false;

                const fullVideoUrl = videoFileUrl
                  ? getStrapiMediaUrl(videoFileUrl) || videoFileUrl
                  : isExternalVideo
                  ? videoLinkUrl
                  : videoLinkUrl
                  ? getStrapiMediaUrl(videoLinkUrl) || videoLinkUrl
                  : "";

                const relativeDate = project.publishedAt
                  ? getRelativeTime(project.publishedAt)
                  : undefined;

                const videoFileName = video.video_file?.name;

                const isVKVideo = videoFileUrl
                  ? false
                  : videoLinkUrl
                  ? (videoLinkUrl.includes("vk.com") ||
                      /video(-?\d+)_(\d+)/.test(videoLinkUrl))
                  : false;

                return (
                  <div
                    key={project.id}
                    onClick={() => {
                      if (!isModalOpen) {
                        handleVideoClick(
                          fullVideoUrl,
                          project.title,
                          relativeDate,
                          isVKVideo,
                          videoFileName
                        );
                      }
                    }}
                    className={`cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-150 ${
                      isModalOpen ? "pointer-events-none" : ""
                    }`}
                  >
                    <VideoCard
                      thumbnail={fullThumbnailUrl}
                      title={project.title}
                      date={relativeDate}
                      duration="2:02"
                      alt={
                        project.media?.cover?.alternativeText || project.title
                      }
                    />
                  </div>
                );
              }

              const news = item as NewsItem;
              const video = news.media?.video_links?.[0];

              if (!video) return null;

              // Получаем обложку или cover
              const thumbnail = news.media?.cover;
              const fullThumbnailUrl =
                getResponsiveImageUrl(thumbnail, "medium") ||
                "/images/news/news-1.png";

              // Получаем URL видео
              // Приоритет: сначала загруженное видео, потом ссылка
              const videoFileUrl = video.video_file?.url;
              const videoLinkUrl = video.url;

              // Определяем тип видео по ссылке (только если нет загруженного файла)
              const isExternalVideo = videoFileUrl
                ? false
                : videoLinkUrl
                ? (videoLinkUrl.includes("youtube.com") ||
                    videoLinkUrl.includes("youtu.be") ||
                    videoLinkUrl.includes("rutube.ru") ||
                    videoLinkUrl.includes("vk.com") ||
                    video.open_in_vk)
                : false;

              const fullVideoUrl = videoFileUrl
                ? getStrapiMediaUrl(videoFileUrl) || videoFileUrl
                : isExternalVideo
                ? videoLinkUrl
                : videoLinkUrl
                ? getStrapiMediaUrl(videoLinkUrl) || videoLinkUrl
                : "";

              const relativeDate = news.basic_info?.published_at_date
                ? getRelativeTime(news.basic_info.published_at_date)
                : undefined;

              // Получаем имя файла видео (только для локальных файлов)
              const videoFileName = video.video_file?.name;

              // Определяем, является ли видео VK видео (только для ссылок)
              const isVKVideo = videoFileUrl
                ? false
                : videoLinkUrl
                ? (video.open_in_vk ||
                    videoLinkUrl.includes("vk.com") ||
                    /video(-?\d+)_(\d+)/.test(videoLinkUrl))
                : false;

              return (
                <div
                  key={news.id}
                  onClick={() => {
                    if (!isModalOpen) {
                      handleVideoClick(
                        fullVideoUrl,
                        news.title,
                        relativeDate,
                        isVKVideo,
                        videoFileName
                      );
                    }
                  }}
                  className={`cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-150 ${
                    isModalOpen ? "pointer-events-none" : ""
                  }`}
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
            })}
          </div>
        )}

        {/* Пагинация */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="px-[29px] md:px-[90px]"
        />
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

export default withSearchParams(VideosPage);
