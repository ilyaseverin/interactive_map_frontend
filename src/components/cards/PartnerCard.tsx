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
    <article className={`relative w-full max-w-[574px] mx-auto ${className}`}>
      {/* Shadow - Desktop: 524.91x603 at 22.04, 23, blur 75px */}
      <div
        className="absolute w-[524.91px] h-[603px] bg-[#1D4E89] -z-10 rounded-[15px] hidden lg:block"
        style={{
          transform: "translate(22.04px, 23px)",
          filter: "blur(75px)",
        }}
      />
      {/* Shadow - Tablet: 288x503 at 23, 23, blur 45px */}
      <div
        className="absolute w-[288px] h-[503px] bg-black -z-10 rounded-[15px] hidden md:block lg:hidden"
        style={{
          transform: "translate(23px, 23px)",
          filter: "blur(45px)",
        }}
      />

      {/* White Card Container */}
      <div className="relative bg-white rounded-[15px] w-full shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] pt-[17px] px-[17px] sm:pt-[15px] sm:px-[15px] md:pt-[23px] md:px-[23px] lg:pt-[23px] lg:px-[23px] pb-[20px] sm:pb-[25px] md:pb-[36px] lg:pb-[42px]">
        {/* Image - Tablet: 288x225 (1.28:1), border-radius 10px | Desktop: 528x332 (1.59:1), border-radius 15px */}
        <div className="relative w-full aspect-[251/168] sm:aspect-[314/200] md:aspect-[288/225] lg:aspect-[528/332] rounded-[10px] md:rounded-[10px] lg:rounded-[15px] overflow-hidden mb-[9px] sm:mb-[12px] md:mb-[22px] lg:mb-[32px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Title - Tablet: 288x139, font 20px | Desktop: 481.3x84, font 18px */}
        <h3 className="text-[12px] sm:text-[14px] md:text-[20px] lg:text-[18px] font-semibold font-montserrat text-black leading-[1.219] sm:leading-[1.3] md:leading-[1.4] lg:leading-[1.556] mb-[12px] sm:mb-[16px] md:mb-[20px] lg:mb-[22px] line-clamp-3 md:line-clamp-5 lg:line-clamp-3">
          {title}
        </h3>

        {/* VK Link - Tablet: at 429, icon 43x43, gap 18px | Desktop: at 492.99, icon 53x53, gap 16px */}
        <a
          href={vkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[4px] sm:gap-[8px] md:gap-[18px] lg:gap-[16px] mb-[8px] sm:mb-[12px] md:mb-[10px] lg:mb-[10px] group"
        >
          <div className="w-[25px] h-[25px] sm:w-[38px] sm:h-[38px] md:w-[43px] md:h-[43px] lg:w-[53px] lg:h-[53px] relative flex-shrink-0">
            <Image
              src="/images/partners/vk-icon.png"
              alt="VK"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[10px] sm:text-[14px] md:text-[20px] lg:text-[20px] font-normal font-montserrat text-black group-hover:text-[#1D4E89] transition-colors leading-[1.219] truncate">
            {vkText}
          </span>
        </a>

        {/* Website Link - Tablet: at 482, icon 44x44, gap 14px | Desktop: at 555.99, icon 58x58, gap 11px */}
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[5px] sm:gap-[8px] md:gap-[14px] lg:gap-[11px] group"
        >
          <div className="w-[23px] h-[23px] sm:w-[35px] sm:h-[35px] md:w-[44px] md:h-[44px] lg:w-[58px] lg:h-[58px] relative flex-shrink-0">
            <Image
              src="/images/partners/link-icon.png"
              alt="Website"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[10px] sm:text-[14px] md:text-[20px] lg:text-[20px] font-normal font-montserrat text-black group-hover:text-[#1D4E89] transition-colors leading-[1.219] truncate">
            {websiteText}
          </span>
        </a>
      </div>
    </article>
  );
}
