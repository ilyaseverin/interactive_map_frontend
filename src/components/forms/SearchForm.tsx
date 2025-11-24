"use client";

import { useState, useEffect } from "react";

interface SearchFormProps {
  onSubmit: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  variant?: "page" | "header"; // page - иконка слева, кнопка-иконка на мобильной; header - иконка справа, текстовая кнопка
}

export default function SearchForm({
  onSubmit,
  initialValue = "",
  placeholder = "Поиск",
  autoFocus = false,
  className = "",
  variant = "page",
}: SearchFormProps) {
  const [query, setQuery] = useState(initialValue);

  // Синхронизация с initialValue при изменении
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim());
    }
  };

  const isPageVariant = variant === "page";

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-row gap-[10px] md:gap-[16px] items-stretch md:items-center ${className}`}
    >
      {/* Поле ввода */}
      <div className="relative flex-1">
        {/* Иконка поиска - слева на всех размерах для обоих вариантов */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] md:w-[20px] md:h-[20px] lg:w-[24px] lg:h-[24px] pointer-events-none"
        >
          <circle
            cx="11"
            cy="11"
            r="8"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[#8B8B8B]"
          />
          <path
            d="m21 21-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-[#8B8B8B]"
          />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={
            isPageVariant
              ? "w-full pl-[42px] md:pl-[52px] lg:pl-[60px] pr-[16px] md:pr-[16px] h-[34px] md:h-auto md:py-[16px] bg-white border border-[#8B8B8B] rounded-[12px] text-[16px] md:text-[18px] lg:text-[20px] font-normal font-montserrat text-black placeholder:text-[#8B8B8B] focus:outline-none focus:ring-2 focus:ring-[#C62828] leading-[34px] md:leading-[1.219]"
              : "w-full pl-[42px] md:pl-[52px] lg:pl-[60px] pr-[16px] md:pr-[16px] py-[12px] md:py-[14px] bg-white border border-[#8B8B8B] rounded-[10px] md:rounded-[12px] text-[14px] md:text-[16px] lg:text-[18px] font-normal font-montserrat text-black placeholder:text-[#8B8B8B] focus:outline-none focus:ring-2 focus:ring-[#C62828] leading-[1.219]"
          }
        />
      </div>

      {/* Кнопка "Найти" */}
      {isPageVariant ? (
        <>
          {/* Кнопка на мобильной - иконка */}
          <button
            type="submit"
            className="md:hidden w-[34px] h-[34px] p-[5px] bg-[#C62828] rounded-[7px] hover:bg-[#B71C1C] active:scale-95 transition-all duration-150 flex items-center justify-center flex-shrink-0 cursor-pointer"
            aria-label="Найти"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[16px] h-[16px] text-white"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="m21 21-4.35-4.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {/* Кнопка на планшете/десктопе - текст */}
          <button
            type="submit"
            className="hidden md:inline-flex items-center justify-center px-[20px] md:px-[24px] py-[12px] md:py-[14px] lg:py-[16px] bg-[#C62828] text-white text-[14px] md:text-[16px] lg:text-[20px] font-medium font-montserrat rounded-[10px] lg:rounded-[12px] hover:bg-[#B71C1C] transition-colors leading-[1.219] whitespace-nowrap cursor-pointer"
          >
            Найти
          </button>
        </>
      ) : (
        <button
          type="submit"
          className="px-[16px] md:px-[20px] lg:px-[24px] py-[10px] md:py-[12px] lg:py-[14px] bg-[#C62828] text-white text-[14px] md:text-[16px] lg:text-[18px] font-medium font-montserrat rounded-[10px] lg:rounded-[12px] hover:bg-[#B71C1C] transition-colors leading-[1.219] whitespace-nowrap cursor-pointer"
        >
          Найти
        </button>
      )}
    </form>
  );
}
