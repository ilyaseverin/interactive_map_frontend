import Link from "next/link";
import Image from "next/image";
import DownloadLink from "@/components/DownloadLink";

export interface SearchResultItem {
  id: string;
  type: "news" | "project" | "press-release" | "event" | "document";
  title: string;
  excerpt: string;
  slug: string;
  coverUrl?: string;
  date?: string;
  // Для документов
  documentUrl?: string;
  documentFileName?: string;
  documentFileSize?: string;
  parentType?: "project" | "press-release" | "event";
  parentSlug?: string;
  parentTitle?: string;
}

interface SearchResultCardProps {
  item: SearchResultItem;
  isFirst: boolean;
  isLast: boolean;
  getItemUrl: (item: SearchResultItem) => string;
}

export default function SearchResultCard({
  item,
  isFirst,
  isLast,
  getItemUrl,
}: SearchResultCardProps) {
  // Если это документ, отображаем через DownloadLink
  if (item.type === "document" && item.documentUrl && item.documentFileName) {
    const parentUrl =
      item.parentType && item.parentSlug
        ? getItemUrl({ ...item, type: item.parentType, slug: item.parentSlug })
        : item.parentTitle
        ? getItemUrl(item)
        : "#";

    return (
      <div>
        <div
          className={`block ${
            !isFirst ? "pt-[16px] md:pt-[26px] lg:pt-[30px]" : ""
          } ${!isLast ? "pb-[16px] md:pb-[26px] lg:pb-[30px]" : "pb-0"}`}
        >
          <div className="flex flex-col gap-[12px] md:gap-[20px] lg:gap-[26px]">
            {/* Logo and title */}
            <div className="flex items-center gap-[10px]">
              <Image
                src="/images/logo-392dd2.png"
                alt="Патриот Центр48.рф"
                width={68}
                height={63}
                className="w-[40px] h-[37px] md:w-[58px] md:h-[53px] lg:w-[68px] lg:h-[63px] object-contain flex-shrink-0"
              />
              <span className="text-[12px] md:text-[16px] lg:text-[20px] font-normal font-inter text-black leading-[1.21]">
                Патриот Центр48.рф
              </span>
            </div>

            {/* Document link */}
            <div>
              <DownloadLink
                url={item.documentUrl}
                fileName={item.documentFileName}
                fileSize={item.documentFileSize}
              />
            </div>

            {/* Parent link if available */}
            {item.parentTitle && (
              <div>
                <Link
                  href={parentUrl}
                  className="text-[14px] md:text-[16px] lg:text-[18px] font-normal font-inter text-[#1D4E89] hover:underline"
                >
                  Из: {item.parentTitle}
                </Link>
              </div>
            )}
          </div>
        </div>
        {!isLast && <div className="h-[2px] bg-[#969696] w-full" />}
      </div>
    );
  }

  // Обычный контент
  return (
    <div>
      <Link
        href={getItemUrl(item)}
        className={`block hover:bg-white/50 transition-colors ${
          !isFirst ? "pt-[16px] md:pt-[26px] lg:pt-[30px]" : ""
        } ${!isLast ? "pb-[16px] md:pb-[26px] lg:pb-[30px]" : "pb-0"}`}
      >
        <div className="flex flex-col gap-[12px] md:gap-[20px] lg:gap-[26px]">
          {/* Logo and title */}
          <div className="flex items-center gap-[10px]">
            <Image
              src="/images/logo-392dd2.png"
              alt="Патриот Центр48.рф"
              width={68}
              height={63}
              className="w-[40px] h-[37px] md:w-[58px] md:h-[53px] lg:w-[68px] lg:h-[63px] object-contain flex-shrink-0"
            />
            <span className="text-[12px] md:text-[16px] lg:text-[20px] font-normal font-inter text-black leading-[1.21]">
              Патриот Центр48.рф
            </span>
          </div>

          {/* Headline - максимум 2 строки везде */}
          <h2 className="text-[18px] md:text-[24px] lg:text-[30px] font-normal font-inter text-[#1D4E89] leading-[1.21] hover:underline line-clamp-2">
            {item.title}
          </h2>

          {/* Description - 4 строки на мобильной, 2 строки на планшете/десктопе */}
          <p className="text-[14px] md:text-[18px] lg:text-[20px] font-normal font-inter text-black leading-[1.21] line-clamp-4 md:line-clamp-2">
            {item.excerpt}
          </p>
        </div>
      </Link>
      {!isLast && <div className="h-[2px] bg-[#969696] w-full" />}
    </div>
  );
}
