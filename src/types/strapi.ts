// Базовые типы Strapi 5
export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider: string;
  provider_metadata?: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Компоненты новостей (Strapi 5 - без обертки data)
export interface NewsBasicInfo {
  id: number;
  published_at_date: string;
  category?: "Главные" | "Региональные";
}

export interface NewsContentInfo {
  id: number;
  excerpt?: string;
  content?: string;
}

export interface NewsVideoLink {
  id: number;
  provider: string;
  url: string;
  open_in_vk?: boolean;
}

export interface NewsMedia {
  id: number;
  cover?: StrapiImage | null;
  gallery?: StrapiImage[];
  video_links?: NewsVideoLink[];
}

export interface NewsMetaTag {
  id: number;
  value?: string | null;
}

export interface NewsMeta {
  id: number;
  tags?: NewsMetaTag[];
}

// Основной тип новости (Strapi 5 - атрибуты на верхнем уровне)
export interface NewsItem {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  slug: string;
  basic_info: NewsBasicInfo;
  content_info?: NewsContentInfo;
  media?: NewsMedia;
  meta_info?: NewsMeta;
}

// Ответ API Strapi
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Тип для списка новостей
export type NewsListResponse = StrapiResponse<NewsItem[]>;

// Тип для одной новости
export type NewsItemResponse = StrapiResponse<NewsItem>;
