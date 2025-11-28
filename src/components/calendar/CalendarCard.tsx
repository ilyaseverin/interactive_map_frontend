import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

// ============================================================================
// TYPES
// ============================================================================

type CardType = "person" | "event" | "movie" | "theme";

interface CalendarCardProps {
  type: CardType;
  icon?: string;
  title?: string;
  description?: string;
  backgroundImage?: string;
  gradient?: string;
  href?: string; // Ссылка на страницу события
  onClick?: () => void; // Обработчик клика (приоритет над href)
  disabled?: boolean; // Состояние disabled
}

interface CardConfig {
  iconPosition?: { left: number; top: number };
  contentPadding?: boolean;
  textColor: "white" | "black";
  lineHeight: number;
  fontWeight: "normal" | "bold";
}

// ============================================================================
// CONSTANTS
// ============================================================================

// Динамические размеры в зависимости от типа карточки
const getCardDimensions = (type: CardType) => {
  switch (type) {
    case "person":
      return {
        width: "w-full md:w-[281px] lg:w-[455px]",
        height: "h-[58px] md:h-[250px] lg:h-[308px]",
      };
    case "event":
      return {
        width: "w-full md:w-[351px] lg:w-[455px]",
        height: "h-[58px] md:h-[250px] lg:h-[308px]",
      };
    case "movie":
      return {
        width: "w-full md:w-[351px] lg:w-[455px]",
        height: "h-[58px] md:h-[255px] lg:h-[308px]",
      };
    case "theme":
      return {
        width: "w-full md:w-[281px] lg:w-[455px]",
        height: "h-[58px] md:h-[255px] lg:h-[308px]",
      };
  }
};

// Конфигурация для каждого типа карточки
const CARD_CONFIGS: Record<CardType, CardConfig> = {
  event: {
    iconPosition: { left: 40, top: 29 },
    textColor: "white",
    lineHeight: 1.364,
    fontWeight: "normal",
  },
  movie: {
    iconPosition: { left: 40, top: 29 },
    contentPadding: true,
    textColor: "white",
    lineHeight: 1.219,
    fontWeight: "normal",
  },
  person: {
    iconPosition: { left: 40, top: 29 },
    contentPadding: true,
    textColor: "black",
    lineHeight: 1.35,
    fontWeight: "normal",
  },
  theme: {
    iconPosition: { left: 40, top: 29 },
    contentPadding: true,
    textColor: "black",
    lineHeight: 1.364,
    fontWeight: "bold",
  },
};

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

interface BackgroundImageProps {
  src: string;
  alt: string;
  gradient?: string;
}

const BackgroundImage = ({ src, alt, gradient }: BackgroundImageProps) => (
  <div className="absolute inset-0">
    <Image src={src} alt={alt} fill className="object-cover" />
    {gradient && (
      <div className="absolute inset-0" style={{ background: gradient }} />
    )}
  </div>
);

interface CardTextProps {
  text: string;
  config: CardConfig;
}

