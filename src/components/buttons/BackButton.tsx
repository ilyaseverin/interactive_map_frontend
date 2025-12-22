import Link from "next/link";

interface BackButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "default" | "red" | "icon";
  ariaLabel?: string;
  className?: string;
  children?: React.ReactNode; // Кастомный текст для кнопки
}

export default function BackButton({
  href,
  onClick,
  variant = "default",
  ariaLabel = "Назад",
  className = "",
  children,
}: BackButtonProps) {
  // Вариант "icon" - только иконка с рамкой
  if (variant === "icon") {
    const iconContent = (
      <svg
        width="18"
        height="13"
        viewBox="0 0 18 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rotate-180"
      >
        <path
          d="M2 6.5L16 6.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="stroke-[#C62828] group-hover:stroke-white group-active:stroke-white"
        />
        <path
          d="M10 1.5L16 6.5L10 11.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-[#C62828] group-hover:stroke-white group-active:stroke-white"
        />
      </svg>
    );

    if (onClick) {
      return (
        <button
          onClick={onClick}
          aria-label={ariaLabel}
          className={`inline-flex items-center justify-center w-[34px] h-[34px] rounded-[7px] border border-[#C62828] hover:bg-[#C62828] active:bg-[#B71C1C] active:scale-95 transition-all duration-150 group cursor-pointer ${className}`}
        >
          {iconContent}
        </button>
      );
    }

    return (
      <Link
        href={href || "#"}
        className={`inline-flex items-center justify-center w-[34px] h-[34px] rounded-[7px] border border-[#C62828] hover:bg-[#C62828] active:bg-[#B71C1C] active:scale-95 transition-all duration-150 group cursor-pointer ${className}`}
      >
        {iconContent}
      </Link>
    );
  }

  // Вариант "red" - красная кнопка (мобильная только иконка, десктоп с текстом)
  if (variant === "red") {
    const mobileIcon = (
      <svg
        width="18"
        height="13"
        viewBox="0 0 18 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rotate-180"
      >
        <path
          d="M2 7L16 7"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M10 2L16 7L10 12"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const desktopContent = (
      <>
        <svg
          width="33"
          height="25"
          viewBox="0 0 29 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-180 md:w-[22px] md:h-[13px]"
        >
          <path
            d="M2 9L27 9"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M20 2L27 9L20 16"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Назад
      </>
    );

    if (onClick) {
      return (
        <>
          {/* Мобильная версия (только иконка) */}
          <button
            onClick={onClick}
            aria-label={ariaLabel}
            className={`md:hidden inline-flex items-center justify-center w-[34px] h-[34px] rounded-[7px] bg-[#C62828] hover:bg-[#B71C1C] transition-colors cursor-pointer ${className}`}
          >
            {mobileIcon}
          </button>

          {/* Планшет и десктоп версия (с текстом) */}
          <button
            onClick={onClick}
            aria-label={ariaLabel}
            className={`hidden md:inline-flex items-center justify-center gap-[10px] px-[24px] py-[16px] md:h-[48px] lg:h-[57px] bg-[#C62828] hover:bg-[#B71C1C] text-[#EDF3F7] text-[16px] md:text-[16px] lg:text-[20px] font-medium font-montserrat rounded-[12px] transition-colors leading-[1.219] cursor-pointer ${className}`}
          >
            {desktopContent}
          </button>
        </>
      );
    }

    return (
      <>
        {/* Мобильная версия (только иконка) */}
        <Link
          href={href || "#"}
          className={`md:hidden inline-flex items-center justify-center w-[34px] h-[34px] rounded-[7px] bg-[#C62828] hover:bg-[#B71C1C] transition-colors cursor-pointer ${className}`}
        >
          {mobileIcon}
        </Link>

        {/* Планшет и десктоп версия (с текстом) */}
        <Link
          href={href || "#"}
          className={`hidden md:inline-flex items-center justify-center gap-[10px] px-[24px] py-[16px] md:h-[48px] lg:h-[57px] bg-[#C62828] hover:bg-[#B71C1C] text-[#EDF3F7] text-[16px] md:text-[16px] lg:text-[20px] font-medium font-montserrat rounded-[12px] transition-colors leading-[1.219] cursor-pointer ${className}`}
        >
          {desktopContent}
        </Link>
      </>
    );
  }

  // Вариант "default" - кнопка с рамкой и текстом
  const defaultContent = (
    <>
      <svg
        width="33"
        height="25"
        viewBox="0 0 29 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 rotate-180 w-[18px] h-[13px] md:w-[22px] md:h-[13px] lg:w-[33px] lg:h-[25px]"
      >
        <path
          d="M2 9L27 9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M20 2L27 9L20 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children || "Назад"}
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        aria-label={ariaLabel}
        className={`inline-flex items-center justify-center gap-[10px] px-[16px] md:px-[20px] lg:px-[24px] h-[40px] md:h-[48px] lg:h-[57px] border border-[#C62828] text-[#C62828] text-[14px] md:text-[16px] lg:text-[20px] font-normal font-montserrat rounded-[10px] lg:rounded-[12px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219] cursor-pointer ${className}`}
      >
        {defaultContent}
      </button>
    );
  }

  return (
    <Link
      href={href || "#"}
      className={`inline-flex items-center justify-center gap-[10px] px-[16px] md:px-[20px] lg:px-[24px] h-[40px] md:h-[48px] lg:h-[57px] border border-[#C62828] text-[#C62828] text-[14px] md:text-[16px] lg:text-[20px] font-normal font-montserrat rounded-[10px] lg:rounded-[12px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219] cursor-pointer ${className}`}
    >
      {defaultContent}
    </Link>
  );
}
