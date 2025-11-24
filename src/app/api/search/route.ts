import { NextResponse } from "next/server";
import { getStrapiUrl } from "@/utils/strapiUrl";
import { formatFileSize } from "@/utils/fileSize";
import type {
  NewsItem,
  ProjectItem,
  PressReleaseItem,
  EventItem,
  StrapiImage,
} from "@/types/strapi";

// Тип для attachment документа
interface DocumentAttachment {
  id: number;
  title?: string;
  description?: string;
  file?: StrapiImage | null;
}

const STRAPI_URL = getStrapiUrl();
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;

interface SearchResultItem {
  id: string;
  type: "news" | "project" | "press-release" | "event" | "document";
  title: string;
  excerpt: string;
  slug: string;
  coverUrl?: string;
  date?: string;
  // Для документов
  documentUrl?: string;
  documentFileName?: string;
  documentFileSize?: string;
  parentType?: "project" | "press-release" | "event";
  parentSlug?: string;
  parentTitle?: string;
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

// Вспомогательные функции
const createExcerpt = (text: string, maxLength: number = 200): string => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const containsSearchTerm = (
  text: string | null | undefined,
  searchTerm: string
): boolean => {
  if (!text) return false;
  return text.toLowerCase().includes(searchTerm.toLowerCase());
};

interface FoundDocument {
  title?: string;
  description?: string;
  file?: { name: string; url: string; size: number };
}

const findMatchingDocuments = (
  attachments: DocumentAttachment[] | undefined,
  searchTerm: string,
  hasDescription: boolean = true
): FoundDocument[] => {
  if (!attachments) return [];

  return attachments
    .filter((attachment) => {
      const docTitle = attachment.title || "";
      const docDescription = attachment.description || "";
      const fileName = attachment.file?.name || "";

      return (
        containsSearchTerm(docTitle, searchTerm) ||
        (hasDescription && containsSearchTerm(docDescription, searchTerm)) ||
        containsSearchTerm(fileName, searchTerm)
      );
    })
    .map((attachment) => ({
      title: attachment.title || "",
      description: hasDescription ? attachment.description || "" : undefined,
      file: attachment.file
        ? {
            name: attachment.file.name || "Документ",
            url: attachment.file.url || "",
            size: attachment.file.size || 0,
          }
        : undefined,
    }));
};

const createDocumentResults = (
  documents: FoundDocument[],
  itemId: number,
  itemSlug: string,
  itemTitle: string,
  itemDate: string,
  parentType: "project" | "press-release" | "event",
  prefix: string
): SearchResultItem[] => {
  return documents.map((doc, index) => {
    const fileName = doc.file?.name || doc.title || "Документ";
    const fileUrl = doc.file?.url ? `${STRAPI_URL}${doc.file.url}` : "";
    const fileSize = doc.file?.size ? formatFileSize(doc.file.size) : undefined;

    return {
      id: `${prefix}-doc-${itemId}-${index}`,
      type: "document",
      title: doc.title || fileName,
      excerpt: "",
      slug: itemSlug,
      documentUrl: fileUrl,
      documentFileName: fileName,
      documentFileSize: fileSize,
      parentType,
      parentSlug: itemSlug,
      parentTitle: itemTitle,
      date: itemDate,
    };
  });
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || String(DEFAULT_PAGE), 10);
  const pageSize = parseInt(
    searchParams.get("pageSize") || String(DEFAULT_PAGE_SIZE),
    10
  );

