// Общие типы для карты
export interface MapPoint {
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

export interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
}

export interface MapProps {
  points?: MapPoint[];
  initialViewState?: ViewState;
  height?: string;
  className?: string;
  enableClustering?: boolean;
}

export interface MapWithDataProps extends MapProps {
  showLoading?: boolean;
}

// Типы для кластеризации
export type PointFeature = GeoJSON.Feature<
  GeoJSON.Point,
  MapPoint & { cluster?: boolean; point_count?: number }
>;

export interface ClusterProperties {
  cluster: true;
  point_count: number;
  cluster_id: number;
}

export interface PointProperties extends MapPoint {
  cluster?: false;
}

// Конфигурация кластеризации
export const CLUSTER_CONFIG = {
  radius: 75,
  maxZoom: 16,
  minZoom: 0,
} as const;

// Дефолтные настройки карты
export const DEFAULT_VIEW_STATE: ViewState = {
  longitude: 37.6173,
  latitude: 55.7558,
  zoom: 4,
};

// Цвета для маркеров
export const MARKER_COLORS = {
  default: "#3b82f6",
  moscow: "#dc2626",
  spb: "#2563eb",
  siberia: "#059669",
  ural: "#d97706",
  tatarstan: "#7c3aed",
} as const;

// Типы для Battle Glory фильтров
export type BattleGloryFilterType =
  | null
  | "памятник/мемориал"
  | "мемориальная доска"
  | "воинское захоронение";
