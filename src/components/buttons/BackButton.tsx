import Link from "next/link";

interface BackButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "default" | "red" | "icon";
  ariaLabel?: string;
  className?: string;
}

export default function BackButton({
  href,
  onClick,
  variant = "default",
  ariaLabel = "Назад",
  className = "",
}: BackButtonProps) {
  // Если передан onClick, используем button вместо Link
  const isButton = !!onClick;
  const Component = isButton ? "button" : Link;
  const componentProps = isButton
    ? { onClick, "aria-label": ariaLabel }
    : { href: href || "#" };

  // Вариант "icon" - только иконка с рамкой
  if (variant === "icon") {
    return (
      <Component
        {...componentProps}
        className={`inline-flex items-center justify-center w-[34px] h-[34px] rounded-[7px] border border-[#C62828] hover:bg-[#C62828] active:bg-[#B71C1C] active:scale-95 transition-all duration-150 group ${className}`}
      >
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
      </Component>
    );
  }

  // Вариант "red" - красная кнопка (мобильная только иконка, десктоп с текстом)
  if (variant === "red") {
    return (
      <>
        {/* Мобильная версия (только иконка) */}
        <Component
          {...componentProps}
          className={`md:hidden inline-flex items-center justify-center w-[34px] h-[34px] rounded-[7px] bg-[#C62828] hover:bg-[#B71C1C] transition-colors ${className}`}
        >
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
        </Component>

        {/* Планшет и десктоп версия (с текстом) */}
        <Component
          {...componentProps}
          className={`hidden md:inline-flex items-center justify-center gap-[10px] px-[24px] py-[16px] bg-[#C62828] hover:bg-[#B71C1C] text-[#EDF3F7] text-[16px] md:text-[16px] lg:text-[20px] font-medium font-montserrat rounded-[12px] transition-colors leading-[1.219] ${className}`}
        >
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
        </Component>
      </>
    );
  }

  // Вариант "default" - кнопка с рамкой и текстом
  return (
    <Component
      {...componentProps}
      className={`inline-flex items-center justify-center gap-[10px] w-[123px] h-[40px] md:w-auto md:h-[48px] lg:h-[56px] px-[24px] md:px-[24px] lg:px-[24px] py-0 md:py-0 lg:py-0 border border-[#C62828] text-[#C62828] text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat rounded-[12px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219] ${className}`}
    >
      <svg
        width="33"
        height="25"
        viewBox="0 0 33 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 w-[18px] h-[13px] md:w-[33px] md:h-[25px]"
      >
        <path
          d="M6 13L28 13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M13 6L6 13L13 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Назад
    </Component>
  );
}
