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

interface NewsDetailGalleryProps {
  images: GalleryImage[];
  hasPhotoAlbum: boolean;
  videoUrl?: string;
}

// Swiper Configuration - скопировано из HeroSlider
const swiperConfig = {
  modules: [Pagination, Autoplay, EffectFade],
  effect: "fade" as const,
  fadeEffect: { crossFade: true },
  pagination: {
    clickable: true,
    el: ".news-detail-pagination",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  loop: true,
};

export default function NewsDetailGallery({
  images,
  hasPhotoAlbum,
  videoUrl,
}: NewsDetailGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="mb-[50px] lg:px-[20px] xl:px-[40px] 2xl:px-[96px]">
      {/* Контейнер для слайдера и pagination */}
      <div className="relative w-full">
        <Swiper
          {...swiperConfig}
          className="news-detail-swiper w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] rounded-[15px] shadow-[0px_5px_12px_0px_rgba(0,0,0,0.25)]"
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
        <div className="news-detail-pagination"></div>
      </div>

      {/* Кнопки для фотоальбома и видео */}
      {(hasPhotoAlbum || videoUrl) && (
        <div className="flex flex-col sm:flex-row gap-[15px] mt-[32px] justify-end">
          {hasPhotoAlbum && (
            <Link
              href="#gallery"
              className="inline-flex items-center justify-center px-[24px] py-[16px] border border-[#C62828] text-[#C62828] text-[20px] font-normal font-montserrat rounded-[12px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219]"
            >
              К фотоальбому
            </Link>
          )}
          {videoUrl && (
            <Link
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-[24px] py-[16px] border border-[#C62828] text-[#C62828] text-[20px] font-normal font-montserrat rounded-[12px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219]"
            >
              Смотреть видео
            </Link>
          )}
        </div>
      )}

      {/* Custom Pagination Styles - скопировано из HeroSlider */}
      <style jsx global>{`
        /* Mobile pagination - centered inside slider */
        .news-detail-pagination {
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
        .news-detail-pagination .swiper-pagination-bullet {
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

        .news-detail-pagination .swiper-pagination-bullet:hover {
          background: #b0b0b0;
        }

        .news-detail-pagination .swiper-pagination-bullet-active {
          background: #3b76aa;
        }

        .news-detail-pagination .swiper-pagination-bullet-active:hover {
          background: #2c5f8a;
        }

        /* Tablet pagination - centered inside slider */
        @media (min-width: 768px) and (max-width: 1023px) {
          .news-detail-pagination {
            position: absolute !important;
            left: 50% !important;
            bottom: 40px !important;
            transform: translateX(-50%) !important;
            gap: 15px;
            justify-content: center !important;
          }

          .news-detail-pagination .swiper-pagination-bullet {
            width: 20px !important;
            height: 20px !important;
          }
        }

        /* Desktop pagination - below slider */
        @media (min-width: 1024px) {
          .news-detail-pagination {
            position: static !important;
            left: auto !important;
            bottom: auto !important;
            transform: none !important;
            margin: 30px auto 0 auto !important;
            gap: 15px;
            justify-content: center !important;
          }

          .news-detail-pagination .swiper-pagination-bullet {
            width: 20px !important;
            height: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
