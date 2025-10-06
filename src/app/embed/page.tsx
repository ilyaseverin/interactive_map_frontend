"use client";

import { Suspense } from "react";
import MapWithData from "@/components/MapWithData";
import { useSearchParams } from "next/navigation";

function EmbedMapContent() {
  const searchParams = useSearchParams();

  // Параметры из URL
  const width = searchParams.get("width") || "100%";
  const height = searchParams.get("height") || "600px";
  const zoom = parseFloat(searchParams.get("zoom") || "4");
  const longitude = parseFloat(searchParams.get("lng") || "37.6173");
  const latitude = parseFloat(searchParams.get("lat") || "55.7558");
  const clustering = searchParams.get("clustering") !== "false";

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
      <MapWithData
        initialViewState={{
          longitude,
          latitude,
          zoom,
        }}
        height={height}
        enableClustering={clustering}
        showLoading={true}
        className="w-full h-full"
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
