"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

// Типы для точек на карте
interface MapPoint {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  color?: string;
  icon?: string;
  image?: string;
  population?: string;
  founded?: string;
}

// Предустановленные точки для демонстрации
const defaultPoints: MapPoint[] = [
  {
    id: "1",
    name: "Москва",
    description: "Столица России, крупнейший город страны",
    coordinates: [37.6173, 55.7558],
    color: "#dc2626",
    image:
      "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=300&h=200&fit=crop",
    population: "12.5 млн",
    founded: "1147 г.",
  },
  {
    id: "2",
    name: "Санкт-Петербург",
    description: "Культурная столица России",
    coordinates: [30.3351, 59.9311],
    color: "#2563eb",
    image:
      "https://images.unsplash.com/photo-1556610961-2fecc5927173?w=300&h=200&fit=crop",
    population: "5.4 млн",
    founded: "1703 г.",
  },
  {
    id: "3",
    name: "Новосибирск",
    description: "Крупнейший город Сибири",
    coordinates: [82.9346, 55.0084],
    color: "#059669",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    population: "1.6 млн",
    founded: "1893 г.",
  },
  {
    id: "4",
    name: "Екатеринбург",
    description: "Столица Урала",
    coordinates: [60.6122, 56.8431],
    color: "#d97706",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&h=200&fit=crop",
    population: "1.5 млн",
    founded: "1723 г.",
  },
  {
    id: "5",
    name: "Казань",
    description: "Столица Татарстана",
    coordinates: [49.1221, 55.8304],
    color: "#7c3aed",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    population: "1.2 млн",
    founded: "1005 г.",
  },
];

interface InteractiveMapProps {
  points?: MapPoint[];
  initialViewState?: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  height?: string;
  className?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  points = defaultPoints,
  initialViewState = {
    longitude: 37.6173,
    latitude: 55.7558,
    zoom: 4,
  },
  height = "500px",
  className = "",
}) => {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

  const handleMarkerClick = useCallback(
    (point: MapPoint) => {
      setSelectedPoint(selectedPoint?.id === point.id ? null : point);
    },
    [selectedPoint]
  );

  const handleMapClick = useCallback(() => {
    setSelectedPoint(null);
  }, []);
  return (
    <div className={`relative ${className}`} style={{ height }}>
      <Map
        initialViewState={initialViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle={{
          version: 8,
          sources: {
            osm: {
              type: "raster",
              tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "© OpenStreetMap contributors",
            },
          },
          layers: [
            {
              id: "osm",
              type: "raster",
              source: "osm",
            },
          ],
        }}
        attributionControl={false}
        onClick={handleMapClick}
      >
        {/* Навигационные элементы управления */}
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />

        {/* Маркеры для каждой точки */}
        {points.map((point) => (
          <Marker
            key={point.id}
            longitude={point.coordinates[0]}
            latitude={point.coordinates[1]}
          >
            <div
              className="cursor-pointer transform transition-all duration-200 hover:scale-110 group relative"
              onClick={(e) => {
                e.stopPropagation();
                handleMarkerClick(point);
              }}
            >
              {/* Маркер в виде капли */}
              <div className="relative w-6 h-8">
                {/* Основная капля */}
                <div
                  className="absolute w-6 h-6 rounded-full border-2 border-white shadow-lg -rotate-45 top-0 left-0"
                  style={{ backgroundColor: point.color || "#3b82f6" }}
                />
                {/* Внутренний круг */}
                <div
                  className="absolute w-3 h-3 rounded-full border-2 border-white rotate-45 top-1.5 left-1.5"
                  style={{ backgroundColor: point.color || "#3b82f6" }}
                />
                {/* Центральная точка */}
                <div className="absolute w-1.5 h-1.5 rounded-full rotate-45 bg-white top-2.25 left-2.25" />
                {/* Острый кончик */}
                <div
                  className="absolute w-0 h-0 top-5 left-1.5 drop-shadow-sm"
                  style={{
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: `12px solid ${point.color || "#3b82f6"}`,
                  }}
                />

                {/* Подсказка при нажатии */}
                <div
                  className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-200 pointer-events-none z-10 ${
                    selectedPoint?.id === point.id ? "opacity-100" : "opacity-0"
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
                    <p className="text-xs text-gray-600 mb-1">
                      {point.description}
                    </p>
                    {point.population && (
                      <p className="text-xs text-gray-500">
                        Население: {point.population}
                      </p>
                    )}
                    {point.founded && (
                      <p className="text-xs text-gray-500">
                        Основан: {point.founded}
                      </p>
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
          </Marker>
        ))}
      </Map>

      {/* Легенда */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-xs">
        <h4 className="font-semibold text-sm mb-2 text-gray-800">
          Города России
        </h4>
        <div className="space-y-2">
          {points.map((point) => (
            <div key={point.id} className="flex items-center space-x-3 text-xs">
              <div className="relative w-3 h-4">
                {/* Мини-версия маркера-капли */}
                <div
                  className="absolute w-3 h-3 rounded-full border border-white shadow-sm -rotate-45 top-0 left-0"
                  style={{ backgroundColor: point.color || "#3b82f6" }}
                />
                <div
                  className="absolute w-1.5 h-1.5 rounded-full border border-white rotate-45 top-0.75 left-0.75"
                  style={{ backgroundColor: point.color || "#3b82f6" }}
                />
                <div className="absolute w-0.5 h-0.5 rounded-full rotate-45 bg-white top-1.125 left-1.125" />
                <div
                  className="absolute w-0 h-0 top-2.5 left-0.75"
                  style={{
                    borderLeft: "3px solid transparent",
                    borderRight: "3px solid transparent",
                    borderTop: `6px solid ${point.color || "#3b82f6"}`,
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800">{point.name}</div>
                {point.population && (
                  <div className="text-gray-500">{point.population}</div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t text-xs text-gray-500">
          Кликните на маркер для подробной информации
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
