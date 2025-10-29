"use client";

import { ProjectListResponse } from "@/types/strapi";
import Link from "next/link";
import ProjectListCard from "@/components/cards/ProjectListCard";
import { useEffect, useState } from "react";

// Функция для получения проектов из Strapi
async function getProjects(
  page: number = 1,
  pageSize: number = 9
): Promise<ProjectListResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  try {
    const res = await fetch(
      `${apiUrl}/api/projects?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate[basic_info]=*&populate[summary]=*&populate[content_info]=*&populate[media][populate][cover]=true&populate[media][populate][gallery]=true&sort=publishedAt:desc`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch projects:", res.status, res.statusText);
      return { data: [], meta: {} };
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { data: [], meta: {} };
  }
}

// Функция для форматирования даты
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Клиентский компонент
export default function ProjectsPage() {
  const [projectsData, setProjectsData] = useState<ProjectListResponse>({
    data: [],
    meta: {},
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const pageSize = 9;

  useEffect(() => {
    setIsLoading(true);
    getProjects(currentPage, pageSize).then((data) => {
      setProjectsData(data);
      setIsLoading(false);
    });
  }, [currentPage]);

  const projectsList = projectsData.data;
  const totalPages = projectsData.meta?.pagination?.pageCount || 1;

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

  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      {/* Основной контент */}
      <main className="w-full max-w-[1920px] mx-auto px-4 lg:px-[76px] pt-[39px]">
        {/* Хлебные крошки */}
        <nav className="flex items-center gap-[14px] mb-[24px] lg:mb-[54px] text-[20px] font-normal font-montserrat leading-[1.219]">
          <Link href="/home" className="text-black hover:text-[#1D4E89]">
            Главная
          </Link>
          <span className="text-black">&gt;</span>
          <span className="text-black">Наши проекты</span>
        </nav>

        {/* Заголовок и кнопка Назад */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-[51px] lg:mb-[49px]">
          {/* Заголовок */}
          <h1 className="text-[32px] md:text-[36px] lg:text-[40px] font-bold font-montserrat text-black leading-[1.219] mb-4 lg:mb-0">
            Наши проекты
          </h1>

          {/* Кнопка Назад */}
          <Link
            href="/home"
            className="inline-flex items-center justify-center gap-[10px] px-[24px] py-[16px] border border-[#C62828] text-[#C62828] text-[20px] font-normal font-montserrat rounded-[12px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219] self-start lg:self-auto"
          >
            <svg
              width="33"
              height="25"
              viewBox="0 0 33 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
        </div>

        {/* Блок проектов */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">Загрузка...</div>
          </div>
        ) : projectsList.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">Проектов пока нет</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-[50px] mb-[88px] lg:mb-[88px]">
            {(() => {
              // Берем первый проект и дублируем его 10 раз
              const firstProject = projectsList[0];
              const coverUrl = firstProject.media?.cover?.url;
              const fullCoverUrl = coverUrl
                ? coverUrl.startsWith("http")
                  ? coverUrl
                  : `${
                      process.env.NEXT_PUBLIC_STRAPI_URL ||
                      "http://localhost:1337"
                    }${coverUrl}`
                : "/images/news/news-1.png";

              const source = firstProject.basic_info?.category
                ? `Источник: ${firstProject.basic_info.category}`
                : "Источник: РЦПГ РФ";

              const description = firstProject.summary?.excerpt || "";

              return Array.from({ length: 10 }, (_, index) => (
                <ProjectListCard
                  key={`${firstProject.id}-${index}`}
                  image={fullCoverUrl}
                  date={formatDate(firstProject.publishedAt)}
                  category={source}
                  title={firstProject.title}
                  description={description}
                  href={`/projects/${firstProject.slug}`}
                />
              ));
            })()}
          </div>
        )}

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-[36px] mb-[150px] lg:mb-[150px] px-4 md:px-[90px] lg:px-0">
            {/* Кнопка Назад */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`inline-flex items-center justify-center w-[132px] h-[48px] px-[12px] py-[20px] md:w-[132px] md:h-[48px] md:px-[12px] md:py-[20px] lg:w-auto lg:px-[24px] lg:py-[16px] rounded-[10px] md:rounded-[10px] lg:rounded-[12px] text-[16px] md:text-[16px] lg:text-[20px] font-medium font-montserrat transition-colors leading-[1.219] ${
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
                      className="px-[16px] text-[20px] font-normal font-montserrat text-black"
                    >
                      ...
                    </span>
                  );
                }

                const pageNum = page as number;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`inline-flex items-center justify-center w-[51px] h-[48px] md:w-[51px] md:h-[48px] lg:w-auto lg:min-w-[56px] lg:px-[24px] lg:py-[16px] px-[12px] py-[20px] rounded-[10px] md:rounded-[10px] lg:rounded-[10px] text-[16px] md:text-[16px] lg:text-[20px] font-normal font-montserrat transition-colors leading-[1.219] ${
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

            {/* Кнопка Вперед */}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`inline-flex items-center justify-center w-[132px] h-[48px] px-[12px] py-[20px] md:w-[132px] md:h-[48px] md:px-[12px] md:py-[20px] lg:w-auto lg:px-[24px] lg:py-[16px] rounded-[10px] md:rounded-[10px] lg:rounded-[12px] text-[16px] md:text-[16px] lg:text-[20px] font-medium font-montserrat transition-colors leading-[1.219] ${
                currentPage === totalPages
                  ? "bg-[#DBDBDB] text-[#B8B8B8] cursor-not-allowed"
                  : "bg-[#C62828] text-[#EDF3F7] hover:bg-[#B71C1C]"
              }`}
            >
              Вперед
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
