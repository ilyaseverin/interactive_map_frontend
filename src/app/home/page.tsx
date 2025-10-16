"use client";

import Image from "next/image";
import Link from "next/link";
import CalendarCard from "@/components/CalendarCard";
import Calendar from "@/components/Calendar";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 2xl:px-[60px] py-8 lg:py-12">
        <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[685px] rounded-[20px] lg:rounded-[26px] overflow-hidden shadow-[0_5px_12px_0_rgba(0,0,0,0.25)]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero-bg.png"
              alt="Патриот Центр 48"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
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

          {/* Slider Dots */}
          <div className="absolute bottom-6 lg:bottom-[30px] left-1/2 transform -translate-x-1/2 flex gap-3 lg:gap-[15px] z-20">
            <button
              className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-white/50 hover:bg-white transition-colors"
              aria-label="Слайд 1"
            />
            <button
              className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-[#3B76AA] hover:bg-[#2C5F8A] transition-colors"
              aria-label="Слайд 2"
            />
            <button
              className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-white/50 hover:bg-white transition-colors"
              aria-label="Слайд 3"
            />
            <button
              className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-white/50 hover:bg-white transition-colors"
              aria-label="Слайд 4"
            />
          </div>
        </section>
      </div>

      {/* News Section - Full Width Background */}
      <section className="relative w-full min-h-[1001px] mt-12">
        {/* Background with gradient */}
        <div className="absolute inset-0">
          <Image
            src="/images/news/news-bg.png"
            alt="Новости"
            fill
            className="object-cover"
          />
          {/* Combined gradient overlay with smooth transitions */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(115, 115, 115, 0.4) 10%, rgba(115, 115, 115, 0.5) 25%, rgba(115, 115, 115, 0.5) 75%, rgba(115, 115, 115, 0.4) 90%, rgba(255, 255, 255, 0.95) 100%)",
            }}
          />
        </div>

        {/* Content - Constrained to max-width */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto py-12 px-6 lg:px-[69px]">
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
            {/* News Card 1 */}
            <article className="bg-white rounded-[15px] shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="relative h-[331px]">
                <Image
                  src="/images/news/news-1.png"
                  alt="Новость 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 lg:p-12">
                <div className="flex justify-end mb-2">
                  <time className="text-sm font-normal font-montserrat text-black">
                    19.09.2025
                  </time>
                </div>
                <h3 className="text-lg font-bold font-montserrat text-black leading-[1.56] mb-4">
                  ОБЛАСТНОЙ ФЕСТИВАЛЬ &ldquo;В АРМИИ СЛУЖИТЬ ПОЧЁТНО!&rdquo;
                </h3>
                <p className="text-lg font-normal font-montserrat text-black leading-[1.56] mb-6">
                  В СОЛ «Прометей» 19 сентября состоялся масштабный областной
                  патриотический фестиваль «В армии служить почётно!», собравший
                  участников и зрителей, объединенных любовью к Родине и
                  уважением к защитникам Отечества.
                </p>
                <Link
                  href="/news/1"
                  className="inline-flex items-center justify-center px-6 py-4 border border-[#1D4E89] text-[#1D4E89] text-[20px] font-normal font-montserrat rounded-xl hover:bg-[#1D4E89] hover:text-white transition-colors"
                >
                  Читать подробнее..
                </Link>
              </div>
            </article>

            {/* News Card 2 */}
            <article className="bg-white rounded-[15px] shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="relative h-[331px]">
                <Image
                  src="/images/news/news-2.png"
                  alt="Новость 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 lg:p-12">
                <div className="flex justify-end mb-2">
                  <time className="text-sm font-normal font-montserrat text-black">
                    19.09.2025
                  </time>
                </div>
                <h3 className="text-lg font-bold font-montserrat text-black leading-[1.56] mb-4">
                  ОБЛАСТНОЙ ФЕСТИВАЛЬ &ldquo;В АРМИИ СЛУЖИТЬ ПОЧЁТНО!&rdquo;
                </h3>
                <p className="text-lg font-normal font-montserrat text-black leading-[1.56] mb-6">
                  В СОЛ «Прометей» 19 сентября состоялся масштабный областной
                  патриотический фестиваль «В армии служить почётно!», собравший
                  участников и зрителей, объединенных любовью к Родине и
                  уважением к защитникам Отечества.
                </p>
                <Link
                  href="/news/2"
                  className="inline-flex items-center justify-center px-6 py-4 border border-[#1D4E89] text-[#1D4E89] text-[20px] font-normal font-montserrat rounded-xl hover:bg-[#1D4E89] hover:text-white transition-colors"
                >
                  Читать подробнее..
                </Link>
              </div>
            </article>

            {/* News Card 3 */}
            <article className="bg-white rounded-[15px] shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="relative h-[331px]">
                <Image
                  src="/images/news/news-3.png"
                  alt="Новость 3"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 lg:p-12">
                <div className="flex justify-end mb-2">
                  <time className="text-sm font-normal font-montserrat text-black">
                    19.09.2025
                  </time>
                </div>
                <h3 className="text-lg font-bold font-montserrat text-black leading-[1.56] mb-4">
                  ОБЛАСТНОЙ ФЕСТИВАЛЬ &ldquo;В АРМИИ СЛУЖИТЬ ПОЧЁТНО!&rdquo;
                </h3>
                <p className="text-lg font-normal font-montserrat text-black leading-[1.56] mb-6">
                  В СОЛ «Прометей» 19 сентября состоялся масштабный областной
                  патриотический фестиваль «В армии служить почётно!», собравший
                  участников и зрителей, объединенных любовью к Родине и
                  уважением к защитникам Отечества.
                </p>
                <Link
                  href="/news/3"
                  className="inline-flex items-center justify-center px-6 py-4 border border-[#1D4E89] text-[#1D4E89] text-[20px] font-normal font-montserrat rounded-xl hover:bg-[#1D4E89] hover:text-white transition-colors"
                >
                  Читать подробнее..
                </Link>
              </div>
            </article>
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
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-[69px] py-12 lg:py-16">
        {/* Section Title */}
        <h2 className="text-center text-3xl lg:text-[48px] font-semibold font-montserrat text-black mb-12 lg:mb-16">
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
              gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 78%)"
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
    </>
  );
}
