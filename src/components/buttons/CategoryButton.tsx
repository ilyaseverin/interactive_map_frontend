"use client";

interface CategoryButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
  variant?: "mobile" | "tablet" | "desktop" | "responsive";
}

export default function CategoryButton({
  label,
  isActive,
  onClick,
  className = "",
  variant = "responsive",
}: CategoryButtonProps) {
  // Стили для разных вариантов
  const variantStyles = {
    mobile:
      "px-[18px] py-[8px] h-[36px] rounded-[8px] text-[12px] leading-[1.2]",
    tablet:
      "px-[20px] py-[12px] min-h-[48px] rounded-[10px] text-[16px] leading-[1.875]",
    desktop:
      "px-[24px] py-[16px] min-h-[48px] rounded-[9px] text-[18px] xl:text-[20px] leading-[1.219]",
    responsive:
      "px-[18px] md:px-[20px] lg:px-[24px] py-[8px] md:py-[12px] lg:py-[16px] h-[36px] md:min-h-[48px] lg:h-auto rounded-[8px] md:rounded-[10px] lg:rounded-[9px] text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] leading-[1.2] md:leading-[1.875] lg:leading-[1.219]",
  };

  const baseStyles =
    "font-normal font-montserrat transition-colors flex items-center justify-center whitespace-nowrap cursor-pointer";
  const activeStyles = "bg-[#1D4E89] text-[#FFFEFE]";
  const inactiveStyles =
    "bg-white text-[#1D4E89] border border-[#1D4E89] hover:bg-gray-50";

  return (
    <button
      onClick={onClick}
      className={`${variantStyles[variant]} ${baseStyles} ${
        isActive ? activeStyles : inactiveStyles
      } ${className}`}
    >
      {label}
    </button>
  );
}
