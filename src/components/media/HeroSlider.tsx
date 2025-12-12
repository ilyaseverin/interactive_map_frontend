"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface HeroSlide {
  image: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

// Utility function to determine if title is long
const isLongTitle = (title: string): boolean => {
  return title.length > 25 || title.split(" ").length > 3;
};

// Constants for positioning
const POSITIONS = {
  MOBILE: {
    SHORT_TITLE: {
      title: "top-[210px]",
      description: "top-[252px]",
    },
    LONG_TITLE: {
      title: "top-[170px]",
      description: "top-[250px]",
    },
  },
} as const;

const slides: HeroSlide[] = [
  {
    image: "/images/hero-bg.png",
    title: "Патриот Центр 48",
    description:
      "Региональный центр подготовки граждан Российской Федерации к военной службе и военно-патриотического воспитания населения Липецкой области",
    ctaText: "Хочу пройти подготовку",
    ctaLink: "/training",
  },
  {
    image: "/images/hero-bg.png",
    title: "Военно-патриотическое воспитание",
    description:
      "Комплексная программа подготовки молодёжи к защите Отечества и формирования патриотических ценностей",
    ctaText: "Узнать подробнее",
    ctaLink: "/programs",
  },
  {
    image: "/images/hero-bg.png",
    title: "Современная база подготовки",
    description:
      "Оснащенные по последнему слову техники учебные классы, стрелковые тиры и полигоны для практических занятий",
    ctaText: "Наша инфраструктура",
    ctaLink: "/infrastructure",
  },
  {
    image: "/images/hero-bg.png",
    title: "Присоединяйся к нам",
    description:
      "Стань частью команды единомышленников, готовых служить Родине и развивать свои навыки в военно-прикладных дисциплинах",
    ctaText: "Записаться на курс",
    ctaLink: "/enrollment",
  },
];

// Mobile Content Component
const MobileContent = ({ slide }: { slide: HeroSlide }) => {
  const titlePosition = isLongTitle(slide.title)
    ? POSITIONS.MOBILE.LONG_TITLE.title
    : POSITIONS.MOBILE.SHORT_TITLE.title;

  const descriptionPosition = isLongTitle(slide.title)
    ? POSITIONS.MOBILE.LONG_TITLE.description
    : POSITIONS.MOBILE.SHORT_TITLE.description;

  return (
    <div className="md:hidden">
      {/* Title */}
      <h1
        className={`absolute left-5 right-5 max-w-[242px] text-[20px] font-bold font-montserrat text-white leading-[1.219] overflow-hidden ${titlePosition}`}
      >
        {slide.title}
      </h1>

      {/* Description */}
      <p
        className={`absolute left-5 right-5 max-w-[241px] text-[12px] font-medium font-montserrat text-white leading-[1.5] overflow-hidden line-clamp-4 ${descriptionPosition}`}
      >
        {slide.description}
      </p>

      {/* CTA Button */}
      <Link
        href={slide.ctaLink}
        className="absolute left-1/2 -translate-x-1/2 top-[370px] flex items-center justify-center w-[231px] max-w-[calc(100%-40px)] h-[40px] px-[25px] py-[10px] bg-[#C62828] hover:bg-[#B71C1C] text-white text-[12px] font-medium font-montserrat leading-[1.219] rounded-[8px] transition-colors"
      >
        {slide.ctaText}
      </Link>
    </div>
  );
};

// Tablet Content Component
const TabletContent = ({ slide }: { slide: HeroSlide }) => {
  return (
    <div className="hidden md:flex lg:hidden flex-col justify-end h-full px-[44px] pb-[124px]">
      {/* Title */}
      <h1 className="text-[40px] font-bold font-montserrat text-white leading-[1.219] mb-[24px] max-w-[395px]">
        {slide.title}
      </h1>

      {/* Description */}
      <p className="text-[20px] font-medium font-montserrat text-white leading-[1.3] mb-[23px] max-w-[467px] line-clamp-5">
        {slide.description}
      </p>

      {/* CTA Button */}
      <Link
        href={slide.ctaLink}
        className="inline-flex items-center justify-center h-[48px] px-5 py-3 bg-[#C62828] hover:bg-[#B71C1C] text-white text-[18px] font-medium font-montserrat leading-[1.219] rounded-[10px] transition-colors w-fit"
      >
        {slide.ctaText}
      </Link>
    </div>
  );
};

