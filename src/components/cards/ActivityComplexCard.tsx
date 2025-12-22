"use client";

import Link from "next/link";
import Image from "next/image";
import { ActivityComplexCategory } from "@/types/strapi";

interface ActivityComplexCardProps {
  title: string;
  category: ActivityComplexCategory;
  href: string;
  icon?: string;
  isHovered?: boolean;
}

// Маппинг категорий на иконки
const getCategoryIcon = (category: ActivityComplexCategory): string => {
  const iconMap: Record<ActivityComplexCategory, string> = {
    "Антимонопольный комплекс": "/images/activity/antimonopoly-icon.png",
    "Антикоррупционная деятельность":
      "/images/activity/anticorruption-icon.png",
    "Противодействие терроризму": "/images/activity/counterterrorism-icon.png",
    "Антинаркотическая кампания": "/images/activity/antidrug-icon.png",
  };
  return iconMap[category] || "/images/activity/default-icon.svg";
};

export default function ActivityComplexCard({
  title,
  category,
  href,
  icon,
  isHovered = false,
}: ActivityComplexCardProps) {
  const iconPath = icon || getCategoryIcon(category);

  return (
    <Link
      href={href}
      className={`group relative block w-full min-h-[80px] h-auto md:h-[110px] rounded-[10px] md:rounded-[15px] border-[2px] md:border-[3px] border-[#1d4e89] transition-all duration-300 ${
        isHovered ? "bg-[#1d4e89]" : "bg-white"
      }`}
    >
      <div className="flex items-center h-full px-[16px] md:px-[40px] py-[12px] md:py-0 gap-[12px] md:gap-[40px]">
        {/* Иконка */}
        <div className="flex-shrink-0 w-[50px] h-[50px] md:w-[66px] md:h-[66px] lg:w-[75px] lg:h-[75px] relative">
          <Image
            src={iconPath}
            alt={title}
            fill
            className="object-contain transition-all duration-300"
            style={{
              filter: isHovered
                ? "brightness(0) invert(1)"
                : "brightness(0) invert(0)",
            }}
          />
        </div>

        {/* Название */}
        <h3
          className={`font-medium font-montserrat text-[16px] md:text-[20px] lg:text-[24px] leading-[1.2] md:leading-normal transition-colors duration-300 flex-1 min-w-0 ${
            isHovered ? "text-white" : "text-black"
          }`}
          style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
        >
          {title}
        </h3>
      </div>
    </Link>
  );
}
