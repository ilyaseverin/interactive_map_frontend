"use client";

interface CategoryButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
  variant?: "mobile" | "tablet" | "desktop";
}

export default function CategoryButton({
  label,
  isActive,
  onClick,
  className = "",
  variant = "desktop",
}: CategoryButtonProps) {
  // Стили для разных вариантов
  const variantStyles = {
    mobile:
      "px-[18px] py-[8px] h-[36px] rounded-[8px] text-[12px] leading-[1.2]",
    tablet:
      "px-[20px] py-[12px] min-h-[48px] rounded-[10px] text-[16px] leading-[1.875]",
    desktop:
      "px-[40px] xl:px-[65px] py-3 xl:py-4 min-h-[48px] xl:h-auto rounded-[9px] text-[18px] xl:text-[20px] leading-[1.219]",
  };

  const baseStyles =
    "font-normal font-montserrat transition-colors flex items-center justify-center md:whitespace-nowrap cursor-pointer";
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
