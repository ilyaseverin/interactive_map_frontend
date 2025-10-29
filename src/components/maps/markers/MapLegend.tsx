import React from "react";
import { MapPoint } from "@/types/map";

interface MapLegendProps {
  points: MapPoint[];
  enableClustering: boolean;
  isSmallScreen: boolean;
}

const MapLegend: React.FC<MapLegendProps> = ({
  points,
  enableClustering,
  isSmallScreen,
}) => {
  const maxItems = isSmallScreen ? 4 : 8;
  const visiblePoints = points.slice(0, maxItems);
  const remainingCount = points.length - maxItems;

  return (
    <div
      className={`absolute top-4 left-4 bg-white rounded-lg shadow-lg z-10 ${
        isSmallScreen ? "p-2 max-w-48" : "p-3 max-w-xs"
      }`}
    >
      <h4
        className={`font-semibold text-gray-800 ${
          isSmallScreen ? "text-xs mb-1" : "text-sm mb-2"
        }`}
      >
        {points.length > 10 ? "Достопримечательности" : "Города России"}
      </h4>

      <div
        className={`space-y-1 overflow-y-auto ${
          isSmallScreen ? "max-h-16 space-y-0.5" : "max-h-32 space-y-2"
        }`}
      >
        {visiblePoints.map((point) => (
          <div
            key={point.id}
            className={`flex items-center text-xs ${
              isSmallScreen ? "space-x-2" : "space-x-3"
            }`}
          >
            <div
              className={`relative flex-shrink-0 ${
                isSmallScreen ? "w-2.5 h-3" : "w-3 h-4"
              }`}
            >
              {/* Мини-версия маркера-капли */}
              <div
                className={`absolute border border-white shadow-sm -rotate-45 top-0 left-0 rounded-full ${
                  isSmallScreen ? "w-2.5 h-2.5" : "w-3 h-3"
                }`}
                style={{ backgroundColor: point.color || "#3b82f6" }}
              />
              <div
                className={`absolute border border-white rotate-45 rounded-full ${
                  isSmallScreen
                    ? "w-1 h-1 top-0.5 left-0.5"
                    : "w-1.5 h-1.5 top-0.75 left-0.75"
                }`}
                style={{ backgroundColor: point.color || "#3b82f6" }}
              />
              <div
                className={`absolute rounded-full rotate-45 bg-white ${
                  isSmallScreen
                    ? "w-0.5 h-0.5 top-0.75 left-0.75"
                    : "w-0.5 h-0.5 top-1.125 left-1.125"
                }`}
              />
              <div
                className={`absolute w-0 h-0 ${
                  isSmallScreen ? "top-2 left-0.5" : "top-2.5 left-0.75"
                }`}
                style={{
                  borderLeft: isSmallScreen
                    ? "2px solid transparent"
                    : "3px solid transparent",
                  borderRight: isSmallScreen
                    ? "2px solid transparent"
                    : "3px solid transparent",
                  borderTop: `${isSmallScreen ? "4px" : "6px"} solid ${
                    point.color || "#3b82f6"
                  }`,
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800 truncate">
                {point.name}
              </div>
              {point.population && !isSmallScreen && (
                <div className="text-gray-500 truncate">{point.population}</div>
              )}
            </div>
          </div>
        ))}

        {remainingCount > 0 && (
          <div className="text-xs text-gray-500 text-center">
            и еще {remainingCount} точек...
          </div>
        )}
      </div>

      <div
        className={`border-t text-xs text-gray-500 ${
          isSmallScreen ? "mt-1 pt-1" : "mt-3 pt-2"
        }`}
      >
        {enableClustering
          ? "При отдалении точки объединяются в кластеры"
          : "Кликните на маркер для подробной информации"}
      </div>
    </div>
  );
};

export default MapLegend;