const CardText = ({ text, config }: CardTextProps) => {
  const lines = text.split("\n");
  const textColorClass =
    config.textColor === "white" ? "text-white" : "text-black";
  const fontWeightClass =
    config.fontWeight === "bold" ? "font-bold" : "font-normal";

  return (
    <p
      className={`text-[12px] md:text-[20px] lg:text-[22px] font-montserrat ${textColorClass} ${fontWeightClass} mt-auto`}
      style={{ lineHeight: config.lineHeight }}
    >
      {lines.map((line, index) => (
        <span key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function CalendarCard({
  type,
  icon,
  title = "",
  description,
  backgroundImage,
  gradient,
  href,
  onClick,
  disabled = false,
}: CalendarCardProps) {
  const config = CARD_CONFIGS[type];

  const renderContent = (): ReactNode => {
    // Карточка "Событие дня" - только иконка (без названия)
    if (type === "event") {
      return (
        <>
          {/* Mobile - иконка + название, и description если есть */}
          <div className="md:hidden relative z-10 h-full flex flex-col items-center justify-center">
            {icon && (
              <div className="absolute left-[20px] w-[37px] h-[43px]">
                <Image
                  src={icon}
                  alt={title}
                  width={37}
                  height={43}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            {title && (
              <div className="w-full flex items-center justify-center mb-1">
                <p className="text-[12px] font-montserrat text-black font-normal leading-[1.667] text-center">
                  {title}
                </p>
              </div>
            )}
            {description && (
              <div className="w-full px-4 flex items-center justify-center mt-1">
                <p className="text-[12px] font-montserrat text-black font-normal leading-[1.667] text-center">
                  {description}
                </p>
              </div>
            )}
          </div>
          {/* Tablet & Desktop - иконка на фиксированной позиции и description если есть */}
          <div className="hidden md:flex relative z-10 h-full flex-col">
            {icon && config.iconPosition && (
              <div
                className="absolute w-[48px] h-[50px] md:w-[48px] md:h-[50px] lg:w-[50px] lg:h-[50px]"
                style={{
                  left: `${config.iconPosition.left - 22}px`,
                  top: `${config.iconPosition.top - 10}px`,
                }}
              >
                <Image
                  src={icon}
                  alt={title}
                  width={50}
                  height={50}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            {/* Текст внизу карточки */}
            {description && (
              <div className="absolute left-[23px] md:left-[23px] lg:left-10 bottom-[30px] md:bottom-[50px] lg:bottom-[50px] max-w-[234px] md:max-w-[234px] lg:max-w-[377px]">
                <CardText
                  text={description}
                  config={{
                    ...config,
                    textColor: backgroundImage ? config.textColor : "black",
                  }}
                />
              </div>
            )}
          </div>
        </>
      );
    }

    // Все остальные карточки (Фильм дня, Человек дня, Тема дня)
    return (
      <>
        {/* Mobile layout - название блока и description если есть */}
        <div className="md:hidden relative z-10 h-full flex flex-col items-center justify-center">
          {icon && (
            <div className="absolute left-[20px] w-[37px] h-[43px]">
              <Image
                src={icon}
                alt={title}
                width={37}
                height={43}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          {title && (
            <div className="w-full flex items-center justify-center mb-1">
              <p
                className={`text-[12px] font-montserrat text-black leading-[1.667] text-center ${
                  type === "movie" ? "font-bold" : "font-normal"
                }`}
              >
                {title}
              </p>
            </div>
          )}
          {description && (
            <div className="w-full px-4 flex items-center justify-center mt-1">
              <p className="text-[12px] font-montserrat text-black font-normal leading-[1.667] text-center">
                {description}
              </p>
            </div>
          )}
        </div>

        {/* Tablet & Desktop layout - с фоном и полным description */}
        <div className="hidden md:flex relative z-10 h-full flex-col">
          {/* Иконка на фиксированной позиции для всех карточек */}
          {icon && config.iconPosition && (
            <div
              className="absolute w-[48px] h-[50px] md:w-[48px] md:h-[50px] lg:w-[50px] lg:h-[50px]"
              style={{
                left: `${config.iconPosition.left - 19}px`,
                top: `${config.iconPosition.top - 7}px`,
              }}
            >
              <Image
                src={icon}
                alt={title}
                width={50}
                height={50}
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Текст внизу карточки */}
          <div className="absolute left-[23px] md:left-[23px] lg:left-10 bottom-[30px] md:bottom-[50px] lg:bottom-[50px] max-w-[234px] md:max-w-[234px] lg:max-w-[377px]">
            {type === "movie" && title && description ? (
              <div className="flex flex-col">
                <CardText
                  text={title}
                  config={{
                    ...config,
                    fontWeight: "bold",
                    textColor: backgroundImage ? config.textColor : "black",
                  }}
                />
                <CardText
                  text={description}
                  config={{
                    ...config,
                    textColor: backgroundImage ? config.textColor : "black",
                  }}
                />
              </div>
            ) : description ? (
              <CardText
                text={description}
                config={{
                  ...config,
                  textColor: backgroundImage ? config.textColor : "black",
                }}
              />
            ) : null}
          </div>
        </div>
      </>
    );
  };

  const cardDimensions = getCardDimensions(type);

  const wrapperClassName = `relative group block ${
    disabled
      ? "cursor-not-allowed opacity-50"
      : href || onClick
      ? "cursor-pointer"
      : ""
  } ${cardDimensions.width} ${cardDimensions.height} ${
    disabled ? "" : href || onClick ? "pointer-events-auto" : ""
  }`;

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  // Если есть onClick, используем div с обработчиком
  if (onClick && !disabled) {
    return (
      <div className={wrapperClassName} onClick={handleClick}>
        {/* Контейнер карточки */}
        <div
          className={`relative bg-white rounded-[15px] w-full h-full shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] overflow-hidden transition-transform group-hover:scale-[1.02]`}
        >
          {/* Фоновое изображение для планшета и десктопа */}
          {backgroundImage && (
            <div className="hidden md:block absolute inset-0">
              <BackgroundImage
                src={backgroundImage}
                alt={title}
                gradient={gradient}
              />
            </div>
          )}

          {/* Содержимое */}
          {renderContent()}
        </div>
      </div>
    );
  }

  // Если нет href или disabled, используем div
  if (!href || disabled) {
    return (
      <div className={wrapperClassName}>
        {/* Контейнер карточки */}
        <div
          className={`relative bg-white rounded-[15px] w-full h-full shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] overflow-hidden transition-transform ${
            disabled ? "" : ""
          }`}
        >
          {/* Фоновое изображение для планшета и десктопа */}
          {backgroundImage && (
            <div className="hidden md:block absolute inset-0">
              <BackgroundImage
                src={backgroundImage}
                alt={title}
                gradient={gradient}
              />
            </div>
          )}

          {/* Содержимое */}
          {renderContent()}
        </div>
      </div>
    );
  }

  // Если есть href, используем Link
  return (
    <Link
      href={href}
      className={wrapperClassName}
      aria-disabled={disabled}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
        }
      }}
    >
      {/* Контейнер карточки */}
      <div
        className={`relative bg-white rounded-[15px] w-full h-full shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] overflow-hidden transition-transform ${
          disabled ? "" : "group-hover:scale-[1.02]"
        }`}
      >
        {/* Фоновое изображение для планшета и десктопа */}
        {backgroundImage && (
          <div className="hidden md:block absolute inset-0">
            <BackgroundImage
              src={backgroundImage}
              alt={title}
              gradient={gradient}
            />
          </div>
        )}

        {/* Содержимое */}
        {renderContent()}
      </div>
    </Link>
  );
}
