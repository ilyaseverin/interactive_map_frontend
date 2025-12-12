"use client";

import Image from "next/image";
import CalendarCard from "@/components/calendar/CalendarCard";
import Calendar from "@/components/calendar/Calendar";
import ProjectCard from "@/components/cards/ProjectCard";
import PartnerCard from "@/components/cards/PartnerCard";
import NewsCard from "@/components/cards/NewsCard";
import HeroSlider from "@/components/media/HeroSlider";
import ContactForm from "@/components/forms/ContactForm";
import {
  useGetEventsQuery,
  useGetNewsQuery,
  useGetProjectsQuery,
  useGetPartnersQuery,
} from "@/services/strapiApi";
import { useCallback, useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { EventItem, NewsItem, PartnerItem, StrapiImage } from "@/types/strapi";
import { ReactElement } from "react";
import { getStrapiMediaUrl, getResponsiveImageUrl } from "@/utils/strapiUrl";
import { CategoryButton, PrimaryButton } from "@/components/buttons";
import MediaModal from "@/components/modals/MediaModal";

// Конфигурация типов событий
type EventTypeKey = "Человек дня" | "Событие дня" | "Фильм дня" | "Тема дня";

interface EventTypeConfig {
  key: EventTypeKey;
  type: "person" | "event" | "movie" | "theme";
  icon: string;
  title: string;
  gradient?: string;
}

const EVENT_TYPES: EventTypeConfig[] = [
  {
    key: "Человек дня",
    type: "person",
    icon: "/images/calendar/person-icon.svg",
    title: "Человек дня",
  },
  {
    key: "Событие дня",
    type: "event",
    icon: "/images/calendar/event-icon-full.svg",
    title: "Событие дня",
  },
  {
    key: "Фильм дня",
    type: "movie",
    icon: "/images/calendar/movie-icon.svg",
    title: "Фильм дня",
    gradient:
      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 78%)",
  },
  {
    key: "Тема дня",
    type: "theme",
    icon: "/images/calendar/theme-icon.svg",
    title: "Тема дня",
  },
];

