import type { Metadata } from "next";
import { EventItem } from "@/types/strapi";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import { notFound } from "next/navigation";
import MediaGallery from "@/components/media/MediaGallery";
import DownloadLink from "@/components/DownloadLink";
import { BackButton } from "@/components/buttons";
import {
  getResponsiveImageUrl,
  getStrapiApiUrl,
  getStrapiMediaUrl,
} from "@/utils/strapiUrl";
import { formatFileSize } from "@/utils/fileSize";
import { buildKeywords } from "@/utils/seoKeywords";

// Полностью отключаем кэширование для гарантированной генерации metadata
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Получить событие по slug
async function getEventBySlug(slug: string): Promise<EventItem | null> {
  try {
    const res = await fetch(
      `${getStrapiApiUrl(
        "events"
      )}?filters[slug][$eq]=${slug}&pagination[pageSize]=1&populate[basic_info]=*&populate[content_info][populate][cover]=true&populate[content_info][populate][gallery]=true&populate[location_info]=*&populate[additional_materials][populate][videos][populate][video_file]=true&populate[additional_materials][populate][attachments][populate][file]=true&populate[seo][populate][ogImage]=true&publicationState=live`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch event:", res.status);
      return null;
    }

    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      return null;
    }

    return data.data[0];
  } catch (error) {
    console.error("Error fetching event:", error);
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
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: "Событие не найдено",
      description: "Запрашиваемое событие не найдено",
    };
  }

  const coverUrl = event.content_info?.cover?.url;
  const fullCoverUrl = getStrapiMediaUrl(coverUrl);

  let metaDescription = "";

  if (event.content_info?.description) {
    // Удаляем HTML теги для описания
    const plainText = event.content_info.description
      .replace(/<[^>]*>/g, "")
      .substring(0, 160);
    metaDescription =
      plainText || `${event.title}. Календарь событий Патриот Центра 48.`;
  } else {
    metaDescription = `${event.title}. Календарь событий Патриот Центра 48.`;
  }

  const truncatedDescription =
    metaDescription.length > 160
      ? metaDescription.substring(0, 157) + "..."
      : metaDescription;

  const seo = event.seo;
  const seoTitle = seo?.metaTitle || `${event.title} | Календарь событий`;
  const seoDescription = seo?.metaDescription || truncatedDescription;
  const ogTitle = seo?.metaTitle || event.title;
  const ogDescription = seo?.ogDescription || seoDescription;
  const ogImageUrl = seo?.ogImage?.url
    ? getStrapiMediaUrl(seo.ogImage.url)
    : fullCoverUrl;

  const robots = seo?.metaRobots || "index, follow";
  const canonical = seo?.canonicalURL || `/events/${slug}`;

  // Формируем keywords: категория + дополнительные keywords из SEO
  const keywords = buildKeywords(event.basic_info?.category, seo?.keywords);

  // Мета-теги для события
  const locationStr =
    event.location_info?.location ||
    event.location_info?.location_map_link?.address ||
    null;

  const otherMeta: Record<string, string> = {
    "event:start_time": event.basic_info.datetime_start,
    ...(locationStr && { "event:location": locationStr }),
    ...(event.basic_info.category && {
      "event:category": event.basic_info.category,
    }),
  };

  return {
    title: seoTitle,
    description: seoDescription,
    ...(keywords && { keywords }),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "article",
      locale: "ru_RU",
      images: ogImageUrl ? [ogImageUrl] : undefined,
      publishedTime: event.publishedAt,
      modifiedTime: event.updatedAt,
    },
    robots: robots,
    alternates: {
      canonical: canonical,
    },
    other: otherMeta,
  };
}

// Форматирование даты публикации
function formatPublishDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Форматирование даты и времени события
function formatDateTime(dateString: string): { date: string; time?: string } {
  const date = new Date(dateString);
  const dateStr = date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const timeStr = date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Проверяем, есть ли время (не 00:00)
  const hasTime = date.getHours() !== 0 || date.getMinutes() !== 0;

  return {
    date: dateStr,
    time: hasTime ? timeStr : undefined,
  };
}

