import Image from "next/image";
import Link from "next/link";

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
    <article className="bg-white rounded-[15px] shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] w-[574px] h-[698px] relative">
      {/* Изображение: position (11, 11), size 552×331 */}
      <div className="absolute left-[11px] top-[11px] w-[552px] h-[331px] rounded-[15px] overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Дата: position (483, 356), size 80×23 */}
      <time className="absolute left-[483px] top-[356px] text-[14px] font-normal font-montserrat text-black leading-[1.429]">
        {date}
      </time>

      {/* Заголовок: position (48, 379), size 443×63 */}
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

      {/* Описание: position (49, 458), size 487×138 */}
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

      {/* Кнопка: position (48, 599), size 249×63 */}
      <Link
        href={href}
        className="absolute left-[48px] top-[599px] inline-flex items-center justify-center w-[249px] h-[63px] px-[24px] py-[16px] border border-[#1D4E89] text-[#1D4E89] text-[20px] font-normal font-montserrat rounded-[12px] hover:bg-[#1D4E89] hover:text-white transition-colors leading-[1.219] whitespace-nowrap gap-[16px]"
      >
        Читать подробнее..
      </Link>
    </article>
  );
}
