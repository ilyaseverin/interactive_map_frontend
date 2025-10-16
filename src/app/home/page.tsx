"use client";

import Image from "next/image";
import Link from "next/link";
import CalendarCard from "@/components/CalendarCard";
import Calendar from "@/components/Calendar";
import ProjectCard from "@/components/ProjectCard";
import PartnerCard from "@/components/PartnerCard";
import NewsCard from "@/components/NewsCard";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[60px] mt-7 mb-12 lg:mb-[61px]">
        <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[735px] rounded-[20px] lg:rounded-[26px] overflow-visible">
          {/* Hero Image Container */}
          <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[685px] rounded-[20px] lg:rounded-[26px] overflow-hidden shadow-[0_5px_12px_0_rgba(0,0,0,0.25)]">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/hero-bg.png"
                alt="Патриот Центр 48"
                fill
                className="object-cover"
                priority
              />
              {/* Gradient Overlay - согласно Figma */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 96%)",
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-[102px] py-12 sm:py-24 lg:py-[265px]">
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-[64px] font-bold font-montserrat text-white leading-[1.25] mb-4 lg:mb-[19px]">
                Патриот Центр 48
              </h1>

              {/* Description */}
              <p className="text-base sm:text-xl lg:text-[32px] font-medium font-montserrat text-white leading-[1.5625] max-w-full lg:max-w-[1005px] mb-6 lg:mb-[34px]">
                Региональный центр подготовки граждан Российской Федерации к
                военной службе и военно-патриотического воспитания населения
                Липецкой области
              </p>

              {/* CTA Button */}
              <Link
                href="/training"
                className="inline-flex items-center justify-center gap-4 px-5 py-3 sm:px-6 sm:py-4 bg-[#C62828] hover:bg-[#B71C1C] text-white text-base sm:text-lg lg:text-[20px] font-medium font-montserrat rounded-xl transition-colors shadow-lg hover:shadow-xl w-fit"
              >
                Хочу пройти подготовку
              </Link>
            </div>
          </div>

          {/* Slider Dots - внутри hero секции, согласно Figma */}
          <div className="absolute bottom-0 lg:bottom-0 left-1/2 transform -translate-x-1/2 flex gap-3 lg:gap-[15px] z-20">
            <button
              className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-[#D9D9D9] hover:bg-[#B0B0B0] transition-colors"
              aria-label="Слайд 1"
            />
            <button
              className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-[#3B76AA] hover:bg-[#2C5F8A] transition-colors"
              aria-label="Слайд 2"
            />
            <button
              className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-[#D9D9D9] hover:bg-[#B0B0B0] transition-colors"
              aria-label="Слайд 3"
            />
            <button
              className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-[#D9D9D9] hover:bg-[#B0B0B0] transition-colors"
              aria-label="Слайд 4"
            />
          </div>
        </section>
      </div>

      {/* News Section - Full Width Background */}
      <section className="relative min-h-[1001px] mt-0">
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
        <div className="relative z-10 w-full max-w-[1920px] mx-auto pt-[49px] pb-12 px-6 lg:px-[69px]">
          {/* Category Buttons */}
          <div className="flex justify-start lg:justify-end gap-4 mb-12">
            <button className="px-12 lg:px-[65px] py-4 bg-[#1D4E89] text-white text-lg lg:text-[22px] font-normal font-montserrat rounded-[9px] hover:bg-[#164070] transition-colors">
              Главные
            </button>
            <button className="px-12 lg:px-[65px] py-4 bg-white text-[#1D4E89] text-lg lg:text-[22px] font-normal font-montserrat rounded-[9px] border border-[#1D4E89] hover:bg-gray-50 transition-colors">
              Региональные
            </button>
          </div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
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
              className="inline-flex items-center justify-center px-6 py-4 bg-[#C62828] hover:bg-[#B71C1C] text-white text-[22px] font-medium font-montserrat rounded-xl transition-colors shadow-lg"
            >
              Ко всем новостям
            </Link>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[144px] mt-[110px] pb-12 lg:pb-16">
        {/* Section Title */}
        <h2 className="text-center text-3xl lg:text-[48px] font-semibold font-montserrat text-black mb-12 lg:mb-[72px]">
          Календарь
        </h2>

        {/* Calendar and Events Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[43px] justify-center">
          {/* Calendar Component */}
          <Calendar
            highlightedDates={[
              new Date(2025, 0, 14), // 14 января
              new Date(2025, 1, 23), // 23 февраля
            ]}
          />

          {/* Events Grid */}
          <div className="w-full lg:w-[938px] grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-x-[28px] lg:gap-y-[31px]">
            {/* Person of the Day */}
            <CalendarCard
              type="person"
              icon="/images/calendar/person-icon.svg"
              title="Человек дня"
              description={`21 сентября 1895 года
День рождения великого русского поэта Сергея Есенина`}
            />

            {/* Event of the Day */}
            <CalendarCard
              type="event"
              icon="/images/calendar/event-icon-full.svg"
              title="Событие дня"
              backgroundImage="/images/calendar/event-bg.png"
            />

            {/* Movie of the Day */}
            <CalendarCard
              type="movie"
              icon="/images/calendar/movie-icon.svg"
              title="Фильм дня"
              description={`Фильм дня
Южный гром (1980)`}
              backgroundImage="/images/calendar/movie-bg-7331c1.png"
            />

            {/* Theme of the Day */}
            <CalendarCard
              type="theme"
              icon="/images/calendar/theme-icon.svg"
              title="Тема дня"
              description={`Тема дня
Победоносная Россия`}
            />
          </div>
        </div>
      </section>

      {/* Projects Section - Full Width Background */}
      <section className="relative w-full min-h-[1405px] mt-[167px]">
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
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 lg:px-[93px] pt-[102px] pb-[102px]">
          <div
            className="w-full max-w-[1733px] mx-auto px-6 lg:px-[47px] pt-12 lg:pt-[72px] pb-12 lg:pb-[66px] rounded-[15px]"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(74px)",
            }}
          >
            {/* Section Title */}
            <h2 className="text-center text-[48px] font-semibold font-montserrat text-black leading-[1.167] mb-[56px]">
              Наши проекты
            </h2>

            {/* Projects Grid - точное позиционирование из Figma */}
            <div className="w-full max-w-[1639px] mx-auto mb-[66px]">
              {/* Mobile: Flex layout */}
              <div className="flex flex-col gap-6 lg:hidden">
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

              {/* Desktop: Absolute positioning - точные координаты из Figma */}
              <div className="hidden lg:block">
                {/* First Row */}
                <div className="relative h-[411px] mb-[20px]">
                  {/* Project 1 - Large (x: 39) */}
                  <div className="absolute left-[39px] top-0">
                    <ProjectCard
                      title="ОБЛАСТНОЙ КАДЕТСКИЙ БАЛ «ВИВАТ, КАДЕТ!» – 2025"
                      date="27.09.2025"
                      image="/images/projects/project-1-2351d1.png"
                      href="/projects/1"
                      size="large"
                    />
                  </div>

                  {/* Project 2 - Medium (x: 731.84) */}
                  <div className="absolute left-[732px] top-0">
                    <ProjectCard
                      title="Смотр-конкурс на лучшее военно-патриотическое объединение на территории Липецкой области"
                      image="/images/projects/project-2.png"
                      href="/projects/2"
                    />
                  </div>

                  {/* Project 3 - Medium (x: 1178.68) */}
                  <div className="absolute left-[1179px] top-0">
                    <ProjectCard
                      title="Смотр-конкурс на лучшее военно-патриотическое объединение на территории Липецкой области"
                      image="/images/projects/project-2.png"
                      href="/projects/3"
                    />
                  </div>
                </div>

                {/* Second Row */}
                <div className="relative h-[411px]">
                  {/* Project 4 - Medium (x: 0) */}
                  <div className="absolute left-0 top-0">
                    <ProjectCard
                      title="Смотр-конкурс на лучшее военно-патриотическое объединение на территории Липецкой области"
                      image="/images/projects/project-2.png"
                      href="/projects/4"
                    />
                  </div>

                  {/* Project 5 - Medium (x: 457.63) */}
                  <div className="absolute left-[458px] top-0">
                    <ProjectCard
                      title="Смотр-конкурс на лучшее военно-патриотическое объединение на территории Липецкой области"
                      image="/images/projects/project-2.png"
                      href="/projects/5"
                    />
                  </div>

                  {/* Project 6 - XLarge (x: 915) */}
                  <div className="absolute left-[915px] top-0">
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
            </div>

            {/* All Projects Button */}
            <div className="flex justify-center mt-[66px]">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-4 px-6 py-4 bg-[#C62828] hover:bg-[#B71C1C] text-[#EDF3F7] text-[24px] font-medium font-montserrat rounded-xl transition-colors leading-[1.219]"
                style={{ width: "394px", height: "55px" }}
              >
                Ко всем проектам
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[42px] mt-[120px] pb-12 lg:pb-16">
        {/* Section Title */}
        <h2 className="text-center text-3xl lg:text-[48px] font-semibold font-montserrat text-black mb-12 lg:mb-[72px]">
          Партнеры
        </h2>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-x-[57px] lg:gap-y-[0px] max-w-[1836px] mx-auto justify-items-center">
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
        </div>
      </section>

      {/* Contact Form Section - Full Width Background */}
      <section className="relative w-full min-h-[1026px] mt-[159px]">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/contact-form-bg.png"
            alt="Форма обратной связи"
            fill
            className="object-cover"
          />
        </div>

        {/* Content - Constrained to max-width */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto pt-[108px] pb-12">
          {/* Form Container */}
          <div
            className="relative mx-auto"
            style={{
              width: "906px",
              height: "799px",
            }}
          >
            {/* Blur Background */}
            <div
              className="absolute"
              style={{
                left: "43px",
                top: "150px",
                width: "821px",
                height: "624px",
                backgroundColor: "rgba(74, 74, 74, 0.7)",
                filter: "blur(84px)",
                zIndex: 0,
              }}
            />

            {/* White Card */}
            <div
              className="absolute bg-white rounded-[19px]"
              style={{
                left: "0px",
                top: "0px",
                width: "906px",
                height: "799px",
                zIndex: 10,
              }}
            >
              {/* Title */}
              <h2
                className="absolute text-[48px] font-bold font-montserrat text-black"
                style={{
                  left: "177px",
                  top: "60px",
                  width: "551px",
                  lineHeight: "1.219em",
                }}
              >
                Задайте свой вопрос
              </h2>

              {/* Name Field */}
              <div
                className="absolute"
                style={{
                  left: "203px",
                  top: "163px",
                  width: "500px",
                  height: "107px",
                }}
              >
                <label
                  className="absolute text-[24px] font-normal font-montserrat text-[#2C2C2C]"
                  style={{
                    left: "23.29px",
                    top: "0px",
                    lineHeight: "1.219em",
                  }}
                >
                  Имя
                </label>
                <input
                  type="text"
                  placeholder="Иван"
                  className="absolute w-[500px] h-[67px] bg-[#EDEDED] rounded-[12px] text-[24px] font-normal font-montserrat text-[#979797] px-[27px] outline-none focus:ring-2 focus:ring-[#C62828]"
                  style={{
                    left: "0px",
                    top: "40px",
                    lineHeight: "1.219em",
                  }}
                />
              </div>

              {/* Email Field */}
              <div
                className="absolute"
                style={{
                  left: "203px",
                  top: "302px",
                  width: "500px",
                  height: "107px",
                }}
              >
                <label
                  className="absolute text-[24px] font-normal font-montserrat text-[#2C2C2C]"
                  style={{
                    left: "23.29px",
                    top: "0px",
                    lineHeight: "1.219em",
                  }}
                >
                  Эл. почта
                </label>
                <input
                  type="email"
                  placeholder="example@yandex.ru"
                  className="absolute w-[500px] h-[67px] bg-[#EDEDED] rounded-[12px] text-[24px] font-normal font-montserrat text-[#979797] px-[27px] outline-none focus:ring-2 focus:ring-[#C62828]"
                  style={{
                    left: "0px",
                    top: "40px",
                    lineHeight: "1.219em",
                  }}
                />
              </div>

              {/* Question Field */}
              <div
                className="absolute"
                style={{
                  left: "203px",
                  top: "442px",
                  width: "500px",
                  height: "188px",
                }}
              >
                <label
                  className="absolute text-[24px] font-normal font-montserrat text-[#2C2C2C]"
                  style={{
                    left: "23.2px",
                    top: "0px",
                    lineHeight: "1.219em",
                  }}
                >
                  Ваш вопрос
                </label>
                <textarea
                  placeholder="Введите вопрос"
                  className="absolute w-[500px] h-[148px] bg-[#EDEDED] rounded-[12px] text-[24px] font-normal font-montserrat text-[#979797] px-[27px] py-[19px] outline-none focus:ring-2 focus:ring-[#C62828] resize-none"
                  style={{
                    left: "0px",
                    top: "40px",
                    lineHeight: "1.219em",
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                className="absolute w-[500px] h-[63px] bg-[#C62828] hover:bg-[#B71C1C] rounded-[12px] text-[22px] font-medium font-montserrat text-[#EDF3F7] transition-colors"
                style={{
                  left: "203px",
                  top: "676px",
                  lineHeight: "1.219em",
                }}
              >
                Отправить
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
