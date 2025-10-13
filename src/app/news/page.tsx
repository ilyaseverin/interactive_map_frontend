import type { Metadata } from "next";
import { NewsListResponse } from "@/types/strapi";
import Image from "next/image";
import Link from "next/link";

// Полностью отключаем кэширование для гарантированной генерации metadata
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// 🎯 Мета-теги для SEO
export const metadata: Metadata = {
  title: "Новости",
  description:
    "Последние новости и обновления интерактивной карты России с кластеризацией точек. Читайте актуальные новости о развитии проекта, новых функциях и достопримечательностях на карте.",

  keywords: [
    "новости",
    "обновления",
    "карта России",
    "интерактивная карта",
    "кластеризация",
    "достопримечательности",
  ],

  openGraph: {
    title: "Новости - Интерактивная карта России",
    description:
      "Последние новости и обновления интерактивной карты России с кластеризацией точек",
    type: "website",
    locale: "ru_RU",
    url: "/news",
  },

  twitter: {
    card: "summary_large_image",
    title: "Новости - Интерактивная карта России",
    description:
      "Последние новости и обновления интерактивной карты с кластеризацией",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: "/news",
  },
};

// Функция для получения новостей из Strapi
async function getNews(): Promise<NewsListResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  try {
    const res = await fetch(
      `${apiUrl}/api/news?pagination[pageSize]=100&populate[basic_info]=*&populate[content_info]=*&populate[media][populate][cover]=true&populate[media][populate][gallery]=true&populate[media][populate][video_links]=*&populate[meta_info][populate][tags]=*&sort=basic_info.published_at_date:desc`,
      {
        cache: "no-store", // Всегда без кэша
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch news:", res.status, res.statusText);
      return { data: [], meta: {} };
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    return { data: [], meta: {} };
  }
}

// Функция для форматирования даты
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Серверный компонент (SSR)
export default async function NewsPage() {
  const newsData = await getNews();
  const newsList = newsData.data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Новости</h1>
              <p className="mt-2 text-gray-600">
                Последние новости и обновления
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              ← На главную
            </Link>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {newsList.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">Новостей пока нет</p>
          </div>
        ) : (
          <div className="space-y-6">
            {newsList.map((news) => {
              const coverUrl = news.media?.cover?.url;
              const fullCoverUrl = coverUrl
                ? coverUrl.startsWith("http")
                  ? coverUrl
                  : `${
                      process.env.NEXT_PUBLIC_STRAPI_URL ||
                      "http://localhost:1337"
                    }${coverUrl}`
                : null;

              return (
                <article
                  key={news.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="md:flex">
                    {/* Изображение */}
                    {fullCoverUrl && (
                      <div className="md:w-1/3 relative h-64 md:h-auto">
                        <Image
                          src={fullCoverUrl}
                          alt={news.media?.cover?.alternativeText || news.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Контент */}
                    <div
                      className={`p-6 ${fullCoverUrl ? "md:w-2/3" : "w-full"}`}
                    >
                      {/* Категория и дата */}
                      <div className="flex items-center gap-4 mb-3">
                        {news.basic_info?.category && (
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              news.basic_info.category === "Главные"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {news.basic_info.category}
                          </span>
                        )}
                        <time className="text-sm text-gray-500">
                          {formatDate(news.basic_info.published_at_date)}
                        </time>
                      </div>

                      {/* Заголовок */}
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {news.title}
                      </h2>

                      {/* Анонс */}
                      {news.content_info?.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {news.content_info.excerpt}
                        </p>
                      )}

                      {/* Теги */}
                      {news.meta_info?.tags &&
                        news.meta_info.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {news.meta_info.tags
                              .filter((tag) => tag.value)
                              .map((tag) => (
                                <span
                                  key={tag.id}
                                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                                >
                                  #{tag.value}
                                </span>
                              ))}
                          </div>
                        )}

                      {/* Ссылка "Читать далее" */}
                      <Link
                        href={`/news/${news.slug}`}
                        className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Читать далее →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
