"use client";

import { useEffect, useState } from "react";
import BattleGloryMap from "./BattleGloryMap";
import { BattleGloryPoint, BattleGloryResponse } from "@/types/strapi";
import { BattleGloryFilterType } from "@/types/map";

interface BattleGloryMapWithDataProps {
  height?: string;
  className?: string;
  enableClustering?: boolean;
  showLoading?: boolean;
  filterType?: BattleGloryFilterType;
  onFilterChange?: (filter: BattleGloryFilterType) => void;
}

const BattleGloryMapWithData: React.FC<BattleGloryMapWithDataProps> = ({
  height = "600px",
  className = "",
  enableClustering = true,
  showLoading = true,
  filterType = null,
  onFilterChange,
}) => {
  const [points, setPoints] = useState<BattleGloryPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Загружаем данные точек с API - все объекты без ограничений
    const url = filterType
      ? `/api/battle-glory-points?point_type=${encodeURIComponent(filterType)}`
      : "/api/battle-glory-points";

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: BattleGloryResponse) => {
        console.log(
          `Loaded ${data.data?.length || 0} points for filter:`,
          filterType
        );
        setPoints(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading battle glory points:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [filterType]);

  if (loading && showLoading) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Загрузка карты...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">Ошибка загрузки данных</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <BattleGloryMap
      points={points}
      height={height}
      className={className}
      enableClustering={enableClustering}
      filterType={filterType}
      onFilterChange={onFilterChange}
    />
  );
};

export default BattleGloryMapWithData;
