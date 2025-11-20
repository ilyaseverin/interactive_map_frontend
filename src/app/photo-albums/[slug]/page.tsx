"use client";

import PhotoCard from "@/components/cards/PhotoCard";
import MediaModal from "@/components/modals/MediaModal";
import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { withSearchParams } from "@/utils/withSearchParams";
import {
  useGetPhotoAlbumBySlugQuery,
  useGetProjectBySlugQuery,
  useGetPressReleaseBySlugQuery,
  useGetEventBySlugQuery,
} from "@/services/strapiApi";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BackButton } from "@/components/buttons";
import type {
  NewsItem,
  PressReleaseItem,
  ProjectItem,
  EventItem,
} from "@/types/strapi";
import { getStrapiMediaUrl } from "@/utils/strapiUrl";

type SourceType = "news" | "projects" | "press" | "events";

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

function PhotoAlbumDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params?.slug as string;

  const sourceParam = (searchParams.get("source") || "news") as SourceType;
  const source: SourceType =
    sourceParam === "projects" ||
    sourceParam === "press" ||
    sourceParam === "events"
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

  const {
    data: eventAlbum,
    isFetching: isEventFetching,
    isError: isEventError,
  } = useGetEventBySlugQuery(slug, {
    skip: !slug || source !== "events",
  });

  const isFetching =
    isNewsFetching || isProjectFetching || isPressFetching || isEventFetching;
  const isError = isNewsError || isProjectError || isPressError || isEventError;

  const album: (AlbumEntity & { slug?: string }) | null = useMemo(() => {
    if (source === "projects" && projectAlbum) {
      const project = projectAlbum as ProjectItem;
      return {
        type: "projects",
        title: project.title,
        date: project.publishedAt,
        photos: project.media?.gallery || [],
        slug: project.slug,
      };
    }

    if (source === "press" && pressAlbum) {
      const press = pressAlbum as PressReleaseItem;
      return {
        type: "press",
        title: press.title,
        date: press.basic_info?.published_at_date,
        photos: press.media?.gallery || [],
        slug: press.slug,
      };
    }

    if (source === "events" && eventAlbum) {
      const event = eventAlbum as EventItem;
      return {
        type: "events",
        title: event.title,
        date: event.basic_info?.datetime_start,
        photos: event.content_info?.gallery || [],
        slug: event.slug,
      };
    }

    if (newsAlbum) {
      const news = newsAlbum as NewsItem;
      return {
        type: "news",
        title: news.title,
        date: news.basic_info?.published_at_date,
        photos: news.media?.gallery || [],
        slug: news.slug,
      };
    }

    return null;
  }, [newsAlbum, pressAlbum, projectAlbum, eventAlbum, source]);

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
    const photoUrl = getStrapiMediaUrl(photo.url) || photo.url;

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
      : album.type === "events"
      ? [
          { label: "Главная", href: "/home" },
          { label: "Календарь", href: "/home#calendar" },
          { label: album.title, href: `/events/${album.slug}` },
          { label: "Фотоальбом" },
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
    album.type === "events" && album.slug
      ? `/events/${album.slug}`
      : album.type === "projects"
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
          <div className="md:hidden shrink-0">
            <BackButton href={backHref} variant="icon" ariaLabel="Назад" />
          </div>

          {/* Кнопка Назад - планшет и десктоп */}
          <div className="hidden md:block shrink-0">
            <BackButton href={backHref} />
          </div>
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
            {photos.map((photo, i) => {
              const photoUrl = getStrapiMediaUrl(photo.url) || photo.url;

              return (
                <div
                  key={photo.id ?? i}
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

export default withSearchParams(PhotoAlbumDetailPage);
