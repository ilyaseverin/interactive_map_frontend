"use client";

import Link from "next/link";
import PhotoCard from "@/components/cards/PhotoCard";
import MediaModal from "@/components/modals/MediaModal";
import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  useGetPhotoAlbumBySlugQuery,
  useGetProjectBySlugQuery,
  useGetPressReleaseBySlugQuery,
} from "@/services/strapiApi";
import Breadcrumbs from "@/components/Breadcrumbs";
import type {
  NewsItem,
  PressReleaseItem,
  ProjectItem,
} from "@/types/strapi";

type SourceType = "news" | "projects" | "press";

type AlbumEntity = {
  type: SourceType;
  title: string;
  date?: string;
  photos: {
    url: string;
    alternativeText?: string | null;
    name?: string;
    id?: number;
  }[];
};

export default function PhotoAlbumDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params?.slug as string;

  const sourceParam = (searchParams.get("source") || "news") as SourceType;
  const source: SourceType =
    sourceParam === "projects" || sourceParam === "press"
      ? sourceParam
      : "news";

  const [selectedPhoto, setSelectedPhoto] = useState<{
    url: string;
    alt: string;
    title: string;
    date?: string;
    imageName?: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Загружаем данные в зависимости от типа источника
  const {
    data: newsAlbum,
    isFetching: isNewsFetching,
    isError: isNewsError,
  } = useGetPhotoAlbumBySlugQuery(slug, {
    skip: !slug || source !== "news",
  });

  const {
    data: projectAlbum,
    isFetching: isProjectFetching,
    isError: isProjectError,
  } = useGetProjectBySlugQuery(slug, {
    skip: !slug || source !== "projects",
  });

  const {
    data: pressAlbum,
    isFetching: isPressFetching,
    isError: isPressError,
  } = useGetPressReleaseBySlugQuery(slug, {
    skip: !slug || source !== "press",
  });

  const isFetching = isNewsFetching || isProjectFetching || isPressFetching;
  const isError = isNewsError || isProjectError || isPressError;

  const album: AlbumEntity | null = useMemo(() => {
    if (source === "projects" && projectAlbum) {
      const project = projectAlbum as ProjectItem;
      return {
        type: "projects",
        title: project.title,
        date: project.publishedAt,
        photos: project.media?.gallery || [],
      };
    }

    if (source === "press" && pressAlbum) {
      const press = pressAlbum as PressReleaseItem;
      return {
        type: "press",
        title: press.title,
        date: press.basic_info?.published_at_date,
        photos: press.media?.gallery || [],
      };
    }

    if (newsAlbum) {
      const news = newsAlbum as NewsItem;
      return {
        type: "news",
        title: news.title,
        date: news.basic_info?.published_at_date,
        photos: news.media?.gallery || [],
      };
    }

    return null;
  }, [newsAlbum, pressAlbum, projectAlbum, source]);

  if (isFetching) {
    return (
      <div className="min-h-screen bg-[#F1F2F3] flex justify-center items-center">
        <div className="text-xl text-gray-600">Загрузка...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#F1F2F3] flex justify-center items-center">
        <div className="text-xl text-gray-600">
          Не удалось загрузить фотоальбом. Попробуйте обновить страницу.
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen bg-[#F1F2F3] flex justify-center items-center">
        <div className="text-xl text-gray-600">Фотоальбом не найден</div>
      </div>
    );
  }

  // Получаем все фотографии из галереи
  const photos = album.photos || [];

  // Функция для открытия попапа с фото
  const handlePhotoClick = (
    photo: { url: string; alternativeText?: string | null; name?: string },
    index: number
  ) => {
    const photoUrl = photo.url.startsWith("http")
      ? photo.url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${
          photo.url
        }`;

    setSelectedPhoto({
      url: photoUrl,
      alt: photo.alternativeText || `Фото ${index + 1}`,
      title: album.title,
      date: album.date
        ? new Date(album.date).toLocaleDateString("ru-RU")
        : undefined,
      imageName: photo.name || `${album.title}_${index + 1}.jpg`,
    });
    setIsModalOpen(true);
  };

  // Функция для закрытия попапа
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const breadcrumbsItems =
    album.type === "projects"
      ? [
          { label: "Главная", href: "/home" },
          { label: "Наши проекты", href: "/projects" },
          {
            label: "Фотоальбомы",
            href: "/photo-albums?source=projects",
          },
          { label: album.title },
        ]
      : album.type === "press"
      ? [
          { label: "Главная", href: "/home" },
          { label: "Для СМИ", href: "/media" },
          { label: "Пресс-релизы", href: "/press-releases" },
          {
            label: "Фотоальбомы",
            href: "/photo-albums?source=press",
          },
          { label: album.title },
        ]
      : [
          { label: "Главная", href: "/home" },
          { label: "Новости", href: "/news" },
          {
            label: "Фотоальбомы",
            href: "/photo-albums?source=news",
          },
          { label: album.title },
        ];

  const backHref =
    album.type === "projects"
      ? "/photo-albums?source=projects"
      : album.type === "press"
      ? "/photo-albums?source=press"
      : "/photo-albums?source=news";

  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      {/* Основной контент */}
      <main className="w-full max-w-[1920px] mx-auto pt-[15px] md:pt-[20px] lg:pt-[40px]">
        {/* Хлебные крошки */}
        <Breadcrumbs
          className="px-[19px] md:px-[36px] lg:px-[80px] mb-[15px] md:mb-[20px] lg:mb-[30px]"
          items={breadcrumbsItems}
        />

        {/* Заголовок и Кнопка Назад */}
        <div className="px-[19px] md:px-[36px] lg:px-[80px] flex flex-row items-center justify-between mb-[25px] md:mb-[33px] lg:mb-[60px]">
          {/* Заголовок - мобильный */}
          <h1 className="md:hidden text-[20px] font-bold font-montserrat text-black leading-[1.219]">
            Фотографии
          </h1>

          {/* Заголовок - планшет и десктоп */}
          <h1 className="hidden md:block text-[30px] lg:text-[40px] font-bold font-montserrat text-black leading-[1.219] md:max-w-[468px] lg:max-w-[1103px]">
            {album.title}
          </h1>

          {/* Кнопка Назад - мобильная */}
          <Link
            href={backHref}
            className="md:hidden inline-flex items-center justify-center w-[34px] h-[34px] rounded-[7px] border border-[#C62828] hover:bg-[#C62828] active:bg-[#B71C1C] active:scale-95 transition-all duration-150 group shrink-0"
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

          {/* Кнопка Назад - планшет и десктоп */}
          <Link
            href={backHref}
            className="hidden md:inline-flex items-center justify-center gap-[10px] px-[24px] py-[11px] lg:py-[16px] border border-[#C62828] text-[#C62828] text-[16px] lg:text-[20px] font-normal font-montserrat rounded-[12px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219] shrink-0"
          >
            <svg
              width="33"
              height="25"
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

        {/* Блок фотографий */}
        {photos.length === 0 ? (
          <div className="px-[19px] md:px-[36px] lg:px-[80px] flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">
              В этом альбоме пока нет фотографий
            </div>
          </div>
        ) : (
          <div className="px-[19px] md:px-[36px] lg:px-[80px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[30px] md:gap-x-[18px] md:gap-y-[28px] lg:gap-x-[30px] lg:gap-y-[39px] mb-[60px] md:mb-[88px] lg:mb-[150px]">
            {Array.from({ length: Math.max(18, photos.length) }).map((_, i) => {
              const photo = photos[i % photos.length];
              const photoUrl = photo.url.startsWith("http")
                ? photo.url
                : `${
                    process.env.NEXT_PUBLIC_STRAPI_URL ||
                    "http://localhost:1337"
                  }${photo.url}`;

              return (
                <div
                  key={`${photo.id ?? i}-${i}`}
                  onClick={() => {
                    if (!isModalOpen) {
                      handlePhotoClick(photo, i);
                    }
                  }}
                  className={`cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-150 ${
                    isModalOpen ? "pointer-events-none" : ""
                  }`}
                >
                  <PhotoCard
                    image={photoUrl}
                    alt={photo.alternativeText || `Фото ${i + 1}`}
                  />
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Попап для просмотра фото */}
      {selectedPhoto && (
        <MediaModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          mediaUrl={selectedPhoto.url}
          title={selectedPhoto.title}
          date={selectedPhoto.date}
          alt={selectedPhoto.alt}
          mediaName={selectedPhoto.imageName}
          mediaType="image"
        />
      )}
    </div>
  );
}


