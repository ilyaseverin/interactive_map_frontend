import type { Metadata } from "next";
import { NewsItem } from "@/types/strapi";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MediaGallery from "@/components/media/MediaGallery";

// Полностью отключаем кэширование для гарантированной генерации metadata
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Получить новость по slug
async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  try {
    const res = await fetch(
      `${apiUrl}/api/news?filters[slug][$eq]=${slug}&pagination[pageSize]=1&populate[basic_info]=*&populate[content_info]=*&populate[media][populate][cover]=true&populate[media][populate][gallery]=true&populate[media][populate][video_links]=*&populate[meta_info][populate][tags]=*`,
      {
        cache: "no-store",
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

// Генерация метаданных
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

  let metaDescription = "";

  if (news.content_info?.excerpt) {
    if (news.content_info.excerpt.length >= 50) {
      metaDescription = news.content_info.excerpt;
    } else {
      metaDescription = `${news.title}. ${news.content_info.excerpt}`;
    }
  } else {
    metaDescription = `${news.title}. Читайте последние новости Патриот Центра 48.`;
  }

  if (metaDescription.length < 50) {
    metaDescription = `${metaDescription} Актуальные новости Патриот Центра 48.`;
  }

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
      index: false,
      follow: false,
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
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Компонент даты с иконкой
function DateDisplay({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-[8px]">
      <div className="relative w-[26px] h-[26px]">
        <Image
          src="/images/calendar/calendar-icon.png"
          alt="Calendar"
          width={26}
          height={26}
          className="object-contain"
        />
      </div>
      <span className="text-[20px] lg:text-[24px] font-normal font-montserrat text-black leading-[1.219]">
        {formatDate(date)}
      </span>
    </div>
  );
}

// Кнопка "Назад"
function BackButton() {
  return (
    <Link
      href="/news"
      className="inline-flex items-center justify-center gap-[10px] px-[24px] py-[16px] border border-[#C62828] text-[#C62828] text-[20px] font-normal font-montserrat rounded-[12px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219]"
    >
      <svg
        width="33"
        height="25"
        viewBox="0 0 33 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <path
          d="M6 13L28 13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M13 6L6 13L13 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Назад
    </Link>
  );
}

// Серверный компонент страницы новости
export default async function NewsDetailPage({
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

  // Галерея изображений
  const galleryImages =
    news.media?.gallery?.map((image) => {
      const imageUrl = image.url.startsWith("http")
        ? image.url
        : `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${
            image.url
          }`;
      return {
        url: imageUrl,
        alt: image.alternativeText || news.title,
      };
    }) || [];

  // Если нет галереи, используем обложку
  const sliderImages =
    galleryImages.length > 0
      ? galleryImages
      : fullCoverUrl
      ? [{ url: fullCoverUrl, alt: news.title }]
      : [];

  // Видео ссылки
  const videoLinks = news.media?.video_links || [];
  const firstVideoUrl = videoLinks.length > 0 ? videoLinks[0].url : undefined;

  // Разбиваем контент на параграфы
  const contentParagraphs =
    news.content_info?.content?.split("\n\n").filter((p) => p.trim()) || [];

  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      {/* Основной контент */}
      <main className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[63px] pt-[20px] lg:pt-[29px]">
        {/* Хлебные крошки */}
        <nav className="flex items-center gap-[14px] mb-[54px] text-[20px] font-normal font-montserrat leading-[1.219] lg:pl-[13px]">
          <Link href="/home" className="text-black hover:text-[#1D4E89]">
            Главная
          </Link>
          <span className="text-black">&gt;</span>
          <Link href="/news" className="text-black hover:text-[#1D4E89]">
            Новости
          </Link>
          <span className="text-black">&gt;</span>
          <span className="text-black truncate max-w-[300px] lg:max-w-none">
            {news.title}
          </span>
        </nav>

        {/* Белая карточка с новостью */}
        <div className="bg-white/90 rounded-[15px] p-6 lg:p-[67px] mb-[83px]">
          {/* Верхняя часть: кнопка назад (справа) и заголовок (слева) */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-[23px]">
            {/* Заголовок */}
            <h1 className="text-[32px] lg:text-[40px] font-bold font-montserrat text-black leading-[1.219] flex-1">
              {news.title}
            </h1>

            {/* Кнопка назад (только на десктопе сверху справа) */}
            <div className="hidden lg:block flex-shrink-0">
              <BackButton />
            </div>
          </div>

          {/* Дата */}
          <div className="mb-[28px]">
            <DateDisplay date={news.basic_info.published_at_date} />
          </div>

          {/* Краткое описание */}
          {news.content_info?.excerpt && (
            <p className="text-[20px] lg:text-[24px] font-semibold font-montserrat text-black leading-[1.219] mb-[46px]">
              {news.content_info.excerpt}
            </p>
          )}

          {/* Галерея (с клиентским компонентом для слайдера) */}
          <MediaGallery
            images={sliderImages}
            hasPhotoAlbum={galleryImages.length > 0}
            videoUrl={firstVideoUrl}
            slug={news.slug}
          />

          {/* Текст новости */}
          {contentParagraphs.length > 0 && (
            <div className="mb-[64px] space-y-[36px] lg:px-[20px] xl:px-[40px] 2xl:px-[96px]">
              {contentParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[20px] lg:text-[24px] font-normal font-montserrat text-black leading-[1.458] whitespace-pre-line"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Нижняя часть: кнопка назад и дата */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pt-[64px] border-t border-gray-200 lg:px-[20px] xl:px-[40px] 2xl:px-[96px]">
            <BackButton />
            <DateDisplay date={news.basic_info.published_at_date} />
          </div>
        </div>
      </main>
    </div>
  );
}
