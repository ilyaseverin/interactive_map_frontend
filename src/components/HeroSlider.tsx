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

export default function HeroSlider() {
  return (
    <div className="w-full max-w-[1800px] mx-auto pl-[19px] pr-[19px] sm:px-6 lg:px-0 mt-4 sm:mt-7 mb-8 sm:mb-12 lg:mb-[61px]">
      <section className="w-full max-w-[282px] sm:max-w-full mx-0 sm:mx-auto">
        {/* Swiper Container */}
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          pagination={{
            clickable: true,
            el: ".hero-pagination",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="hero-swiper w-full h-[471px] sm:h-[600px] lg:h-[685px] rounded-[20px] lg:rounded-[26px] shadow-[0_5px_12px_0_rgba(0,0,0,0.25)]"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              {/* Hero Image Container */}
              <div className="relative w-full h-full rounded-[20px] lg:rounded-[26px] overflow-hidden">
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
                <div className="relative z-10 h-full flex flex-col px-5 sm:px-12 lg:px-[102px]">
                  {/* Mobile Layout (до sm) */}
                  <div className="sm:hidden absolute left-[20px] top-[210px] w-[242px]">
                    {/* Title */}
                    <h1 className="text-[20px] font-bold font-montserrat text-white leading-[1.22] mb-[16px]">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="text-[12px] font-medium font-montserrat text-white leading-[1.5] w-[241px] mb-[44px]">
                      {slide.description}
                    </p>

                    {/* CTA Button */}
                    <Link
                      href={slide.ctaLink}
                      className="inline-flex items-center justify-center gap-4 w-[231px] h-[40px] px-[25px] py-[10px] bg-[#C62828] hover:bg-[#B71C1C] text-white text-[12px] font-medium font-montserrat rounded-lg transition-colors shadow-lg hover:shadow-xl"
                    >
                      {slide.ctaText}
                    </Link>
                  </div>

                  {/* Desktop Layout (sm и выше) */}
                  <div className="hidden sm:flex flex-col justify-center h-full py-[265px]">
                    {/* Title */}
                    <h1 className="text-4xl lg:text-[64px] font-bold font-montserrat text-white leading-[1.22] mb-4 lg:mb-[19px]">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="text-xl lg:text-[32px] font-medium font-montserrat text-white leading-[1.5] lg:max-w-[1005px] mb-6 lg:mb-[34px]">
                      {slide.description}
                    </p>

                    {/* CTA Button */}
                    <Link
                      href={slide.ctaLink}
                      className="inline-flex items-center justify-center gap-4 px-6 py-4 bg-[#C62828] hover:bg-[#B71C1C] text-white text-lg lg:text-[20px] font-medium font-montserrat rounded-[12px] transition-colors shadow-lg hover:shadow-xl w-fit"
                    >
                      {slide.ctaText}
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination Dots - ПОД слайдером, согласно Figma (y: 715, то есть 30px под слайдером) */}
        <div className="hero-pagination mt-6 lg:mt-[30px] flex justify-center"></div>

        {/* Custom Pagination Styles */}
        <style jsx global>{`
          /* Контейнер точек */
          .hero-pagination {
            display: flex !important;
            justify-content: center;
            align-items: center;
            gap: 12px;
          }

          /* Стиль точек - согласно Figma */
          .hero-pagination .swiper-pagination-bullet {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #d9d9d9;
            opacity: 1;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 0 !important;
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

          @media (min-width: 1024px) {
            .hero-pagination {
              gap: 15px;
            }

            .hero-pagination .swiper-pagination-bullet {
              width: 20px;
              height: 20px;
            }
          }
        `}</style>
      </section>
    </div>
  );
}
