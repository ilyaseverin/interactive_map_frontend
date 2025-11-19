interface SubmitButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  variant?: "form" | "default";
}

export default function SubmitButton({
  children,
  onClick,
  type = "submit",
  disabled = false,
  className = "",
  variant = "form",
}: SubmitButtonProps) {
  // Стили для разных вариантов
  const variantStyles = {
    form: "w-full md:w-[58%] lg:w-[500px] h-[47px] md:h-[48px] lg:h-[63px] text-[12px] md:text-[16px] lg:text-[20px] rounded-[12px]",
    default: "px-6 py-3 text-base rounded-lg",
  };

  const baseStyles =
    "inline-flex items-center justify-center bg-[#C62828] hover:bg-[#B71C1C] disabled:bg-gray-400 disabled:cursor-not-allowed text-[#EDF3F7] font-medium font-montserrat transition-colors leading-[1.219]";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variantStyles[variant]} ${baseStyles} ${className}`}
    >
      {children}
    </button>
  );
}

