import Link from "next/link";

interface SecondaryButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "mobile" | "tablet" | "desktop";
}

export default function SecondaryButton({
  href,
  children,
  className = "",
  variant = "desktop",
}: SecondaryButtonProps) {
  // Стили для разных вариантов
  const variantStyles = {
    mobile:
      "px-[18px] md:px-[25px] py-[8px] md:py-[10px] h-[40px] md:h-[40px] rounded-[8px] text-[12px] leading-[1.2]",
    tablet:
      "px-[20px] py-[12px] h-[48px] rounded-[10px] text-[16px] leading-[1.875]",
    desktop:
      "px-[20px] xl:px-[24px] py-3 xl:py-4 min-h-[48px] xl:h-auto rounded-[12px] text-[18px] xl:text-[20px] leading-[1.219]",
  };

  const baseStyles =
    "inline-flex items-center justify-center bg-white text-[#C62828] font-normal font-montserrat border border-[#C62828] hover:bg-[#C62828] hover:text-white transition-colors whitespace-nowrap";

  return (
    <Link
      href={href}
      className={`${variantStyles[variant]} ${baseStyles} ${className}`}
    >
      {children}
    </Link>
  );
}
