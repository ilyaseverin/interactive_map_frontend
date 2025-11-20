/**
 * Получить базовый URL Strapi API
 * Требует переменную окружения NEXT_PUBLIC_STRAPI_URL
 */
export function getStrapiUrl(): string {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!url) {
    const errorMessage =
      "❌ NEXT_PUBLIC_STRAPI_URL environment variable is not set!\n" +
      "Please add it to your .env.local file:\n" +
      "NEXT_PUBLIC_STRAPI_URL=http://localhost:1337";

    // Выводим в консоль для видимости
    console.error(errorMessage);

    // Бросаем ошибку, чтобы приложение не работало с неправильной конфигурацией
    throw new Error(errorMessage);
  }
  return url;
}

/**
 * Получить полный URL для Strapi API эндпоинта
 */
export function getStrapiApiUrl(endpoint: string = ""): string {
  const baseUrl = getStrapiUrl();
  const apiPath = endpoint.startsWith("/api/") ? endpoint : `/api/${endpoint}`;
  return `${baseUrl}${apiPath}`;
}

/**
 * Получить полный URL для медиа файла Strapi
 * Обрабатывает как относительные, так и абсолютные URL
 */
export function getStrapiMediaUrl(
  url: string | undefined | null
): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  const baseUrl = getStrapiUrl();
  return `${baseUrl}${url}`;
}

import { StrapiImage } from "@/types/strapi";

type ImageSize = "thumbnail" | "small" | "medium" | "large" | "original";

/**
 * Получить URL изображения с учетом размера
 * Если запрошенный размер отсутствует, пытается найти ближайший подходящий
 */
export function getResponsiveImageUrl(
  image: StrapiImage | null | undefined,
  size: ImageSize = "medium"
): string | undefined {
  if (!image?.url) return undefined;

  // Если formats отсутствует, возвращаем оригинал
  if (!image.formats) {
    return getStrapiMediaUrl(image.url);
  }

  let targetUrl = image.url;

  // Логика выбора размера
  switch (size) {
    case "thumbnail":
      if (image.formats.thumbnail) targetUrl = image.formats.thumbnail.url;
      else if (image.formats.small) targetUrl = image.formats.small.url;
      break;
    case "small":
      if (image.formats.small) targetUrl = image.formats.small.url;
      else if (image.formats.thumbnail) targetUrl = image.formats.thumbnail.url;
      else if (image.formats.medium) targetUrl = image.formats.medium.url;
      break;
    case "medium":
      if (image.formats.medium) targetUrl = image.formats.medium.url;
      else if (image.formats.small) targetUrl = image.formats.small.url;
      else if (image.formats.large) targetUrl = image.formats.large.url;
      break;
    case "large":
      if (image.formats.large) targetUrl = image.formats.large.url;
      else if (image.formats.medium) targetUrl = image.formats.medium.url;
      break;
    case "original":
    default:
      targetUrl = image.url;
      break;
  }

  return getStrapiMediaUrl(targetUrl);
}
