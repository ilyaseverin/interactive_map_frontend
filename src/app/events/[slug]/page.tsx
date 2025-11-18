import type { Metadata } from "next";
import { EventItem } from "@/types/strapi";
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

// Получить событие по slug
async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  try {
    const res = await fetch(
      `${apiUrl}/api/events?filters[slug][$eq]=${slug}&pagination[pageSize]=1&populate[basic_info]=*&populate[content_info][populate][cover]=true&populate[content_info][populate][gallery]=true&populate[location_info]=*&populate[additional_materials][populate][videos][populate][video_file]=true&populate[additional_materials][populate][attachments][populate][file]=true&publicationState=live`,
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
  const fullCoverUrl = coverUrl
    ? coverUrl.startsWith("http")
      ? coverUrl
      : `${
          process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
        }${coverUrl}`
    : undefined;

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

  return {
    title: `${event.title} | Календарь событий`,
    description: truncatedDescription,
    openGraph: {
      title: event.title,
      description: truncatedDescription,
      type: "article",
      locale: "ru_RU",
      publishedTime: event.publishedAt,
      modifiedTime: event.updatedAt,
      images: fullCoverUrl ? [fullCoverUrl] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: truncatedDescription,
      images: fullCoverUrl ? [fullCoverUrl] : undefined,
    },
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `/events/${slug}`,
    },
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
          src="/images/calendar/calendar-icon-event.png"
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

// Кнопка "Назад"
function BackButton() {
  return (
    <Link
      href="/home"
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
      href="/home"
      aria-label="Назад на главную"
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

  const coverUrl = event.content_info?.cover?.url;
  const fullCoverUrl = coverUrl
    ? coverUrl.startsWith("http")
      ? coverUrl
      : `${
          process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
        }${coverUrl}`
    : null;

  // Галерея изображений
  const galleryImages =
    event.content_info?.gallery?.map((image) => {
      const imageUrl = image.url.startsWith("http")
        ? image.url
        : `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${
            image.url
          }`;
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
    ? firstVideoFile.url.startsWith("http")
      ? firstVideoFile.url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${
          firstVideoFile.url
        }`
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
              <BackIconButton />
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
              <BackButton />
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
            <BackButton />
            <PublishDateDisplay date={publishDate} />
          </div>
        </div>
      </main>
    </div>
  );
}
