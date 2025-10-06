"use client";

import { useEffect, useState } from "react";
import InteractiveMap from "./InteractiveMap";
import { MapPoint, MapWithDataProps, DEFAULT_VIEW_STATE } from "@/types/map";

const MapWithData: React.FC<MapWithDataProps> = ({
  height = "500px",
  className = "",
  enableClustering = true,
  initialViewState = DEFAULT_VIEW_STATE,
  showLoading = true,
}) => {
  const [points, setPoints] = useState<MapPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Загружаем данные точек с API
    fetch("/api/map-points")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPoints(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading map points:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading && showLoading) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
    <InteractiveMap
      points={points}
      height={height}
      className={className}
      enableClustering={enableClustering}
      initialViewState={initialViewState}
    />
  );
};

export default MapWithData;
