import type { Metadata } from "next";
import { PressReleaseItem } from "@/types/strapi";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MediaGallery from "@/components/media/MediaGallery";
import DownloadLink from "@/components/DownloadLink";

// Полностью отключаем кэширование для гарантированной генерации metadata
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Получить пресс-релиз по slug
async function getPressReleaseBySlug(
  slug: string
): Promise<PressReleaseItem | null> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  try {
    const res = await fetch(
      `${apiUrl}/api/press-releases?filters[slug][$eq]=${slug}&pagination[pageSize]=1&populate[basic_info]=*&populate[content_info]=*&populate[media][populate][cover]=true&populate[media][populate][gallery]=true&populate[attachments_block][populate][attachments][fields][0]=title&populate[attachments_block][populate][attachments][fields][1]=description&populate[attachments_block][populate][attachments][populate][file]=true&populate[meta_info][populate][keywords]=*&publicationState=live`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch press release:", res.status);
      return null;
    }

    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      return null;
    }

    return data.data[0];
  } catch (error) {
    console.error("Error fetching press release:", error);
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
  const pressRelease = await getPressReleaseBySlug(slug);

  if (!pressRelease) {
    return {
      title: "Пресс-релиз не найден",
      description: "Запрашиваемый пресс-релиз не найден",
    };
  }

  const coverUrl = pressRelease.media?.cover?.url;
  const fullCoverUrl = coverUrl
    ? coverUrl.startsWith("http")
      ? coverUrl
      : `${
          process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
        }${coverUrl}`
    : undefined;

  const keywords =
    pressRelease.meta_info?.keywords
      ?.filter((keyword) => keyword.value)
      .map((keyword) => keyword.value || "") || [];

  let metaDescription = "";

  if (pressRelease.content_info?.excerpt) {
    if (pressRelease.content_info.excerpt.length >= 50) {
      metaDescription = pressRelease.content_info.excerpt;
    } else {
      metaDescription = `${pressRelease.title}. ${pressRelease.content_info.excerpt}`;
    }
  } else {
    metaDescription = `${pressRelease.title}. Читайте последние пресс-релизы Патриот Центра 48.`;
  }

  if (metaDescription.length < 50) {
    metaDescription = `${metaDescription} Актуальные пресс-релизы Патриот Центра 48.`;
  }

  const truncatedDescription =
    metaDescription.length > 160
      ? metaDescription.substring(0, 157) + "..."
      : metaDescription;

  return {
    title: `${pressRelease.title} | Пресс-релизы`,
    description: truncatedDescription,
    keywords: keywords,
    openGraph: {
      title: pressRelease.title,
      description: truncatedDescription,
      type: "article",
      locale: "ru_RU",
      publishedTime: pressRelease.basic_info.published_at_date,
      modifiedTime: pressRelease.updatedAt,
      images: fullCoverUrl ? [fullCoverUrl] : undefined,
      tags: keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: pressRelease.title,
      description: truncatedDescription,
      images: fullCoverUrl ? [fullCoverUrl] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/media/press-releases/${slug}`,
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
      href="/media/press-releases"
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

// Серверный компонент страницы пресс-релиза
export default async function PressReleaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pressRelease = await getPressReleaseBySlug(slug);

  if (!pressRelease) {
    notFound();
  }

  const coverUrl = pressRelease.media?.cover?.url;
  const fullCoverUrl = coverUrl
    ? coverUrl.startsWith("http")
      ? coverUrl
      : `${
          process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
        }${coverUrl}`
    : null;

  // Галерея изображений
  const galleryImages =
    pressRelease.media?.gallery?.map((image) => {
      const imageUrl = image.url.startsWith("http")
        ? image.url
        : `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${
            image.url
          }`;
      return {
        url: imageUrl,
        alt: image.alternativeText || pressRelease.title,
      };
    }) || [];

  // Если нет галереи, используем обложку
  const sliderImages =
    galleryImages.length > 0
      ? galleryImages
      : fullCoverUrl
      ? [{ url: fullCoverUrl, alt: pressRelease.title }]
      : [];

  // Аттачменты
  const attachments = (
    pressRelease.attachments_block?.attachments || []
  ).filter(
    (att: unknown) =>
      att && typeof att === "object" && att !== null && "file" in att
  );

  // Аттачменты обработаны

  // Разбиваем контент на параграфы
  const contentParagraphs =
    pressRelease.content_info?.content?.split("\n\n").filter((p) => p.trim()) ||
    [];

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
          <Link
            href="/media/press-releases"
            className="text-black hover:text-[#1D4E89]"
          >
            Для СМИ
          </Link>
          <span className="text-black">&gt;</span>
          <Link
            href="/media/press-releases"
            className="text-black hover:text-[#1D4E89]"
          >
            Пресс-релизы
          </Link>
          <span className="text-black">&gt;</span>
          <span className="text-black truncate max-w-[300px] lg:max-w-none">
            {pressRelease.title}
          </span>
        </nav>

        {/* Белая карточка с пресс-релизом */}
        <div className="bg-white/90 rounded-[15px] p-6 lg:p-[67px] mb-[83px]">
          {/* Верхняя часть: заголовок и кнопка назад на одном уровне */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-[23px]">
            {/* Заголовок */}
            <h1 className="text-[32px] lg:text-[40px] font-bold font-montserrat text-black">
              {pressRelease.title}
            </h1>
            {/* Кнопка назад справа */}
            <div className="hidden lg:block flex-shrink-0">
              <BackButton />
            </div>
          </div>

          {/* Категория и дата на одном уровне */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-[23px]">
            {/* Дата слева */}
            <DateDisplay date={pressRelease.basic_info.published_at_date} />
            {/* Категория рядом с датой */}
            {pressRelease.basic_info.category && (
              <div className="inline-flex items-center px-[22px] py-[10px] bg-[#EFEFEF] rounded-[16px]">
                <span className="text-[20px] font-medium font-montserrat text-[#737373] leading-[1.219]">
                  {pressRelease.basic_info.category}
                </span>
              </div>
            )}
          </div>

          {/* Краткое описание */}
          {pressRelease.content_info?.excerpt && (
            <p className="text-[20px] lg:text-[24px] font-semibold font-montserrat text-black leading-[1.219] mb-[46px]">
              {pressRelease.content_info.excerpt}
            </p>
          )}

          {/* Галерея */}
          {sliderImages.length > 0 && (
            <MediaGallery
              images={sliderImages}
              hasPhotoAlbum={galleryImages.length > 0}
              slug={pressRelease.slug}
            />
          )}

          {/* Контент под галереей */}
          <div className="lg:px-[20px] xl:px-[40px] 2xl:px-[96px]">
            {/* Текст пресс-релиза */}
            {contentParagraphs.length > 0 && (
              <div className="mb-[46px] space-y-[30px]">
                {contentParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-[20px] lg:text-[24px] font-medium font-montserrat text-black leading-[1.458] whitespace-pre-line"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Вложения */}
            {attachments.length > 0 && (
              <div className="flex items-start gap-[8px] mb-[64px]">
                {/* Иконка файла */}
                <div className="w-[68px] h-[68px] flex-shrink-0">
                  <Image
                    src="/images/document-icon.png"
                    alt="Документ"
                    width={68}
                    height={68}
                  />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <p className="text-[20px] font-normal font-montserrat text-black">
                    Скачать официальную версию
                  </p>
                  <div className="flex items-center gap-[8px] text-[20px] font-normal font-montserrat text-black">
                    {attachments.map((attachment, index) => {
                      const att = attachment as {
                        title?: string;
                        file?: {
                          url: string;
                          ext?: string;
                          name?: string;
                          filename?: string;
                        };
                      };
                      const file = att?.file;
                      if (!file) return null;

                      // Собираем URL с оригинальным именем файла
                      let fileUrl = file.url.startsWith("http")
                        ? file.url
                        : `${
                            process.env.NEXT_PUBLIC_STRAPI_URL ||
                            "http://localhost:1337"
                          }${file.url}`;

                      // Пытаемся добавить оригинальное имя файла к URL для Strapi
                      if (file.name && !file.url.startsWith("http")) {
                        // Для Strapi можно использовать параметр ?filename= или просто имя из базы
                        fileUrl = `${
                          process.env.NEXT_PUBLIC_STRAPI_URL ||
                          "http://localhost:1337"
                        }${file.url}?filename=${encodeURIComponent(file.name)}`;
                      }

                      // Отображаем тип файла (расширение) в верхнем регистре
                      const displayName =
                        file.ext?.toUpperCase()?.replace(".", "") || "PDF";

                      return (
                        <DownloadLink
                          key={index}
                          url={fileUrl}
                          fileName={
                            file.name ||
                            file.filename ||
                            `document${file.ext || ".pdf"}`
                          }
                          displayName={displayName}
                          isLast={index === attachments.length - 1}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Нижняя часть: кнопка назад и дата */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:pl-[20px] xl:pl-[40px] 2xl:pl-[96px]">
            <div className="lg:hidden">
              <BackButton />
            </div>
            <div className="hidden lg:block">
              <BackButton />
            </div>
            <div className="hidden lg:block">
              <DateDisplay date={pressRelease.basic_info.published_at_date} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
