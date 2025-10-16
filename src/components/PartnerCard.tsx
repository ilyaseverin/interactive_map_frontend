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
    <article className="relative w-[574px] h-[695px]">
      {/* Rectangle 157 - Blur Background */}
      <div
        className="absolute bg-[#1D4E89] rounded-[15px]"
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
      <div
        className="absolute rounded-t-[15px] overflow-hidden"
        style={{
          left: "0px",
          top: "0px",
          width: "574px",
          height: "384px",
          zIndex: 20,
        }}
      >
        <Image
          src={image}
          alt={title}
          width={574}
          height={384}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>

      {/* Rectangle 159 - White Card (Bottom Part) */}
      <div
        className="absolute bg-white rounded-b-[15px]"
        style={{
          left: "0px",
          top: "384px",
          width: "574px",
          height: "311px",
          boxShadow: "0px 3px 14px 0px rgba(0, 0, 0, 0.08)",
          zIndex: 10,
        }}
      />

      {/* Title Text */}
      <h3
        className="absolute w-[481px] text-[18px] font-bold font-montserrat text-black"
        style={{
          left: "59px",
          top: "426px",
          lineHeight: "1.556em",
          zIndex: 30,
        }}
      >
        {title}
      </h3>

      {/* Group 145 - Website Link */}
      <a
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute flex items-center gap-4 group"
        style={{
          left: "59px",
          top: "532px",
          zIndex: 30,
        }}
      >
        {/* Icon */}
        <div className="w-[53px] h-[53px] relative flex-shrink-0">
          <Image
            src="/images/partners/link-icon.png"
            alt="Website"
            fill
            className="object-contain"
          />
        </div>

        {/* Text */}
        <span className="text-[20px] font-normal font-montserrat text-black group-hover:text-[#1D4E89] transition-colors leading-[1.219em]">
          {websiteText}
        </span>
      </a>

      {/* Group 146 - VK Link */}
      <a
        href={vkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute flex items-center gap-[11px] group"
        style={{
          left: "59px",
          top: "595px",
          zIndex: 30,
        }}
      >
        {/* Icon */}
        <div className="w-[58px] h-[58px] relative flex-shrink-0">
          <Image
            src="/images/partners/vk-icon.png"
            alt="VK"
            fill
            className="object-contain"
          />
        </div>

        {/* Text */}
        <span className="text-[20px] font-normal font-montserrat text-black group-hover:text-[#1D4E89] transition-colors leading-[1.219em]">
          {vkText}
        </span>
      </a>
    </article>
  );
}
