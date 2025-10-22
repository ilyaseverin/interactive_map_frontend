import Image from "next/image";

interface PartnerCardProps {
  title: string;
  image: string;
  websiteUrl: string;
  websiteText: string;
  vkUrl: string;
  vkText: string;
  className?: string;
}

export default function PartnerCard({
  title,
  image,
  websiteUrl,
  websiteText,
  vkUrl,
  vkText,
  className = "",
}: PartnerCardProps) {
  return (
    <article
      className={`relative w-full md:w-full lg:max-w-[574px] mx-auto ${className}`}
    >
      {/* Rectangle 158 - Image (Top Part) - адаптивная высота */}
      <div className="relative rounded-t-[15px] overflow-hidden w-full aspect-[251/168] md:aspect-[314/248] lg:aspect-[574/384] shadow-[0_3px_14px_0_rgba(0,0,0,0.08)]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Rectangle 159 - White Card (Bottom Part) */}
      <div className="relative bg-white rounded-b-[9px] md:rounded-b-[15px] lg:rounded-b-[15px] w-full shadow-[0_3px_14px_0_rgba(0,0,0,0.08)]">
        {/* Title Text - точные координаты из Figma */}
        <h3 className="absolute left-[19px] top-[9px] md:left-[30px] md:top-[30px] lg:left-[59px] lg:top-[42px] w-[210px] md:w-[254px] lg:w-[calc(100%-118px)] text-[10px] md:text-[18px] lg:text-[18px] font-bold font-montserrat text-black leading-[1.219] md:leading-[1.556] lg:leading-[1.556] line-clamp-3 md:line-clamp-5 lg:line-clamp-3">
          {title}
        </h3>

        {/* Group 145 - Website Link - точные координаты из Figma */}
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[19px] top-[66px] md:left-[30px] md:top-[256px] lg:left-[59px] lg:top-[148px] flex items-center gap-[7px] md:gap-[14px] lg:gap-4 group w-[calc(100%-38px)] md:w-[246px] lg:w-[calc(100%-118px)]"
        >
          {/* Icon */}
          <div className="w-[23px] h-[23px] md:w-[44px] md:h-[44px] lg:w-[53px] lg:h-[53px] relative flex-shrink-0">
            <Image
              src="/images/partners/link-icon.png"
              alt="Website"
              fill
              className="object-contain"
            />
          </div>

          {/* Text */}
          <span className="text-[8px] md:text-[17px] lg:text-[20px] font-normal font-montserrat text-black group-hover:text-[#1D4E89] transition-colors leading-[1.219] truncate">
            {websiteText}
          </span>
        </a>

        {/* Group 146 - VK Link - точные координаты из Figma */}
        <a
          href={vkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[19px] top-[92px] md:left-[30px] md:top-[202px] lg:left-[59px] lg:top-[211px] flex items-center gap-[5px] md:gap-[18px] lg:gap-[11px] group w-[calc(100%-38px)] md:w-[246px] lg:w-[calc(100%-118px)]"
        >
          {/* Icon */}
          <div className="w-[25px] h-[25px] md:w-[43px] md:h-[43px] lg:w-[58px] lg:h-[58px] relative flex-shrink-0">
            <Image
              src="/images/partners/vk-icon.png"
              alt="VK"
              fill
              className="object-contain"
            />
          </div>

          {/* Text */}
          <span className="text-[8px] md:text-[20px] lg:text-[20px] font-normal font-montserrat text-black group-hover:text-[#1D4E89] transition-colors leading-[1.219] truncate">
            {vkText}
          </span>
        </a>

        {/* Spacer для сохранения высоты */}
        <div className="h-[136px] md:h-[359px] lg:h-[311px]" />
      </div>
    </article>
  );
}
