import React from "react";
import Image from "next/image";
import { BattleGloryPoint } from "@/types/strapi";
import { getStrapiUrl } from "@/utils/strapiUrl";

interface BattleGloryMarkerProps {
  point: BattleGloryPoint;
  isSelected: boolean;
  onClick: (point: BattleGloryPoint) => void;
  size?: "small" | "medium" | "large";
}

// Цвета для разных типов объектов
const TYPE_COLORS = {
  "памятник/мемориал": "#dc2626", // красный
  "мемориальная доска": "#2563eb", // синий
  "воинское захоронение": "#059669", // зеленый
} as const;

const BattleGloryMarker: React.FC<BattleGloryMarkerProps> = ({
  point,
  isSelected,
  onClick,
  size = "medium",
}) => {
  const color = TYPE_COLORS[point.point_type] || "#3b82f6";

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

  // Функция для построения маршрута
  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { lat, lng } = point.coordinates;
    // Открываем Яндекс.Навигатор или Google Maps
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Для мобильных устройств используем схему URI для навигационных приложений
      window.open(
        `yandexnavi://build_route_on_map?lat_to=${lat}&lon_to=${lng}`,
        "_blank"
      );
    } else {
      // Для десктопа открываем Google Maps
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
        "_blank"
      );
    }
  };

  const STRAPI_URL = getStrapiUrl();

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
          style={{ backgroundColor: color }}
        />

        {/* Внутренний круг */}
        <div
          className={`absolute rounded-full border-2 border-white rotate-45 ${innerSizeClasses[size]}`}
          style={{ backgroundColor: color }}
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
            } solid ${color}`,
          }}
        />

        {/* Подсказка при нажатии */}
        <div
          className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-200 pointer-events-auto z-10 ${
            isSelected ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-white rounded-lg shadow-xl p-4 min-w-[280px] max-w-[320px] border">
            {point.preview_image && point.preview_image.url && (
              <Image
                src={`${STRAPI_URL}${point.preview_image.url}`}
                alt={point.title}
                width={280}
                height={160}
                className="w-full h-32 object-cover rounded mb-3"
              />
            )}
            <div className="mb-2">
              <span
                className="inline-block px-2 py-1 text-xs font-semibold rounded text-white mb-2"
                style={{ backgroundColor: color }}
              >
                {point.point_type}
              </span>
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-2">
              {point.title}
            </h4>
            {point.description && (
              <p className="text-xs text-gray-600 mb-2 line-clamp-3">
                {point.description}
              </p>
            )}
            <div className="text-xs text-gray-500 space-y-1">
              {point.municipality && (
                <p>
                  <span className="font-semibold">Район:</span>{" "}
                  {point.municipality}
                </p>
              )}
              {point.formatted_address && (
                <p>
                  <span className="font-semibold">Адрес:</span>{" "}
                  {point.formatted_address}
                </p>
              )}
            </div>
            {point.video && point.video.url && (
              <div className="mt-3">
                <a
                  href={`${STRAPI_URL}${point.video.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  Посмотреть видео
                </a>
              </div>
            )}
            <button
              onClick={handleNavigate}
              className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-2 px-3 rounded transition-colors flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              Построить маршрут
            </button>
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

export default BattleGloryMarker;
