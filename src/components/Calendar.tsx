"use client";

import { useState } from "react";
import Image from "next/image";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import { ru } from "date-fns/locale";

interface CalendarProps {
  highlightedDates?: Date[]; // Даты с событиями (серые кружки)
  className?: string;
}

export default function Calendar({
  highlightedDates = [],
  className = "",
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Неделя начинается с понедельника
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

  const generateDates = () => {
    const dates: Date[] = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays(currentDate, 1);
    }

    return dates;
  };

  const dates = generateDates();

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const isHighlighted = (date: Date) => {
    return highlightedDates.some((highlightedDate) =>
      isSameDay(highlightedDate, date)
    );
  };

  return (
    <div
      className={`relative w-full sm:w-[276px] lg:w-[650px] flex-shrink-0 ${className}`}
    >
      {/* Blue Shadow - только для десктопа */}
      <div className="hidden lg:block absolute left-[45px] top-[57px] w-[567px] h-[564px] bg-[#1D4E89] rounded-[15px] blur-[104px] opacity-100" />

      {/* Calendar Container */}
      <div className="relative bg-white rounded-[15px] w-full min-h-[328px] sm:min-h-[328px] lg:h-[647px] px-[10px] sm:px-[10px] lg:px-[45px] py-[18px] sm:py-[18px] lg:py-[35px] overflow-hidden">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-[15px] sm:mb-[15px] lg:mb-[49px]">
          <button
            onClick={handlePrevMonth}
            className="w-[25px] h-[25px] sm:w-[34px] sm:h-[33px] lg:w-[46px] lg:h-[48px] hover:opacity-80 transition-opacity flex-shrink-0"
            aria-label="Предыдущий месяц"
          >
            <Image
              src="/images/calendar/arrow-left.svg"
              alt="Предыдущий месяц"
              width={46}
              height={48}
              className="w-full h-full object-contain"
            />
          </button>
          <h3 className="text-[12px] sm:text-[12px] lg:text-[22px] font-bold font-montserrat text-black capitalize leading-none">
            {format(currentMonth, "LLLL yyyy", { locale: ru })}
          </h3>
          <button
            onClick={handleNextMonth}
            className="w-[25px] h-[25px] sm:w-[36px] sm:h-[33px] lg:w-[46px] lg:h-[48px] hover:opacity-80 transition-opacity flex-shrink-0"
            aria-label="Следующий месяц"
          >
            <Image
              src="/images/calendar/arrow-right.svg"
              alt="Следующий месяц"
              width={46}
              height={48}
              className="w-full h-full object-contain"
            />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="w-full max-w-[256px] sm:max-w-[256px] lg:max-w-[560px] mx-auto">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-[5px] sm:gap-[5px] lg:gap-0 mb-[4px] sm:mb-[4px] lg:mb-[43px]">
            {weekDays.map((day, index) => {
              // Мобильные ширины: ПН=36px, ВС=32px, остальные=30-31px
              const mobileWidth =
                index === 0
                  ? "w-[36px]"
                  : index === 6
                  ? "w-[32px]"
                  : "w-[30px] sm:w-[31px]";
              // Десктопные ширины: ПН=78px, ВС=80px, остальные=80px
              const desktopWidth = index === 0 ? "lg:w-[78px]" : "lg:w-[80px]";

              return (
                <div
                  key={day}
                  className={`text-[10px] sm:text-[10px] lg:text-[22px] font-normal font-montserrat text-[#121212] text-center leading-[30px] ${mobileWidth} ${desktopWidth}`}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Calendar Days - 5 weeks */}
          <div className="space-y-[13px] sm:space-y-[13px] lg:space-y-[51px]">
            {Array.from({ length: 5 }).map((_, weekIndex) => {
              const weekStart = weekIndex * 7;
              const weekDates = dates.slice(weekStart, weekStart + 7);

              // Если недостаточно дат для полной недели, заполняем пустыми
              while (weekDates.length < 7) {
                weekDates.push(
                  addDays(weekDates[weekDates.length - 1] || startDate, 1)
                );
              }

              return (
                <div
                  key={weekIndex}
                  className="grid grid-cols-7 gap-0 sm:gap-0 lg:gap-0"
                >
                  {weekDates.map((date, dayIndex) => {
                    const isCurrentMonth = isSameMonth(date, currentMonth);
                    const isCurrentDay = isToday(date);
                    const hasEvent = isHighlighted(date);

                    // Мобильные ширины: ПН=36px, ВС=32px, остальные=31px
                    const mobileWidth =
                      dayIndex === 0
                        ? "w-[36px]"
                        : dayIndex === 6
                        ? "w-[32px]"
                        : "w-[31px]";
                    // Десктопные ширины: ПН=78px, ВС=80px, остальные=80px
                    const desktopWidth =
                      dayIndex === 0 ? "lg:w-[78px]" : "lg:w-[80px]";

                    return (
                      <div
                        key={dayIndex}
                        className={`relative flex items-center justify-center h-[30px] ${mobileWidth} ${desktopWidth}`}
                      >
                        {/* Event indicator (gray circle) */}
                        {hasEvent && !isCurrentDay && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[29px] h-[29px] sm:w-[29px] sm:h-[29px] lg:w-[58px] lg:h-[58px] rounded-full bg-[#C7D1DB]" />
                          </div>
                        )}

                        {/* Today indicator (red circle) */}
                        {isCurrentDay && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[29px] h-[29px] sm:w-[29px] sm:h-[29px] lg:w-[58px] lg:h-[58px] rounded-full bg-[#C62828]" />
                          </div>
                        )}

                        {/* Date number */}
                        <span
                          className={`relative z-10 text-[15px] sm:text-[15px] lg:text-[22px] font-normal font-montserrat leading-[30px] ${
                            isCurrentMonth ? "text-[#121212]" : "text-[#C5C5C5]"
                          }`}
                        >
                          {format(date, "d")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
