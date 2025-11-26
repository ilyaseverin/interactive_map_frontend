import React from "react";
import Image from "next/image";
import { BattleGloryPoint } from "@/types/strapi";

interface BattleGloryMarkerProps {
  point: BattleGloryPoint;
  isSelected: boolean;
  onClick: (point: BattleGloryPoint) => void;
  size?: "small" | "medium" | "large";
}

// Иконки для разных типов объектов
const TYPE_ICONS = {
  "памятник/мемориал": "/images/monument-icon.svg",
  "мемориальная доска": "/images/memorial-board-icon.svg",
  "воинское захоронение": "/images/burial-icon.svg",
} as const;

const BattleGloryMarker: React.FC<BattleGloryMarkerProps> = ({
  point,
  isSelected,
  onClick,
  size = "medium",
}) => {
  const iconPath = TYPE_ICONS[point.point_type] || TYPE_ICONS["памятник/мемориал"];

  // Размеры иконок из макета (в пикселях)
  const iconSizes = {
    "памятник/мемориал": { width: 31, height: 48 },
    "мемориальная доска": { width: 42, height: 37 },
    "воинское захоронение": { width: 45, height: 49 },
  };

  const currentIconSize = iconSizes[point.point_type] || iconSizes["памятник/мемориал"];

  const sizeClasses = {
    small: "w-[31px] h-[48px]",
    medium: "w-[45px] h-[49px]",
    large: "w-[45px] h-[49px]",
  };

  return (
    <div
      className={`cursor-pointer transform transition-all duration-200 hover:scale-110 group relative ${sizeClasses[size]}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(point);
      }}
    >
      {/* Маркер с SVG иконкой */}
      <div className="relative w-full h-full">
        <Image
          src={iconPath}
          alt={point.point_type}
          width={currentIconSize.width}
          height={currentIconSize.height}
          className="w-full h-full object-contain drop-shadow-lg"
          style={{ filter: isSelected ? "drop-shadow(0 0 8px rgba(0,0,0,0.5))" : undefined }}
        />
      </div>
    </div>
  );
};

export default BattleGloryMarker;
