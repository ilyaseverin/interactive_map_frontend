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
    <article className="relative w-full max-w-[251px] sm:max-w-[574px] mx-auto h-[304px] sm:h-[695px]">
      {/* Rectangle 157 - Blur Background */}
      <div
        className="absolute bg-[#1D4E89] rounded-[15px]"
        style={{
          left: "10px",
          top: "17px",
          width: "230px",
          height: "274px",
          filter: "blur(25px)",
          zIndex: 0,
        }}
      />
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

      {/* Rectangle 158 - Image (Top Part) */}
      <div className="absolute rounded-t-[15px] overflow-hidden left-0 top-0 w-full h-[168px] sm:w-[574px] sm:h-[384px] z-20">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Rectangle 159 - White Card (Bottom Part) */}
      <div className="absolute bg-white rounded-b-[15px] left-0 top-[168px] sm:top-[384px] w-full sm:w-[574px] h-[136px] sm:h-[311px] shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] z-10" />

      {/* Title Text */}
      <h3 className="absolute w-[210px] sm:w-[481px] text-[10px] sm:text-[18px] font-bold font-montserrat text-black left-[19px] sm:left-[59px] top-[177px] sm:top-[426px] leading-[1.22] sm:leading-[1.556] z-30">
        {title}
      </h3>

      {/* Group 145 - Website Link */}
      <a
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute flex items-center gap-2 sm:gap-4 group left-[19px] sm:left-[59px] top-[234px] sm:top-[532px] z-30"
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

      {/* Group 146 - VK Link */}
      <a
        href={vkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute flex items-center gap-2 sm:gap-[11px] group left-[19px] sm:left-[59px] top-[260px] sm:top-[595px] z-30"
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
    </article>
  );
}
