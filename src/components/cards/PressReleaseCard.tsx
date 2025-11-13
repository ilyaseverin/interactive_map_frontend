import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PressReleaseCardProps {
  image: string;
  date: string;
  source?: string;
  title: string;
  description: string;
  href: string;
}

export default function PressReleaseCard({
  image,
  date,
  source,
  title,
  description,
  href,
}: PressReleaseCardProps) {
  return (
    <article className="bg-white rounded-[15px] shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] w-full mx-auto relative md:min-h-[500px] lg:min-h-[720px] hover:shadow-[0_3px_20px_0_rgba(0,0,0,0.12)] transition-shadow lg:cursor-pointer">
      {/* Mobile Layout - Column with gap */}
      <div className="flex flex-col pt-[23px] pb-[22px] px-[23px] gap-[10px] md:hidden">
        {/* 1. Изображение - адаптивная ширина с фиксированным aspect ratio */}
        <div className="relative w-full aspect-[241/143] rounded-[15px] overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        {/* 2. Дата - text aligned right */}
        <time className="text-[10px] font-normal font-montserrat text-black leading-[2] text-right">
          {date}
        </time>

        {/* 3. Заголовок - fill width, max 2 lines */}
        <h3
          className="text-[14px] font-bold font-montserrat text-black leading-[1.219] uppercase"
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

        {/* 5. Источник - если есть */}
        {source && (
          <div className="text-[12px] font-normal font-montserrat text-black leading-[1.219]">
            {source}
          </div>
        )}

        {/* 6. Кнопка - fill width */}
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

        {/* Источник */}
        {source && (
          <div className="text-[16px] font-normal font-montserrat text-black leading-[1.219] mb-[21px]">
            {source}
          </div>
        )}

        {/* Кнопка */}
        <Link
          href={href}
          className="inline-flex items-center justify-center w-fit h-[52px] px-[20px] py-[12px] border border-[#1D4E89] text-[#1D4E89] text-[16px] font-normal font-montserrat rounded-[10px] hover:bg-[#1D4E89] hover:text-white transition-colors leading-[1.219] whitespace-nowrap self-center"
        >
          Читать подробнее..
        </Link>
      </div>

      {/* Desktop Layout - Absolute positioning с адаптивностью */}
      <Link href={href} className="hidden lg:block absolute inset-0 z-10">
        <div className="hidden lg:block w-full h-full">
          {/* Изображение - адаптивная ширина */}
          <div className="absolute left-[clamp(11px,1.2vw,23px)] top-[clamp(11px,1.2vw,23px)] right-[clamp(11px,1.2vw,23px)] h-[min(384px,53.3%)] max-h-[384px] rounded-[15px] overflow-hidden">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>

          {/* Заголовок - адаптивная ширина и размер шрифта */}
          <h3
            className="absolute left-[clamp(23px,2.4vw,46px)] right-[clamp(23px,2.45vw,47px)] top-[435px] text-[clamp(16px,0.9375vw,18px)] font-bold font-montserrat text-black leading-[1.556] uppercase"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </h3>

          {/* Описание - адаптивная ширина и размер шрифта */}
          <p
            className="absolute left-[clamp(23px,2.4vw,46px)] right-[clamp(23px,2.45vw,47px)] top-[477px] text-[clamp(16px,0.9375vw,18px)] font-medium font-montserrat text-black leading-[1.556]"
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

          {/* Источник - адаптивное позиционирование и размер шрифта */}
          {source && (
            <div className="absolute left-[clamp(23px,2.4vw,46px)] top-[616px] text-[clamp(16px,0.9375vw,18px)] font-medium font-montserrat text-black leading-[1.556]">
              {source}
            </div>
          )}

          {/* Дата - адаптивное позиционирование и размер шрифта */}
          <time className="absolute left-[clamp(23px,2.4vw,46px)] top-[662px] text-[clamp(16px,0.9375vw,18px)] font-medium font-montserrat text-black leading-[1.556]">
            {date}
          </time>
        </div>
      </Link>

      {/* Spacer for desktop absolute positioning */}
      <div className="hidden lg:block lg:h-[720px]" />
    </article>
  );
}
