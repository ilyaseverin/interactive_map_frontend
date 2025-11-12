import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  NewsItem,
  NewsListResponse,
  PressReleaseItem,
  PressReleaseListResponse,
  ProjectItem,
  ProjectListResponse,
} from "@/types/strapi";

export interface TeamMember {
  id: number;
  documentId: string;
  full_name: string;
  slug: string;
  photo?: {
    id: number;
    url: string;
    alternativeText?: string | null;
  };
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

export interface TeamResponse {
  data: TeamMember[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type ManagementMember = TeamMember;
export type ManagementResponse = TeamResponse;

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

export type PaginationArgs = {
  page?: number;
  pageSize?: number;
};

const STRAPI_BASE_URL = `${(
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
).replace(/\/$/, "")}/api`;

export const strapiApi = createApi({
  reducerPath: "strapiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: STRAPI_BASE_URL,
  }),
  tagTypes: [
    "PressReleases",
    "PressRelease",
    "News",
    "NewsItem",
    "Projects",
    "Project",
    "PhotoAlbums",
    "PhotoAlbum",
    "Videos",
    "Video",
    "Team",
    "Management",
    "Contacts",
  ],
  endpoints: (builder) => ({
    getPressReleases: builder.query<
      PressReleaseListResponse,
      PaginationArgs | void
    >({
      query: ({ page = 1, pageSize = 6 } = {}) => ({
        url: "press-releases",
        params: {
          "pagination[page]": page,
          "pagination[pageSize]": pageSize,
          "populate[basic_info]": "*",
          "populate[content_info]": "*",
          "populate[media][populate][cover]": "true",
          "populate[media][populate][gallery]": "true",
          sort: "basic_info.published_at_date:desc",
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "PressReleases" as const, id: "LIST" },
              ...result.data.map((item) => ({
                type: "PressRelease" as const,
                id: item.slug,
              })),
            ]
          : [{ type: "PressReleases" as const, id: "LIST" }],
    }),

    getPressReleaseBySlug: builder.query<PressReleaseItem | null, string>({
      query: (slug) => ({
        url: "press-releases",
        params: {
          "filters[slug][$eq]": slug,
          "pagination[pageSize]": 1,
          "populate[basic_info]": "*",
          "populate[content_info]": "*",
          "populate[media][populate][cover]": "true",
          "populate[media][populate][gallery]": "true",
          "populate[attachments_block][populate][attachments][fields][0]":
            "title",
          "populate[attachments_block][populate][attachments][fields][1]":
            "description",
          "populate[attachments_block][populate][attachments][populate][file]":
            "true",
          "populate[meta_info][populate][keywords]": "*",
          publicationState: "live",
        },
      }),
      transformResponse: (response: PressReleaseListResponse) =>
        response?.data?.[0] ?? null,
      providesTags: (result, error, slug) => [
        { type: "PressRelease", id: slug },
      ],
    }),

    getNews: builder.query<
      NewsListResponse,
      (PaginationArgs & { category?: string }) | void
    >({
      query: ({ page = 1, pageSize = 9, category } = {}) => ({
        url: "news",
        params: {
          "pagination[page]": page,
          "pagination[pageSize]": pageSize,
          ...(category
            ? { "filters[basic_info][category][$eq]": category }
            : {}),
          "populate[basic_info]": "*",
          "populate[content_info]": "*",
          "populate[media][populate][cover]": "true",
          "populate[media][populate][gallery]": "true",
          "populate[meta_info][populate][tags]": "*",
          sort: "basic_info.published_at_date:desc",
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "News" as const, id: "LIST" },
              ...result.data.map((item) => ({
                type: "NewsItem" as const,
                id: item.slug,
              })),
            ]
          : [{ type: "News" as const, id: "LIST" }],
    }),

    getNewsBySlug: builder.query<NewsItem | null, string>({
      query: (slug) => ({
        url: "news",
        params: {
          "filters[slug][$eq]": slug,
          "pagination[pageSize]": 1,
          "populate[basic_info]": "*",
          "populate[content_info]": "*",
          "populate[media][populate][cover]": "true",
          "populate[media][populate][gallery]": "true",
          "populate[media][populate][video_links][populate][video_file]":
            "true",
          "populate[meta_info][populate][tags]": "*",
          publicationState: "live",
        },
      }),
      transformResponse: (response: NewsListResponse) =>
        response?.data?.[0] ?? null,
      providesTags: (result, error, slug) => [{ type: "NewsItem", id: slug }],
    }),

    getProjects: builder.query<ProjectListResponse, PaginationArgs | void>({
      query: ({ page = 1, pageSize = 9 } = {}) => ({
        url: "projects",
        params: {
          "pagination[page]": page,
          "pagination[pageSize]": pageSize,
          "populate[basic_info]": "*",
          "populate[summary]": "*",
          "populate[content_info]": "*",
          "populate[media][populate][cover]": "true",
          "populate[media][populate][gallery]": "true",
          sort: "publishedAt:desc",
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Projects" as const, id: "LIST" },
              ...result.data.map((item) => ({
                type: "Project" as const,
                id: item.slug,
              })),
            ]
          : [{ type: "Projects" as const, id: "LIST" }],
    }),

    getProjectBySlug: builder.query<ProjectItem | null, string>({
      query: (slug) => ({
        url: "projects",
        params: {
          "filters[slug][$eq]": slug,
          "pagination[pageSize]": 1,
          "populate[basic_info]": "*",
          "populate[summary]": "*",
          "populate[content_info]": "*",
          "populate[media][populate][cover]": "true",
          "populate[media][populate][gallery]": "true",
          "populate[media][populate][videos][populate][video_file]": "true",
          "populate[attachments_block][populate][attachments][fields][0]":
            "title",
          "populate[attachments_block][populate][attachments][fields][1]":
            "description",
          "populate[attachments_block][populate][attachments][populate][file]":
            "true",
          "populate[links][populate][external_links]": "*",
          publicationState: "live",
        },
      }),
      transformResponse: (response: ProjectListResponse) =>
        response?.data?.[0] ?? null,
      providesTags: (result, error, slug) => [{ type: "Project", id: slug }],
    }),

    getPhotoAlbums: builder.query<NewsListResponse, PaginationArgs | void>({
      query: ({ page = 1, pageSize = 18 } = {}) => ({
        url: "news",
        params: {
          "pagination[page]": page,
          "pagination[pageSize]": pageSize,
          "populate[basic_info]": "*",
          "populate[media][populate][cover]": "true",
          "populate[media][populate][gallery]": "true",
          sort: "basic_info.published_at_date:desc",
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "PhotoAlbums" as const, id: "LIST" },
              ...result.data.map((item) => ({
                type: "PhotoAlbum" as const,
                id: item.slug,
              })),
            ]
          : [{ type: "PhotoAlbums" as const, id: "LIST" }],
    }),

    getPhotoAlbumBySlug: builder.query<NewsItem | null, string>({
      query: (slug) => ({
        url: "news",
        params: {
          "filters[slug][$eq]": slug,
          "pagination[pageSize]": 1,
          "populate[basic_info]": "*",
          "populate[media][populate][cover]": "true",
          "populate[media][populate][gallery]": "true",
        },
      }),
      transformResponse: (response: NewsListResponse) =>
        response?.data?.[0] ?? null,
      providesTags: (result, error, slug) => [{ type: "PhotoAlbum", id: slug }],
    }),

    getVideos: builder.query<NewsListResponse, PaginationArgs | void>({
      query: ({ page = 1, pageSize = 18 } = {}) => ({
        url: "news",
        params: {
          "pagination[page]": page,
          "pagination[pageSize]": pageSize,
          "populate[basic_info]": "*",
          "populate[media][populate][cover]": "true",
          "populate[media][populate][video_links][populate][video_file]":
            "true",
          sort: "basic_info.published_at_date:desc",
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Videos" as const, id: "LIST" },
              ...result.data.map((item) => ({
                type: "Video" as const,
                id: item.slug,
              })),
            ]
          : [{ type: "Videos" as const, id: "LIST" }],
    }),

    getTeam: builder.query<TeamResponse, void>({
      query: () => ({
        url: "team-members",
        params: {
          "populate[photo]": "true",
          "populate[basic_info]": "true",
          sort: "basic_info.order:asc",
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Team" as const, id: "LIST" },
              ...result.data.map((item) => ({
                type: "Team" as const,
                id: item.documentId,
              })),
            ]
          : [{ type: "Team" as const, id: "LIST" }],
    }),

    getManagement: builder.query<ManagementResponse, void>({
      query: () => ({
        url: "managements",
        params: {
          "populate[photo]": "true",
          "populate[basic_info]": "true",
          sort: "basic_info.order:asc",
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Management" as const, id: "LIST" },
              ...result.data.map((item) => ({
                type: "Management" as const,
                id: item.documentId,
              })),
            ]
          : [{ type: "Management" as const, id: "LIST" }],
    }),

    getContacts: builder.query<ContactsResponse, void>({
      query: () => ({
        url: "contact-page",
        params: {
          "populate[main][populate][phones]": "true",
        },
      }),
      providesTags: [{ type: "Contacts", id: "SINGLE" }],
    }),
  }),
});

export const {
  useGetPressReleasesQuery,
  useGetPressReleaseBySlugQuery,
  useGetNewsQuery,
  useGetNewsBySlugQuery,
  useGetProjectsQuery,
  useGetProjectBySlugQuery,
  useGetPhotoAlbumsQuery,
  useGetPhotoAlbumBySlugQuery,
  useGetVideosQuery,
  useGetTeamQuery,
  useGetManagementQuery,
  useGetContactsQuery,
} = strapiApi;

export type StrapiApi = typeof strapiApi;
