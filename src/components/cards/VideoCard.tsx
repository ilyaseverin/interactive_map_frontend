import Image from "next/image";
import React from "react";

interface VideoCardProps {
  thumbnail: string;
  title: string;
  date?: string;
  duration?: string;
  alt: string;
}

export default function VideoCard({
  thumbnail,
  title,
  date,
  duration,
  alt,
}: VideoCardProps) {
  return (
    <div className="relative w-full bg-white rounded-[15px] overflow-hidden cursor-pointer group">
      {/* Контейнер превью - Mobile & Tablet: padding 19px, Desktop: padding 0 */}
      <div className="pt-[19px] px-[19px] xl:p-0">
        {/* Превью видео - Mobile: 244x147, Tablet: 301x183, Desktop: 552x331 */}
        <div className="relative w-full aspect-[244/147] md:aspect-[301/183] xl:aspect-[552/331] rounded-[10px] xl:rounded-t-[15px] overflow-hidden">
          <Image
            src={thumbnail}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />

          {/* Кнопка воспроизведения - Mobile: 30px, Tablet: 40px, Desktop: 79px */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] xl:w-[79px] xl:h-[79px] group-hover:scale-110 transition-transform duration-200">
              <Image
                src="/images/play-button.svg"
                alt="Воспроизвести"
                width={79}
                height={79}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Длительность - Mobile: 49x18 right:13px bottom:9px, Tablet: 47x20 right:16px bottom:10px, Desktop: 47x24 right:22px bottom:22px */}
          {duration && (
            <div className="absolute bottom-[9px] right-[13px] md:bottom-[10px] md:right-[16px] xl:bottom-[22px] xl:right-[22px] bg-[rgba(51,51,51,0.7)] rounded-[5px] px-[12px] py-[1px] md:px-[9px] xl:px-[8px]">
              <span className="text-white text-[12px] md:text-[14px] xl:text-[16px] font-montserrat font-medium leading-[1.219]">
                {duration}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Описание - Mobile: 233x51 padding:20/9/19, Tablet: 281x66 padding:23/11/24, Desktop: 508x48 padding:22/23/27 */}
      <div className="px-[20px] pt-[9px] pb-[19px] md:px-[23px] md:pt-[11px] md:pb-[24px] xl:px-[22px] xl:pt-[23px] xl:pb-[27px]">
        {/* Desktop: заголовок + дата inline, обрезается троеточием */}
        <div className="hidden xl:block h-[48px] overflow-hidden">
          <p className="text-[20px] font-montserrat font-normal leading-[1.219] text-black line-clamp-2">
            {title}
            {date && (
              <span className="whitespace-nowrap">
                {" "}
                <span className="font-bold">•</span> {date}
              </span>
            )}
          </p>
        </div>

        {/* Mobile & Tablet: заголовок + дата отдельно (БЕЗ точки) */}
        <div className="xl:hidden">
          {/* Заголовок */}
          <p className="text-[12px] md:text-[16px] font-montserrat font-normal leading-[1.219] text-black line-clamp-2 mb-[6px] md:mb-[7px]">
            {title}
          </p>
          {/* Дата - БЕЗ точки на мобилке и планшете */}
          {date && (
            <p className="text-[12px] md:text-[16px] font-montserrat font-normal leading-[1.219] text-black">
              {date}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
