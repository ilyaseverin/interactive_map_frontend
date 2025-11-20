import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NewsCardProps {
  image: string;
  date: string;
  title: string;
  description: string;
  href: string;
}

export default function NewsCard({
  image,
  date,
  title,
  description,
  href,
}: NewsCardProps) {
  return (
    <article className="bg-white rounded-[15px] shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] w-full mx-auto relative md:min-h-[500px] lg:min-h-[698px]">
      {/* Mobile Layout - Column with gap */}
      <div className="flex flex-col pt-[23px] pb-[22px] px-[23px] gap-[10px] md:hidden">
        {/* 1. Изображение - адаптивная ширина с фиксированным aspect ratio */}
        <div className="relative w-full aspect-[241/143] rounded-[10px] overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        {/* 2. Дата - text aligned right */}
        <time className="text-[10px] font-normal font-montserrat text-black leading-[2] text-right">
          {date}
        </time>

        {/* 3. Заголовок - fill width, max 2 lines */}
        <h3
          className="text-[12px] font-bold font-montserrat text-black leading-[1.219] uppercase"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h3>

        {/* 4. Описание - max 5 lines */}
        <p
          className="text-[12px] font-normal font-montserrat text-black leading-[1.219] overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </p>

        {/* 5. Кнопка - fill width */}
        <Link
          href={href}
          className="inline-flex items-center justify-center w-full h-[40px] px-[25px] py-[10px] border border-[#1D4E89] text-[#1D4E89] text-[12px] font-normal font-montserrat rounded-[8px] hover:bg-[#1D4E89] hover:text-white transition-colors leading-[1.219] whitespace-nowrap"
        >
          Читать подробнее..
        </Link>
      </div>

      {/* Tablet Layout - Flexible layout */}
      <div className="hidden md:flex flex-col lg:hidden relative px-[22px] py-[22px]">
        {/* Изображение */}
        <div className="relative w-full aspect-[455/272] mb-[14px] rounded-[15px] overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        {/* Дата */}
        <time className="text-[14px] font-normal font-montserrat text-black leading-[1.429] text-right mb-[16px]">
          {date}
        </time>

        {/* Заголовок */}
        <h3
          className="text-[16px] font-bold font-montserrat text-black leading-[1.219] uppercase mb-[15px] max-w-[347px]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h3>

        {/* Описание */}
        <p
          className="text-[16px] font-normal font-montserrat text-black leading-[1.219] mb-[21px] max-w-[447px]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </p>

        {/* Кнопка */}
        <Link
          href={href}
          className="inline-flex items-center justify-center w-fit h-[52px] px-[20px] py-[12px] border border-[#1D4E89] text-[#1D4E89] text-[16px] font-normal font-montserrat rounded-[10px] hover:bg-[#1D4E89] hover:text-white transition-colors leading-[1.219] whitespace-nowrap self-center"
        >
          Читать подробнее..
        </Link>
      </div>

      {/* Desktop Layout - Absolute positioning с адаптивностью */}
      <div className="hidden lg:block">
        {/* Изображение - адаптивная ширина */}
        <div className="absolute left-[23px] top-[23px] right-[23px] h-[min(331px,47.4%)] max-h-[331px] rounded-[15px] overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        {/* Дата - адаптивное позиционирование */}
        <time className="absolute right-[55px] top-[364px] text-[clamp(12px,0.875vw,14px)] font-normal font-montserrat text-black leading-[1.429]">
          {date}
        </time>

        {/* Контейнер с текстовым контентом */}
        <div className="absolute left-[60px] right-[50px] top-[394px] flex flex-col gap-[10px]">
          {/* Заголовок */}
          <h3
            className="pr-[34px] text-[clamp(16px,1.125vw,18px)] font-bold font-montserrat text-black leading-[1.556] uppercase"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </h3>

          {/* Описание */}
          <p
            className="text-[clamp(16px,1.125vw,18px)] font-normal font-montserrat text-black leading-[1.556]"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {description}
          </p>
        </div>

        {/* Кнопка - центрированная */}
        <Link
          href={href}
          className="absolute left-1/2 -translate-x-1/2 top-[599px] inline-flex items-center justify-center min-w-[200px] max-w-[249px] w-[43%] h-[63px] px-[clamp(16px,1.5vw,24px)] py-[16px] border border-[#1D4E89] text-[#1D4E89] text-[clamp(16px,1.25vw,20px)] font-normal font-montserrat rounded-[12px] hover:bg-[#1D4E89] hover:text-white transition-colors leading-[1.219] whitespace-nowrap gap-[16px]"
        >
          Читать подробнее..
        </Link>
      </div>
    </article>
  );
}
