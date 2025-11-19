import type { Metadata } from "next";
import { NewsItem } from "@/types/strapi";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import { notFound } from "next/navigation";
import MediaGallery from "@/components/media/MediaGallery";
import { BackButton } from "@/components/buttons";

// Полностью отключаем кэширование для гарантированной генерации metadata
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Получить новость по slug
async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  try {
    const res = await fetch(
      `${apiUrl}/api/news?filters[slug][$eq]=${slug}&pagination[pageSize]=1&populate[basic_info]=*&populate[content_info]=*&populate[media][populate][cover]=true&populate[media][populate][gallery]=true&populate[media][populate][video_links][populate][video_file]=true&populate[meta_info][populate][tags]=*`,
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
      <span className="text-[12px] md:text-[16px] lg:text-[24px] font-normal font-montserrat text-black leading-[1.219]">
        {formatDate(date)}
      </span>
    </div>
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

  // Видео ссылки или загруженные видео файлы
  const videoLinks = news.media?.video_links || [];
  const firstVideoLink = videoLinks.length > 0 ? videoLinks[0] : undefined;
  const firstVideoUrl = firstVideoLink?.url;
  const firstVideoFile = firstVideoLink?.video_file;
  const firstVideoFileUrl = firstVideoFile?.url
    ? firstVideoFile.url.startsWith("http")
      ? firstVideoFile.url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${
          firstVideoFile.url
        }`
    : undefined;

  // Разбиваем контент на параграфы
  const contentParagraphs =
    news.content_info?.content?.split("\n\n").filter((p) => p.trim()) || [];

  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      {/* Основной контент */}
      <main className="w-full max-w-[1920px] mx-auto px-[19px] md:px-[36px] lg:px-[63px] pt-[15px] md:pt-[20px] lg:pt-[40px]">
        {/* Хлебные крошки */}
        <Breadcrumbs
          className="mb-[30px] lg:mb-[30px] lg:pl-[17px]"
          items={[
            { label: "Главная", href: "/home" },
            { label: "Новости", href: "/news" },
            { label: news.title },
          ]}
        />

        {/* Белая карточка с новостью */}
        <div className="bg-white/90 rounded-[15px] p-[19px] md:p-[36px] lg:px-[80px] lg:py-[60px] mb-[83px]">
          {/* Мобилка/планшет: сверху дата слева, кнопка справа; ниже заголовок */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between mb-[28px]">
              <DateDisplay date={news.basic_info.published_at_date} />
              <div className="flex-shrink-0">
                <div className="md:hidden">
                  <BackButton
                    href="/news"
                    variant="icon"
                    ariaLabel="Назад к новостям"
                  />
                </div>
                <div className="hidden md:block">
                  <BackButton href="/news" />
                </div>
              </div>
            </div>
            <h1 className="text-[20px] md:text-[30px] font-bold font-montserrat text-black leading-[1.219] mb-[23px]">
              {news.title}
            </h1>
          </div>

          {/* Десктоп: заголовок слева, кнопка справа; ниже дата */}
          <div className="hidden lg:block">
            <div className="flex items-start justify-between mb-[23px]">
              <h1 className="text-[40px] font-bold font-montserrat text-black leading-[1.219]">
                {news.title}
              </h1>
              <div className="flex-shrink-0">
                <BackButton href="/news" />
              </div>
            </div>
            <div className="mb-[28px]">
              <DateDisplay date={news.basic_info.published_at_date} />
            </div>
          </div>

          {/* Краткое описание */}
          {news.content_info?.excerpt && (
            <p className="text-[12px] md:text-[16px] lg:text-[24px] font-semibold font-montserrat text-black leading-[1.219] mb-[46px] lg:mb-[61px]">
              {news.content_info.excerpt}
            </p>
          )}

          {/* Галерея (с клиентским компонентом для слайдера) */}
          {(sliderImages.length > 0 || firstVideoFileUrl || firstVideoUrl) && (
            <div className="xl:px-[40px] 2xl:px-[96px]">
              <MediaGallery
                images={sliderImages}
                hasPhotoAlbum={galleryImages.length > 0}
                videoUrl={firstVideoUrl}
                videoFileUrl={firstVideoFileUrl}
                slug={news.slug}
                sourceType="news"
              />
            </div>
          )}

          {/* Текст новости */}
          <div className="xl:px-[40px] 2xl:px-[96px]">
            {contentParagraphs.length > 0 && (
              <div className="mb-[25px] md:mb-[40px] lg:mb-[46px] space-y-[36px]">
                {contentParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-[12px] md:text-[16px] lg:text-[24px] font-normal md:font-medium font-montserrat text-black leading-[1.666] md:leading-[1.5625] lg:leading-[1.458] whitespace-pre-line"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Нижняя часть: кнопка назад и дата */}
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-6 pt-[25px] md:pt-[40px] lg:pt-[64px]">
            <BackButton href="/news" />
            <div className="hidden md:block">
              <DateDisplay date={news.basic_info.published_at_date} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
