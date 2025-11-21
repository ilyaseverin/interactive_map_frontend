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
  selectedDate?: Date; // Выбранная дата
  onDateSelect?: (date: Date) => void; // Callback при выборе даты
  className?: string;
}

export default function Calendar({
  highlightedDates = [],
  selectedDate,
  onDateSelect,
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

  const isSelected = (date: Date) => {
    return selectedDate ? isSameDay(selectedDate, date) : false;
  };

  const handleDateClick = (date: Date) => {
    if (onDateSelect && isSameMonth(date, currentMonth)) {
      onDateSelect(date);
    }
  };

  return (
    <div
      className={`relative w-full md:w-[650px] lg:w-[938px] 2xl:w-full lg:min-w-[650px] lg:max-w-[938px] flex-shrink-0 ${className}`}
    >
      {/* Calendar Container */}
      <div className="relative bg-white rounded-[15px] w-full min-h-[328px] md:h-[647px] lg:h-[647px] px-[10px] md:px-[45px] lg:px-[45px] py-[18px] md:py-[35px] lg:py-[35px] overflow-hidden shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] select-none">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-[15px] md:mb-[49px] lg:mb-[49px]">
          <button
            onClick={handlePrevMonth}
            className="w-[25px] h-[25px] md:w-[46px] md:h-[48px] lg:w-[46px] lg:h-[48px] hover:opacity-80 transition-opacity flex-shrink-0"
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
          <h3 className="text-[12px] md:text-[22px] lg:text-[22px] font-bold font-montserrat text-black capitalize leading-none">
            {format(currentMonth, "LLLL yyyy", { locale: ru })}
          </h3>
          <button
            onClick={handleNextMonth}
            className="w-[25px] h-[25px] md:w-[46px] md:h-[48px] lg:w-[46px] lg:h-[48px] hover:opacity-80 transition-opacity flex-shrink-0"
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
        <div className="w-full mx-auto">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-0 mb-[4px] md:mb-[43px] lg:mb-[43px]">
            {weekDays.map((day, index) => {
              // Планшетные ширины: ПН=78px, остальные=80px
              const tabletWidth = index === 0 ? "md:w-[78px]" : "md:w-[80px]";

              return (
                <div
                  key={day}
                  className={`text-[10px] md:text-[22px] lg:text-[22px] font-normal font-montserrat text-[#121212] text-center leading-[30px] ${tabletWidth}`}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Calendar Days - 5 weeks */}
          <div className="space-y-[13px] md:space-y-[51px] lg:space-y-[51px]">
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
                    const isDateSelected = isSelected(date);

                    // Планшетные ширины: ПН=78px, остальные=80px
                    const tabletWidth =
                      dayIndex === 0 ? "md:w-[78px]" : "md:w-[80px]";

                    const isClickable = isCurrentMonth && onDateSelect;

                    return (
                      <div
                        key={dayIndex}
                        className={`relative flex items-center justify-center h-[30px] ${tabletWidth} ${
                          isClickable ? "cursor-pointer" : "cursor-default"
                        } group`}
                        onClick={() => isClickable && handleDateClick(date)}
                      >
                        {/* Hover indicator (pale gray) */}
                        {isClickable && !isCurrentDay && !isDateSelected && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-[29px] h-[29px] md:w-[58px] md:h-[58px] lg:w-[58px] lg:h-[58px] rounded-full bg-gray-200" />
                          </div>
                        )}

                        {/* Event indicator (light blue circle) */}
                        {hasEvent && !isCurrentDay && !isDateSelected && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[29px] h-[29px] md:w-[58px] md:h-[58px] lg:w-[58px] lg:h-[58px] rounded-full bg-blue-200" />
                          </div>
                        )}

                        {/* Today indicator (dark red circle) */}
                        {isCurrentDay && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[29px] h-[29px] md:w-[58px] md:h-[58px] lg:w-[58px] lg:h-[58px] rounded-full bg-[#C62828]" />
                          </div>
                        )}

                        {/* Selected date indicator (darker blue circle for user-selected date) */}
                        {isDateSelected && !isCurrentDay && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[29px] h-[29px] md:w-[58px] md:h-[58px] lg:w-[58px] lg:h-[58px] rounded-full bg-[#1D4E89]" />
                          </div>
                        )}

                        {/* Date number */}
                        <span
                          className={`relative z-10 text-[15px] md:text-[22px] lg:text-[22px] font-montserrat leading-[30px] ${
                            isCurrentDay || isDateSelected
                              ? "text-white font-bold"
                              : isCurrentMonth
                              ? "text-[#121212] font-normal"
                              : "text-[#C5C5C5] font-normal"
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
