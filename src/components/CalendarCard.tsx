import Image from "next/image";
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
}

interface CardConfig {
  shadowPosition: { left: number; top: number };
  hasSecondaryBlur?: boolean;
  iconPosition?: { left: number; top: number };
  contentPadding?: boolean;
  textColor: "white" | "black";
  lineHeight: number;
  fontWeight: "normal" | "bold";
}

// ============================================================================
// CONSTANTS
// ============================================================================

const CARD_DIMENSIONS = {
  width: "w-full sm:w-[249px] lg:w-[455px]",
  height: "h-[58px] sm:h-[58px] lg:h-[308px]",
} as const;

const SHADOW_DIMENSIONS = {
  mobile: {
    width: "w-[222px]",
    height: "h-[28px]",
  },
  desktop: {
    width: "w-[359px]",
    height: "h-[197px]",
  },
} as const;

const ICON_SIZE = {
  mobile: 20,
  desktop: 50,
};

// Конфигурация для каждого типа карточки
const CARD_CONFIGS: Record<CardType, CardConfig> = {
  event: {
    shadowPosition: { left: 38, top: 61 },
    iconPosition: { left: 40, top: 29 },
    textColor: "white",
    lineHeight: 1.364,
    fontWeight: "normal",
  },
  movie: {
    shadowPosition: { left: 36, top: 60 },
    contentPadding: true,
    textColor: "white",
    lineHeight: 1.364,
    fontWeight: "normal",
  },
  person: {
    shadowPosition: { left: 58, top: 61 },
    hasSecondaryBlur: true,
    contentPadding: true,
    textColor: "black",
    lineHeight: 1.227,
    fontWeight: "normal",
  },
  theme: {
    shadowPosition: { left: 58, top: 61 },
    hasSecondaryBlur: true,
    contentPadding: true,
    textColor: "black",
    lineHeight: 1.364,
    fontWeight: "bold",
  },
};

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

interface BlueShadowProps {
  position: { left: number; top: number };
}

const BlueShadow = ({ position }: BlueShadowProps) => (
  <>
    {/* Desktop shadow only - в мобильной версии используется обычная box-shadow */}
    <div
      className={`hidden lg:block absolute ${SHADOW_DIMENSIONS.desktop.width} ${SHADOW_DIMENSIONS.desktop.height} bg-[rgba(33,66,95,0.3)] blur-[84px]`}
      style={{ left: `${position.left}px`, top: `${position.top}px` }}
    />
  </>
);

const SecondaryBlur = () => (
  <div className="hidden lg:block absolute left-[40px] top-[28px] w-[374px] h-[253px] bg-[rgba(29,78,137,0.6)] blur-[74px] rounded-[15px]" />
);

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

interface CardIconProps {
  src: string;
  alt: string;
  position?: { left: number; top: number };
}

const CardIcon = ({ src, alt, position }: CardIconProps) => {
  if (position) {
    return (
      <>
        {/* Mobile positioned icon - без фона */}
        <div
          className="absolute lg:hidden w-[37px] h-[43px] bg-transparent"
          style={{ left: "20px", top: "5px" }}
        >
          <Image
            src={src}
            alt={alt}
            width={37}
            height={43}
            className="w-full h-full object-contain bg-transparent"
            style={{ background: "transparent" }}
          />
        </div>
        {/* Desktop positioned icon */}
        <div
          className="hidden lg:block absolute w-[50px] h-[50px]"
          style={{ left: `${position.left}px`, top: `${position.top}px` }}
        >
          <Image
            src={src}
            alt={alt}
            width={ICON_SIZE.desktop}
            height={ICON_SIZE.desktop}
          />
        </div>
      </>
    );
  }

  return (
    <div className="w-[37px] h-[43px] lg:w-[50px] lg:h-[50px] mb-0 lg:mb-4 flex-shrink-0 bg-transparent lg:bg-white">
      <Image
        src={src}
        alt={alt}
        width={50}
        height={50}
        className="w-full h-full object-contain bg-transparent lg:bg-white"
      />
    </div>
  );
};

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
      className={`text-[12px] sm:text-[12px] lg:text-[22px] font-montserrat ${textColorClass} ${fontWeightClass} mt-auto`}
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
}: CalendarCardProps) {
  const config = CARD_CONFIGS[type];
  const hasBackground = Boolean(backgroundImage);

  const renderContent = (): ReactNode => {
    // Карточка "Событие дня" - только иконка с фиксированной позицией
    if (type === "event") {
      return (
        <>
          {/* Mobile - только иконка + название */}
          <div className="lg:hidden relative z-10 h-full">
            {icon && (
              <CardIcon
                src={icon}
                alt={title}
                position={{ left: 20, top: 5 }}
              />
            )}
            {title && (
              <div className="absolute left-[52px] top-[17px] w-[174px] flex items-center justify-center">
                <p className="text-[12px] font-montserrat text-black font-normal leading-[1.667]">
                  {title}
                </p>
              </div>
            )}
          </div>
          {/* Desktop - только иконка */}
          <div className="hidden lg:block relative z-10 h-full">
            {icon && (
              <CardIcon src={icon} alt={title} position={config.iconPosition} />
            )}
          </div>
        </>
      );
    }

    // Все остальные карточки (Фильм дня, Человек дня, Тема дня)
    return (
      <>
        {/* Mobile layout - только название блока без фона и без description */}
        <div className="lg:hidden relative z-10 h-full">
          {icon && (
            <CardIcon src={icon} alt={title} position={{ left: 20, top: 5 }} />
          )}
          {title && (
            <div className="absolute left-[52px] top-[17px] w-[174px] flex items-center justify-center">
              <p className="text-[12px] font-montserrat text-black font-normal leading-[1.667]">
                {title}
              </p>
            </div>
          )}
        </div>

        {/* Desktop layout - с фоном и полным description */}
        <div className="hidden lg:flex relative z-10 h-full flex-col">
          {hasBackground ? (
            // С фоном (Фильм дня) - padding внутри
            <div className="relative p-10 h-full flex flex-col justify-between">
              {icon && <CardIcon src={icon} alt={title} />}
              {description && <CardText text={description} config={config} />}
            </div>
          ) : (
            // Без фона (Человек дня, Тема дня)
            <>
              {icon && <CardIcon src={icon} alt={title} />}
              {description && <CardText text={description} config={config} />}
            </>
          )}
        </div>
      </>
    );
  };

  // Padding на контейнере только для белых карточек desktop (person, theme)
  const containerPadding =
    config.contentPadding && !hasBackground ? "lg:p-10" : "";

  return (
    <div
      className={`relative group cursor-pointer ${CARD_DIMENSIONS.width} ${CARD_DIMENSIONS.height}`}
    >
      {/* Тени */}
      <BlueShadow position={config.shadowPosition} />
      {config.hasSecondaryBlur && <SecondaryBlur />}

      {/* Контейнер карточки */}
      <div
        className={`relative bg-white rounded-[15px] w-full sm:w-[249px] lg:w-[455px] h-full shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] overflow-hidden transition-transform group-hover:scale-[1.02] ${containerPadding}`}
      >
        {/* Фоновое изображение только на десктопе */}
        {backgroundImage && (
          <div className="hidden lg:block absolute inset-0">
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
