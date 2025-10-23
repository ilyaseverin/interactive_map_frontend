import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PhotoAlbumCardProps {
  image: string;
  title: string;
  href: string;
}

export default function PhotoAlbumCard({
  image,
  title,
  href,
}: PhotoAlbumCardProps) {
  return (
    <Link
      href={href}
      className="group relative block w-full aspect-[572/351] cursor-pointer"
    >
      {/* Group 175 - Декоративная подложка (двухслойная) */}
      <div className="absolute left-[11px] top-0 w-[561px] h-[327px]">
        {/* Нижний слой (светло-серый) */}

        {/* Верхний слой (полупрозрачный серый) */}
        <div
          className="absolute left-[14px] top-0 w-[547px] h-[317px] rounded-[15px]"
          style={{
            background: "rgba(171, 171, 171, 0.7)",
          }}
        />
        <div
          className="absolute left-0 top-[10px] w-[551px] h-[317px] rounded-[15px]"
          style={{
            background: "#E4E4E4",
          }}
        />
      </div>

      {/* Rectangle 115 - Основное изображение */}
      <div className="absolute left-0 top-[20px] w-[552px] h-[331px] rounded-[15px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Rectangle 117 - Gradient Overlay */}
      <div
        className="absolute left-0 top-[20px] w-[552px] h-[331px] rounded-[15px] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 100%)",
        }}
      />

      {/* Title Overlay */}
      <div className="absolute left-[25px] top-[274px] w-[439px] h-[48px]">
        <h3
          className="text-white text-[20px] font-medium font-montserrat leading-[1.219]"
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
      </div>
    </Link>
  );
}
