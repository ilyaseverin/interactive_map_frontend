"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { BattleGloryPoint } from "@/types/strapi";
import { getStrapiUrl } from "@/utils/strapiUrl";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface MapPointModalProps {
  point: BattleGloryPoint | null;
  onClose: () => void;
}

// Цвета для разных типов объектов
const TYPE_COLORS = {
  "памятник/мемориал": "#C62828", // красный
  "мемориальная доска": "#2563eb", // синий
  "воинское захоронение": "#059669", // зеленый
} as const;

// Иконки для типов объектов
const TYPE_ICONS = {
  "памятник/мемориал": "/images/monument-icon.svg",
  "мемориальная доска": "/images/memorial-board-icon.svg",
  "воинское захоронение": "/images/burial-icon.svg",
} as const;

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

const MapPointModal: React.FC<MapPointModalProps> = ({ point, onClose }) => {
  const STRAPI_URL = getStrapiUrl();

  if (!point) return null;

  const color = TYPE_COLORS[point.point_type] || "#C62828";
  const iconPath =
    TYPE_ICONS[point.point_type] || TYPE_ICONS["памятник/мемориал"];

  // Получаем все изображения из галереи
  const images = point.images || [];

  // Если нет изображений, не показываем слайдер
  const hasImages = images.length > 0;

  // Функция для построения маршрута
  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const { lat, lng } = point.coordinates;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Получаем текущее местоположение пользователя
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          if (isMobile) {
            // Yandex Maps - маршрут от текущего местоположения до точки назначения
            // rtext - координаты: откуда~куда, rtt=auto - автоматический тип маршрута
            const yandexMapsUrl = `https://yandex.ru/maps/?rtext=${userLat},${userLng}~${lat},${lng}&rtt=auto`;
            window.open(yandexMapsUrl, "_blank");
          } else {
            // На десктопе используем Google Maps
            const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${lat},${lng}`;
            window.open(googleMapsUrl, "_blank");
          }
        },
        (error) => {
          // Если не удалось получить местоположение, строим маршрут без точки отправления
          console.warn("Не удалось получить текущее местоположение:", error);
          if (isMobile) {
            const yandexMapsUrl = `https://yandex.ru/maps/?rtext=~${lat},${lng}&rtt=auto`;
            window.open(yandexMapsUrl, "_blank");
          } else {
            const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
            window.open(googleMapsUrl, "_blank");
          }
        }
      );
    } else {
      // Если геолокация не поддерживается, строим маршрут без точки отправления
      if (isMobile) {
        const yandexMapsUrl = `https://yandex.ru/maps/?rtext=~${lat},${lng}&rtt=auto`;
        window.open(yandexMapsUrl, "_blank");
      } else {
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(googleMapsUrl, "_blank");
      }
    }
  };

  return (
    <>
      {/* Затемнение фона на мобильных */}
      <div
        className="fixed inset-0 bg-[rgba(98,98,98,0.5)] z-40 md:hidden"
        onClick={onClose}
      />

      {/* Контейнер для модалки и крестика */}
      <div className="fixed md:absolute left-1/2 md:left-[14px] lg:left-auto lg:right-[30px] top-1/2 md:top-[26px] -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0 w-[calc(100%-38px)] max-w-[400px] md:w-[460px] md:max-w-none lg:w-[432px] h-[90vh] md:h-[654px] lg:h-[774px] z-50">
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
        <div className="w-full h-full bg-white rounded-[10px] shadow-xl overflow-y-scroll scrollbar-visible relative">
          <div className="px-[19px] md:px-[30px] pt-[19px] md:pt-[32px] pb-[24px] md:pb-[32px] flex flex-col gap-[15px]">
            {/* Слайдер изображений */}
            {hasImages && (
              <div className="relative w-full h-[131px] md:h-[179px] rounded-[10px] overflow-hidden">
                <Swiper
                  {...swiperConfig}
                  className="map-point-modal-swiper w-full h-full rounded-[10px]"
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-full rounded-[10px] overflow-hidden">
                        <Image
                          src={`${STRAPI_URL}${image.url}`}
                          alt={point.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) calc(100vw - 38px), 460px"
                          priority={index === 0}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
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
                style={{ borderColor: color }}
              >
                {iconPath && (
                  <div className="relative w-[10px] h-[17px] shrink-0">
                    <Image
                      src={iconPath}
                      alt={point.point_type}
                      width={10}
                      height={17}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <p className="font-montserrat font-bold leading-normal text-[12px] text-black whitespace-nowrap">
                  {point.point_type === "памятник/мемориал"
                    ? "Памятник / Мемориал"
                    : point.point_type === "мемориальная доска"
                    ? "Мемориальная доска"
                    : "Воинское захоронение"}
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
          </div>
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
    </>
  );
};

export default MapPointModal;
