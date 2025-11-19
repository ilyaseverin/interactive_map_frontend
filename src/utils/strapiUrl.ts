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
