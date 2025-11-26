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

export interface Seo {
  id: number;
  metaTitle?: string;
  metaDescription?: string;
  ogDescription?: string;
  ogImage?: StrapiImage | null;
  keywords?: string;
  metaRobots?: string;
  canonicalURL?: string;
  metaViewport?: string;
  structuredData?: Record<string, unknown>;
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
  seo?: Seo;
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
  original_number: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  images?: StrapiImage[] | null;
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
  seo?: Seo;
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
  videos?: {
    id: number;
    provider?: string;
    url?: string;
    video_file?: StrapiImage | null;
  }[];
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
  // meta_info удален, так как заменен на seo
  seo?: Seo;
}

export type ProjectListResponse = StrapiResponse<ProjectItem[]>;
export type ProjectItemResponse = StrapiResponse<ProjectItem>;
// Типы для событий календаря
export interface EventBasicInfo {
  id: number;
  datetime_start: string;
  category?: string;
  event_type?: "Человек дня" | "Событие дня" | "Тема дня" | "Фильм дня";
}

export interface EventContentInfo {
  id: number;
  description?: string;
  cover?: StrapiImage | null;
  gallery?: StrapiImage[];
}

export interface EventLocationInfo {
  id: number;
  location?: string;
  location_map_link?: {
    latitude?: number;
    longitude?: number;
    address?: string;
  } | null;
}

export interface EventAdditionalMaterials {
  id: number;
  videos?: {
    id: number;
    provider?: string;
    url?: string;
    video_file?: StrapiImage | null;
  }[];
  attachments?: {
    id: number;
    title?: string;
    file?: StrapiImage | null;
  }[];
}

export interface EventItem {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  slug: string;
  basic_info: EventBasicInfo;
  content_info?: EventContentInfo;
  location_info?: EventLocationInfo;
  additional_materials?: EventAdditionalMaterials;
  seo?: Seo;
}

export type EventListResponse = StrapiResponse<EventItem[]>;
export type EventItemResponse = StrapiResponse<EventItem>;

// Типы для партнеров
export interface PartnerItem {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  slug: string;
  url?: string;
  logo?: StrapiImage | null;
  vk_url?: string;
  website_url?: string;
}

export type PartnerListResponse = StrapiResponse<PartnerItem[]>;
export type PartnerItemResponse = StrapiResponse<PartnerItem>;

// Команда и Руководство
export interface TeamMember {
  id: number;
  documentId: string;
  full_name: string;
  slug: string;
  photo?: StrapiImage;
  basic_info: {
    position: string;
    phone?: string;
    email?: string;
    order: number;
  };
  bio?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type TeamResponse = StrapiResponse<TeamMember[]>;
export type ManagementMember = TeamMember;
export type ManagementResponse = StrapiResponse<TeamMember[]>;

// Контакты
export interface ContactData {
  id: number;
  attributes: {
    main: {
      address: string;
      website: string;
      email: string;
      map_embed?: string | null;
      phones: Array<{
        id: number;
        label: string;
        number: string;
      }>;
    };
  };
}

export interface ContactsResponse {
  data: ContactData | null;
  meta: Record<string, unknown>;
}

// Фирменный стиль / Brand
export interface BrandColorItem {
  id: number;
  color_name?: string | null;
  hex_value?: string | null;
  rgb_value?: string | null;
  cmyk_value?: string | null;
}

export interface BrandLogoDocument {
  id: number;
  description?: string | null;
  files?: StrapiImage[];
}

export interface BrandContent {
  id: number;
  logo_with_description?: BrandLogoDocument | null;
  logos?: StrapiImage[];
  brand_colors?: BrandColorItem[];
}

export interface BrandData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  content?: BrandContent | null;
}

export interface BrandResponse {
  data: BrandData | null;
  meta: Record<string, unknown>;
}

// Типы для документов
export interface DocumentAttachments {
  id: number;
  files?: StrapiImage[];
}

export interface DocumentItem {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  slug: string;
  category: "Реестр" | "Метод. Рекомендации";
  description?: string;
  files?: StrapiImage[];
  attachments?: DocumentAttachments;
}

export type DocumentListResponse = StrapiResponse<DocumentItem[]>;
export type DocumentItemResponse = StrapiResponse<DocumentItem>;

// Общие типы
export type PaginationArgs = {
  page?: number;
  pageSize?: number;
};
