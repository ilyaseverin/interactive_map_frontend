"use client";
import Link from "next/link";
import PhotoCard from "@/components/cards/PhotoCard";
import PhotoModal from "@/components/modals/PhotoModal";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useGetPhotoAlbumBySlugQuery } from "@/services/strapiApi";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function PhotoAlbumDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [selectedPhoto, setSelectedPhoto] = useState<{
    url: string;
    alt: string;
    title: string;
    date?: string;
    imageName?: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: album,
    isFetching,
    isError,
  } = useGetPhotoAlbumBySlugQuery(slug, {
    skip: !slug,
  });

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
  const photos = album.media?.gallery || [];

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
      date: album.basic_info?.published_at_date
        ? new Date(album.basic_info.published_at_date).toLocaleDateString(
            "ru-RU"
          )
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

  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      {/* Основной контент */}
      <main className="w-full max-w-[1920px] mx-auto pt-[37px] lg:pt-[39px]">
        {/* Хлебные крошки */}
        <div className="px-4 sm:px-6 lg:px-[76px]">
          <Breadcrumbs
            className="mb-[37px] lg:mb-[37px]"
            items={[
              { label: "Главная", href: "/home" },
              { label: "Новости", href: "/news" },
              { label: "Фотоальбомы", href: "/photo-albums" },
              { label: album.title },
            ]}
          />
        </div>

        {/* Заголовок и Кнопка Назад */}
        <div className="px-4 sm:px-6 lg:px-[80px] flex flex-col lg:flex-row lg:items-start lg:justify-between mb-[68px] lg:mb-[68px]">
          {/* Заголовок */}
          <h1 className="text-[40px] font-bold font-montserrat text-black leading-[1.219] mb-4 lg:mb-0 max-w-[1103px]">
            {album.title}
          </h1>

          {/* Кнопка Назад */}
          <Link
            href="/photo-albums"
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

        {/* Блок фотографий */}
        {photos.length === 0 ? (
          <div className="px-4 sm:px-6 lg:px-[102px] flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">
              В этом альбоме пока нет фотографий
            </div>
          </div>
        ) : (
          <div className="px-4 sm:px-6 lg:px-[102px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-[39px] mb-[150px] lg:mb-[150px]">
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
                  key={`${photo.id}-${i}`}
                  onClick={() => handlePhotoClick(photo, i)}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
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
        <PhotoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          imageUrl={selectedPhoto.url}
          title={selectedPhoto.title}
          date={selectedPhoto.date}
          alt={selectedPhoto.alt}
          imageName={selectedPhoto.imageName}
        />
      )}
    </div>
  );
}
