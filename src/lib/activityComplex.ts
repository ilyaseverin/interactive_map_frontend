import { ActivityComplex, ActivityComplexCategory } from "@/types/strapi";
import { getStrapiApiUrl } from "@/utils/strapiUrl";

/**
 * Серверная функция для получения комплекса деятельности по категории
 */
export async function getActivityComplexByCategory(
  category: ActivityComplexCategory
): Promise<ActivityComplex | null> {
  try {
    // Формируем параметры запроса
    const params = new URLSearchParams({
      "filters[category][$eq]": category,
      "pagination[pageSize]": "1",
      "populate[content]": "*",
      "populate[content][populate][attachments]": "*",
      "populate[content][populate][attachments][populate][file]": "true",
      "populate[content][populate][links]": "*",
      publicationState: "live",
    });

    const url = getStrapiApiUrl(`pages?${params.toString()}`);

    const res = await fetch(url, {
      cache: "no-store", // Всегда получаем свежие данные
    });

    if (!res.ok) {
      console.error(`Failed to fetch activity complex: ${res.status}`);
      return null;
    }

    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      return null;
    }

    return data.data[0];
  } catch (error) {
    console.error("Error fetching activity complex:", error);
    return null;
  }
}

