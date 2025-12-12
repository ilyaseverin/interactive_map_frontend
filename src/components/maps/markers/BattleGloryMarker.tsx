import React from "react";
import Image from "next/image";
import { BattleGloryPoint } from "@/types/strapi";
import {
  BATTLE_GLORY_TYPE_ICONS,
  BATTLE_GLORY_MARKER_ICON_SIZES,
} from "../constants/battleGlory";

interface BattleGloryMarkerProps {
  point: BattleGloryPoint;
  isSelected: boolean;
  onClick: (point: BattleGloryPoint) => void;
  size?: "small" | "medium" | "large";
}

const BattleGloryMarker: React.FC<BattleGloryMarkerProps> = ({
  point,
  isSelected,
  onClick,
  size = "medium",
}) => {
  const iconPath =
    BATTLE_GLORY_TYPE_ICONS[point.point_type] ||
    BATTLE_GLORY_TYPE_ICONS["памятник/мемориал"];

  const currentIconSize =
    BATTLE_GLORY_MARKER_ICON_SIZES[point.point_type] ||
    BATTLE_GLORY_MARKER_ICON_SIZES["памятник/мемориал"];

  const sizeClasses = {
    small: "w-[31px] h-[48px]",
    medium: "w-[45px] h-[49px]",
    large: "w-[45px] h-[49px]",
  };

  return (
    <div
      className={`cursor-pointer transform transition-all duration-200 hover:scale-110 group relative ${sizeClasses[size]} ${
        isSelected ? "scale-[2]" : ""
      }`}
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
          style={{
            filter: isSelected
              ? "drop-shadow(0 0 8px rgba(0,0,0,0.5))"
              : undefined,
          }}
        />
      </div>
    </div>
  );
};

export default BattleGloryMarker;
