import React from "react";
import Image from "next/image";
import { MapPoint } from "@/types/map";

interface MapMarkerProps {
  point: MapPoint;
  isSelected: boolean;
  onClick: (point: MapPoint) => void;
  size?: "small" | "medium" | "large";
}

const MapMarker: React.FC<MapMarkerProps> = ({
  point,
  isSelected,
  onClick,
  size = "medium",
}) => {
  const sizeClasses = {
    small: "w-4 h-5",
    medium: "w-6 h-8",
    large: "w-8 h-10",
  };

  const innerSizeClasses = {
    small: "w-2 h-2 top-0.5 left-0.5",
    medium: "w-3 h-3 top-1.5 left-1.5",
    large: "w-4 h-4 top-2 left-2",
  };

  const centerSizeClasses = {
    small: "w-0.5 h-0.5 top-0.75 left-0.75",
    medium: "w-1.5 h-1.5 top-2.25 left-2.25",
    large: "w-2 h-2 top-3 left-3",
  };

  const tipSizeClasses = {
    small: "top-2.5 left-0.5",
    medium: "top-5 left-1.5",
    large: "top-7 left-2",
  };

  const borderSizeClasses = {
    small: "2px",
    medium: "3px",
    large: "4px",
  };

  return (
    <div
      className={`cursor-pointer transform transition-all duration-200 hover:scale-110 group relative ${sizeClasses[size]}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(point);
      }}
    >
      {/* Маркер в виде капли */}
      <div className="relative w-full h-full">
        {/* Основная капля */}
        <div
          className={`absolute rounded-full border-2 border-white shadow-lg -rotate-45 top-0 left-0 ${
            size === "small"
              ? "w-4 h-4"
              : size === "medium"
              ? "w-6 h-6"
              : "w-8 h-8"
          }`}
          style={{ backgroundColor: point.color || "#3b82f6" }}
        />

        {/* Внутренний круг */}
        <div
          className={`absolute rounded-full border-2 border-white rotate-45 ${innerSizeClasses[size]}`}
          style={{ backgroundColor: point.color || "#3b82f6" }}
        />

        {/* Центральная точка */}
        <div
          className={`absolute rounded-full rotate-45 bg-white ${centerSizeClasses[size]}`}
        />

        {/* Острый кончик */}
        <div
          className={`absolute w-0 h-0 drop-shadow-sm ${tipSizeClasses[size]}`}
          style={{
            borderLeft: `${borderSizeClasses[size]} solid transparent`,
            borderRight: `${borderSizeClasses[size]} solid transparent`,
            borderTop: `${
              size === "small" ? "8px" : size === "medium" ? "12px" : "16px"
            } solid ${point.color || "#3b82f6"}`,
          }}
        />

        {/* Подсказка при нажатии */}
        <div
          className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-200 pointer-events-none z-10 ${
            isSelected ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-white rounded-lg shadow-lg p-3 min-w-[200px] border">
            {point.image && (
              <Image
                src={point.image}
                alt={point.name}
                width={200}
                height={96}
                className="w-full h-24 object-cover rounded mb-2"
              />
            )}
            <h4 className="font-semibold text-sm text-gray-800 mb-1">
              {point.name}
            </h4>
            <p className="text-xs text-gray-600 mb-1">{point.description}</p>
            {point.population && (
              <p className="text-xs text-gray-500">
                Население: {point.population}
              </p>
            )}
            {point.founded && (
              <p className="text-xs text-gray-500">Основан: {point.founded}</p>
            )}
          </div>
          {/* Стрелка подсказки */}
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2"
            style={{
              width: "0",
              height: "0",
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "8px solid white",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MapMarker;
