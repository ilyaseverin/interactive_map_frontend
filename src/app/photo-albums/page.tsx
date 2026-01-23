"use client";

import type {
  NewsItem,
  NewsListResponse,
  PressReleaseItem,
  PressReleaseListResponse,
  ProjectItem,
  ProjectListResponse,
} from "@/types/strapi";
import PhotoAlbumCard from "@/components/cards/PhotoAlbumCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import { BackButton } from "@/components/buttons";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  useGetPhotoAlbumsQuery,
  useGetPressReleasesQuery,
  useGetProjectsQuery,
} from "@/services/strapiApi";
import { getResponsiveImageUrl } from "@/utils/strapiUrl";
import { withSearchParams } from "@/utils/withSearchParams";

type SourceType = "news" | "projects" | "press";

type AlbumListItem = {
  id: number;
  slug: string;
  title: string;
  coverUrl: string;
};

function PhotoAlbumsPage() {
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

  const {
    data: pressData,
    isFetching: isPressFetching,
    isError: isPressError,
  } = useGetPressReleasesQuery(
    {
      page: currentPage,
      pageSize,
      minimal: true,
    },
    { skip: source !== "press" }
  );

  const isFetching = isNewsFetching || isProjectsFetching || isPressFetching;
  const isError = isNewsError || isProjectsError || isPressError;

  const {
    albumsList,
    totalPages,
  }: { albumsList: AlbumListItem[]; totalPages: number } = useMemo(() => {
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
            const cover = project.media?.cover || project.media?.gallery?.[0];

            const fullCoverUrl = getResponsiveImageUrl(cover, "medium");

            return {
              id: project.id,
              slug: project.slug,
              title: project.title,
              coverUrl: fullCoverUrl || "/images/news/news-1.png",
            };
          }) || [];

      const pages =
        merged.meta?.pagination?.pageCount &&
        merged.meta.pagination.pageCount > 0
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
            const cover = press.media?.cover || press.media?.gallery?.[0];

            const fullCoverUrl = getResponsiveImageUrl(cover, "medium");

            return {
              id: press.id,
              slug: press.slug,
              title: press.title,
              coverUrl: fullCoverUrl || "/images/news/news-1.png",
            };
          }) || [];

      const pages =
        merged.meta?.pagination?.pageCount &&
        merged.meta.pagination.pageCount > 0
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
          (news: NewsItem) =>
            news.media?.gallery && news.media.gallery.length > 0
        )
        .map((news: NewsItem) => {
          const cover = news.media?.cover || news.media?.gallery?.[0];

          const fullCoverUrl = getResponsiveImageUrl(cover, "medium");

          return {
            id: news.id,
            slug: news.slug,
            title: news.title,
            coverUrl: fullCoverUrl || "/images/news/news-1.png",
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

          {/* Кнопка Назад */}
          <BackButton href={backHref} variant="default" />
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

export default withSearchParams(PhotoAlbumsPage);
