import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  date?: string;
  description?: string;
  image: string;
  href: string;
  size?: "large" | "medium" | "xlarge";
}

export default function ProjectCard({
  title,
  date,
  description,
  image,
  href,
  size = "medium",
}: ProjectCardProps) {
  // Размеры карточек согласно Figma
  const getSizeClasses = () => {
    switch (size) {
      case "large":
        return "max-w-[240px] sm:max-w-[657px] mx-auto";
      case "xlarge":
        return "max-w-[240px] sm:max-w-[724px] mx-auto";
      default:
        return "max-w-[240px] sm:max-w-[422px] mx-auto";
    }
  };

  // Высота карточек на мобильных (из Figma): large=149px, medium=240px, xlarge=232px
  const getMobileHeight = () => {
    switch (size) {
      case "large":
        return "h-[149px]";
      case "xlarge":
        return "h-[232px]";
      default:
        return "h-[240px]";
    }
  };

  // Позиция текста внутри карточки (согласно Figma)
  const getTextPosition = () => {
    if (size === "large") {
      // Проект 1: дата y=279, заголовок y=314
      return { x: "37px", dateY: "279px", titleY: "314px" };
    } else if (size === "xlarge") {
      // Проект 6: Group 139 на x=41, y=234. Внутри: дата x=1,y=0; заголовок x=0,y=26; описание x=0,y=66
      return {
        dateX: "42px",
        x: "41px",
        dateY: "234px",
        titleY: "260px",
        descY: "300px",
      };
    } else {
      // Проекты 2-5: заголовок y=242 (среднее значение)
      return { x: "36px", y: "242px" };
    }
  };

  const textPos = getTextPosition();
  const isLargeCard = size === "large" || size === "xlarge";

  return (
    <Link
      href={href}
      className={`relative group overflow-hidden rounded-[15px] ${getSizeClasses()} ${getMobileHeight()} sm:h-[411px] w-full block`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Gradient Overlay - начинается с y=13px */}
      <div
        className="absolute inset-0 top-[13px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(217, 217, 217, 0) 11%, rgba(0, 0, 0, 0.4) 57%, rgba(0, 0, 0, 0.94) 88%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">
        {/* Date - только для large и xlarge */}
        {isLargeCard && date && (
          <>
            {/* Mobile positioning */}
            <p className="sm:hidden absolute left-[13.4px] top-[98.88px] text-[9px] font-semibold font-montserrat text-white leading-[1.219]">
              {date}
            </p>
            {/* Desktop positioning */}
            <p
              className="hidden sm:block absolute text-[20px] font-semibold font-montserrat text-white leading-[1.219]"
              style={{
                left: textPos.dateX || textPos.x,
                top: textPos.dateY,
              }}
            >
              {date}
            </p>
          </>
        )}

        {/* Title */}
        <>
          {/* Mobile positioning */}
          <h3
            className={`sm:hidden absolute left-[13.39px] top-[111.15px] text-[10px] font-semibold font-montserrat text-white leading-[1.219] ${
              size === "large" ? "uppercase" : ""
            }`}
            style={{
              maxWidth:
                size === "large"
                  ? "172.02px"
                  : size === "xlarge"
                  ? "177px"
                  : "177px",
            }}
          >
            {title}
          </h3>
          {/* Desktop positioning */}
          <h3
            className={`hidden sm:block absolute text-[24px] font-semibold font-montserrat text-white leading-[1.219] ${
              size === "large" ? "uppercase" : ""
            }`}
            style={{
              left: textPos.x,
              top: isLargeCard ? textPos.titleY : textPos.y,
              maxWidth:
                size === "xlarge"
                  ? "579px"
                  : size === "large"
                  ? "418px"
                  : "347px",
            }}
          >
            {title}
          </h3>
        </>

        {/* Description - только для xlarge */}
        {description && size === "xlarge" && (
          <p
            className="hidden sm:block absolute text-[24px] font-normal font-montserrat text-white leading-[1.219] max-w-[613px]"
            style={{ left: textPos.x, top: textPos.descY }}
          >
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
