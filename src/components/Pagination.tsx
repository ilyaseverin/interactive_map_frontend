"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  // Генерация номеров страниц для пагинации
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Если страниц мало, показываем все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Всегда показываем первую страницу
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Показываем страницы вокруг текущей
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Всегда показываем последнюю страницу
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className={`flex items-center justify-center gap-[20px] md:gap-[36px] mb-[60px] md:mb-[150px] lg:mb-[150px] ${className}`}
    >
      {/* Кнопка Назад - мобильная */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`md:hidden inline-flex items-center justify-center w-[35px] h-[35px] rounded-[7px] transition-all duration-150 ${
          currentPage === 1
            ? "bg-[#DBDBDB] cursor-not-allowed"
            : "bg-[#C62828] hover:bg-[#B71C1C] active:scale-95"
        }`}
      >
        <svg
          width="14"
          height="0"
          viewBox="0 0 14 0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 0L0 0"
            stroke={currentPage === 1 ? "#B8B8B8" : "#FFFFFF"}
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Кнопка Назад - планшет и десктоп */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`hidden md:inline-flex items-center justify-center px-[20px] py-[12px] md:w-[132px] md:h-[48px] lg:w-auto lg:px-[24px] lg:py-[16px] rounded-[10px] lg:rounded-[12px] text-[16px] lg:text-[20px] font-medium font-montserrat transition-colors leading-[1.219] ${
          currentPage === 1
            ? "bg-[#DBDBDB] text-[#B8B8B8] cursor-not-allowed"
            : "bg-[#C62828] text-[#EDF3F7] hover:bg-[#B71C1C]"
        }`}
      >
        Назад
      </button>

      {/* Номера страниц */}
      <div className="flex items-center gap-[4px]">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-[10px] md:px-[15px] lg:px-[16px] text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat text-black"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`inline-flex items-center justify-center w-[35px] h-[35px] md:w-[51px] md:h-[48px] lg:w-auto lg:min-w-[56px] lg:px-[24px] lg:py-[16px] rounded-[8px] md:rounded-[10px] lg:rounded-[10px] text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat transition-all duration-150 leading-[1.219] active:scale-95 ${
                currentPage === pageNum
                  ? "bg-[#C62828] text-[#EDF3F7]"
                  : "bg-white text-black border border-[#C62828] hover:bg-gray-50"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Кнопка Вперед - мобильная */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`md:hidden inline-flex items-center justify-center w-[35px] h-[35px] rounded-[7px] transition-all duration-150 ${
          currentPage === totalPages
            ? "bg-[#DBDBDB] cursor-not-allowed"
            : "bg-[#C62828] hover:bg-[#B71C1C] active:scale-95"
        }`}
      >
        <svg
          width="14"
          height="0"
          viewBox="0 0 14 0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L14 0"
            stroke={currentPage === totalPages ? "#B8B8B8" : "#FFFFFF"}
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Кнопка Вперед - планшет и десктоп */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`hidden md:inline-flex items-center justify-center px-[20px] py-[12px] md:w-[132px] md:h-[48px] lg:w-auto lg:px-[24px] lg:py-[16px] rounded-[10px] lg:rounded-[12px] text-[16px] lg:text-[20px] font-medium font-montserrat transition-colors leading-[1.219] ${
          currentPage === totalPages
            ? "bg-[#DBDBDB] text-[#B8B8B8] cursor-not-allowed"
            : "bg-[#C62828] text-[#EDF3F7] hover:bg-[#B71C1C]"
        }`}
      >
        Вперед
      </button>
    </div>
  );
}

