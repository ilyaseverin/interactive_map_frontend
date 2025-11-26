"use client";

import { Suspense, useState } from "react";
import BattleGloryMapWithData from "@/components/maps/BattleGloryMapWithData";
import { BattleGloryFilterType } from "@/types/map";
import { useSearchParams } from "next/navigation";

function EmbedMapContent() {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<BattleGloryFilterType>(null);

  // Параметры из URL
  const width = searchParams.get("width") || "100%";
  let height = searchParams.get("height") || "600px";
  // Если height - это число без единиц, добавляем "px"
  if (height && /^\d+$/.test(height)) {
    height = `${height}px`;
  }
  const clustering = searchParams.get("clustering") !== "false";
  const pointType = searchParams.get("point_type") as BattleGloryFilterType;

  // Используем фильтр из URL или состояние
  const currentFilter = pointType || activeFilter;

  const handleFilterChange = (filter: BattleGloryFilterType) => {
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
