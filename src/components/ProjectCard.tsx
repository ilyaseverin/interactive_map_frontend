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
        return "w-full sm:w-[657px] mx-auto";
      case "xlarge":
        return "w-full sm:w-[724px] mx-auto";
      default:
        return "w-full sm:w-[422px] mx-auto";
    }
  };

  // Aspect ratio для карточек - адаптивный под изображение
  const getAspectClasses = () => {
    switch (size) {
      case "large":
        return "aspect-[240/149] sm:aspect-[657/411]";
      case "xlarge":
        return "aspect-[240/232] sm:aspect-[724/411]";
      default:
        return "aspect-square sm:aspect-[422/411]";
    }
  };

  const isLargeCard = size === "large" || size === "xlarge";

  return (
    <Link
      href={href}
      className={`relative group overflow-hidden rounded-[15px] ${getSizeClasses()} ${getAspectClasses()} block`}
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
      <div className="relative z-10 h-full flex flex-col justify-end pb-4 sm:pb-8 px-[13.4px] sm:px-[37px]">
        {/* Date - только для large и xlarge */}
        {isLargeCard && date && (
          <p className="text-[9px] sm:text-[20px] font-semibold font-montserrat text-white leading-[1.219] mb-1 sm:mb-2">
            {date}
          </p>
        )}

        {/* Title */}
        <h3
          className={`text-[10px] sm:text-[24px] font-semibold font-montserrat text-white leading-[1.219] mb-1 sm:mb-4 ${
            size === "large" ? "uppercase" : ""
          }`}
          style={{
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

        {/* Description - только для xlarge */}
        {description && size === "xlarge" && (
          <p className="text-[9px] sm:text-[24px] font-normal font-montserrat text-white leading-[1.219] max-w-[613px]">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
