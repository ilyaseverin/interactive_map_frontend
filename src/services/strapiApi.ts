import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  NewsItem,
  NewsListResponse,
  PressReleaseItem,
  PressReleaseListResponse,
  ProjectItem,
  ProjectListResponse,
  EventItem,
  EventListResponse,
  PartnerListResponse,
  TeamResponse,
  ManagementResponse,
  ContactsResponse,
  BrandResponse,
  DocumentListResponse,
  ActivityComplex,
  ActivityComplexListResponse,
  PaginationArgs,
  HeroSliderResponse,
  OrganizationResponse,
} from "@/types/strapi";
import { getStrapiUrl } from "@/utils/strapiUrl";

const STRAPI_BASE_URL = `${getStrapiUrl().replace(/\/$/, "")}/api`;

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
    "Events",
    "Event",
    "Partners",
    "Partner",
    "Brand",
    "Documents",
    "Document",
    "ActivityComplexes",
    "ActivityComplex",
    "HeroSlider",
    "Organization",
  ],
  endpoints: (builder) => ({
    getPressReleases: builder.query<
      PressReleaseListResponse,
      (PaginationArgs & { minimal?: boolean }) | void
    >({
      query: ({ page = 1, pageSize = 6, minimal } = {}) => {
        const populateParams = minimal
          ? {
              "populate[basic_info]": "*",
              "populate[media][populate][cover]": "true",
              "populate[media][populate][gallery]": "true",
              "populate[content_info][fields][0]": "excerpt",
            }
          : {
              "populate[basic_info]": "*",
              "populate[content_info]": "*",
              "populate[media][populate][cover]": "true",
              "populate[media][populate][gallery]": "true",
            };

        return {
          url: "press-releases",
          params: {
            "pagination[page]": page,
            "pagination[pageSize]": pageSize,
            ...populateParams,
            sort: "basic_info.published_at_date:desc",
          },
        };
      },
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
      (PaginationArgs & { category?: string; minimal?: boolean }) | void
    >({
      query: ({ page = 1, pageSize = 9, category, minimal } = {}) => {
        const populateParams = minimal
          ? {
              "populate[basic_info]": "*",
              "populate[content_info][fields][0]": "excerpt",
              "populate[media][populate][cover]": "true",
            }
          : {
              "populate[basic_info]": "*",
              "populate[content_info]": "*",
              "populate[media][populate][cover]": "true",
              "populate[media][populate][gallery]": "true",
            };

        return {
          url: "news",
          params: {
            "pagination[page]": page,
            "pagination[pageSize]": pageSize,
            ...(category
              ? { "filters[basic_info][category][$eq]": category }
              : {}),
            ...populateParams,
            sort: "basic_info.published_at_date:desc",
          },
        };
      },
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
          publicationState: "live",
        },
      }),
      transformResponse: (response: NewsListResponse) =>
        response?.data?.[0] ?? null,
      providesTags: (result, error, slug) => [{ type: "NewsItem", id: slug }],
    }),

    getProjects: builder.query<
      ProjectListResponse,
      (PaginationArgs & { minimal?: boolean }) | void
    >({
      query: ({ page = 1, pageSize = 9, minimal } = {}) => {
        const populateParams = minimal
          ? {
              "populate[basic_info]": "*",
              "populate[summary]": "*",
              "populate[media][populate][cover]": "true",
              "populate[media][populate][gallery]": "true",
              "populate[media][populate][videos][populate][video_file]": "true",
            }
          : {
              "populate[basic_info]": "*",
              "populate[summary]": "*",
              "populate[content_info]": "*",
              "populate[media][populate][cover]": "true",
              "populate[media][populate][gallery]": "true",
              "populate[media][populate][videos][populate][video_file]": "true",
            };

        return {
          url: "projects",
          params: {
            "pagination[page]": page,
            "pagination[pageSize]": pageSize,
            ...populateParams,
            sort: "publishedAt:desc",
          },
        };
      },
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

    getPhotoAlbums: builder.query<
      NewsListResponse,
      (PaginationArgs & { minimal?: boolean }) | void
    >({
      query: ({ page = 1, pageSize = 18, minimal } = {}) => {
        const populateParams = minimal
          ? {
              "populate[basic_info]": "*",
              "populate[media][populate][cover]": "true",
              "populate[media][populate][gallery]": "true",
            }
          : {
              "populate[basic_info]": "*",
              "populate[media][populate][cover]": "true",
              "populate[media][populate][gallery]": "true",
            };

        return {
          url: "news",
          params: {
            "pagination[page]": page,
            "pagination[pageSize]": pageSize,
            ...populateParams,
            sort: "basic_info.published_at_date:desc",
          },
        };
      },
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

    getVideos: builder.query<
      NewsListResponse,
      (PaginationArgs & { minimal?: boolean }) | void
    >({
      query: ({ page = 1, pageSize = 18, minimal } = {}) => {
        const populateParams = minimal
          ? {
              "populate[basic_info]": "*",
              "populate[media][populate][cover]": "true",
              "populate[media][populate][video_links][populate][video_file]":
                "true",
            }
          : {
              "populate[basic_info]": "*",
              "populate[media][populate][cover]": "true",
              "populate[media][populate][video_links][populate][video_file]":
                "true",
            };

        return {
          url: "news",
          params: {
            "pagination[page]": page,
            "pagination[pageSize]": pageSize,
            ...populateParams,
            sort: "basic_info.published_at_date:desc",
          },
        };
      },
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

    getEvents: builder.query<
      EventListResponse,
      | (PaginationArgs & {
          eventType?: string;
          date?: string;
          minimal?: boolean;
        })
      | void
    >({
      query: ({ page = 1, pageSize = 10, eventType, date, minimal } = {}) => {
        // Вычисляем диапазон дат для фильтрации
        // Учитываем, что событие может быть сохранено в любом часовом поясе
        // Используем расширенный диапазон: от начала предыдущего дня до конца следующего дня в UTC
        // Это гарантирует, что событие будет найдено независимо от часового пояса
        let dateFilter = {};
        if (date) {
          // Конец выбранного дня + 1 день для учета всех часовых поясов
          const endDate = new Date(`${date}T00:00:00.000Z`);
          endDate.setUTCDate(endDate.getUTCDate() + 2); // +2 дня для учета всех часовых поясов
          const endDateString = endDate.toISOString().split("T")[0];

          // Начало предыдущего дня для учета событий, которые могут быть в UTC-часовых поясах
          const prevDate = new Date(`${date}T00:00:00.000Z`);
          prevDate.setUTCDate(prevDate.getUTCDate() - 1);
          const prevDateString = prevDate.toISOString().split("T")[0];

          dateFilter = {
            "filters[basic_info][datetime_start][$gte]": `${prevDateString}T00:00:00.000Z`,
            "filters[basic_info][datetime_start][$lt]": `${endDateString}T00:00:00.000Z`,
          };
        }

        const populateParams = minimal
          ? {
              "populate[basic_info]": "*",
            }
          : {
              "populate[basic_info]": "*",
              "populate[content_info][populate][cover]": "true",
              "populate[content_info][populate][gallery]": "true",
              "populate[location_info]": "*",
              "populate[additional_materials][populate][videos][populate][video_file]":
                "true",
              "populate[additional_materials][populate][attachments][populate][file]":
                "true",
            };

        return {
          url: "events",
          params: {
            "pagination[page]": page,
            "pagination[pageSize]": pageSize,
            ...(eventType
              ? { "filters[basic_info][event_type][$eq]": eventType }
              : {}),
            ...dateFilter,
            ...populateParams,
            sort: "basic_info.datetime_start:asc",
            publicationState: "live",
          },
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Events" as const, id: "LIST" },
              ...result.data.map((item) => ({
                type: "Event" as const,
                id: item.slug,
              })),
            ]
          : [{ type: "Events" as const, id: "LIST" }],
    }),

    getEventBySlug: builder.query<EventItem | null, string>({
      query: (slug) => ({
        url: "events",
        params: {
          "filters[slug][$eq]": slug,
          "pagination[pageSize]": 1,
          "populate[basic_info]": "*",
          "populate[content_info][populate][cover]": "true",
          "populate[content_info][populate][gallery]": "true",
          "populate[location_info]": "*",
          "populate[additional_materials][populate][videos][populate][video_file]":
            "true",
          "populate[additional_materials][populate][attachments][populate][file]":
            "true",
          publicationState: "live",
        },
      }),
      transformResponse: (response: EventListResponse) =>
        response?.data?.[0] ?? null,
      providesTags: (result, error, slug) => [{ type: "Event", id: slug }],
    }),

    getPartners: builder.query<PartnerListResponse, PaginationArgs | void>({
      query: ({ page = 1, pageSize = 100 } = {}) => ({
        url: "partners",
        params: {
          "pagination[page]": page,
          "pagination[pageSize]": pageSize,
          "populate[logo]": "true",
          sort: "publishedAt:desc",
          publicationState: "live",
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Partners" as const, id: "LIST" },
              ...result.data.map((item) => ({
                type: "Partner" as const,
                id: item.slug,
              })),
            ]
          : [{ type: "Partners" as const, id: "LIST" }],
    }),

    getBrand: builder.query<BrandResponse, void>({
      query: () => ({
        url: "brand",
        params: {
          "populate[content]": "*",
          "populate[content][populate][logo_with_description]": "*",
          "populate[content][populate][logo_with_description][populate][files]":
            "true",
          "populate[content][populate][logos]": "true",
          "populate[content][populate][brand_colors]": "*",
        },
      }),
      providesTags: [{ type: "Brand", id: "SINGLE" }],
    }),

    getDocuments: builder.query<
      DocumentListResponse,
      (PaginationArgs & { category?: string }) | void
    >({
      query: ({ page = 1, pageSize = 10, category } = {}) => ({
        url: "documents",
        params: {
          "pagination[page]": page,
          "pagination[pageSize]": pageSize,
          ...(category ? { "filters[category][$eq]": category } : {}),
          "populate[files]": "true",
          "populate[attachments][populate][files]": "true",
          sort: "publishedAt:desc",
          publicationState: "live",
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Documents" as const, id: "LIST" },
              ...result.data.map((item) => ({
                type: "Document" as const,
                id: item.slug,
              })),
            ]
          : [{ type: "Documents" as const, id: "LIST" }],
    }),

    getActivityComplexes: builder.query<
      ActivityComplexListResponse,
      PaginationArgs | void
    >({
      query: ({ page = 1, pageSize = 10 } = {}) => ({
        url: "pages",
        params: {
          "pagination[page]": page,
          "pagination[pageSize]": pageSize,
          "populate[content]": "*",
          "populate[content][populate][attachments]": "*",
          "populate[content][populate][attachments][populate][file]": "true",
          "populate[content][populate][links]": "*",
          sort: "publishedAt:desc",
          publicationState: "live",
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "ActivityComplexes" as const, id: "LIST" },
              ...result.data.map((item) => ({
                type: "ActivityComplex" as const,
                id: item.slug,
              })),
            ]
          : [{ type: "ActivityComplexes" as const, id: "LIST" }],
    }),

    getHeroSlider: builder.query<HeroSliderResponse, void>({
      query: () => ({
        url: "hero-slider",
        params: {
          "populate[0]": "slides",
          "populate[1]": "slides.image",
        },
      }),
      providesTags: [{ type: "HeroSlider", id: "SINGLE" }],
    }),

    getAbout: builder.query<OrganizationResponse, void>({
      query: () => ({
        url: "about",
        params: {
          "populate[center_photo]": "true",
        },
      }),
      providesTags: [{ type: "Organization", id: "SINGLE" }],
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
  useGetEventsQuery,
  useGetEventBySlugQuery,
  useGetPartnersQuery,
  useGetBrandQuery,
  useGetDocumentsQuery,
  useGetActivityComplexesQuery,
  useGetHeroSliderQuery,
  useGetAboutQuery,
} = strapiApi;

export type StrapiApi = typeof strapiApi;
