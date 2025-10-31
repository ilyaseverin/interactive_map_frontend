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
  url?: string;
  open_in_vk?: boolean;
  video_file?: StrapiImage | null;
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

// Типы для точек Боевой Славы
export interface BattleGloryCoordinates {
  lat: number;
  lng: number;
}

export interface BattleGloryPoint {
  id: number;
  documentId: string;
  title: string;
  description: string;
  point_type:
    | "памятник/мемориал"
    | "мемориальная доска"
    | "воинское захоронение";
  municipality: string;
  address: string;
  formatted_address: string;
  coordinates: BattleGloryCoordinates;
  region: string;
  object_name: string;
  geocoding_status: string;
  original_number: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: StrapiImage | null;
  preview_image: StrapiImage | null;
  video: StrapiImage | null;
}

// Ответ API для точек Боевой Славы
export interface BattleGloryResponse {
  data: BattleGloryPoint[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Типы для пресс-релизов
export interface PressReleaseBasicInfo {
  id: number;
  published_at_date: string;
  author?: string;
  category?: string;
}

export interface PressReleaseContentInfo {
  id: number;
  excerpt?: string;
  content?: string;
}

export interface PressReleaseMedia {
  id: number;
  cover?: StrapiImage | null;
  gallery?: StrapiImage[];
}

export interface PressReleaseMeta {
  id: number;
  keywords?: { id: number; value?: string | null }[];
}

export interface PressReleaseItem {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  slug: string;
  basic_info: PressReleaseBasicInfo;
  content_info?: PressReleaseContentInfo;
  media?: PressReleaseMedia;
  attachments_block?: { id: number; attachments?: unknown[] };
  meta_info?: PressReleaseMeta;
}

export type PressReleaseListResponse = StrapiResponse<PressReleaseItem[]>;
export type PressReleaseItemResponse = StrapiResponse<PressReleaseItem>;

// Типы для проектов
export interface ProjectBasicInfo {
  id: number;
  material_type?: "новость" | "анонс" | "объявление" | "прочее";
  category?: string;
}

export interface ProjectSummary {
  id: number;
  excerpt?: string;
}

export interface ProjectContentInfo {
  id: number;
  content?: string;
}

export interface ProjectMedia {
  id: number;
  cover?: StrapiImage | null;
  gallery?: StrapiImage[];
  videos?: { id: number; provider?: string; url?: string; video_file?: StrapiImage | null }[];
}

export interface ProjectItem {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  slug: string;
  basic_info: ProjectBasicInfo;
  summary?: ProjectSummary;
  content_info?: ProjectContentInfo;
  media?: ProjectMedia;
  attachments_block?: { id: number; attachments?: unknown[] };
  links?: {
    id: number;
    external_links?: { id: number; url?: string; label?: string }[];
  };
}

export type ProjectListResponse = StrapiResponse<ProjectItem[]>;
export type ProjectItemResponse = StrapiResponse<ProjectItem>;
