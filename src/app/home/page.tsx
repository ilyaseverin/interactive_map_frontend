"use client";

import Image from "next/image";
import CalendarCard from "@/components/calendar/CalendarCard";
import Calendar from "@/components/calendar/Calendar";
import ProjectCard from "@/components/cards/ProjectCard";
import PartnerCard from "@/components/cards/PartnerCard";
import NewsCard from "@/components/cards/NewsCard";
import HeroSlider from "@/components/media/HeroSlider";
import ContactForm from "@/components/forms/ContactForm";
import { useGetEventsQuery } from "@/services/strapiApi";
import { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { EventItem } from "@/types/strapi";
import { ReactElement } from "react";
import { CategoryButton, PrimaryButton } from "@/components/buttons";

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
      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 78%)",
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

  // Получаем формат выбранной даты для запроса
  const selectedDateString = useMemo(() => {
    return format(selectedDate, "yyyy-MM-dd");
  }, [selectedDate]);

  // Получаем все события для определения дат с событиями (большой pageSize)
  // Загружаем события на ближайшие 3 месяца
  const { data: allEventsData } = useGetEventsQuery({
    pageSize: 100, // Большой размер для получения всех событий
  });

  // Получаем события на выбранную дату
  const { data: eventsData } = useGetEventsQuery({
    date: selectedDateString,
    pageSize: 10,
  });

  // Извлекаем уникальные даты с событиями для подсветки в календаре
  const highlightedDates = useMemo(() => {
    if (!allEventsData?.data) return [];

    const dates = new Set<string>();
    allEventsData.data.forEach((event) => {
      if (event.basic_info?.datetime_start) {
        const eventDate = parseISO(event.basic_info.datetime_start);
        dates.add(format(eventDate, "yyyy-MM-dd"));
      }
    });

    return Array.from(dates).map((dateStr) => parseISO(dateStr));
  }, [allEventsData]);

  // Разделяем события по типам
  const eventsByType = useMemo(() => {
    if (!eventsData?.data) return {};

    const events = eventsData.data;
    const byType: Record<string, (typeof events)[0] | undefined> = {};

    events.forEach((event) => {
      const eventType = event.basic_info.event_type;
      if (eventType && !byType[eventType]) {
        byType[eventType] = event;
      }
    });

    return byType;
  }, [eventsData]);

  // Получаем URL изображения обложки
  const getImageUrl = (url: string | undefined) => {
    if (!url) return undefined;
    if (url.startsWith("http")) return url;
    const baseUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    return `${baseUrl}${url}`;
  };

  // Получаем описание из HTML
  const getPlainDescription = (html: string | undefined) => {
    if (!html) return undefined;
    // Удаляем HTML теги и ограничиваем длину
    const plain = html.replace(/<[^>]*>/g, "").trim();
    return plain.length > 100 ? plain.substring(0, 100) + "..." : plain;
  };

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
  const renderEventCard = (
    config: EventTypeConfig,
    event: EventItem | undefined
  ): ReactElement => {
    const hasEvent = !!event;

    if (hasEvent) {
      // Если есть событие
      const props: {
        type: "person" | "event" | "movie" | "theme";
        icon: string;
        title: string;
        href: string;
        description?: string;
        backgroundImage?: string;
        gradient?: string;
      } = {
        type: config.type,
        icon: config.icon,
        title: config.title,
        href: `/events/${event.slug}`,
      };

      // Добавляем description для типов, которым он нужен
      if (config.type !== "event") {
        props.description =
          getPlainDescription(event.content_info?.description) || event.title;
      }

      // Добавляем backgroundImage только если есть обложка у события
      if (event.content_info?.cover?.url) {
        props.backgroundImage = getImageUrl(event.content_info.cover.url);
      }

      // Добавляем gradient если указан
      if (config.gradient) {
        props.gradient = config.gradient;
      }

      return <CalendarCard {...props} />;
    } else {
      // Если нет события
      const props: {
        type: "person" | "event" | "movie" | "theme";
        icon: string;
        title: string;
        description: string;
      } = {
        type: config.type,
        icon: config.icon,
        title: config.title,
        description: noEventText,
      };

      return <CalendarCard {...props} />;
    }
  };

  // Рендерим все карточки событий
  const eventCards = EVENT_TYPES.map((config) =>
    renderEventCard(config, eventsByType[config.key])
  );

  return (
    <>
      {/* Hero Section */}
      <HeroSlider />

      {/* News Section - Full Width Background */}
      <section className="relative min-h-[1368px] sm:min-h-[1001px] mt-0">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/news/news-bg.png"
            alt="Новости"
            fill
            className="object-cover"
          />
        </div>

        {/* Content - Constrained to max-width */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto pt-8 sm:pt-[49px] pb-12 px-4 md:px-[138px] lg:px-[137px] xl:px-[69px]">
          {/* Category Buttons */}
          <div className="flex flex-row justify-center lg:justify-end gap-[6px] sm:gap-4 mb-8 sm:mb-12">
            <CategoryButton
              label="Главные"
              isActive={true}
              onClick={() => {}}
              variant="desktop"
              className="w-[117px] md:w-[178px] lg:w-auto"
            />
            <CategoryButton
              label="Региональные"
              isActive={false}
              onClick={() => {}}
              variant="desktop"
              className="w-[117px] md:w-auto lg:w-[269px]"
            />
          </div>

          {/* News Cards Grid */}
          <div className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-6 md:gap-[50px] lg:gap-8 xl:gap-8 mb-8 sm:mb-12">
            <NewsCard
              image="/images/news/news-1.png"
              date="19.09.2025"
              title='ОБЛАСТНОЙ ФЕСТИВАЛЬ "В АРМИИ СЛУЖИТЬ ПОЧЁТНО!"'
              description="В СОЛ «Прометей» 19 сентября состоялся масштабный областной патриотический фестиваль «В армии служить почётно!», собравший участников и зрителей, объединенных любовью к Родине и уважением к защитникам Отечества."
              href="/news/1"
            />
            <NewsCard
              image="/images/news/news-2.png"
              date="19.09.2025"
              title='ОБЛАСТНОЙ ФЕСТИВАЛЬ "В АРМИИ СЛУЖИТЬ ПОЧЁТНО!"'
              description="В СОЛ «Прометей» 19 сентября состоялся масштабный областной патриотический фестиваль «В армии служить почётно!», собравший участников и зрителей, объединенных любовью к Родине и уважением к защитникам Отечества."
              href="/news/2"
            />
            <NewsCard
              image="/images/news/news-3.png"
              date="19.09.2025"
              title='ОБЛАСТНОЙ ФЕСТИВАЛЬ "В АРМИИ СЛУЖИТЬ ПОЧЁТНО!"'
              description="В СОЛ «Прометей» 19 сентября состоялся масштабный областной патриотический фестиваль «В армии служить почётно!», собравший участников и зрителей, объединенных любовью к Родине и уважением к защитникам Отечества."
              href="/news/3"
            />
          </div>

          {/* All News Button */}
          <div className="flex justify-center lg:justify-end">
            <PrimaryButton href="/news" variant="home">
              Ко всем новостям
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="w-full max-w-[1920px] mx-auto px-4 lg:px-[144px] mt-16 md:mt-[110px] lg:mt-[110px] pb-12 lg:pb-16">
        {/* Section Title */}
        <h2 className="text-center text-xl md:text-[30px] lg:text-[48px] font-semibold font-montserrat text-black mb-8 md:mb-[71px] lg:mb-[72px]">
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
      <section className="relative w-full min-h-[1426px] sm:min-h-[1405px] mt-[100px] sm:mt-[167px]">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/projects/projects-bg.png"
            alt="Наши проекты"
            fill
            className="object-cover"
          />
        </div>

        {/* Content Container with Backdrop Blur */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 lg:px-[93px] pt-12 sm:pt-[102px] pb-12 sm:pb-[102px]">
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
            <div className="w-full max-w-[1639px] mx-auto mb-8 sm:mb-[66px]">
              {/* Mobile: Flex layout */}
              <div className="flex flex-col gap-4 md:hidden">
                <ProjectCard
                  title="ОБЛАСТНОЙ КАДЕТСКИЙ БАЛ «ВИВАТ, КАДЕТ!» – 2025"
                  date="27.09.2025"
                  image="/images/projects/project-1-2351d1.png"
                  href="/projects/1"
                  size="large"
                />
                <ProjectCard
                  title="Смотр-конкурс на лучшее военно-патриотическое объединение на территории Липецкой области"
                  image="/images/projects/project-2.png"
                  href="/projects/2"
                />
                <ProjectCard
                  title="Смотр-конкурс на лучшее военно-патриотическое объединение на территории Липецкой области"
                  image="/images/projects/project-2.png"
                  href="/projects/3"
                />
                <ProjectCard
                  title="Смотр-конкурс на лучшее военно-патриотическое объединение на территории Липецкой области"
                  image="/images/projects/project-2.png"
                  href="/projects/4"
                />
                <ProjectCard
                  title="Смотр-конкурс на лучшее военно-патриотическое объединение на территории Липецкой области"
                  image="/images/projects/project-2.png"
                  href="/projects/5"
                />
                <ProjectCard
                  title="Областной конкурс патриотической песни"
                  date="30.08.2025"
                  description="На территории Липецкой области с 30 августа по 12 октября 2025 года стартовал приём заявок на областной конкурс патриотической песни."
                  image="/images/projects/project-6-58ced6.png"
                  href="/projects/6"
                  size="xlarge"
                />
              </div>

              {/* Tablet: Grid layout */}
              <div className="hidden md:grid lg:hidden grid-cols-2 gap-x-6 gap-y-6">
                <ProjectCard
                  title="ОБЛАСТНОЙ КАДЕТСКИЙ БАЛ «ВИВАТ, КАДЕТ!» – 2025"
                  date="27.09.2025"
                  image="/images/projects/project-1-2351d1.png"
                  href="/projects/1"
                  size="large"
                />
                <ProjectCard
                  title="Смотр-конкурс на лучшее военно-патриотическое объединение на территории Липецкой области"
                  image="/images/projects/project-2.png"
                  href="/projects/2"
                />
                <ProjectCard
                  title="Смотр-конкурс на лучшее военно-патриотическое объединение на территории Липецкой области"
                  image="/images/projects/project-2.png"
                  href="/projects/3"
                />
                <ProjectCard
                  title="Смотр-конкурс на лучшее военно-патриотическое объединение на территории Липецкой области"
                  image="/images/projects/project-2.png"
                  href="/projects/4"
                />
                <ProjectCard
                  title="Смотр-конкурс на лучшее военно-патриотическое объединение на территории Липецкой области"
                  image="/images/projects/project-2.png"
                  href="/projects/5"
                />
                <ProjectCard
                  title="Областной конкурс патриотической песни"
                  date="30.08.2025"
                  description="На территории Липецкой области с 30 августа по 12 октября 2025 года стартовал приём заявок на областной конкурс патриотической песни."
                  image="/images/projects/project-6-58ced6.png"
                  href="/projects/6"
                  size="xlarge"
                />
              </div>

              {/* Desktop: Adaptive flex layout - адаптивное позиционирование */}
              <div className="hidden lg:flex flex-row flex-wrap gap-[20px] justify-center">
                {/* Project 1 - Large */}
                <div className="flex-shrink-0">
                  <ProjectCard
                    title="ОБЛАСТНОЙ КАДЕТСКИЙ БАЛ «ВИВАТ, КАДЕТ!» – 2025"
                    date="27.09.2025"
                    image="/images/projects/project-1-2351d1.png"
                    href="/projects/1"
                    size="large"
                  />
                </div>

                {/* Project 2 - Medium */}
                <div className="flex-shrink-0">
                  <ProjectCard
                    title="Смотр-конкурс на лучшее военно-патриотическое объединение на территории Липецкой области"
                    image="/images/projects/project-2.png"
                    href="/projects/2"
                  />
                </div>

                {/* Project 3 - Medium */}
                <div className="flex-shrink-0">
                  <ProjectCard
                    title="Смотр-конкурс на лучшее военно-патриотическое объединение на территории Липецкой области"
                    image="/images/projects/project-2.png"
                    href="/projects/3"
                  />
                </div>

                {/* Project 4 - Medium */}
                <div className="flex-shrink-0">
                  <ProjectCard
                    title="Смотр-конкурс на лучшее военно-патриотическое объединение на территории Липецкой области"
                    image="/images/projects/project-2.png"
                    href="/projects/4"
                  />
                </div>

                {/* Project 5 - Medium */}
                <div className="flex-shrink-0">
                  <ProjectCard
                    title="Смотр-конкурс на лучшее военно-патриотическое объединение на территории Липецкой области"
                    image="/images/projects/project-2.png"
                    href="/projects/5"
                  />
                </div>

                {/* Project 6 - XLarge */}
                <div className="flex-shrink-0">
                  <ProjectCard
                    title="Областной конкурс патриотической песни"
                    date="30.08.2025"
                    description="На территории Липецкой области с 30 августа по 12 октября 2025 года стартовал приём заявок на областной конкурс патриотической песни."
                    image="/images/projects/project-6-58ced6.png"
                    href="/projects/6"
                    size="xlarge"
                  />
                </div>
              </div>
            </div>

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
      <section className="w-full max-w-[1920px] mx-auto px-[34px] lg:px-[42px] mt-16 sm:mt-[120px] pb-12 lg:pb-16">
        {/* Section Title */}
        <h2 className="text-center text-lg sm:text-3xl lg:text-[48px] font-semibold font-montserrat text-black mb-8 sm:mb-12 lg:mb-[72px]">
          Партнеры
        </h2>

        {/* Partners Grid */}
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-[40px] lg:gap-x-[57px] lg:gap-y-[0px] max-w-[668px] md:max-w-none lg:max-w-[1836px] mx-auto justify-items-stretch">
          <PartnerCard
            title="Региональный штаб Всероссийского военно-патриотического общественного движения «Юнармия»"
            image="/images/partners/partner-bg.png"
            websiteUrl="https://yunarmy.ru"
            websiteText="https://yunarmy.ru"
            vkUrl="https://vk.com/yunarmy_lipetsk"
            vkText="https://vk.com/yunarmy_lipetsk"
          />
          <PartnerCard
            title="Региональный штаб Всероссийского военно-патриотического общественного движения «Юнармия»"
            image="/images/partners/partner-bg.png"
            websiteUrl="https://yunarmy.ru"
            websiteText="https://yunarmy.ru"
            vkUrl="https://vk.com/yunarmy_lipetsk"
            vkText="https://vk.com/yunarmy_lipetsk"
          />
          <PartnerCard
            title="Региональный штаб Всероссийского военно-патриотического общественного движения «Юнармия»"
            image="/images/partners/partner-bg.png"
            websiteUrl="https://yunarmy.ru"
            websiteText="https://yunarmy.ru"
            vkUrl="https://vk.com/yunarmy_lipetsk"
            vkText="https://vk.com/yunarmy_lipetsk"
          />
          {/* 4-я карточка только для планшетов */}
          <PartnerCard
            title="Региональный штаб Всероссийского военно-патриотического общественного движения «Юнармия»"
            image="/images/partners/partner-bg.png"
            websiteUrl="https://yunarmy.ru"
            websiteText="https://yunarmy.ru"
            vkUrl="https://vk.com/yunarmy_lipetsk"
            vkText="https://vk.com/yunarmy_lipetsk"
            className="hidden md:block lg:hidden"
          />
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm />
    </>
  );
}
