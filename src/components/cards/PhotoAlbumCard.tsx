import Image from "next/image";
import Link from "next/link";

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
      className="group relative block w-full aspect-[270/143] sm:aspect-[339/208] lg:aspect-[572/351] cursor-pointer"
    >
      {/* Group 175 - Декоративная подложка (двухслойная) - сохраняем оригинальное расположение */}
      <div className="absolute left-[1.92%] top-0 w-[98.08%] h-[93.16%] pointer-events-none">
        {/* Верхний слой (полупрозрачный серый) - оригинальные координаты: left-14px от контейнера подложки */}
        <div
          className="absolute left-[2.5%] top-0 w-[97.5%] h-[96.94%] rounded-[15px]"
          style={{
            background: "rgba(171, 171, 171, 0.7)",
          }}
        />
        {/* Нижний слой (светло-серый) - оригинальные координаты: left-0, top-10px */}
        <div
          className="absolute left-0 top-[3.06%] w-[98.22%] h-[96.94%] rounded-[15px]"
          style={{
            background: "#E4E4E4",
          }}
        />
      </div>

      {/* Rectangle 115 - Основное изображение */}
      <div className="absolute left-0 top-[5.7%] w-[96.5%] h-[94.3%] rounded-[15px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Rectangle 117 - Gradient Overlay */}
      <div
        className="absolute left-0 top-[5.7%] w-[96.5%] h-[94.3%] rounded-[15px] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 100%)",
        }}
      />

      {/* Title Overlay - адаптивный с flexbox */}
      <div className="absolute left-[4.5%] bottom-[14%] right-[4.5%] flex items-end">
        <h3
          className="text-white text-[12px] md:text-[16px] lg:text-[20px] font-medium font-montserrat leading-[1.219]"
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
