"use client";

import Image from "next/image";
import Link from "next/link";
import CalendarCard from "@/components/CalendarCard";
import Calendar from "@/components/Calendar";
import ProjectCard from "@/components/ProjectCard";
import PartnerCard from "@/components/PartnerCard";
import NewsCard from "@/components/NewsCard";
import HeroSlider from "@/components/HeroSlider";
import ContactForm from "@/components/ContactForm";

export default function HomePage() {
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
        <div className="relative z-10 w-full max-w-[1920px] mx-auto pt-8 sm:pt-[49px] pb-12 px-4 sm:px-6 lg:px-[69px]">
          {/* Category Buttons */}
          <div className="flex flex-row justify-center sm:justify-start lg:justify-end gap-[6px] sm:gap-4 mb-8 sm:mb-12">
            <button className="h-[40px] px-[25px] py-[10px] sm:px-12 sm:py-4 sm:h-auto bg-[#1D4E89] text-[#FFFEFE] text-[12px] sm:text-lg lg:text-[22px] font-normal font-montserrat rounded-[8px] sm:rounded-[9px] hover:bg-[#164070] transition-colors leading-[2.5] flex items-center justify-center">
              Главные
            </button>
            <button className="h-[40px] w-[117px] px-[25px] py-[10px] sm:px-12 sm:py-4 sm:h-auto sm:w-auto bg-white text-[#1D4E89] text-[12px] sm:text-lg lg:text-[22px] font-normal font-montserrat rounded-[8px] sm:rounded-[9px] border border-[#1D4E89] hover:bg-gray-50 transition-colors leading-[2.5] flex items-center justify-center">
              Региональные
            </button>
          </div>

          {/* News Cards Grid */}
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-12">
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
            <Link
              href="/news"
              className="inline-flex items-center justify-center h-[40px] sm:h-auto px-[25px] py-[10px] sm:px-6 sm:py-4 bg-[#C62828] hover:bg-[#B71C1C] text-white text-[12px] sm:text-[22px] font-medium font-montserrat rounded-lg sm:rounded-xl transition-colors shadow-lg"
            >
              Ко всем новостям
            </Link>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="w-full max-w-[1920px] mx-auto px-4 md:px-6 lg:px-[144px] mt-16 md:mt-[110px] lg:mt-[110px] pb-12 lg:pb-16">
        {/* Section Title */}
        <h2 className="text-center text-xl md:text-[30px] lg:text-[48px] font-semibold font-montserrat text-black mb-8 md:mb-[71px] lg:mb-[72px]">
          Календарь
        </h2>

        {/* Calendar and Events Grid - адаптивный с переносом */}
        <div className="flex flex-col lg:flex-row lg:flex-wrap gap-6 lg:gap-[43px] justify-center items-center lg:items-start">
          {/* Calendar Component */}
          <div className="w-full md:w-auto lg:flex-1 lg:min-w-[650px] flex-shrink-0 flex justify-center">
            <Calendar
              highlightedDates={[
                new Date(2025, 0, 14), // 14 января
                new Date(2025, 1, 23), // 23 февраля
              ]}
            />
          </div>

          {/* Events Grid - адаптивный layout */}
          <div className="w-full lg:w-[938px] lg:flex-shrink-0">
            {/* Mobile: Column layout */}
            <div className="flex flex-col md:hidden gap-3">
              <CalendarCard
                type="person"
                icon="/images/calendar/person-icon.svg"
                title="Человек дня"
                description={`21 сентября 1895 года
День рождения великого русского поэта Сергея Есенина`}
              />
              <CalendarCard
                type="event"
                icon="/images/calendar/event-icon-full.svg"
                title="Событие дня"
                backgroundImage="/images/calendar/event-bg.png"
              />
              <CalendarCard
                type="movie"
                icon="/images/calendar/movie-icon.svg"
                title="Фильм дня"
                description={`Фильм дня
Южный гром (1980)`}
                backgroundImage="/images/calendar/movie-bg-7331c1.png"
                gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 78%)"
              />
              <CalendarCard
                type="theme"
                icon="/images/calendar/theme-icon.svg"
                title="Тема дня"
                description={`Тема дня
Победоносная Россия`}
              />
            </div>

            {/* Tablet: Custom layout - точное позиционирование из Figma */}
            <div className="hidden md:block lg:hidden relative w-[650px] h-[529px] mx-auto">
              {/* Row 1: Человек дня + Событие дня */}
              <div className="flex gap-[18px] mb-[24px]">
                <CalendarCard
                  type="person"
                  icon="/images/calendar/person-icon.svg"
                  title="Человек дня"
                  description={`21 сентября 1895 года
День рождения великого русского поэта Сергея Есенина`}
                />
                <CalendarCard
                  type="event"
                  icon="/images/calendar/event-icon-full.svg"
                  title="Событие дня"
                  backgroundImage="/images/calendar/event-bg.png"
                />
              </div>

              {/* Row 2: Фильм дня + Тема дня */}
              <div className="flex gap-[18px]">
                <CalendarCard
                  type="movie"
                  icon="/images/calendar/movie-icon.svg"
                  title="Фильм дня"
                  description={`Фильм дня
Южный гром (1980)`}
                  backgroundImage="/images/calendar/movie-bg-7331c1.png"
                  gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 78%)"
                />
                <CalendarCard
                  type="theme"
                  icon="/images/calendar/theme-icon.svg"
                  title="Тема дня"
                  description={`Тема дня
Победоносная Россия`}
                />
              </div>
            </div>

            {/* Desktop: Grid layout */}
            <div className="hidden lg:grid grid-cols-2 gap-x-[28px] gap-y-[31px]">
              <CalendarCard
                type="person"
                icon="/images/calendar/person-icon.svg"
                title="Человек дня"
                description={`21 сентября 1895 года
День рождения великого русского поэта Сергея Есенина`}
              />
              <CalendarCard
                type="event"
                icon="/images/calendar/event-icon-full.svg"
                title="Событие дня"
                backgroundImage="/images/calendar/event-bg.png"
              />
              <CalendarCard
                type="movie"
                icon="/images/calendar/movie-icon.svg"
                title="Фильм дня"
                description={`Фильм дня
Южный гром (1980)`}
                backgroundImage="/images/calendar/movie-bg-7331c1.png"
                gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 78%)"
              />
              <CalendarCard
                type="theme"
                icon="/images/calendar/theme-icon.svg"
                title="Тема дня"
                description={`Тема дня
Победоносная Россия`}
              />
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
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[93px] pt-12 sm:pt-[102px] pb-12 sm:pb-[102px]">
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
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-4 w-[240px] sm:w-[394px] h-[40px] sm:h-[55px] px-[25px] py-[10px] sm:px-6 sm:py-4 bg-[#C62828] hover:bg-[#B71C1C] text-[#EDF3F7] text-[12px] sm:text-[24px] font-medium font-montserrat rounded-lg sm:rounded-xl transition-colors leading-[1.219]"
              >
                Ко всем проектам
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="w-full max-w-[1920px] mx-auto px-[34px] md:px-[50px] lg:px-[42px] mt-16 sm:mt-[120px] pb-12 lg:pb-16">
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
