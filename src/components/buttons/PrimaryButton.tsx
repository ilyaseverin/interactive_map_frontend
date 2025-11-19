import Link from "next/link";

interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "home" | "default";
}

export default function PrimaryButton({
  href,
  children,
  className = "",
  variant = "default",
}: PrimaryButtonProps) {
  // Стили для разных вариантов
  const variantStyles = {
    home: "w-[232px] h-[40px] md:w-[232px] md:h-[48px] px-[25px] py-[10px] md:px-5 md:py-[12px] text-[12px] md:text-[16px] rounded-lg md:rounded-[10px]",
    default: "w-[240px] sm:w-[394px] h-[40px] sm:h-[55px] px-[25px] py-[10px] sm:px-6 sm:py-4 text-[12px] sm:text-[24px] rounded-lg sm:rounded-xl",
  };

  const baseStyles =
    "inline-flex items-center justify-center bg-[#C62828] hover:bg-[#B71C1C] text-white font-medium font-montserrat transition-colors shadow-lg leading-[1.219]";

  return (
    <Link href={href} className={`${variantStyles[variant]} ${baseStyles} ${className}`}>
      {children}
    </Link>
  );
}