  try {
    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        data: [],
        meta: {
          pagination: {
            page: DEFAULT_PAGE,
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
          "filters[$or][3][attachments_block][attachments][title][$containsi]":
            searchTerm,
          "filters[$or][4][attachments_block][attachments][description][$containsi]":
            searchTerm,
          "filters[$or][5][attachments_block][attachments][file][name][$containsi]":
            searchTerm,
          "populate[basic_info]": "*",
          "populate[summary]": "*",
          "populate[content_info]": "*",
          "populate[media][populate][cover]": "true",
          "populate[attachments_block][populate][attachments][populate][file]":
            "true",
          sort: "publishedAt:desc",
        }),
        // Пресс-релизы
        searchStrapiContent("press-releases", {
          "filters[$or][0][title][$containsi]": searchTerm,
          "filters[$or][1][content_info][excerpt][$containsi]": searchTerm,
          "filters[$or][2][content_info][content][$containsi]": searchTerm,
          "filters[$or][3][attachments_block][attachments][title][$containsi]":
            searchTerm,
          "filters[$or][4][attachments_block][attachments][description][$containsi]":
            searchTerm,
          "filters[$or][5][attachments_block][attachments][file][name][$containsi]":
            searchTerm,
          "populate[basic_info]": "*",
          "populate[content_info]": "*",
          "populate[media][populate][cover]": "true",
          "populate[attachments_block][populate][attachments][populate][file]":
            "true",
          sort: "basic_info.published_at_date:desc",
        }),
        // События
        searchStrapiContent("events", {
          "filters[$or][0][title][$containsi]": searchTerm,
          "filters[$or][1][content_info][description][$containsi]": searchTerm,
          "filters[$or][2][location_info][location][$containsi]": searchTerm,
          "filters[$or][3][additional_materials][attachments][title][$containsi]":
            searchTerm,
          "filters[$or][4][additional_materials][attachments][description][$containsi]":
            searchTerm,
          "filters[$or][5][additional_materials][attachments][file][name][$containsi]":
            searchTerm,
          "populate[basic_info]": "*",
          "populate[content_info][populate][cover]": "true",
          "populate[content_info][populate][gallery]": "true",
          "populate[location_info]": "*",
          "populate[additional_materials][populate][attachments][populate][file]":
            "true",
          sort: "basic_info.datetime_start:desc",
        }),
      ]);

    // Объединяем результаты в один массив
    const searchResults: SearchResultItem[] = [];

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
        const foundDocuments = findMatchingDocuments(
          item.attachments_block?.attachments as
            | DocumentAttachment[]
            | undefined,
          searchTerm
        );

        if (foundDocuments.length > 0) {
          searchResults.push(
            ...createDocumentResults(
              foundDocuments,
              item.id,
              item.slug,
              item.title,
              item.publishedAt,
              "project",
              "project"
            )
          );
        }

        // Проверяем, был ли найден контент (не только документ)
        const contentFound =
          containsSearchTerm(item.title, searchTerm) ||
          containsSearchTerm(item.summary?.excerpt, searchTerm) ||
          containsSearchTerm(item.content_info?.content, searchTerm);

        if (contentFound) {
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
        }
      });
    }

    // Обработка пресс-релизов
    if (pressReleasesData.data) {
      pressReleasesData.data.forEach((item: PressReleaseItem) => {
        const foundDocuments = findMatchingDocuments(
          item.attachments_block?.attachments as
            | DocumentAttachment[]
            | undefined,
          searchTerm
        );

        if (foundDocuments.length > 0) {
          searchResults.push(
            ...createDocumentResults(
              foundDocuments,
              item.id,
              item.slug,
              item.title,
              item.basic_info?.published_at_date || "",
              "press-release",
              "press"
            )
          );
        }

        // Проверяем, был ли найден контент (не только документ)
        const contentFound =
          containsSearchTerm(item.title, searchTerm) ||
          containsSearchTerm(item.content_info?.excerpt, searchTerm) ||
          containsSearchTerm(item.content_info?.content, searchTerm);

        if (contentFound) {
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
        }
      });
    }

    // Обработка событий
    if (eventsData.data) {
      eventsData.data.forEach((item: EventItem) => {
        // У событий нет поля description в attachments
        const foundDocuments = findMatchingDocuments(
          item.additional_materials?.attachments as
            | DocumentAttachment[]
            | undefined,
          searchTerm,
          false
        );

        if (foundDocuments.length > 0) {
          searchResults.push(
            ...createDocumentResults(
              foundDocuments,
              item.id,
              item.slug,
              item.title,
              item.basic_info?.datetime_start || "",
              "event",
              "event"
            )
          );
        }

        // Проверяем, был ли найден контент (не только документ)
        const contentFound =
          containsSearchTerm(item.title, searchTerm) ||
          containsSearchTerm(item.content_info?.description, searchTerm) ||
          containsSearchTerm(item.location_info?.location, searchTerm);

        if (contentFound) {
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
        }
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
