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
    <Link href={href} className="block">
      <article className="bg-white rounded-[15px] shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] w-full lg:w-[574px] mx-auto relative h-[695px] hover:shadow-[0_3px_20px_0_rgba(0,0,0,0.12)] transition-shadow cursor-pointer">
        {/* Desktop Layout - Based on Figma */}
        <div className="hidden lg:block relative h-full">
          {/* Изображение - top left corner, fixed height */}
          <div className="absolute left-0 top-0 right-0 h-[384px] rounded-t-[15px] overflow-hidden">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>

          {/* Заголовок - заголовок */}
          <h3
            className="absolute left-[46px] right-[47px] top-[412px] text-[18px] font-bold font-montserrat text-black leading-[1.556] uppercase"
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

          {/* Описание - описание */}
          <p
            className="absolute left-[46px] right-[93px] top-[454px] text-[18px] font-medium font-montserrat text-black leading-[1.556]"
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

          {/* Источник - источник */}
          {source && (
            <div className="absolute left-[46px] top-[593px] text-[18px] font-medium font-montserrat text-black leading-[1.556]">
              {source}
            </div>
          )}

          {/* Дата - дата */}
          <time className="absolute left-[46px] top-[639px] text-[18px] font-medium font-montserrat text-black leading-[1.556]">
            {date}
          </time>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden flex flex-col h-full">
          {/* Изображение */}
          <div className="relative w-full h-[384px] rounded-t-[15px] overflow-hidden flex-shrink-0">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>

          <div className="flex flex-col p-[22px] gap-[5px] flex-1">
            {/* Заголовок */}
            <h3
              className="text-[16px] font-bold font-montserrat text-black uppercase leading-[1.556] mb-[8px]"
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

            {/* Дата и источник */}
            <div className="flex flex-col gap-[4px] mt-auto">
              {source && (
                <div className="text-[14px] font-medium font-montserrat text-black">
                  {source}
                </div>
              )}
              <time className="text-[14px] font-medium font-montserrat text-black">
                {date}
              </time>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
