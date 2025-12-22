import { ActivityComplexCategory } from "@/types/strapi";

/**
 * Маппинг категорий комплексов на их URL-маршруты
 */
export const ACTIVITY_COMPLEX_ROUTES: Record<ActivityComplexCategory, string> =
  {
    "Антимонопольный комплекс": "/activity/antimonopoly",
    "Антикоррупционная деятельность": "/activity/anticorruption",
    "Противодействие терроризму": "/activity/counterterrorism",
    "Антинаркотическая кампания": "/activity/antidrug",
  };

/**
 * Обратный маппинг: URL -> категория
 */
export const ROUTE_TO_CATEGORY: Record<string, ActivityComplexCategory> = {
  "/activity/antimonopoly": "Антимонопольный комплекс",
  "/activity/anticorruption": "Антикоррупционная деятельность",
  "/activity/counterterrorism": "Противодействие терроризму",
  "/activity/antidrug": "Антинаркотическая кампания",
};

/**
 * Получить URL маршрута по категории
 */
export function getActivityComplexRoute(
  category: ActivityComplexCategory
): string {
  return ACTIVITY_COMPLEX_ROUTES[category];
}

/**
 * Получить категорию по URL маршруту
 */
export function getCategoryByRoute(
  route: string
): ActivityComplexCategory | null {
  return ROUTE_TO_CATEGORY[route] || null;
}
