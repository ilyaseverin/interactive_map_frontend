import { MapPoint, PointFeature, CLUSTER_CONFIG } from "@/types/map";

/**
 * Преобразует точки карты в GeoJSON формат для кластеризации
 */
export const pointsToGeoJSON = (points: MapPoint[]): PointFeature[] => {
  return points.map((point) => ({
    type: "Feature" as const,
    properties: { ...point },
    geometry: {
      type: "Point" as const,
      coordinates: point.coordinates,
    },
  }));
};

/**
 * Вычисляет границы viewport для кластеризации
 */
export const calculateViewportBounds = (
  longitude: number,
  latitude: number,
  zoom: number
) => {
  const lngRange = 180 / Math.pow(2, zoom);
  const latRange = 85 / Math.pow(2, zoom);

  return [
    longitude - lngRange,
    latitude - latRange,
    longitude + lngRange,
    latitude + latRange,
  ] as [number, number, number, number];
};

/**
 * Проверяет, является ли экран маленьким
 */
export const isSmallScreen = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 640;
};

/**
 * Получает количество точек для отображения в легенде
 */
export const getLegendItemCount = (isSmall: boolean): number => {
  return isSmall ? 4 : 8;
};

/**
 * Форматирует координаты для отображения
 */
export const formatCoordinates = (lng: number, lat: number): string => {
  return `${lng.toFixed(4)}, ${lat.toFixed(4)}`;
};

/**
 * Проверяет, находится ли точка в пределах viewport
 */
export const isPointInViewport = (
  point: MapPoint,
  bounds: [number, number, number, number]
): boolean => {
  const [minLng, minLat, maxLng, maxLat] = bounds;
  const [lng, lat] = point.coordinates;

  return lng >= minLng && lng <= maxLng && lat >= minLat && lat <= maxLat;
};

/**
 * Вычисляет расстояние между двумя точками (в пикселях)
 */
export const calculateDistance = (
  point1: [number, number],
  point2: [number, number]
): number => {
  const [lng1, lat1] = point1;
  const [lng2, lat2] = point2;

  const R = 6371; // Радиус Земли в км
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