// Компонент даты публикации с иконкой
function PublishDateDisplay({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-[8px]">
      <div className="relative w-[15px] h-[15px] md:w-[21px] md:h-[21px] lg:w-[26px] lg:h-[26px]">
        <Image
          src="/images/calendar/calendar-icon-publish.png"
          alt="Calendar"
          width={26}
          height={26}
          className="object-contain"
        />
      </div>
      <span className="text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat text-black leading-[1.219]">
        {date}
      </span>
    </div>
  );
}

// Компонент даты события с иконкой
function EventDateDisplay({ date, time }: { date: string; time?: string }) {
  return (
    <div className="flex items-center gap-[8px]">
      <div className="relative w-[15px] h-[15px] md:w-[21px] md:h-[21px] lg:w-[26px] lg:h-[26px]">
        <Image
          src="/images/calendar/calendar-icon-publish.png"
          alt="Calendar"
          width={26}
          height={26}
          className="object-contain"
        />
      </div>
      <span className="text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat text-black leading-[1.219]">
        {date}
        {time && ` в ${time}`}
      </span>
    </div>
  );
}

// Форматирование размера файла

// Серверный компонент страницы события
export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const publishDate = formatPublishDate(event.publishedAt);
  const { date: eventDate, time: eventTime } = formatDateTime(
    event.basic_info.datetime_start
  );

  const fullCoverUrl = getResponsiveImageUrl(
    event.content_info?.cover,
    "large"
  );

  // Галерея изображений
  const galleryImages =
    event.content_info?.gallery?.map((image) => {
      const imageUrl = getResponsiveImageUrl(image, "large") || image.url;
      return {
        url: imageUrl,
        alt: image.alternativeText || event.title,
      };
    }) || [];

  // Если нет галереи, используем обложку
  const sliderImages =
    galleryImages.length > 0
      ? galleryImages
      : fullCoverUrl
      ? [{ url: fullCoverUrl, alt: event.title }]
      : [];

  // Видео ссылки или загруженные видео файлы
  const videoLinks = event.additional_materials?.videos || [];
  const firstVideoLink = videoLinks.length > 0 ? videoLinks[0] : undefined;
  const firstVideoUrl = firstVideoLink?.url;
  const firstVideoFile = firstVideoLink?.video_file;
  const firstVideoFileUrl = firstVideoFile?.url
    ? getStrapiMediaUrl(firstVideoFile.url)
    : undefined;

  // Аттачменты
  const attachments = event.additional_materials?.attachments || [];

  // Разбиваем описание на параграфы (может быть HTML или обычный текст)
  const description = event.content_info?.description || "";
  let contentParagraphs: string[] = [];

  if (description) {
    // Если это HTML с тегами <p>, извлекаем параграфы
    if (description.includes("<p>") || description.includes("</p>")) {
      const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
      const matches = description.matchAll(pRegex);
      contentParagraphs = Array.from(matches)
        .map((match) => match[1].trim().replace(/<[^>]+>/g, "")) // Удаляем вложенные HTML теги
        .filter((p) => p);

      // Если параграфы не найдены, пытаемся разбить по другим тегам или \n\n
      if (contentParagraphs.length === 0) {
        contentParagraphs = description
          .replace(/<[^>]+>/g, "\n") // Заменяем HTML теги на переносы строк
          .split("\n\n")
          .filter((p) => p.trim());
      }
    } else {
      // Обычный текст - разбиваем по \n\n
      contentParagraphs = description.split("\n\n").filter((p) => p.trim());
    }
  }

  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      {/* Основной контент */}
      <main className="w-full max-w-[1920px] mx-auto px-[19px] md:px-[36px] lg:px-[63px] pt-[15px] md:pt-[20px] lg:pt-[40px]">
        {/* Хлебные крошки */}
        <Breadcrumbs
          className="mb-[30px] lg:mb-[30px] lg:pl-[17px]"
          items={[
            { label: "Главная", href: "/home" },
            { label: "Календарь", href: "/home#calendar" },
            { label: event.title },
          ]}
        />

        {/* Белая карточка с событием */}
        <div className="bg-white/90 rounded-[15px] p-[19px] md:p-[36px] lg:px-[80px] lg:py-[60px] mb-[83px]">
          {/* Мобильная версия: дата публикации и кнопка назад в одной строке */}
          <div className="md:hidden flex items-center justify-between gap-4 mb-[20px]">
            <PublishDateDisplay date={publishDate} />
            <div className="flex-shrink-0">
              <BackButton
                href="/home"
                variant="icon"
                ariaLabel="Назад на главную"
              />
            </div>
          </div>

          {/* Планшет и десктоп: дата публикации, категория и кнопка назад в одной строке */}
          <div className="hidden md:flex items-center justify-between gap-4 mb-[20px] flex-wrap">
            <div className="flex items-center gap-4 flex-wrap">
              <PublishDateDisplay date={publishDate} />
              {event.basic_info.category && (
                <div className="inline-flex items-center px-[17px] py-[10px] md:px-[22px] md:py-[10px] bg-[#EFEFEF] rounded-[11px] md:rounded-[16px]">
                  <span className="text-[12px] md:text-[16px] lg:text-[20px] font-medium font-montserrat text-[#737373] leading-[1.219]">
                    {event.basic_info.category}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-shrink-0">
              <BackButton href="/home" />
            </div>
          </div>

          {/* Заголовок */}
          <h1 className="text-[20px] md:text-[30px] lg:text-[40px] font-bold font-montserrat text-black leading-[1.219] mb-[23px] md:max-w-[80%] lg:max-w-[75%]">
            {event.title}
          </h1>

          {/* Мобильная версия: категория под заголовком */}
          {event.basic_info.category && (
            <div className="md:hidden mb-[15px]">
              <div className="inline-flex items-center px-[8px] py-[10px] bg-[#EFEFEF] rounded-[11px]">
                <span className="text-[12px] font-medium font-montserrat text-[#737373] leading-[1.219]">
                  {event.basic_info.category}
                </span>
              </div>
            </div>
          )}

          {/* Дата события */}
          <div className="mb-[23px]">
            <EventDateDisplay date={eventDate} time={eventTime} />
          </div>

          {/* Место проведения */}
          {event.location_info?.location && (
            <div className="mb-[23px] flex items-start gap-[8px]">
              <div className="relative w-[15px] h-[15px] md:w-[21px] md:h-[21px] lg:w-[26px] lg:h-[26px] flex-shrink-0 mt-[2px]">
                <Image
                  src="/images/calendar/location-icon-event.png"
                  alt="Location"
                  width={26}
                  height={26}
                  className="object-contain"
                />
              </div>
              <span className="text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat text-black leading-[1.219]">
                Адрес проведения: {event.location_info.location}
              </span>
            </div>
          )}

          {/* Галерея (с клиентским компонентом для слайдера) */}
          {(sliderImages.length > 0 || firstVideoFileUrl || firstVideoUrl) && (
            <div className="xl:px-[40px] 2xl:px-[96px] mb-[46px]">
              <MediaGallery
                images={sliderImages}
                hasPhotoAlbum={galleryImages.length > 0}
                videoUrl={firstVideoUrl}
                videoFileUrl={firstVideoFileUrl}
                slug={event.slug}
                sourceType="events"
                title={event.title}
                date={eventDate + (eventTime ? ` в ${eventTime}` : "")}
              />
            </div>
          )}

          {/* Описание события */}
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

          {/* Вложения */}
          {attachments.length > 0 && (
            <div className="flex flex-col gap-[10px] mb-[25px] md:mb-[40px] lg:mb-[64px] xl:px-[40px] 2xl:px-[96px]">
              {attachments.map((attachment, index) => {
                const file = attachment.file;
                if (!file) return null;

                // Собираем URL с оригинальным именем файла
                let fileUrl = getStrapiMediaUrl(file.url) || file.url;

                // Пытаемся добавить оригинальное имя файла к URL для Strapi
                if (file.name && !file.url.startsWith("http")) {
                  const baseUrl = getStrapiMediaUrl(file.url);
                  if (baseUrl) {
                    fileUrl = `${baseUrl}?filename=${encodeURIComponent(
                      file.name
                    )}`;
                  }
                }

                // Название файла
                const fileName =
                  attachment.title ||
                  file.name ||
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

          {/* Нижняя часть: кнопка назад и дата публикации */}
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-6 pt-[25px] md:pt-[40px] lg:pt-[64px]">
            <BackButton href="/home" />
            <div className="hidden md:block">
              <PublishDateDisplay date={publishDate} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
