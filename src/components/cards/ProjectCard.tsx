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
  image,
  href,
  size = "medium",
}: ProjectCardProps) {
  // Размеры карточек согласно Figma
  const getSizeClasses = () => {
    switch (size) {
      case "large":
        return "w-full md:w-full lg:w-[657px] mx-auto";
      case "xlarge":
        return "w-full md:w-full lg:w-[724px] mx-auto";
      default:
        return "w-full md:w-full lg:w-[422px] mx-auto";
    }
  };

  // Aspect ratio для карточек - адаптивный под изображение
  const getAspectClasses = () => {
    switch (size) {
      case "large":
        return "aspect-[240/149] md:aspect-[330/327] lg:h-[422px]";
      case "xlarge":
        return "aspect-[240/232] md:aspect-[330/327] lg:h-[422px]";
      default:
        return "aspect-square md:aspect-[330/327] lg:h-[422px]";
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
      <div className="relative z-10 h-full flex flex-col justify-end pb-4 md:pb-6 lg:pb-8 xl:pb-[32px] px-[13.4px] md:px-[20px] lg:px-[28px] xl:px-[37px]">
        {/* Date - только для large и xlarge */}
        {isLargeCard && date && (
          <p className="text-[9px] md:text-[14px] lg:text-[16px] xl:text-[20px] font-semibold font-montserrat text-white leading-[1.3] mb-1 md:mb-1.5 lg:mb-2">
            {date}
          </p>
        )}

        {/* Title */}
        <h3
          className={`text-[12px] md:text-[16px] lg:text-[18px] xl:text-[24px] font-semibold font-montserrat text-white leading-[1.3] mb-1 md:mb-2 lg:mb-3 xl:mb-4 ${
            size === "large" ? "uppercase" : ""
          }`}
          style={{
            maxWidth:
              size === "xlarge" ? "90%" : size === "large" ? "85%" : "90%",
          }}
        >
          {title}
        </h3>
      </div>
    </Link>
  );
}
