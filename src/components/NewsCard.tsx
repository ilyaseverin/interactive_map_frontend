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
    <article className="bg-white rounded-[15px] shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] w-full md:w-[calc(100vw-274px)] lg:w-full xl:max-w-[574px] mx-auto relative md:min-h-[calc((100vw-274px)*1.215)] lg:min-h-[698px]">
      {/* Mobile Layout - Column with gap */}
      <div className="flex flex-col py-[22px] px-[19px] gap-[5px] md:hidden">
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

      {/* Tablet Layout - Absolute positioning with adaptive sizing */}
      <div className="hidden md:block lg:hidden">
        {/* Изображение - адаптивная ширина и высота */}
        <div
          className="absolute rounded-[15px] overflow-hidden"
          style={{
            left: "calc((100vw - 274px) * 0.0385)", // 19/493
            top: "calc((100vw - 274px) * 0.0446)", // 22/493
            width: "calc((100vw - 274px) * 0.923)", // 455/493
            height: "calc((100vw - 274px) * 0.552)", // 272/493
          }}
        >
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        {/* Дата - адаптивное позиционирование */}
        <time
          className="absolute text-[14px] font-normal font-montserrat text-black leading-[1.429]"
          style={{
            left: "calc((100vw - 274px) * 0.817)", // 403/493
            top: "calc((100vw - 274px) * 0.625)", // 308/493
          }}
        >
          {date}
        </time>

        {/* Заголовок - адаптивное позиционирование и ширина */}
        <h3
          className="absolute text-[17px] font-bold font-montserrat text-black leading-[1.219]"
          style={{
            left: "calc((100vw - 274px) * 0.0466)", // 23/493
            top: "calc((100vw - 274px) * 0.665)", // 328/493
            width: "calc((100vw - 274px) * 0.704)", // 347/493
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h3>

        {/* Описание - адаптивное позиционирование и ширина */}
        <p
          className="absolute text-[16px] font-normal font-montserrat text-black leading-[1.219]"
          style={{
            left: "calc((100vw - 274px) * 0.0466)", // 23/493
            top: "calc((100vw - 274px) * 0.777)", // 383/493
            width: "calc((100vw - 274px) * 0.907)", // 447/493
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </p>

        {/* Кнопка - адаптивное позиционирование */}
        <Link
          href={href}
          className="absolute inline-flex items-center justify-center px-[24px] py-[16px] border border-[#1D4E89] text-[#1D4E89] text-[18px] font-normal font-montserrat rounded-[12px] hover:bg-[#1D4E89] hover:text-white transition-colors leading-[1.219] whitespace-nowrap gap-[16px]"
          style={{
            left: "calc((100vw - 274px) * 0.0466)", // 23/493
            top: "calc((100vw - 274px) * 1.037)", // 511/493
          }}
        >
          Читать подробнее..
        </Link>
      </div>

      {/* Desktop Layout - Absolute positioning с адаптивностью */}
      <div className="hidden lg:block">
        {/* Изображение - адаптивная ширина */}
        <div className="absolute left-[11px] top-[11px] right-[11px] h-[min(331px,47.4%)] max-h-[331px] rounded-[15px] overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        {/* Дата - адаптивное позиционирование */}
        <time className="absolute right-[43px] top-[356px] text-[clamp(12px,0.875vw,14px)] font-normal font-montserrat text-black leading-[1.429]">
          {date}
        </time>

        {/* Заголовок - адаптивная ширина */}
        <h3
          className="absolute left-[48px] right-[84px] top-[379px] text-[clamp(16px,1.125vw,18px)] font-bold font-montserrat text-black leading-[1.556]"
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

        {/* Описание - адаптивная ширина */}
        <p
          className="absolute left-[49px] right-[38px] top-[458px] text-[clamp(16px,1.125vw,18px)] font-normal font-montserrat text-black leading-[1.556]"
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

        {/* Кнопка - адаптивная ширина */}
        <Link
          href={href}
          className="absolute left-[48px] top-[599px] inline-flex items-center justify-center min-w-[200px] max-w-[249px] w-[43%] h-[63px] px-[clamp(16px,1.5vw,24px)] py-[16px] border border-[#1D4E89] text-[#1D4E89] text-[clamp(16px,1.25vw,20px)] font-normal font-montserrat rounded-[12px] hover:bg-[#1D4E89] hover:text-white transition-colors leading-[1.219] whitespace-nowrap gap-[16px]"
        >
          Читать подробнее..
        </Link>
      </div>

      {/* Spacer for tablet/desktop absolute positioning */}
      <div className="hidden md:block md:h-[calc((100vw-274px)*1.215)] lg:h-[698px]" />
    </article>
  );
}
