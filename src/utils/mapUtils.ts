/**
 * Вычисляет границы viewport для кластеризации
 */
export const calculateViewportBounds = (
  longitude: number,
  latitude: number,
  zoom: number
) => {
  // Более точный расчет границ viewport
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
 * Вычисляет расширенные границы viewport с буферной зоной
 */
export const calculateBufferedViewportBounds = (
  longitude: number,
  latitude: number,
  zoom: number,
  bufferRatio: number = 0.5
) => {
  const bounds = calculateViewportBounds(longitude, latitude, zoom);
  const [minLng, minLat, maxLng, maxLat] = bounds;

  const lngBuffer = (maxLng - minLng) * bufferRatio;
  const latBuffer = (maxLat - minLat) * bufferRatio;

  return [
    minLng - lngBuffer,
    minLat - latBuffer,
    maxLng + lngBuffer,
    maxLat + latBuffer,
  ] as [number, number, number, number];
};
