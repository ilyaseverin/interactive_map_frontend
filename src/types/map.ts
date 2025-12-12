// Общие типы для карты
export interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
}

// Типы для кластеризации
export interface ClusterProperties {
  cluster: true;
  point_count: number;
  cluster_id: number;
}

// Конфигурация кластеризации
export const CLUSTER_CONFIG = {
  radius: 75,
  maxZoom: 16,
  minZoom: 0,
} as const;

// Типы для Battle Glory фильтров
export type BattleGloryFilterType =
  | null
  | "памятник/мемориал"
  | "мемориальная доска"
  | "воинское захоронение";
