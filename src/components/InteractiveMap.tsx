"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl/maplibre";
import Supercluster from "supercluster";
import "maplibre-gl/dist/maplibre-gl.css";

import {
  MapPoint,
  ViewState,
  MapProps,
  PointFeature,
  ClusterProperties,
  PointProperties,
  CLUSTER_CONFIG,
  DEFAULT_VIEW_STATE,
} from "@/types/map";
import {
  pointsToGeoJSON,
  calculateViewportBounds,
  isSmallScreen,
  getLegendItemCount,
} from "@/utils/mapUtils";
import MapMarker from "./markers/MapMarker";
import ClusterMarker from "./markers/ClusterMarker";
import MapLegend from "./markers/MapLegend";

// Предустановленные точки для демонстрации (упрощенная версия)
const defaultPoints: MapPoint[] = [
  {
    id: "1",
    name: "Красная площадь",
    description: "Главная площадь Москвы",
    coordinates: [37.6213, 55.7539],
    color: "#dc2626",
    image:
      "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=300&h=200&fit=crop",
    population: "Исторический центр",
    founded: "XV век",
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

const InteractiveMap: React.FC<MapProps> = ({
  points = defaultPoints,
  initialViewState = DEFAULT_VIEW_STATE,
  height = "500px",
  className = "",
  enableClustering = true,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [viewState, setViewState] = useState<ViewState>(initialViewState);
  const [screenIsSmall, setScreenIsSmall] = useState(false);

  // Отслеживаем размер экрана
  useEffect(() => {
    const checkScreenSize = () => {
      setScreenIsSmall(isSmallScreen());
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Создание supercluster instance
  const supercluster = useMemo(() => {
    if (!enableClustering) return null;

    const cluster = new Supercluster<MapPoint>(CLUSTER_CONFIG);
    const geoJsonPoints = pointsToGeoJSON(points);
    cluster.load(geoJsonPoints);
    return cluster;
  }, [points, enableClustering]);

  // Получение кластеров для текущего viewport
  const clusters = useMemo(() => {
    if (!supercluster || !enableClustering) {
      return pointsToGeoJSON(points);
    }

    const bounds = calculateViewportBounds(
      viewState.longitude,
      viewState.latitude,
      viewState.zoom
    );

    return supercluster.getClusters(bounds, Math.floor(viewState.zoom));
  }, [supercluster, viewState, points, enableClustering]);

  const handleMarkerClick = useCallback(
    (point: MapPoint) => {
      setSelectedPoint(selectedPoint?.id === point.id ? null : point);
    },
    [selectedPoint]
  );

  const handleClusterClick = useCallback(
    (clusterId: number, longitude: number, latitude: number) => {
      if (!supercluster) return;

      const expansionZoom = Math.min(
        supercluster.getClusterExpansionZoom(clusterId),
        CLUSTER_CONFIG.maxZoom
      );

      setViewState({
        ...viewState,
        longitude,
        latitude,
        zoom: expansionZoom,
      });
    },
    [supercluster, viewState]
  );

  const handleMapClick = useCallback(() => {
    setSelectedPoint(null);
  }, []);
  return (
    <div className={`relative ${className}`} style={{ height }}>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
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

        {/* Маркеры и кластеры */}
        {clusters.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const properties = cluster.properties as
            | ClusterProperties
            | PointProperties;

          // Если это кластер
          if (properties.cluster) {
            const pointCount = properties.point_count;
            const clusterId = properties.cluster_id;

            return (
              <Marker
                key={`cluster-${clusterId || index}`}
                longitude={longitude}
                latitude={latitude}
              >
                <ClusterMarker
                  pointCount={pointCount}
                  totalPoints={points.length}
                  onClick={() => {
                    if (clusterId) {
                      handleClusterClick(clusterId, longitude, latitude);
                    }
                  }}
                />
              </Marker>
            );
          }

          // Если это отдельная точка
          const point = properties as MapPoint;
          return (
            <Marker key={point.id} longitude={longitude} latitude={latitude}>
              <MapMarker
                point={point}
                isSelected={selectedPoint?.id === point.id}
                onClick={handleMarkerClick}
              />
            </Marker>
          );
        })}
      </Map>

      {/* Легенда */}
      <MapLegend
        points={points}
        enableClustering={enableClustering}
        isSmallScreen={screenIsSmall}
      />
    </div>
  );
};

export default InteractiveMap;
