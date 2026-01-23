"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { BattleGloryPoint, StrapiImage } from "@/types/strapi";
import {
  getStrapiUrl,
  getResponsiveImageUrl,
  getStrapiMediaUrl,
} from "@/utils/strapiUrl";
import { sanitizeHref } from "@/utils/safeUrl";
import { BATTLE_GLORY_TYPE_ICONS } from "./constants/battleGlory";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface MapPointModalProps {
  point: BattleGloryPoint | null;
  onClose: () => void;
}

interface GalleryGridProps {
  images: StrapiImage[];
  videos: StrapiImage[];
  strapiUrl: string;
  title: string;
  onImageClick: (index: number) => void;
  onClose: () => void;
}

// Компонент галереи с grid-раскладкой
const GalleryGrid: React.FC<GalleryGridProps> = ({
  images,
  videos,
  strapiUrl,
  title,
  onImageClick,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-[100] overflow-y-auto"
      onClick={onClose}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Закрыть"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Grid с фотографиями и видео */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((image, index) => {
            const imageUrl =
              getResponsiveImageUrl(image, "medium") ||
              `${strapiUrl}${image.url}`;
            return (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-150"
                onClick={() => onImageClick(index)}
              >
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) calc(50vw - 24px), (max-width: 1024px) calc(33.33vw - 24px), calc(25vw - 24px)"
                />
              </div>
            );
          })}

          {/* Видео */}
          {videos.map((video, videoIndex) => {
            const globalIndex = images.length + videoIndex;
            return (
              <div
                key={videoIndex}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-150"
                onClick={() => onImageClick(globalIndex)}
              >
                <video
                  src={
                    getStrapiMediaUrl(video.url) || `${strapiUrl}${video.url}`
                  }
                  poster={
                    video.previewUrl
                      ? getStrapiMediaUrl(video.previewUrl) ||
                        `${strapiUrl}${video.previewUrl}`
                      : undefined
                  }
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover rounded-lg pointer-events-none"
                />
                {/* Иконка воспроизведения */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="bg-white/30 backdrop-blur-sm rounded-full p-3">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white drop-shadow-lg"
                    >
                      <path d="M8 5v14l11-7z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Swiper Configuration
const swiperConfig = {
  modules: [Pagination, Autoplay],
  pagination: {
    clickable: true,
    el: ".map-point-modal-pagination",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  loop: true,
};

// Утилиты
const buildRouteUrl = (
  lat: number,
  lng: number,
  userLat?: number,
  userLng?: number
): string => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    const origin = userLat && userLng ? `${userLat},${userLng}~` : "~";
    return `https://yandex.ru/maps/?rtext=${origin}${lat},${lng}&rtt=auto`;
  }

  if (userLat && userLng) {
    return `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${lat},${lng}`;
  }

  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
};

const getPointTypeLabel = (pointType: string): string => {
  const labels: Record<string, string> = {
    "памятник/мемориал": "Памятник / Мемориал",
    "мемориальная доска": "Мемориальная доска",
    "воинское захоронение": "Воинское захоронение",
  };
  return labels[pointType] || pointType;
};

// Хук для блокировки скролла
const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
};

const MapPointModal: React.FC<MapPointModalProps> = ({ point, onClose }) => {
  const STRAPI_URL = getStrapiUrl();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Блокировка скролла страницы при открытии grid-галереи или lightbox
  useScrollLock(galleryOpen || lightboxOpen);

  // Мемоизированные значения
  const iconPath = useMemo(
    () =>
      BATTLE_GLORY_TYPE_ICONS[
        point?.point_type as keyof typeof BATTLE_GLORY_TYPE_ICONS
      ] || BATTLE_GLORY_TYPE_ICONS["памятник/мемориал"],
    [point?.point_type]
  );

  const images = useMemo(() => point?.images || [], [point?.images]);
  const videos = useMemo(() => point?.videos || [], [point?.videos]);
  const hasImages = images.length > 0;
  const hasVideos = videos.length > 0;
  const hasMedia = hasImages || hasVideos;

  const lightboxSlides = useMemo(() => {
    const slides: Array<
      | { src: string; alt: string }
      | {
          type: "video";
          width: number;
          height: number;
          sources: Array<{ src: string; type: string }>;
          poster?: string;
        }
    > = [];

    // Добавляем изображения
    images.forEach((image) => {
      const imageUrl =
        getResponsiveImageUrl(image, "original") || `${STRAPI_URL}${image.url}`;
      slides.push({
        src: imageUrl,
        alt: point?.title || "",
      });
    });

    // Добавляем видео
    videos.forEach((video) => {
      const videoUrl =
        getStrapiMediaUrl(video.url) || `${STRAPI_URL}${video.url}`;
      const posterUrl = video.previewUrl
        ? getStrapiMediaUrl(video.previewUrl) ||
          `${STRAPI_URL}${video.previewUrl}`
        : undefined;

      slides.push({
        type: "video",
        width: video.width || 1280,
        height: video.height || 720,
        poster: posterUrl,
        sources: [
          {
            src: videoUrl,
            type: video.mime || "video/mp4",
          },
        ],
      });
    });

    return slides;
  }, [images, videos, STRAPI_URL, point?.title]);

  // Обработчики событий
  const handleSliderClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.closest(".map-point-modal-pagination")) return;
      if (hasMedia) setGalleryOpen(true);
    },
    [hasMedia]
  );

  const handleImageClick = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleNavigate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (!point?.coordinates) return;

      const { lat, lng } = point.coordinates;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const url = buildRouteUrl(
              lat,
              lng,
              position.coords.latitude,
              position.coords.longitude
            );
            const safeUrl = sanitizeHref(url, { allowRelative: false });
            if (safeUrl) window.open(safeUrl, "_blank", "noopener,noreferrer");
          },
          (error) => {
            console.warn("Не удалось получить текущее местоположение:", error);
            const url = buildRouteUrl(lat, lng);
            const safeUrl = sanitizeHref(url, { allowRelative: false });
            if (safeUrl) window.open(safeUrl, "_blank", "noopener,noreferrer");
          }
        );
      } else {
        const url = buildRouteUrl(lat, lng);
        const safeUrl = sanitizeHref(url, { allowRelative: false });
        if (safeUrl) window.open(safeUrl, "_blank", "noopener,noreferrer");
      }
    },
    [point?.coordinates]
  );

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
    setLightboxIndex(0);
    setGalleryOpen(true);
  }, []);

  const handleGalleryClose = useCallback(() => {
    setGalleryOpen(false);
  }, []);

  if (!point) return null;

  return (
    <>
      {/* Затемнение фона на мобильных */}
      <div
        className="fixed inset-0 bg-[rgba(98,98,98,0.5)] z-40 md:hidden"
        onClick={onClose}
      />

      {/* Контейнер для модалки и крестика */}
      <div className="fixed md:absolute left-1/2 md:left-[14px] lg:left-auto lg:right-[30px] top-1/2 md:top-[76px] lg:top-[26px] -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0 lg:translate-y-0 w-[calc(100%-38px)] max-w-[400px] md:w-[460px] md:max-w-none lg:w-[432px] h-auto max-h-[90vh] md:h-auto md:max-h-[calc(100%-76px-12px)] lg:h-auto lg:max-h-[calc(100%-26px-30px)] z-50 flex flex-col">
        {/* Крестик закрытия - зафиксирован на правом верхнем углу попапа, вне контейнера с overflow */}
        <button
          onClick={onClose}
          className="absolute right-0 translate-x-[calc(50%-3px)] md:translate-x-[calc(50%-5px)] lg:translate-x-[calc(50%-8px)] top-0 -translate-y-[calc(50%-3px)] md:-translate-y-[calc(50%-5px)] lg:-translate-y-[calc(50%-8px)] z-10 w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[60px] lg:h-[60px] rounded-full hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center group cursor-pointer bg-[rgba(98,98,98,0.5)]"
          aria-label="Закрыть"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white group-hover:rotate-90 transition-all duration-200 w-[10px] h-[10px] md:w-[16px] md:h-[16px] lg:w-[20px] lg:h-[20px]"
          >
            <path
              d="M1 1L19 19M19 1L1 19"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Модалка */}
        <div className="w-full flex-1 min-h-0 bg-white rounded-[10px] shadow-xl overflow-hidden relative flex flex-col">
          <div className="h-[19px] md:h-[32px] shrink-0"></div>
          <div className="px-[19px] md:px-[30px] flex flex-col gap-[15px] overflow-y-auto scrollbar-visible h-full min-h-0">
            {/* Пустой контейнер сверху для компенсации отступа при скролле */}

            {/* Слайдер изображений */}
            {hasImages && (
              <div
                className="relative w-full h-[131px] md:h-[179px] rounded-[10px] overflow-hidden shrink-0 cursor-pointer"
                onClick={handleSliderClick}
              >
                <Swiper
                  {...swiperConfig}
                  className="map-point-modal-swiper w-full h-full rounded-[10px]"
                >
                  {images.map((image, index) => {
                    const imageUrl =
                      getResponsiveImageUrl(image, "medium") ||
                      `${STRAPI_URL}${image.url}`;
                    return (
                      <SwiperSlide key={index}>
                        <div className="relative w-full h-full rounded-[10px] overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={point.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) calc(100vw - 38px), 460px"
                            priority={index === 0}
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>

                {/* Pagination Dots */}
                {images.length > 1 && (
                  <div className="map-point-modal-pagination"></div>
                )}
              </div>
            )}

            {/* Кнопки - вертикально на мобилке, горизонтально на десктопе */}
            <div className="flex flex-col md:flex-row items-stretch md:items-start justify-between gap-[10px] w-full">
              {/* Кнопка типа объекта */}
              <div
                className="border border-solid box-border flex gap-[5px] h-[41px] items-center justify-center px-[10px] md:px-[10px] py-[10px] rounded-[10px] shrink w-full md:flex-1 md:min-w-0"
                style={{
                  borderColor:
                    point?.point_type === "памятник/мемориал"
                      ? "#C62828"
                      : point?.point_type === "мемориальная доска"
                      ? "#2563eb"
                      : point?.point_type === "воинское захоронение"
                      ? "#059669"
                      : "#C62828",
                }}
              >
                {iconPath && (
                  <div className="relative w-auto h-[17px] shrink-0">
                    <Image
                      src={iconPath}
                      alt={point.point_type}
                      width={10}
                      height={17}
                      className="h-[17px] w-auto object-contain"
                    />
                  </div>
                )}
                <p className="font-montserrat font-bold leading-normal text-[12px] text-black whitespace-nowrap">
                  {getPointTypeLabel(point.point_type)}
                </p>
              </div>

              {/* Кнопка построить маршрут */}
              <button
                onClick={handleNavigate}
                className="bg-[#1d4e89] box-border flex gap-[5px] h-[41px] items-center justify-center px-[10px] md:px-[10px] py-[10px] rounded-[10px] shrink w-full md:flex-1 md:min-w-0 hover:bg-[#1a4370] active:scale-95 transition-all duration-150"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[21px] h-[21px] shrink-0"
                >
                  <path
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="font-montserrat font-bold leading-normal text-[12px] text-white whitespace-nowrap">
                  Построить маршрут
                </p>
              </button>
            </div>

            {/* Заголовок */}
            <p className="font-montserrat font-bold leading-normal text-[12px] md:text-[16px] text-black">
              {point.title}
            </p>

            {/* Адрес */}
            <div className="flex flex-col gap-[10px]">
              <div className="flex gap-[10px] items-start">
                <div className="relative w-[21px] h-[21px] shrink-0 mt-[2px]">
                  <Image
                    src="/images/location-icon-map.png"
                    alt="Location"
                    width={21}
                    height={21}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col gap-[10px] flex-1 min-w-0">
                  <p className="font-montserrat font-normal leading-normal text-[12px] md:text-[16px] text-black">
                    {point.formatted_address || point.address}
                  </p>
                  <p className="font-montserrat font-normal leading-normal text-[12px] md:text-[16px] text-[#1d4e89]">
                    {point.coordinates.lat.toFixed(6)},{" "}
                    {point.coordinates.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>

            {/* Описание */}
            {point.description && (
              <p className="font-montserrat font-normal leading-normal text-[12px] md:text-[16px] text-black">
                {point.description}
              </p>
            )}

            {/* Пустой контейнер снизу для компенсации отступа при скролле */}
          </div>
          <div className="h-[24px] md:h-[32px] shrink-0"></div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        /* Scrollbar Styles - всегда видимый */
        .scrollbar-visible {
          scrollbar-width: thin;
          scrollbar-color: #999999 #ffffff;
        }

        .scrollbar-visible::-webkit-scrollbar {
          width: 8px;
        }

        .scrollbar-visible::-webkit-scrollbar-track {
          background: #ffffff;
        }

        .scrollbar-visible::-webkit-scrollbar-thumb {
          background-color: #999999;
          border-radius: 4px;
        }

        .scrollbar-visible::-webkit-scrollbar-thumb:hover {
          background-color: #808080;
        }

        /* Pagination Styles */
        ${hasImages && images.length > 1
          ? `
          .map-point-modal-pagination {
            position: absolute !important;
            left: 50% !important;
            bottom: 12px !important;
            transform: translateX(-50%) !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center;
            gap: 8px;
            z-index: 10;
          }

          .map-point-modal-pagination .swiper-pagination-bullet {
            width: 12px !important;
            height: 12px !important;
            border-radius: 50%;
            background: #d9d9d9;
            opacity: 1;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 0 !important;
            flex-shrink: 0;
          }

          .map-point-modal-pagination .swiper-pagination-bullet:hover {
            background: #b0b0b0;
          }

          .map-point-modal-pagination .swiper-pagination-bullet-active {
            background: #3b76aa;
          }

          .map-point-modal-pagination .swiper-pagination-bullet-active:hover {
            background: #2c5f8a;
          }
        `
          : ""}
      `}</style>

      {/* Модалка с галереей плитками */}
      {hasMedia && galleryOpen && (
        <GalleryGrid
          images={images}
          videos={videos}
          strapiUrl={STRAPI_URL}
          title={point.title}
          onImageClick={handleImageClick}
          onClose={handleGalleryClose}
        />
      )}

      {/* Lightbox для просмотра изображений и видео */}
      {hasMedia && (
        <Lightbox
          open={lightboxOpen && lightboxIndex >= 0}
          close={handleLightboxClose}
          index={lightboxIndex}
          slides={lightboxSlides}
          plugins={[Thumbnails, Video]}
          thumbnails={{
            position: "bottom",
            width: 120,
            height: 80,
            gap: 10,
            showToggle: false,
            border: 2,
            borderRadius: 4,
          }}
          video={{
            autoPlay: true,
            controls: true,
            playsInline: true,
          }}
          animation={{ fade: 250, swipe: 300 }}
          on={{
            entered: () => setGalleryOpen(false),
            exiting: () => setGalleryOpen(true),
          }}
        />
      )}
    </>
  );
};

export default MapPointModal;
