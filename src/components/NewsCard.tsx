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
    <article className="bg-white rounded-[15px] shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] w-full sm:max-w-[574px] mx-auto relative sm:min-h-[698px]">
      {/* Mobile Layout - Column with gap */}
      <div className="flex flex-col py-[22px] px-[19px] gap-[5px] sm:hidden">
        {/* 1. Заголовок - fill width, max 2 lines */}
        <h3
          className="text-[12px] font-bold font-montserrat text-black leading-[1.219]"
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

        {/* 2. Дата - адаптивная ширина, text aligned right */}
        <time className="text-[10px] font-normal font-montserrat text-black leading-[2] text-right self-start">
          {date}
        </time>

        {/* 3. Изображение - адаптивная ширина с фиксированным aspect ratio */}
        <div className="relative w-full aspect-[240/143] rounded-[15px] overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        {/* 4. Описание - fill width, max 5 lines */}
        <p
          className="text-[12px] font-normal font-montserrat text-black leading-[1.219]"
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

        {/* 5. Кнопка - адаптивная ширина */}
        <Link
          href={href}
          className="inline-flex items-center justify-center w-full h-[40px] px-[25px] py-[10px] border border-[#1D4E89] text-[#1D4E89] text-[12px] font-normal font-montserrat rounded-lg hover:bg-[#1D4E89] hover:text-white transition-colors leading-[1.219] whitespace-nowrap mt-[5px]"
        >
          Читать подробнее..
        </Link>
      </div>

      {/* Desktop Layout - Absolute positioning */}
      <div className="hidden sm:block">
        {/* Изображение */}
        <div className="absolute left-[11px] top-[11px] w-[552px] h-[331px] rounded-[15px] overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        {/* Дата */}
        <time className="absolute left-[483px] top-[356px] text-[14px] font-normal font-montserrat text-black leading-[1.429]">
          {date}
        </time>

        {/* Заголовок */}
        <h3
          className="absolute left-[48px] top-[379px] w-[443px] text-[18px] font-bold font-montserrat text-black leading-[1.556]"
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
          className="absolute left-[49px] top-[458px] w-[487px] text-[18px] font-normal font-montserrat text-black leading-[1.556]"
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

        {/* Кнопка */}
        <Link
          href={href}
          className="absolute left-[48px] top-[599px] inline-flex items-center justify-center w-[249px] h-[63px] px-[24px] py-[16px] border border-[#1D4E89] text-[#1D4E89] text-[20px] font-normal font-montserrat rounded-[12px] hover:bg-[#1D4E89] hover:text-white transition-colors leading-[1.219] whitespace-nowrap gap-[16px]"
        >
          Читать подробнее..
        </Link>
      </div>

      {/* Spacer for desktop absolute positioning */}
      <div className="hidden sm:block h-[698px]" />
    </article>
  );
}
