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
    <article className="bg-white rounded-[15px] shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="relative h-[331px]">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6 lg:p-12">
        <div className="flex justify-end mb-2">
          <time className="text-sm font-normal font-montserrat text-black">
            {date}
          </time>
        </div>
        <h3 className="text-lg font-bold font-montserrat text-black leading-[1.56] mb-4">
          {title}
        </h3>
        <p className="text-lg font-normal font-montserrat text-black leading-[1.56] mb-6">
          {description}
        </p>
        <Link
          href={href}
          className="inline-flex items-center justify-center px-6 py-4 border border-[#1D4E89] text-[#1D4E89] text-[20px] font-normal font-montserrat rounded-xl hover:bg-[#1D4E89] hover:text-white transition-colors"
        >
          Читать подробнее..
        </Link>
      </div>
    </article>
  );
}
