import { NextResponse } from "next/server";
import { getStrapiUrl } from "@/utils/strapiUrl";
import type {
  NewsItem,
  ProjectItem,
  PressReleaseItem,
  EventItem,
} from "@/types/strapi";

const STRAPI_URL = getStrapiUrl();

interface SearchResultItem {
  id: string;
  type: "news" | "project" | "press-release" | "event";
  title: string;
  excerpt: string;
  slug: string;
  coverUrl?: string;
  date?: string;
}

interface SearchResponse {
  data: SearchResultItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Общая функция для поиска в Strapi
async function searchStrapiContent(
  endpoint: string,
  params: Record<string, string>
) {
  const queryParams = new URLSearchParams({
    ...params,
    publicationState: "live",
  });

  const response = await fetch(
    `${STRAPI_URL}/api/${endpoint}?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status}`);
  }

  return response.json();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  try {
    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        data: [],
        meta: {
          pagination: {
            page: 1,
            pageSize,
            pageCount: 0,
            total: 0,
          },
        },
      });
    }

    const searchTerm = query.trim();

    // Параллельный поиск во всех типах контента
    const [newsData, projectsData, pressReleasesData, eventsData] =
      await Promise.all([
        // Новости
        searchStrapiContent("news", {
          "filters[$or][0][title][$containsi]": searchTerm,
          "filters[$or][1][content_info][excerpt][$containsi]": searchTerm,
          "filters[$or][2][content_info][content][$containsi]": searchTerm,
          "populate[basic_info]": "*",
          "populate[content_info]": "*",
          "populate[media][populate][cover]": "true",
          sort: "basic_info.published_at_date:desc",
        }),
        // Проекты
        searchStrapiContent("projects", {
          "filters[$or][0][title][$containsi]": searchTerm,
          "filters[$or][1][summary][excerpt][$containsi]": searchTerm,
          "filters[$or][2][content_info][content][$containsi]": searchTerm,
          "populate[basic_info]": "*",
          "populate[summary]": "*",
          "populate[content_info]": "*",
          "populate[media][populate][cover]": "true",
          sort: "publishedAt:desc",
        }),
        // Пресс-релизы
        searchStrapiContent("press-releases", {
          "filters[$or][0][title][$containsi]": searchTerm,
          "filters[$or][1][content_info][excerpt][$containsi]": searchTerm,
          "filters[$or][2][content_info][content][$containsi]": searchTerm,
          "populate[basic_info]": "*",
          "populate[content_info]": "*",
          "populate[media][populate][cover]": "true",
          sort: "basic_info.published_at_date:desc",
        }),
        // События
        searchStrapiContent("events", {
          "filters[$or][0][title][$containsi]": searchTerm,
          "filters[$or][1][content_info][description][$containsi]": searchTerm,
          "filters[$or][2][location_info][location][$containsi]": searchTerm,
          "populate[basic_info]": "*",
          "populate[content_info][populate][cover]": "true",
          "populate[content_info][populate][gallery]": "true",
          "populate[location_info]": "*",
          sort: "basic_info.datetime_start:desc",
        }),
      ]);

    // Объединяем результаты в один массив
    const searchResults: SearchResultItem[] = [];

    // Вспомогательная функция для создания excerpt
    const createExcerpt = (text: string, maxLength: number = 200): string => {
      if (!text) return "";
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    };

    // Обработка новостей
    if (newsData.data) {
      newsData.data.forEach((item: NewsItem) => {
        const excerpt =
          item.content_info?.excerpt ||
          item.content_info?.content?.substring(0, 200) ||
          "";
        searchResults.push({
          id: `news-${item.id}`,
          type: "news",
          title: item.title,
          excerpt: createExcerpt(excerpt),
          slug: item.slug,
          coverUrl: item.media?.cover?.url,
          date: item.basic_info?.published_at_date,
        });
      });
    }

    // Обработка проектов
    if (projectsData.data) {
      projectsData.data.forEach((item: ProjectItem) => {
        const excerpt =
          item.summary?.excerpt ||
          item.content_info?.content?.substring(0, 200) ||
          "";
        searchResults.push({
          id: `project-${item.id}`,
          type: "project",
          title: item.title,
          excerpt: createExcerpt(excerpt),
          slug: item.slug,
          coverUrl: item.media?.cover?.url,
          date: item.publishedAt,
        });
      });
    }

    // Обработка пресс-релизов
    if (pressReleasesData.data) {
      pressReleasesData.data.forEach((item: PressReleaseItem) => {
        const excerpt =
          item.content_info?.excerpt ||
          item.content_info?.content?.substring(0, 200) ||
          "";
        searchResults.push({
          id: `press-${item.id}`,
          type: "press-release",
          title: item.title,
          excerpt: createExcerpt(excerpt),
          slug: item.slug,
          coverUrl: item.media?.cover?.url,
          date: item.basic_info?.published_at_date,
        });
      });
    }

    // Обработка событий
    if (eventsData.data) {
      eventsData.data.forEach((item: EventItem) => {
        const excerpt =
          item.content_info?.description?.substring(0, 200) ||
          item.location_info?.location ||
          "";
        searchResults.push({
          id: `event-${item.id}`,
          type: "event",
          title: item.title,
          excerpt: createExcerpt(excerpt),
          slug: item.slug,
          coverUrl: item.content_info?.cover?.url,
          date: item.basic_info?.datetime_start,
        });
      });
    }

    // Сортируем по дате (новые первые)
    searchResults.sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Применяем пагинацию на сервере
    const total = searchResults.length;
    const pageCount = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedResults = searchResults.slice(startIndex, endIndex);

    const searchResponse: SearchResponse = {
      data: paginatedResults,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount,
          total,
        },
      },
    };

    return NextResponse.json(searchResponse);
  } catch (error) {
    console.error("Error performing search:", error);
    return NextResponse.json(
      {
        error: "Failed to perform search",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
