// Типы объектов Боевой Славы
export type BattleGloryPointType =
  | "памятник/мемориал"
  | "мемориальная доска"
  | "воинское захоронение";

// Иконки для разных типов объектов
export const BATTLE_GLORY_TYPE_ICONS = {
  "памятник/мемориал": "/images/monument-icon.svg",
  "мемориальная доска": "/images/memorial-board-icon.svg",
  "воинское захоронение": "/images/burial-icon.svg",
} as const;

// Размеры иконок для маркеров на карте (в пикселях)
export const BATTLE_GLORY_MARKER_ICON_SIZES = {
  "памятник/мемориал": { width: 31, height: 48 },
  "мемориальная доска": { width: 42, height: 37 },
  "воинское захоронение": { width: 45, height: 49 },
} as const;

// Размеры иконок для кнопок фильтров (в пикселях)
export const BATTLE_GLORY_FILTER_ICON_SIZES = {
  "памятник/мемориал": { width: 16, height: 25 },
  "мемориальная доска": { width: 28, height: 19 },
  "воинское захоронение": { width: 20, height: 21 },
} as const;
