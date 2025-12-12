"use client";

import React, { useState, useCallback, useMemo } from "react";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl/maplibre";
import Supercluster from "supercluster";
import "maplibre-gl/dist/maplibre-gl.css";

import { BattleGloryPoint } from "@/types/strapi";
import {
  ViewState,
  ClusterProperties,
  CLUSTER_CONFIG,
  BattleGloryFilterType,
} from "@/types/map";
import { calculateBufferedViewportBounds } from "@/utils/mapUtils";
import BattleGloryMarker from "./markers/BattleGloryMarker";
import ClusterMarker from "./markers/ClusterMarker";
import MapPointModal from "./MapPointModal";

interface BattleGloryMapProps {
  points: BattleGloryPoint[];
  height?: string;
  className?: string;
  enableClustering?: boolean;
  filterType?: BattleGloryFilterType;
}

// Центр Липецкой области
const LIPETSK_VIEW_STATE: ViewState = {
  longitude: 39.5703,
  latitude: 52.6094,
  zoom: 8,
};

// Конвертация точек в GeoJSON для Supercluster
const pointsToGeoJSON = (
  points: BattleGloryPoint[]
): GeoJSON.Feature<GeoJSON.Point>[] => {
  return points.map((point) => ({
    type: "Feature" as const,
    properties: point,
    geometry: {
      type: "Point" as const,
      coordinates: [point.coordinates.lng, point.coordinates.lat],
    },
  }));
};

const BattleGloryMap: React.FC<BattleGloryMapProps> = ({
  points,
  height = "600px",
  className = "",
  enableClustering = true,
  filterType = null,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<BattleGloryPoint | null>(
    null
  );
  const [viewState, setViewState] = useState<ViewState>(LIPETSK_VIEW_STATE);

  // Фильтрация точек по типу
  const filteredPoints = useMemo(() => {
    if (!filterType) return points;
    return points.filter((point) => point.point_type === filterType);
  }, [points, filterType]);

  // Создание supercluster instance
  const supercluster = useMemo(() => {
    if (!enableClustering) return null;

    const cluster = new Supercluster<BattleGloryPoint>(CLUSTER_CONFIG);
    const geoJsonPoints = pointsToGeoJSON(filteredPoints);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cluster.load(geoJsonPoints as any);
    return cluster;
  }, [filteredPoints, enableClustering]);

  // Получение кластеров для текущего viewport с буферной зоной
  const clusters = useMemo(() => {
    if (!supercluster || !enableClustering) {
      return pointsToGeoJSON(filteredPoints);
    }

    const bufferedBounds = calculateBufferedViewportBounds(
      viewState.longitude,
      viewState.latitude,
      viewState.zoom,
      1.0
    );

    return supercluster.getClusters(bufferedBounds, Math.floor(viewState.zoom));
  }, [supercluster, viewState, filteredPoints, enableClustering]);

  const handleMarkerClick = useCallback(
    (point: BattleGloryPoint) => {
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

  const handleViewStateChange = useCallback((evt: { viewState: ViewState }) => {
    setViewState(evt.viewState);
  }, []);

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <Map
        {...viewState}
        onMove={handleViewStateChange}
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
            | BattleGloryPoint;

          // Если это кластер
          if ("cluster" in properties && properties.cluster) {
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
                  totalPoints={filteredPoints.length}
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
          const point = properties as BattleGloryPoint;
          return (
            <Marker key={point.id} longitude={longitude} latitude={latitude}>
              <BattleGloryMarker
                point={point}
                isSelected={selectedPoint?.id === point.id}
                onClick={handleMarkerClick}
              />
            </Marker>
          );
        })}
      </Map>

      {/* Информация о количестве объектов - внутри карты */}
      <div className="absolute top-[26px] md:top-[19px] left-[26px] md:left-[14px] bg-white box-border flex gap-[10px] items-start p-[15px] md:p-[10px] rounded-[10px] md:rounded-[7px] z-10">
        <p className="font-montserrat font-normal leading-normal text-[10px] md:text-[12px] lg:text-[14px] text-black">
          Всего объектов:{" "}
          <span className="font-semibold">{filteredPoints.length}</span>
        </p>
      </div>

      {/* Модалка с информацией о точке */}
      {selectedPoint && (
        <MapPointModal
          point={selectedPoint}
          onClose={() => setSelectedPoint(null)}
        />
      )}
    </div>
  );
};

export default BattleGloryMap;
