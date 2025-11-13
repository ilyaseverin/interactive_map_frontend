"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface GalleryImage {
  url: string;
  alt: string;
}

interface MediaGalleryProps {
  images: GalleryImage[];
  hasPhotoAlbum: boolean;
  videoUrl?: string;
  videoFileUrl?: string;
  slug?: string;
}

// Swiper Configuration - скопировано из HeroSlider
const swiperConfig = {
  modules: [Pagination, Autoplay, EffectFade],
  effect: "fade" as const,
  fadeEffect: { crossFade: true },
  pagination: {
    clickable: true,
    el: ".media-detail-pagination",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  loop: true,
};

export default function MediaGallery({
  images,
  hasPhotoAlbum,
  videoUrl,
  videoFileUrl,
  slug,
}: MediaGalleryProps) {
  // Если нет ни изображений, ни видео файла - не показываем компонент
  if (images.length === 0 && !videoFileUrl) return null;

  return (
    <div className="mb-[25px] lg:mb-[50px]">
      {/* Галерея изображений (слайдер) */}
      {images.length > 0 && (
        <div className="relative w-full mb-[15px] md:mb-[25px] lg:mb-[30px]">
          <Swiper
            {...swiperConfig}
            className="media-detail-swiper w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] rounded-[15px] shadow-[0px_5px_12px_0px_rgba(0,0,0,0.25)]"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full rounded-[15px] overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Dots - внутри relative контейнера для absolute позиционирования на mobile/tablet */}
          <div className="media-detail-pagination"></div>
        </div>
      )}

      {/* Кнопки для фотоальбома и видео ссылки */}
      {(hasPhotoAlbum || videoUrl || videoFileUrl) && (
        <div className="flex flex-col sm:flex-row gap-[10px] md:gap-[15px] mt-0 md:mt-[32px] justify-end">
          {hasPhotoAlbum && slug && (
            <Link
              href={`/photo-albums/${slug}`}
              className="inline-flex items-center justify-center h-[40px] md:h-[48px] lg:h-[56px] px-[24px] md:px-[20px] lg:px-[24px] py-0 md:py-0 lg:py-0 border border-[#C62828] text-[#C62828] text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat rounded-[12px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219]"
            >
              К фотоальбому
            </Link>
          )}
          {(videoUrl || videoFileUrl) && (
            <Link
              href={videoUrl || videoFileUrl || "#"}
              target={videoUrl ? "_blank" : undefined}
              rel={videoUrl ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center h-[40px] md:h-[48px] lg:h-[56px] px-[24px] md:px-[20px] lg:px-[24px] py-0 md:py-0 lg:py-0 border border-[#C62828] text-[#C62828] text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat rounded-[12px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219]"
            >
              Смотреть видео
            </Link>
          )}
        </div>
      )}

      {/* Custom Pagination Styles - скопировано из HeroSlider */}
      <style jsx global>{`
        /* Mobile pagination - centered inside slider */
        .media-detail-pagination {
          position: absolute !important;
          left: 50% !important;
          bottom: 28px !important;
          transform: translateX(-50%) !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center;
          gap: 5px;
          z-index: 10;
        }

        /* Pagination bullet styles */
        .media-detail-pagination .swiper-pagination-bullet {
          width: 10px !important;
          height: 10.66px !important;
          border-radius: 50%;
          background: #d9d9d9;
          opacity: 1;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 0 !important;
          flex-shrink: 0;
        }

        .media-detail-pagination .swiper-pagination-bullet:hover {
          background: #b0b0b0;
        }

        .media-detail-pagination .swiper-pagination-bullet-active {
          background: #3b76aa;
        }

        .media-detail-pagination .swiper-pagination-bullet-active:hover {
          background: #2c5f8a;
        }

        /* Tablet pagination - centered inside slider */
        @media (min-width: 768px) and (max-width: 1023px) {
          .media-detail-pagination {
            position: absolute !important;
            left: 50% !important;
            bottom: 40px !important;
            transform: translateX(-50%) !important;
            gap: 15px;
            justify-content: center !important;
          }

          .media-detail-pagination .swiper-pagination-bullet {
            width: 20px !important;
            height: 20px !important;
          }
        }

        /* Desktop pagination - below slider */
        @media (min-width: 1024px) {
          .media-detail-pagination {
            position: static !important;
            left: auto !important;
            bottom: auto !important;
            transform: none !important;
            margin: 30px auto 0 auto !important;
            gap: 15px;
            justify-content: center !important;
          }

          .media-detail-pagination .swiper-pagination-bullet {
            width: 20px !important;
            height: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