// Desktop Content Component
const DesktopContent = ({ slide }: { slide: HeroSlide }) => (
  <div className="hidden lg:flex flex-col justify-end h-full px-12 xl:px-[102px] pb-[124px] lg:pb-[81px]">
    {/* Title */}
    <h1 className="text-[64px] font-bold font-montserrat text-white leading-[1.22] mb-[19px]">
      {slide.title}
    </h1>

    {/* Description */}
    <p className="text-[32px] font-medium font-montserrat text-white leading-[1.5] max-w-[1005px] mb-[34px]">
      {slide.description}
    </p>

    {/* CTA Button */}
    <Link
      href={slide.ctaLink}
      className="inline-flex items-center justify-center gap-4 px-6 py-4 bg-[#C62828] hover:bg-[#B71C1C] text-white text-[20px] font-medium font-montserrat rounded-[12px] transition-colors shadow-lg hover:shadow-xl w-fit"
    >
      {slide.ctaText}
    </Link>
  </div>
);

// Swiper Configuration
const swiperConfig = {
  modules: [Pagination, Autoplay, EffectFade],
  effect: "fade" as const,
  fadeEffect: { crossFade: true },
  speed: 800,
  slidesPerView: 1,
  pagination: {
    clickable: true,
    el: ".hero-pagination",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  // Fade + loop иногда даёт двойное мерцание из-за работы дубликатов слайдов,
  // поэтому используем rewind для бесконечного цикла без создания клонов.
  loop: false,
  rewind: true,
};

export default function HeroSlider() {
  return (
    <div className="w-full mx-auto px-[19px] sm:px-[37px] lg:px-[60px] mt-4 sm:mt-7 mb-8 sm:mb-12 lg:mb-[61px]">
      <section className="w-full mx-auto">
        {/* Swiper Container с обёрткой */}
        <div className="relative w-full">
          <Swiper
            {...swiperConfig}
            className="hero-swiper w-full h-[471px] sm:h-[841px] lg:h-[685px] rounded-[10px] sm:rounded-[20px] lg:rounded-[26px] shadow-[0px_5px_12px_0px_rgba(0,0,0,0.25)]"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                {/* Hero Image Container */}
                <div className="relative w-full h-full rounded-[10px] sm:rounded-[20px] lg:rounded-[26px] overflow-hidden">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    {/* Gradient Overlay - согласно Figma */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 96%)",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full">
                    <MobileContent slide={slide} />
                    <TabletContent slide={slide} />
                    <DesktopContent slide={slide} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Dots - внутри для мобильной, снаружи для desktop */}
          <div className="hero-pagination"></div>
        </div>

        {/* Custom Pagination Styles */}
        <style jsx global>{`
          /* Mobile pagination - centered inside slider */
          .hero-pagination {
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
          .hero-pagination .swiper-pagination-bullet {
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

          .hero-pagination .swiper-pagination-bullet:hover {
            background: #b0b0b0;
          }

          .hero-pagination .swiper-pagination-bullet-active {
            background: #3b76aa;
          }

          .hero-pagination .swiper-pagination-bullet-active:hover {
            background: #2c5f8a;
          }

          /* Tablet pagination - centered inside slider */
          @media (min-width: 768px) and (max-width: 1023px) {
            .hero-pagination {
              position: absolute !important;
              left: 50% !important;
              bottom: 40px !important;
              transform: translateX(-50%) !important;
              gap: 15px;
              justify-content: center !important;
            }

            .hero-pagination .swiper-pagination-bullet {
              width: 20px !important;
              height: 20px !important;
            }
          }

          /* Desktop pagination - below slider */
          @media (min-width: 1024px) {
            .hero-pagination {
              position: static !important;
              left: auto !important;
              bottom: auto !important;
              transform: none !important;
              margin: 30px auto 0 auto !important;
              gap: 15px;
              justify-content: center !important;
            }

            .hero-pagination .swiper-pagination-bullet {
              width: 20px !important;
              height: 20px !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
}
