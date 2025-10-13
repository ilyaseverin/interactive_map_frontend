import type { Metadata } from "next";
import { NewsItem } from "@/types/strapi";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Полностью отключаем кэширование для гарантированной генерации metadata
export const dynamic = "force-dynamic"; // Всегда рендерить на сервере
export const revalidate = 0; // Никогда не кэшировать
export const fetchCache = "force-no-store"; // Отключить fetch cache

// Получить новость по slug (всегда без кэша)
async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  try {
    const res = await fetch(
      `${apiUrl}/api/news?filters[slug][$eq]=${slug}&pagination[pageSize]=1&populate[basic_info]=*&populate[content_info]=*&populate[media][populate][cover]=true&populate[media][populate][gallery]=true&populate[media][populate][video_links]=*&populate[meta_info][populate][tags]=*`,
      {
        cache: "no-store", // Всегда без кэша
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch news:", res.status);
      return null;
    }

    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      return null;
    }

    return data.data[0];
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
}

// 🎯 Динамические мета-теги из API Strapi
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    return {
      title: "Новость не найдена",
      description: "Запрашиваемая новость не найдена",
    };
  }

  const coverUrl = news.media?.cover?.url;
  const fullCoverUrl = coverUrl
    ? coverUrl.startsWith("http")
      ? coverUrl
      : `${
          process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
        }${coverUrl}`
    : undefined;

  const tags =
    news.meta_info?.tags
      ?.filter((tag) => tag.value)
      .map((tag) => tag.value || "") || [];

  // Создаем качественное описание для SEO (минимум 50 символов)
  let metaDescription = "";

  if (news.content_info?.excerpt) {
    // Если есть excerpt
    if (news.content_info.excerpt.length >= 50) {
      metaDescription = news.content_info.excerpt;
    } else {
      // Если excerpt короткий, добавляем заголовок
      metaDescription = `${news.title}. ${news.content_info.excerpt}`;
    }
  } else {
    // Если нет excerpt, используем fallback
    metaDescription = `${news.title}. Читайте последние новости и обновления на интерактивной карте России.`;
  }

  // Гарантируем минимальную длину 50 символов
  if (metaDescription.length < 50) {
    metaDescription = `${metaDescription} Актуальные новости интерактивной карты России.`;
  }

  // Обрезаем описание до 160 символов (рекомендация Google)
  const truncatedDescription =
    metaDescription.length > 160
      ? metaDescription.substring(0, 157) + "..."
      : metaDescription;

  return {
    title: `${news.title} | Новости`,
    description: truncatedDescription,

    keywords: tags,

    openGraph: {
      title: news.title,
      description: truncatedDescription,
      type: "article",
      locale: "ru_RU",
      publishedTime: news.basic_info.published_at_date,
      modifiedTime: news.updatedAt,
      images: fullCoverUrl ? [fullCoverUrl] : undefined,
      tags: tags,
    },

    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: truncatedDescription,
      images: fullCoverUrl ? [fullCoverUrl] : undefined,
    },

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: `/news/${slug}`,
    },
  };
}

// Форматирование даты
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Серверный компонент страницы новости
export default async function NewsItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  const coverUrl = news.media?.cover?.url;
  const fullCoverUrl = coverUrl
    ? coverUrl.startsWith("http")
      ? coverUrl
      : `${
          process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
        }${coverUrl}`
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/news"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-4"
          >
            ← Назад к новостям
          </Link>
        </div>
      </header>

      {/* Основной контент */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Обложка */}
          {fullCoverUrl && (
            <div className="relative h-96 w-full">
              <Image
                src={fullCoverUrl}
                alt={news.media?.cover?.alternativeText || news.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Контент новости */}
          <div className="p-8">
            {/* Категория и дата */}
            <div className="flex items-center gap-4 mb-4">
              {news.basic_info?.category && (
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    news.basic_info.category === "Главные"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {news.basic_info.category}
                </span>
              )}
              <time className="text-gray-500">
                {formatDate(news.basic_info.published_at_date)}
              </time>
            </div>

            {/* Заголовок */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {news.title}
            </h1>

            {/* Анонс */}
            {news.content_info?.excerpt && (
              <p className="text-xl text-gray-600 mb-8 border-l-4 border-blue-500 pl-4">
                {news.content_info.excerpt}
              </p>
            )}

            {/* Основной контент */}
            {news.content_info?.content && (
              <div
                className="prose max-w-none text-gray-800"
                dangerouslySetInnerHTML={{
                  __html: news.content_info.content,
                }}
              />
            )}

            {/* Теги */}
            {news.meta_info?.tags && news.meta_info.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Теги:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {news.meta_info.tags
                    .filter((tag) => tag.value)
                    .map((tag) => (
                      <span
                        key={tag.id}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                      >
                        #{tag.value}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* Галерея (если есть) */}
            {news.media?.gallery && news.media.gallery.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Галерея
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {news.media.gallery.map((image) => {
                    const imageUrl = image.url.startsWith("http")
                      ? image.url
                      : `${
                          process.env.NEXT_PUBLIC_STRAPI_URL ||
                          "http://localhost:1337"
                        }${image.url}`;

                    return (
                      <div
                        key={image.id}
                        className="relative h-48 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={imageUrl}
                          alt={image.alternativeText || ""}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
