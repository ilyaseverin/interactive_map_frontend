import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProjectListCardProps {
  image: string;
  date?: string;
  category?: string;
  title: string;
  description: string;
  href: string;
}

export default function ProjectListCard({
  image,
  date,
  category,
  title,
  description,
  href,
}: ProjectListCardProps) {
  return (
    <Link href={href} className="block">
      <article className="bg-white rounded-[15px] shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] w-full lg:w-[574px] mx-auto relative hover:shadow-[0_3px_20px_0_rgba(0,0,0,0.12)] transition-shadow cursor-pointer">
        {/* Desktop Layout - Based on Figma */}
        <div className="hidden lg:flex relative flex-col">
          {/* Изображение - top, fixed height 570px (проекты используют больший размер) */}
          <div className="relative w-full h-[570px] rounded-t-[15px] overflow-hidden flex-shrink-0">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>

          {/* Текстовая часть - flex для правильного позиционирования */}
          <div className="flex flex-col px-[46px] pb-[46px] pt-[44px]">
            {/* Заголовок - без обрезания */}
            <h3 className="text-[18px] font-bold font-montserrat text-black leading-[1.556] uppercase mb-[18px] pr-[47px]">
              {title}
            </h3>

            {/* Описание - под заголовком, фиксированная высота для 4 строк */}
            <p
              className="text-[18px] font-medium font-montserrat text-black leading-[1.556] pr-[93px] mb-[44px]"
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

            {/* Источник и дата - внизу */}
            <div className="flex flex-col gap-[4px]">
              {category && (
                <div className="text-[18px] font-medium font-montserrat text-black leading-[1.556]">
                  {category}
                </div>
              )}
              {date && (
                <time className="text-[18px] font-medium font-montserrat text-black leading-[1.556]">
                  {date}
                </time>
              )}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden flex flex-col h-full">
          {/* Изображение */}
          <div className="relative w-full h-[300px] sm:h-[384px] rounded-t-[15px] overflow-hidden flex-shrink-0">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>

          <div className="flex flex-col p-[22px] gap-[5px] flex-1">
            {/* Заголовок */}
            <h3 className="text-[16px] font-bold font-montserrat text-black uppercase leading-[1.556] mb-[8px]">
              {title}
            </h3>

            {/* Описание */}
            <p
              className="text-[14px] font-medium font-montserrat text-black leading-[1.556] mb-[12px] flex-1"
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

            {/* Источник и дата */}
            <div className="flex flex-col gap-[4px] mt-auto">
              {category && (
                <div className="text-[14px] font-medium font-montserrat text-black">
                  {category}
                </div>
              )}
              {date && (
                <time className="text-[14px] font-medium font-montserrat text-black">
                  {date}
                </time>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
