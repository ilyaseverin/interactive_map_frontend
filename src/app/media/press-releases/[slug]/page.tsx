import type { Metadata } from "next";
import { PressReleaseItem } from "@/types/strapi";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
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
      index: false,
      follow: false,
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

// Форматирование размера файла
function formatFileSize(bytes: number | undefined): string {
  if (!bytes) return "";

  if (bytes < 1024) {
    return `${bytes} Б`;
  } else if (bytes < 1024 * 1024) {
    const kb = bytes / 1024;
    return `${kb.toFixed(kb >= 10 ? 0 : 1)} КБ`;
  } else {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(mb >= 10 ? 1 : 1)} МБ`;
  }
}

// Компонент даты с иконкой
function DateDisplay({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-[8px]">
      <div className="relative w-[15px] h-[15px] md:w-[21px] md:h-[21px] lg:w-[26px] lg:h-[26px]">
        <Image
          src="/images/calendar/calendar-icon.png"
          alt="Calendar"
          width={26}
          height={26}
          className="object-contain"
        />
      </div>
      <span className="text-[12px] md:text-[16px] lg:text-[20px] xl:text-[24px] font-normal font-montserrat text-black leading-[1.219]">
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
      className="inline-flex items-center justify-center gap-[10px] w-[123px] h-[40px] md:w-auto md:h-[48px] lg:h-[56px] px-[24px] md:px-[24px] lg:px-[24px] py-0 md:py-0 lg:py-0 border border-[#C62828] text-[#C62828] text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat rounded-[12px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219]"
    >
      <svg
        width="33"
        height="25"
        viewBox="0 0 33 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 w-[18px] h-[13px] md:w-[33px] md:h-[25px]"
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

// Мобильная кнопка "Назад" (иконка без текста)
function BackIconButton() {
  return (
    <Link
      href="/media/press-releases"
      aria-label="Назад к пресс-релизам"
      className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-[7px] border border-[#C62828] hover:bg-[#C62828] active:bg-[#B71C1C] active:scale-95 transition-all duration-150 group"
    >
      <svg
        width="18"
        height="13"
        viewBox="0 0 18 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rotate-180"
      >
        <path
          d="M2 6.5L16 6.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="stroke-[#C62828] group-hover:stroke-white group-active:stroke-white"
        />
        <path
          d="M10 1.5L16 6.5L10 11.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-[#C62828] group-hover:stroke-white group-active:stroke-white"
        />
      </svg>
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
      <main className="w-full max-w-[1920px] mx-auto px-[19px] md:px-[36px] lg:px-[63px] pt-[20px] lg:pt-[29px]">
        {/* Хлебные крошки */}
        <Breadcrumbs
          className="mb-[30px] md:mb-[30px] lg:mb-[30px] lg:pl-0"
          items={[
            { label: "Главная", href: "/home" },
            { label: "Для СМИ", href: "/media/press-releases" },
            { label: "Пресс-релизы", href: "/media/press-releases" },
            { label: pressRelease.title },
          ]}
        />

        {/* Белая карточка с пресс-релизом */}
        <div className="bg-white/90 rounded-[10px] md:rounded-[15px] p-[19px] md:p-[36px] lg:px-[80px] lg:py-[60px] mb-[83px]">
          {/* Мобилка/планшет: сверху дата слева, кнопка справа; ниже заголовок; ниже категория (только на мобилке) */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between mb-[20px]">
              <DateDisplay date={pressRelease.basic_info.published_at_date} />
              <div className="flex-shrink-0">
                <div className="md:hidden">
                  <BackIconButton />
                </div>
                <div className="hidden md:block">
                  <BackButton />
                </div>
              </div>
            </div>
            {/* Категория на планшете - между датой и заголовком */}
            {pressRelease.basic_info.category && (
              <div className="hidden md:block mb-[20px]">
                <div className="inline-flex items-center px-[17px] py-[10px] bg-[#EFEFEF] rounded-[11px]">
                  <span className="text-[16px] font-medium font-montserrat text-[#737373] leading-[1.219]">
                    {pressRelease.basic_info.category}
                  </span>
                </div>
              </div>
            )}
            <h1 className="text-[20px] md:text-[30px] font-bold font-montserrat text-black leading-[1.219] mb-[15px]">
              {pressRelease.title}
            </h1>
            {/* Категория на мобилке - после заголовка */}
            {pressRelease.basic_info.category && (
              <div className="md:hidden mb-[15px]">
                <div className="inline-flex items-center px-[8px] py-[10px] bg-[#EFEFEF] rounded-[11px]">
                  <span className="text-[12px] font-medium font-montserrat text-[#737373] leading-[1.219]">
                    {pressRelease.basic_info.category}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Десктоп: заголовок слева, кнопка справа; ниже дата */}
          <div className="hidden lg:block">
            <div className="flex items-start justify-between mb-[23px]">
              <h1 className="text-[40px] font-bold font-montserrat text-black leading-[1.219]">
                {pressRelease.title}
              </h1>
              <div className="flex-shrink-0">
                <BackButton />
              </div>
            </div>
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
          </div>

          {/* Краткое описание */}
          {pressRelease.content_info?.excerpt && (
            <p className="text-[12px] md:text-[16px] lg:text-[24px] font-semibold font-montserrat text-black leading-[1.219] md:leading-[1.5625] mb-[15px] md:mb-[15px] lg:mb-[46px]">
              {pressRelease.content_info.excerpt}
            </p>
          )}

          {/* Галерея */}
          {sliderImages.length > 0 && (
            <div className="mb-[46px] xl:px-[40px] 2xl:px-[96px]">
              <MediaGallery
                images={sliderImages}
                hasPhotoAlbum={galleryImages.length > 0}
                slug={pressRelease.slug}
              />
            </div>
          )}

          {/* Контент под галереей */}
          <div className="xl:px-[40px] 2xl:px-[96px]">
            {/* Текст пресс-релиза */}
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

            {/* Вложения */}
            {attachments.length > 0 && (
              <div className="flex flex-col gap-[10px] mb-[25px] md:mb-[40px] lg:mb-[64px]">
                {attachments.map((attachment, index) => {
                  const att = attachment as {
                    title?: string;
                    file?: {
                      url: string;
                      ext?: string;
                      name?: string;
                      filename?: string;
                      size?: number;
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
                    fileUrl = `${
                      process.env.NEXT_PUBLIC_STRAPI_URL ||
                      "http://localhost:1337"
                    }${file.url}?filename=${encodeURIComponent(file.name)}`;
                  }

                  // Название файла
                  const fileName =
                    file.name ||
                    file.filename ||
                    att.title ||
                    `document${file.ext || ".pdf"}`;

                  // Размер файла
                  const fileSize = formatFileSize(file.size);

                  return (
                    <DownloadLink
                      key={index}
                      url={fileUrl}
                      fileName={fileName}
                      fileSize={fileSize}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Нижняя часть: кнопка назад и дата */}
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-6 pt-0">
            <div className="w-full md:w-auto flex justify-center">
              <BackButton />
            </div>
            <div className="hidden md:block lg:hidden">
              <DateDisplay date={pressRelease.basic_info.published_at_date} />
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