export default function HomePage() {
  // Получаем сегодняшнюю дату
  const todayDate = useMemo(() => new Date(), []);

  // Состояние выбранной даты (по умолчанию сегодня)
  const [selectedDate, setSelectedDate] = useState<Date>(todayDate);

  // Состояние для модального окна видео
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    videoUrl: string;
    title: string;
    date: string;
    isVKVideo: boolean;
    videoName?: string;
  }>({
    isOpen: false,
    videoUrl: "",
    title: "",
    date: "",
    isVKVideo: false,
  });

  // Получаем формат выбранной даты для запроса
  const selectedDateString = useMemo(() => {
    return format(selectedDate, "yyyy-MM-dd");
  }, [selectedDate]);

  // Получаем все события для определения дат с событиями (большой pageSize)
  // Загружаем события на ближайшие 3 месяца
  const { data: allEventsData } = useGetEventsQuery({
    pageSize: 100, // Большой размер для получения всех событий
    minimal: true, // Оптимизация: загружаем только базовую информацию
  });

  // Получаем события на выбранную дату
  const { data: eventsData, isFetching: isEventsFetching } = useGetEventsQuery({
    date: selectedDateString,
    pageSize: 10,
  });

  // Состояние выбранной категории новостей
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<
    "Главные" | "Региональные" | undefined
  >("Главные");

  // Получаем новости (первые 3, выбранная категория)
  const { data: newsData, isLoading: isNewsLoading } = useGetNewsQuery({
    page: 1,
    pageSize: 3,
    category: selectedNewsCategory,
  });

  // Получаем проекты (первые 6)
  const { data: projectsData, isLoading: isProjectsLoading } =
    useGetProjectsQuery({
      page: 1,
      pageSize: 6,
    });

  // Получаем партнеров
  const { data: partnersData, isLoading: isPartnersLoading } =
    useGetPartnersQuery({
      page: 1,
      pageSize: 100,
    });

  // Извлекаем уникальные даты с событиями для подсветки в календаре
  // Используем локальное время для определения даты события
  const highlightedDates = useMemo(() => {
    if (!allEventsData?.data) return [];

    const dates = new Set<string>();
    allEventsData.data.forEach((event) => {
      if (event.basic_info?.datetime_start) {
        // Парсим дату и используем локальное время для определения дня
        // Это соответствует тому, как пользователь видит дату события
        const eventDate = new Date(event.basic_info.datetime_start);
        const year = eventDate.getFullYear();
        const month = String(eventDate.getMonth() + 1).padStart(2, "0");
        const day = String(eventDate.getDate()).padStart(2, "0");
        const dateStr = `${year}-${month}-${day}`;
        dates.add(dateStr);
      }
    });

    return Array.from(dates).map((dateStr) => parseISO(dateStr));
  }, [allEventsData]);

  // Разделяем события по типам и фильтруем по выбранной дате (локальное время)
  const eventsByType = useMemo(() => {
    if (!eventsData?.data) return {};

    // Фильтруем события по выбранной дате, используя локальное время
    const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
    const filteredEvents = eventsData.data.filter((event) => {
      if (!event.basic_info?.datetime_start) return false;
      const eventDate = new Date(event.basic_info.datetime_start);
      const eventDateStr = format(eventDate, "yyyy-MM-dd");
      return eventDateStr === selectedDateStr;
    });

    const byType: Record<string, (typeof filteredEvents)[0] | undefined> = {};

    filteredEvents.forEach((event) => {
      const eventType = event.basic_info.event_type;
      if (eventType && !byType[eventType]) {
        byType[eventType] = event;
      }
    });

    return byType;
  }, [eventsData, selectedDate]);

  // Получаем URL изображения с учетом адаптивности
  const getImageUrl = useCallback(
    (
      image: StrapiImage | string | undefined | null,
      fallback: string,
      size: "thumbnail" | "small" | "medium" | "large" | "original" = "medium"
    ) => {
      if (!image) return fallback;
      if (typeof image === "string")
        return getStrapiMediaUrl(image) || fallback;
      return getResponsiveImageUrl(image, size) || fallback;
    },
    []
  );

  // Получаем видео из события для "Фильм дня"
  const getVideoFromEvent = useCallback((event: EventItem | undefined) => {
    // Проверяем наличие события и дополнительных материалов
    if (!event?.additional_materials) {
      return null;
    }

    // Проверяем наличие видео
    const videos = event.additional_materials.videos;
    if (!videos || videos.length === 0) {
      return null;
    }

    const firstVideo = videos[0];

    // Проверяем загруженный файл видео (приоритет)
    const videoFileUrl =
      firstVideo.video_file?.url &&
      typeof firstVideo.video_file.url === "string" &&
      firstVideo.video_file.url.trim() !== ""
        ? getStrapiMediaUrl(firstVideo.video_file.url)
        : null;

    // Проверяем URL видео (внешняя ссылка, если файла нет)
    const videoUrl =
      firstVideo.url &&
      typeof firstVideo.url === "string" &&
      firstVideo.url.trim() !== ""
        ? firstVideo.url.trim()
        : null;

    // Приоритет: сначала загруженное видео, потом ссылка
    const finalVideoUrl = videoFileUrl || videoUrl;
    if (!finalVideoUrl || finalVideoUrl.trim() === "") {
      return null;
    }

    return {
      url: finalVideoUrl,
      isVKVideo: videoFileUrl
        ? false
        : videoUrl
        ? videoUrl.includes("vk.com") ||
          videoUrl.includes("video_ext.php") ||
          /video(-?\d+)_(\d+)/.test(videoUrl)
        : false,
      videoName: videoFileUrl
        ? finalVideoUrl.split("/").pop() || "video.mp4"
        : undefined,
    };
  }, []);

  // Получаем описание из HTML
  const getPlainDescription = (html: string | undefined) => {
    if (!html) return "";
    // Удаляем HTML теги и ограничиваем длину
    const plain = html.replace(/<[^>]*>/g, "").trim();
    return plain.length > 150 ? plain.substring(0, 150) + "..." : plain;
  };

  // Форматируем дату для отображения
  const formatDisplayDate = useCallback((dateString: string | undefined) => {
    if (!dateString) return "";
    try {
      return format(parseISO(dateString), "dd.MM.yyyy");
    } catch {
      return "";
    }
  }, []);

  // Проверяем, выбрана ли сегодняшняя дата
  const isTodaySelected = useMemo(() => {
    return (
      format(selectedDate, "yyyy-MM-dd") === format(todayDate, "yyyy-MM-dd")
    );
  }, [selectedDate, todayDate]);

  // Текст для отсутствующего события
  const noEventText = isTodaySelected
    ? "Нет события на сегодня"
    : "Нет события на этот день";

  // Функция для рендеринга карточки события
  const renderEventCard = useCallback(
    (config: EventTypeConfig, event: EventItem | undefined): ReactElement => {
      const hasEvent = !!event;

      if (hasEvent) {
        // Если есть событие
        const props: {
          type: "person" | "event" | "movie" | "theme";
          icon: string;
          title: string;
          href?: string;
          onClick?: () => void;
          description?: string;
          backgroundImage?: string;
          gradient?: string;
          disabled?: boolean;
        } = {
          type: config.type,
          icon: config.icon,
          title: config.title,
          disabled: false,
        };

        // Для "Фильм дня" проверяем наличие видео и открываем модальное окно
        // Если видео нет - карточка disabled (без возможности открыть страницу)
        if (config.type === "movie") {
          const video = getVideoFromEvent(event);
          if (video) {
            // Если есть видео, используем onClick для открытия модального окна
            props.onClick = () => {
              setVideoModal({
                isOpen: true,
                videoUrl: video.url,
                title: event.title,
                date: formatDisplayDate(event.basic_info?.datetime_start),
                isVKVideo: video.isVKVideo,
                videoName: video.videoName,
              });
            };
            // Для "Фильм дня" с видео показываем название фильма
            props.description = event.title;
          } else {
            // Если видео нет - карточка disabled (неактивная)
            props.disabled = true;
            props.description = noEventText;
          }
        } else {
          // Для остальных типов событий используем обычную ссылку
          props.href = `/events/${event.slug}`;

          // Добавляем description для типов, которым он нужен
          if (config.type !== "event") {
            props.description =
              getPlainDescription(event.content_info?.description) ||
              event.title;
          }
        }

        // Добавляем backgroundImage только если есть обложка у события
        if (event.content_info?.cover) {
          props.backgroundImage = getImageUrl(
            event.content_info.cover,
            "/images/calendar/event-bg.png", // fallback generic
            "medium"
          );
        }

        // Добавляем gradient если указан
        if (config.gradient) {
          props.gradient = config.gradient;
        }

        return <CalendarCard {...props} />;
      } else {
        // Если нет события - делаем карточку disabled
        const props: {
          type: "person" | "event" | "movie" | "theme";
          icon: string;
          title: string;
          description: string;
          disabled: boolean;
        } = {
          type: config.type,
          icon: config.icon,
          title: config.title,
          description: noEventText,
          disabled: true,
        };

        return <CalendarCard {...props} />;
      }
    },
    [noEventText, getImageUrl, getVideoFromEvent, formatDisplayDate]
  );

  // Рендерим все карточки событий
  const eventCards = useMemo(() => {
    return EVENT_TYPES.map((config) =>
      renderEventCard(config, eventsByType[config.key])
    );
  }, [eventsByType, renderEventCard]);

  // Подготавливаем проекты для отображения
  const preparedProjects = useMemo(() => {
    if (!projectsData?.data || projectsData.data.length === 0) return [];

    const projects = projectsData.data.slice(0, 6);

    // Распределяем проекты по размерам: 1 - large, 2-5 - medium, 6 - xlarge
    return projects.map((project, index) => {
      let size: "large" | "medium" | "xlarge" = "medium";
      if (index === 0) size = "large";
      if (index === 5) size = "xlarge";

      return {
        ...project,
        displaySize: size,
      };
    });
  }, [projectsData]);

  return (
    <>
      {/* Hero Section */}
      <HeroSlider />

      {/* News Section - Full Width Background */}
      <section className="relative mt-0">
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.9) 25%, rgba(0, 0, 0, 0.9) 75%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.9) 25%, rgba(0, 0, 0, 0.9) 75%, transparent 100%)",
            }}
          >
            <Image
              src="/images/news/news-bg.png"
              alt="Новости"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content - Constrained to max-width */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto pt-8 sm:pt-[49px] pb-12 px-4 md:px-[138px] lg:px-[137px] xl:px-[69px]">
          {/* Category Buttons */}
          <div className="flex flex-row justify-center lg:justify-end gap-[6px] sm:gap-4 mb-8 sm:mb-12">
            <CategoryButton
              label="Главные"
              isActive={selectedNewsCategory === "Главные"}
              onClick={() => setSelectedNewsCategory("Главные")}
              variant="desktop"
              className="w-[117px] md:w-[178px] lg:w-auto"
            />
            <CategoryButton
              label="Региональные"
              isActive={selectedNewsCategory === "Региональные"}
              onClick={() => setSelectedNewsCategory("Региональные")}
              variant="desktop"
              className="w-[160px] md:w-auto lg:w-[269px] text-[13px] md:text-[18px] px-[14px] md:px-[40px]"
            />
          </div>

          {/* News Cards Grid */}
          {newsData?.data && newsData.data.length > 0 ? (
            <div className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-6 md:gap-[50px] lg:gap-8 xl:gap-8 mb-8 sm:mb-12">
              {newsData.data.slice(0, 3).map((news: NewsItem) => (
                <NewsCard
                  key={news.id}
                  image={getImageUrl(
                    news.media?.cover,
                    "/images/news/news-1.png",
                    "medium"
                  )}
                  date={formatDisplayDate(news.basic_info?.published_at_date)}
                  title={news.title}
                  description={
                    getPlainDescription(news.content_info?.excerpt) ||
                    getPlainDescription(news.content_info?.content) ||
                    news.title
                  }
                  href={`/news/${news.slug}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 mb-8 sm:mb-12">
              <p className="text-white font-semibold text-lg sm:text-xl drop-shadow-lg">
                Нет новостей для отображения
              </p>
            </div>
          )}

          {/* All News Button */}
          <div className="flex justify-center lg:justify-end">
            <PrimaryButton href="/news" variant="home">
              Ко всем новостям
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="w-full max-w-[1920px] mx-auto px-4 lg:px-[144px] mt-3  lg:mt-[110px] pb-12 lg:pb-[64px]">
        {/* Section Title */}
        <h2 className="text-center text-xl md:text-[30px] lg:text-[48px] font-semibold font-montserrat text-black mb-8 md:mb-[40px] lg:mb-[72px]">
          Календарь
        </h2>

        {/* Calendar and Events Grid - адаптивный с переносом */}
        <div className="flex flex-col lg:flex-row lg:flex-wrap gap-6 lg:gap-[43px] justify-center items-center lg:items-start">
          {/* Calendar Component */}
          <div className="w-full md:w-auto lg:flex-1 lg:min-w-[650px] flex-shrink-0 flex justify-center">
            <Calendar
              highlightedDates={highlightedDates}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>

          {/* Events Grid - адаптивный layout */}
          <div className="w-full lg:w-[938px] lg:flex-shrink-0">
            {/* Mobile: Column layout */}
            <div className="flex flex-col md:hidden gap-3">{eventCards}</div>

            {/* Tablet: Custom layout - точное позиционирование из Figma */}
            <div className="hidden md:block lg:hidden relative w-[650px] h-[529px] mx-auto">
              {/* Row 1: Человек дня + Событие дня */}
              <div className="flex gap-[18px] mb-[24px]">
                {eventCards[0]}
                {eventCards[1]}
              </div>

              {/* Row 2: Фильм дня + Тема дня */}
              <div className="flex gap-[18px]">
                {eventCards[2]}
                {eventCards[3]}
              </div>
            </div>

            {/* Desktop: Grid layout */}
            <div className="hidden lg:grid grid-cols-2 gap-x-[28px] gap-y-[31px]">
              {eventCards}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Full Width Background */}
      <section className="relative w-full lg:mt-[102px]">
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.9) 25%, rgba(0, 0, 0, 0.9) 75%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.9) 25%, rgba(0, 0, 0, 0.9) 75%, transparent 100%)",
            }}
          >
            <Image
              src="/images/projects/projects-bg.png"
              alt="Наши проекты"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content Container with Backdrop Blur */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 lg:px-[93px] pt-12 sm:pt-[102px] lg:pt-[102px] pb-12 sm:pb-[102px] lg:pb-[102px]">
          <div
            className="w-full sm:max-w-[1733px] mx-auto px-6 lg:px-[47px] pt-12 lg:pt-[72px] pb-12 lg:pb-[66px] rounded-[15px]"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(74px)",
            }}
          >
            {/* Section Title */}
            <h2 className="text-center text-lg sm:text-3xl lg:text-[48px] font-semibold font-montserrat text-black leading-[1.167] mb-8 sm:mb-[56px]">
              Наши проекты
            </h2>

            {/* Projects Grid - точное позиционирование из Figma */}
            {preparedProjects.length > 0 ? (
              <div className="w-full max-w-[1639px] mx-auto mb-8 sm:mb-[66px]">
                {/* Mobile: Flex layout */}
                <div className="flex flex-col gap-4 md:hidden">
                  {preparedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      title={project.title}
                      date={formatDisplayDate(project.publishedAt)}
                      description={
                        project.displaySize === "xlarge"
                          ? getPlainDescription(project.summary?.excerpt)
                          : undefined
                      }
                      image={getImageUrl(
                        project.media?.cover,
                        "/images/projects/project-2.png",
                        project.displaySize === "large" ||
                          project.displaySize === "xlarge"
                          ? "large"
                          : "medium"
                      )}
                      href={`/projects/${project.slug}`}
                      size={project.displaySize}
                    />
                  ))}
                </div>

                {/* Tablet: Grid layout */}
                <div className="hidden md:grid lg:hidden grid-cols-2 gap-x-6 gap-y-6">
                  {preparedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      title={project.title}
                      date={formatDisplayDate(project.publishedAt)}
                      description={
                        project.displaySize === "xlarge"
                          ? getPlainDescription(project.summary?.excerpt)
                          : undefined
                      }
                      image={getImageUrl(
                        project.media?.cover,
                        "/images/projects/project-2.png",
                        "medium"
                      )}
                      href={`/projects/${project.slug}`}
                      size={project.displaySize}
                    />
                  ))}
                </div>

                {/* Desktop: Adaptive flex layout - адаптивное позиционирование */}
                <div className="hidden lg:flex flex-row flex-wrap gap-[20px] justify-center">
                  {preparedProjects.map((project) => (
                    <div key={project.id} className="flex-shrink-0">
                      <ProjectCard
                        title={project.title}
                        date={formatDisplayDate(project.publishedAt)}
                        description={
                          project.displaySize === "xlarge"
                            ? getPlainDescription(project.summary?.excerpt)
                            : undefined
                        }
                        image={getImageUrl(
                          project.media?.cover,
                          "/images/projects/project-2.png",
                          project.displaySize === "large" ||
                            project.displaySize === "xlarge"
                            ? "large"
                            : "medium"
                        )}
                        href={`/projects/${project.slug}`}
                        size={project.displaySize}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 mb-8 sm:mb-[66px]">
                <p className="text-gray-600">Нет проектов для отображения</p>
              </div>
            )}

            {/* All Projects Button */}
            <div className="flex justify-center mt-[66px]">
              <PrimaryButton href="/projects" variant="default">
                Ко всем проектам
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="w-full max-w-[1920px] mx-auto px-[34px] lg:px-[42px] sm:mt-[40px] lg:mt-[120px] pb-12">
        {/* Section Title */}
        <h2 className="text-center text-lg sm:text-3xl lg:text-[48px] font-semibold font-montserrat text-black mb-8 sm:mb-12 lg:mb-[72px]">
          Партнеры
        </h2>

        {/* Partners Grid */}
        {partnersData?.data && partnersData.data.length > 0 ? (
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-[40px] lg:gap-x-[57px] lg:gap-y-[0px] max-w-[668px] md:max-w-none lg:max-w-[1836px] mx-auto justify-items-stretch">
            {partnersData.data
              .slice(0, 4)
              .map((partner: PartnerItem, index: number) => (
                <PartnerCard
                  key={partner.id}
                  title={partner.name}
                  image={getImageUrl(
                    partner.logo,
                    "/images/partners/partner-bg.png",
                    "medium"
                  )}
                  websiteUrl={partner.url || "#"}
                  websiteText={partner.url || ""}
                  vkUrl={partner.vk_url || "#"}
                  vkText={partner.vk_url || ""}
                  className={index === 3 ? "hidden md:block lg:hidden" : ""}
                />
              ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">Нет партнеров для отображения</p>
          </div>
        )}
      </section>

      {/* Contact Form Section */}
      <ContactForm />

      {/* Модальное окно для видео "Фильм дня" */}
      {videoModal.isOpen && (
        <MediaModal
          isOpen={videoModal.isOpen}
          onClose={() =>
            setVideoModal({
              isOpen: false,
              videoUrl: "",
              title: "",
              date: "",
              isVKVideo: false,
            })
          }
          mediaUrl={videoModal.videoUrl}
          title={videoModal.title}
          date={videoModal.date}
          alt={videoModal.title}
          mediaType="video"
          isVKVideo={videoModal.isVKVideo}
          mediaName={videoModal.videoName}
        />
      )}
    </>
  );
}
