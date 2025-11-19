"use client";

import type { ProjectListResponse } from "@/types/strapi";
import ProjectListCard from "@/components/cards/ProjectListCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import { useGetProjectsQuery } from "@/services/strapiApi";
import { BackButton, SecondaryButton } from "@/components/buttons";
import { getStrapiMediaUrl } from "@/utils/strapiUrl";

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
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 9;

  const {
    data: projectsData,
    isFetching,
    isError,
  } = useGetProjectsQuery({
    page: currentPage,
    pageSize,
  });

  const fallbackData: ProjectListResponse = { data: [], meta: {} };
  const mergedData = projectsData ?? fallbackData;

  const projectsList = mergedData.data;
  const totalPages = mergedData.meta?.pagination?.pageCount || 1;
  const isLoading = isFetching;

  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      {/* Основной контент */}
      <main className="w-full max-w-[1920px] mx-auto pt-[15px] md:pt-[20px] lg:pt-[40px]">
        {/* Хлебные крошки */}
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/home" },
            { label: "Наши проекты" },
          ]}
          className="px-[19px] md:px-[36px] lg:px-[69px] mb-[15px] md:mb-[20px] lg:mb-[27px]"
        />

        {/* Заголовок и Кнопка Назад */}
        <div className="px-[19px] md:px-[36px] lg:px-[69px] flex flex-col md:flex-row md:items-start md:justify-between mb-[10px] md:mb-[20px] lg:mb-[27px] relative">
          {/* Заголовок */}
          <h1 className="text-[20px] md:text-[30px] lg:text-[40px] font-bold font-montserrat text-black leading-[1.219] mb-0 md:mb-0">
            Наши проекты
          </h1>

          {/* Кнопка Назад */}
          <div className="absolute top-1/2 -translate-y-1/2 right-[19px] md:static md:translate-y-0">
            <BackButton href="/home" variant="red" />
          </div>
        </div>

        {/* Кнопки Фото/Видео - мобильная версия */}
        <div className="px-[19px] md:hidden flex gap-[5px] pt-[10px] mb-[20px] max-w-full overflow-hidden">
          <SecondaryButton href="/photo-albums?source=projects" variant="mobile" className="min-w-0 flex-shrink">
            К фотоальбомам
          </SecondaryButton>
          <SecondaryButton href="/videos?source=projects" variant="mobile" className="min-w-0 flex-shrink">
            К видео
          </SecondaryButton>
        </div>

        {/* Кнопки Фото/Видео - планшет */}
        <div className="hidden md:flex lg:hidden px-[36px] flex-row gap-[14px] mb-[40px] flex-wrap">
          <SecondaryButton href="/photo-albums?source=projects" variant="tablet">
            К фотоальбомам
          </SecondaryButton>
          <SecondaryButton href="/videos?source=projects" variant="tablet">
            К видео
          </SecondaryButton>
        </div>

        {/* Кнопки Фото/Видео - десктоп */}
        <div className="hidden lg:flex px-[69px] flex-row items-start justify-end gap-0 mb-[50px]">
          {/* Кнопки Фотоальбомы / Видео */}
          <div className="flex gap-[15px] flex-wrap">
            <SecondaryButton href="/photo-albums?source=projects" variant="desktop">
              К фотоальбомам
            </SecondaryButton>
            <SecondaryButton href="/videos?source=projects" variant="desktop">
              К видео
            </SecondaryButton>
          </div>
        </div>

        {/* Блок проектов */}
        {isError ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">
              Не удалось загрузить проекты. Попробуйте обновить страницу.
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">Загрузка...</div>
          </div>
        ) : projectsList.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">Проектов пока нет</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-0 md:gap-x-[18px] lg:gap-x-[30px] gap-y-[25px] md:gap-y-[25px] lg:gap-y-[25px] mb-[60px] px-[19px] md:px-[36px] lg:px-[69px]">
            {projectsList.map((project) => {
              const coverUrl = project.media?.cover?.url;
              const fullCoverUrl = coverUrl
                ? getStrapiMediaUrl(coverUrl) || coverUrl
                : "/images/news/news-1.png";

              const source = project.basic_info?.category
                ? `Источник: ${project.basic_info.category}`
                : "Источник: РЦПГ РФ";

              const description = project.summary?.excerpt || "";

              return (
                <ProjectListCard
                  key={project.id}
                  image={fullCoverUrl}
                  date={formatDate(project.publishedAt)}
                  category={source}
                  title={project.title}
                  description={description}
                  href={`/projects/${project.slug}`}
                />
              );
            })}
          </div>
        )}

        {/* Пагинация */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="px-[19px] md:px-[36px] lg:px-[69px]"
        />
      </main>
    </div>
  );
}
