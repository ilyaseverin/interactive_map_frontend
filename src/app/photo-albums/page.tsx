"use client";

import type {
  NewsItem,
  NewsListResponse,
  PressReleaseItem,
  PressReleaseListResponse,
  ProjectItem,
  ProjectListResponse,
} from "@/types/strapi";
import Link from "next/link";
import PhotoAlbumCard from "@/components/cards/PhotoAlbumCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  useGetPhotoAlbumsQuery,
  useGetPressReleasesQuery,
  useGetProjectsQuery,
} from "@/services/strapiApi";
import { getStrapiMediaUrl } from "@/utils/strapiUrl";
} from "@/services/strapiApi";

type SourceType = "news" | "projects" | "press";

type AlbumListItem = {
  id: number;
  slug: string;
  title: string;
  coverUrl: string;
};

// Клиентский компонент
export default function PhotoAlbumsPage() {
  const searchParams = useSearchParams();
  const sourceParam = (searchParams.get("source") || "news") as SourceType;
  const source: SourceType =
    sourceParam === "projects" || sourceParam === "press"
      ? sourceParam
      : "news";

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 18;

  const {
    data: newsAlbums,
    isFetching: isNewsFetching,
    isError: isNewsError,
  } = useGetPhotoAlbumsQuery(
    {
      page: currentPage,
      pageSize,
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
    },
    { skip: source !== "projects" }
  );

  const {
    data: pressData,
    isFetching: isPressFetching,
    isError: isPressError,
  } = useGetPressReleasesQuery(
    {
      page: currentPage,
      pageSize,
    },
    { skip: source !== "press" }
  );

  const isFetching = isNewsFetching || isProjectsFetching || isPressFetching;
  const isError = isNewsError || isProjectsError || isPressError;

  const { albumsList, totalPages }: { albumsList: AlbumListItem[]; totalPages: number } =
    useMemo(() => {
      if (source === "projects") {
        const fallback: ProjectListResponse = { data: [], meta: {} };
        const merged = (projectsData ?? fallback) as ProjectListResponse;
        const items =
          merged.data
            ?.filter(
              (project: ProjectItem) =>
                project.media?.gallery && project.media.gallery.length > 0
            )
            .map((project: ProjectItem) => {
              const coverUrl =
                project.media?.cover?.url ||
                project.media?.gallery?.[0]?.url ||
                "/images/news/news-1.png";
              const fullCoverUrl = getStrapiMediaUrl(coverUrl) || coverUrl;

              return {
                id: project.id,
                slug: project.slug,
                title: project.title,
                coverUrl: fullCoverUrl,
              };
            }) || [];

        const pages =
          merged.meta?.pagination?.pageCount && merged.meta.pagination.pageCount > 0
            ? merged.meta.pagination.pageCount
            : 1;

        return { albumsList: items, totalPages: pages };
      }

      if (source === "press") {
        const fallback: PressReleaseListResponse = { data: [], meta: {} };
        const merged = (pressData ?? fallback) as PressReleaseListResponse;
        const items =
          merged.data
            ?.filter(
              (press: PressReleaseItem) =>
                press.media?.gallery && press.media.gallery.length > 0
            )
            .map((press: PressReleaseItem) => {
              const coverUrl =
                press.media?.cover?.url ||
                press.media?.gallery?.[0]?.url ||
                "/images/news/news-1.png";
              const fullCoverUrl = getStrapiMediaUrl(coverUrl) || coverUrl;

              return {
                id: press.id,
                slug: press.slug,
                title: press.title,
                coverUrl: fullCoverUrl,
              };
            }) || [];

        const pages =
          merged.meta?.pagination?.pageCount && merged.meta.pagination.pageCount > 0
            ? merged.meta.pagination.pageCount
            : 1;

        return { albumsList: items, totalPages: pages };
      }

      // news by default
      const fallback: NewsListResponse = { data: [], meta: {} };
      const merged = (newsAlbums ?? fallback) as NewsListResponse;

      const items =
        merged.data
          ?.filter(
            (news: NewsItem) => news.media?.gallery && news.media.gallery.length > 0
          )
          .map((news: NewsItem) => {
            const coverUrl =
              news.media?.cover?.url ||
              news.media?.gallery?.[0]?.url ||
              "/images/news/news-1.png";
            const fullCoverUrl = getStrapiMediaUrl(coverUrl) || coverUrl;

            return {
              id: news.id,
              slug: news.slug,
              title: news.title,
              coverUrl: fullCoverUrl,
            };
          }) || [];

      const pages =
        merged.meta?.pagination?.pageCount && merged.meta.pagination.pageCount > 0
          ? merged.meta.pagination.pageCount
          : 1;

      return { albumsList: items, totalPages: pages };
    }, [newsAlbums, pressData, projectsData, source]);


  const breadcrumbsItems =
    source === "projects"
      ? [
          { label: "Главная", href: "/home" },
          { label: "Наши проекты", href: "/projects" },
          { label: "Фотоальбомы" },
        ]
      : source === "press"
      ? [
          { label: "Главная", href: "/home" },
          { label: "Для СМИ", href: "/media" },
          { label: "Пресс-релизы", href: "/press-releases" },
          { label: "Фотоальбомы" },
        ]
      : [
          { label: "Главная", href: "/home" },
          { label: "Новости", href: "/news" },
          { label: "Фотоальбомы" },
        ];

  const backHref =
    source === "projects"
      ? "/projects"
      : source === "press"
      ? "/press-releases"
      : "/news";

  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      {/* Основной контент */}
      <main className="w-full max-w-[1920px] mx-auto pt-[15px] md:pt-[20px] lg:pt-[40px]">
        {/* Хлебные крошки */}
        <Breadcrumbs
          items={breadcrumbsItems}
          className="px-[19px] md:px-[36px] lg:px-[80px] mb-[15px] md:mb-[20px] lg:mb-[30px]"
        />

        {/* Заголовок и Кнопка Назад */}
        <div className="px-[19px] md:px-[36px] lg:px-[80px] flex flex-row items-center justify-between mb-[25px] md:mb-[40px] lg:mb-[60px]">
          {/* Заголовок */}
          <h1 className="text-[20px] md:text-[30px] lg:text-[40px] font-bold font-montserrat text-black leading-[1.219]">
            Фотоальбомы
          </h1>

          {/* Кнопка Назад - мобильная (только иконка) */}
          <Link
            href={backHref}
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
            href={backHref}
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
        ) : isFetching ? (
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
            {albumsList.map((album) => (
                  <PhotoAlbumCard
                key={album.id}
                    image={album.coverUrl}
                    title={album.title}
                    href={`/photo-albums/${album.slug}?source=${source}`}
                  />
            ))}
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
    </div>
  );
}
