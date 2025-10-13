"use client";

import { Suspense, useState } from "react";
import BattleGloryMapWithData from "@/components/BattleGloryMapWithData";
import { useSearchParams } from "next/navigation";

type FilterType =
  | null
  | "памятник/мемориал"
  | "мемориальная доска"
  | "воинское захоронение";

function EmbedMapContent() {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);

  // Параметры из URL
  const width = searchParams.get("width") || "100%";
  const height = searchParams.get("height") || "600px";
  const zoom = parseFloat(searchParams.get("zoom") || "8");
  const longitude = parseFloat(searchParams.get("lng") || "39.5703");
  const latitude = parseFloat(searchParams.get("lat") || "52.6094");
  const clustering = searchParams.get("clustering") !== "false";
  const pointType = searchParams.get("point_type") as FilterType;

  // Используем фильтр из URL или состояние
  const currentFilter = pointType || activeFilter;

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  return (
    <div
      style={{
        width,
        height,
        margin: 0,
        padding: 0,
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
      }}
    >
      <BattleGloryMapWithData
        height={height}
        enableClustering={clustering}
        showLoading={true}
        className="w-full h-full"
        filterType={currentFilter}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}

export default function EmbedMap() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Загрузка карты...</p>
          </div>
        </div>
      }
    >
      <EmbedMapContent />
    </Suspense>
  );
}
