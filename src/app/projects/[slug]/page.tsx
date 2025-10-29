import type { Metadata } from "next";
import { ProjectItem, StrapiImage } from "@/types/strapi";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MediaGallery from "@/components/media/MediaGallery";
import DownloadLink from "@/components/DownloadLink";

// Полностью отключаем кэширование для гарантированной генерации metadata
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Получить проект по slug
async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  try {
    const res = await fetch(
      `${apiUrl}/api/projects?filters[slug][$eq]=${slug}&pagination[pageSize]=1&populate[basic_info]=*&populate[summary]=*&populate[content_info]=*&populate[media][populate][cover]=true&populate[media][populate][gallery]=true&populate[media][populate][videos]=*&populate[attachments_block][populate][attachments][populate][file]=true&populate[links][populate][external_links]=*&publicationState=live`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch project:", res.status);
      return null;
    }

    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      return null;
    }

    return data.data[0];
  } catch (error) {
    console.error("Error fetching project:", error);
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
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Проект не найден",
      description: "Запрашиваемый проект не найден",
    };
  }

  const coverUrl = project.media?.cover?.url;
  const fullCoverUrl = coverUrl
    ? coverUrl.startsWith("http")
      ? coverUrl
      : `${
          process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
        }${coverUrl}`
    : undefined;

  let metaDescription = "";

  if (project.summary?.excerpt) {
    if (project.summary.excerpt.length >= 50) {
      metaDescription = project.summary.excerpt;
    } else {
      metaDescription = `${project.title}. ${project.summary.excerpt}`;
    }
  } else {
    metaDescription = `${project.title}. Читайте о проектах Патриот Центра 48.`;
  }

  if (metaDescription.length < 50) {
    metaDescription = `${metaDescription} Проекты Патриот Центра 48.`;
  }

  const truncatedDescription =
    metaDescription.length > 160
      ? metaDescription.substring(0, 157) + "..."
      : metaDescription;

  return {
    title: `${project.title} | Наши проекты`,
    description: truncatedDescription,
    openGraph: {
      title: project.title,
      description: truncatedDescription,
      type: "article",
      locale: "ru_RU",
      publishedTime: project.publishedAt,
      modifiedTime: project.updatedAt,
      images: fullCoverUrl ? [fullCoverUrl] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: truncatedDescription,
      images: fullCoverUrl ? [fullCoverUrl] : undefined,
    },
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `/projects/${slug}`,
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
      href="/projects"
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

// Серверный компонент страницы проекта
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const coverUrl = project.media?.cover?.url;
  const fullCoverUrl = coverUrl
    ? coverUrl.startsWith("http")
      ? coverUrl
      : `${
          process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
        }${coverUrl}`
    : null;

  // Галерея изображений
  const galleryImages =
    project.media?.gallery?.map((image: StrapiImage) => {
      const imageUrl = image.url.startsWith("http")
        ? image.url
        : `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${
            image.url
          }`;
      return {
        url: imageUrl,
        alt: image.alternativeText || project.title,
      };
    }) || [];

  // Если нет галереи, используем обложку
  const sliderImages =
    galleryImages.length > 0
      ? galleryImages
      : fullCoverUrl
      ? [{ url: fullCoverUrl, alt: project.title }]
      : [];

  // Видео ссылки
  const videoLinks = project.media?.videos || [];
  const firstVideoUrl = videoLinks.length > 0 ? videoLinks[0].url : undefined;

  // Аттачменты
  const attachments = (project.attachments_block?.attachments || []).filter(
    (att: unknown) =>
      att && typeof att === "object" && att !== null && "file" in att
  );

  // Разбиваем контент на параграфы
  const contentParagraphs =
    project.content_info?.content
      ?.split("\n\n")
      .filter((p: string) => p.trim()) || [];

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
          <Link href="/projects" className="text-black hover:text-[#1D4E89]">
            Наши проекты
          </Link>
          <span className="text-black">&gt;</span>
          <span className="text-black truncate max-w-[300px] lg:max-w-none">
            {project.title}
          </span>
        </nav>

        {/* Белая карточка с проектом */}
        <div className="bg-white/90 rounded-[15px] p-6 lg:p-[67px] mb-[83px]">
          {/* Верхняя часть: заголовок и кнопка назад на одном уровне */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-[23px]">
            {/* Заголовок */}
            <h1 className="text-[32px] lg:text-[40px] font-bold font-montserrat text-black">
              {project.title}
            </h1>
            {/* Кнопка назад справа */}
            <div className="hidden lg:block flex-shrink-0">
              <BackButton />
            </div>
          </div>

          {/* Категория и дата на одном уровне */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-[23px]">
            {/* Дата слева */}
            <DateDisplay date={project.publishedAt} />
            {/* Категория (material_type) рядом с датой */}
            {project.basic_info?.material_type && (
              <div className="inline-flex items-center px-[22px] py-[10px] bg-[#EFEFEF] rounded-[16px]">
                <span className="text-[20px] font-medium font-montserrat text-[#737373] leading-[1.219]">
                  {project.basic_info.material_type}
                </span>
              </div>
            )}
          </div>

          {/* Краткое описание */}
          {project.summary?.excerpt && (
            <p className="text-[20px] lg:text-[24px] font-semibold font-montserrat text-black leading-[1.219] mb-[46px]">
              {project.summary.excerpt}
            </p>
          )}

          {/* Галерея с кнопками */}
          {sliderImages.length > 0 && (
            <MediaGallery
              images={sliderImages}
              hasPhotoAlbum={galleryImages.length > 0}
              videoUrl={firstVideoUrl}
              slug={project.slug}
            />
          )}

          {/* Контент под галереей */}
          <div className="lg:px-[20px] xl:px-[40px] 2xl:px-[96px]">
            {/* Текст проекта */}
            {contentParagraphs.length > 0 && (
              <div className="mb-[46px] space-y-[30px]">
                {contentParagraphs.map((paragraph: string, index: number) => (
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
              <div className="flex flex-col gap-[10px] mb-[64px]">
                {attachments.map((attachment: unknown, index: number) => {
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:pl-[20px] xl:pl-[40px] 2xl:pl-[96px]">
            <div className="lg:hidden">
              <BackButton />
            </div>
            <div className="hidden lg:block">
              <BackButton />
            </div>
            <div className="hidden lg:block">
              <DateDisplay date={project.publishedAt} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
