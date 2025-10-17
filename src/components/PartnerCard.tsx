import Image from "next/image";

interface PartnerCardProps {
  title: string;
  image: string;
  websiteUrl: string;
  websiteText: string;
  vkUrl: string;
  vkText: string;
}

export default function PartnerCard({
  title,
  image,
  websiteUrl,
  websiteText,
  vkUrl,
  vkText,
}: PartnerCardProps) {
  return (
    <article className="relative w-full sm:max-w-[574px] mx-auto">
      {/* Rectangle 157 - Blur Background - только для desktop */}
      <div
        className="hidden sm:block absolute bg-[#1D4E89] rounded-[15px]"
        style={{
          left: "22px",
          top: "39px",
          width: "525px",
          height: "626px",
          filter: "blur(75px)",
          zIndex: 0,
        }}
      />

      {/* Rectangle 158 - Image (Top Part) - адаптивная высота */}
      <div className="relative rounded-t-[15px] overflow-hidden w-full aspect-[251/168] sm:aspect-[574/384] z-20 shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] sm:shadow-none">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Rectangle 159 - White Card (Bottom Part) */}
      <div className="relative bg-white rounded-b-[9px] sm:rounded-b-[15px] w-full shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] z-10">
        {/* Title Text - точные координаты из Figma: x=19, y=177 от верха изображения */}
        <h3 className="absolute left-[19px] top-[9px] sm:left-[59px] sm:top-[42px] w-[210px] sm:w-[481px] text-[10px] sm:text-[18px] font-bold font-montserrat text-black leading-[1.219] sm:leading-[1.556]">
          {title}
        </h3>

        {/* Group 145 - Website Link - точные координаты из Figma: x=19, y=234 */}
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[19px] top-[66px] sm:left-[59px] sm:top-[148px] flex items-center gap-[7px] sm:gap-4 group"
        >
          {/* Icon */}
          <div className="w-[23px] h-[23px] sm:w-[53px] sm:h-[53px] relative flex-shrink-0">
            <Image
              src="/images/partners/link-icon.png"
              alt="Website"
              fill
              className="object-contain"
            />
          </div>

          {/* Text */}
          <span className="text-[8px] sm:text-[20px] font-normal font-montserrat text-black group-hover:text-[#1D4E89] transition-colors leading-[1.219]">
            {websiteText}
          </span>
        </a>

        {/* Group 146 - VK Link - точные координаты из Figma: x=19, y=260 */}
        <a
          href={vkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[19px] top-[92px] sm:left-[59px] sm:top-[211px] flex items-center gap-[5px] sm:gap-[11px] group"
        >
          {/* Icon */}
          <div className="w-[25px] h-[25px] sm:w-[58px] sm:h-[58px] relative flex-shrink-0">
            <Image
              src="/images/partners/vk-icon.png"
              alt="VK"
              fill
              className="object-contain"
            />
          </div>

          {/* Text */}
          <span className="text-[8px] sm:text-[20px] font-normal font-montserrat text-black group-hover:text-[#1D4E89] transition-colors leading-[1.219]">
            {vkText}
          </span>
        </a>

        {/* Spacer для сохранения высоты */}
        <div className="h-[136px] sm:h-[311px]" />
      </div>
    </article>
  );
}
