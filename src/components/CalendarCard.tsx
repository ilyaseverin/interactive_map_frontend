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
  width: "w-full lg:w-[455px]",
  height: "h-[308px]",
} as const;

const SHADOW_DIMENSIONS = {
  width: "w-[359px]",
  height: "h-[197px]",
} as const;

const ICON_SIZE = 50;

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
  <div
    className={`absolute ${SHADOW_DIMENSIONS.width} ${SHADOW_DIMENSIONS.height} bg-[rgba(33,66,95,0.3)] blur-[84px]`}
    style={{ left: `${position.left}px`, top: `${position.top}px` }}
  />
);

const SecondaryBlur = () => (
  <div className="absolute left-[40px] top-[28px] w-[374px] h-[253px] bg-[rgba(29,78,137,0.6)] blur-[74px] rounded-[15px]" />
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
  const iconElement = (
    <Image src={src} alt={alt} width={ICON_SIZE} height={ICON_SIZE} />
  );

  if (position) {
    return (
      <div
        className="absolute w-[50px] h-[50px]"
        style={{ left: `${position.left}px`, top: `${position.top}px` }}
      >
        {iconElement}
      </div>
    );
  }

  return <div className="w-[50px] h-[50px] mb-4">{iconElement}</div>;
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
      className={`text-[22px] font-montserrat ${textColorClass} ${fontWeightClass} mt-auto`}
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
        <div className="relative z-10 h-full">
          {icon && (
            <CardIcon src={icon} alt={title} position={config.iconPosition} />
          )}
        </div>
      );
    }

    // Карточка с фоном (Фильм дня) - иконка и текст с padding внутри
    if (hasBackground) {
      return (
        <div className="relative z-10 p-10 h-full flex flex-col justify-between">
          {icon && <CardIcon src={icon} alt={title} />}
          {description && <CardText text={description} config={config} />}
        </div>
      );
    }

    // Белые карточки (Человек дня, Тема дня) - иконка и текст
    // padding применяется на контейнере (см. ниже)
    return (
      <div className="relative z-10 h-full flex flex-col">
        {icon && <CardIcon src={icon} alt={title} />}
        {description && <CardText text={description} config={config} />}
      </div>
    );
  };

  // Padding на контейнере только для белых карточек (person, theme)
  const containerPadding =
    config.contentPadding && !hasBackground ? "p-10" : "";

  return (
    <div
      className={`relative group cursor-pointer ${CARD_DIMENSIONS.width} ${CARD_DIMENSIONS.height}`}
    >
      {/* Тени */}
      <BlueShadow position={config.shadowPosition} />
      {config.hasSecondaryBlur && <SecondaryBlur />}

      {/* Контейнер карточки */}
      <div
        className={`relative bg-white rounded-[15px] w-full lg:w-[455px] h-full shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] overflow-hidden transition-transform group-hover:scale-[1.02] ${containerPadding}`}
      >
        {/* Фоновое изображение */}
        {backgroundImage && (
          <BackgroundImage
            src={backgroundImage}
            alt={title}
            gradient={gradient}
          />
        )}

        {/* Содержимое */}
        {renderContent()}
      </div>
    </div>
  );
}
