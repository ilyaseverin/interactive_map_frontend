"use client";

import type { NewsListResponse } from "@/types/strapi";
import NewsCard from "@/components/cards/NewsCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetNewsQuery } from "@/services/strapiApi";
import { BackButton, CategoryButton, SecondaryButton } from "@/components/buttons";
import { getResponsiveImageUrl, getStrapiMediaUrl } from "@/utils/strapiUrl";
import { withSearchParams } from "@/utils/withSearchParams";

// Функция для форматирования даты
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Функция для преобразования английского значения из URL в русское для API
function mapUrlCategoryToApiCategory(
  urlCategory: string | null
): string | undefined {
  if (urlCategory === "main") return "Главные";
  if (urlCategory === "regional") return "Региональные";
  return undefined;
}

function NewsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // Читаем категорию из URL при загрузке и преобразуем в русское значение для API
  const categoryParam = searchParams.get("category");
  const [category, setCategory] = useState<string | undefined>(
    mapUrlCategoryToApiCategory(categoryParam)
  );

  // Синхронизируем состояние с URL при изменении параметра
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    setCategory(mapUrlCategoryToApiCategory(urlCategory));
  }, [searchParams]);

  const pageSize = 9;

  const {
    data: newsData,
    isFetching,
    isError,
  } = useGetNewsQuery({
    page: currentPage,
    pageSize,
    category,
    minimal: true,
  });

  const fallbackData: NewsListResponse = { data: [], meta: {} };
  const mergedData = newsData ?? fallbackData;

  const newsList = mergedData.data;
  const totalPages = mergedData.meta?.pagination?.pageCount || 1;
  const isLoading = isFetching;

  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      {/* Основной контент */}
      <main className="w-full max-w-[1920px] mx-auto pt-[15px] md:pt-[20px] lg:pt-[40px]">
        {/* Хлебные крошки */}
        <Breadcrumbs
          items={[{ label: "Главная", href: "/home" }, { label: "Новости" }]}
          className="px-[19px] md:px-[36px] lg:px-[69px] mb-[15px] md:mb-[20px] lg:mb-[27px]"
        />

        {/* Заголовок и Кнопка Назад */}
        <div className="px-[19px] md:px-[36px] lg:px-[69px] flex flex-col md:flex-row md:items-start md:justify-between mb-[10px] md:mb-[20px] lg:mb-[27px] relative">
          {/* Заголовок */}
          <h1 className="text-[20px] md:text-[30px] lg:text-[40px] font-bold font-montserrat text-black leading-[1.219] mb-0 md:mb-0">
            Новости
          </h1>

          {/* Кнопка Назад */}
          <div className="absolute top-1/2 -translate-y-1/2 right-[19px] md:static md:translate-y-0">
            <BackButton href="/home" variant="red" />
          </div>
        </div>

        {/* Категории и Фото/Видео - мобильная версия (в два ряда) */}
        <div className="px-[19px] md:hidden flex flex-col gap-[5px] pt-[10px] mb-[30px] max-w-full overflow-hidden">
          {/* Первый ряд: "Все", "Главные" и "Региональные" */}
          <div className="flex gap-[5px]">
            <CategoryButton
              label="Все"
              isActive={category === undefined}
              onClick={() => {
                setCategory(undefined);
                setCurrentPage(1);
                router.push("/news");
              }}
              variant="mobile"
            />
            <CategoryButton
              label="Главные"
              isActive={category === "Главные"}
              onClick={() => {
                setCategory("Главные");
                setCurrentPage(1);
                router.push("/news?category=main");
              }}
              variant="mobile"
            />
            <CategoryButton
              label="Региональные"
              isActive={category === "Региональные"}
              onClick={() => {
                setCategory("Региональные");
                setCurrentPage(1);
                router.push("/news?category=regional");
              }}
              variant="mobile"
              className="flex-shrink"
            />
          </div>

          {/* Второй ряд: Фотоальбомы и Видео */}
          <div className="flex gap-[5px] min-w-0">
            <SecondaryButton href="/photo-albums?source=news" variant="mobile" className="min-w-0 flex-shrink">
              К фотоальбомам
            </SecondaryButton>
            <SecondaryButton href="/videos?source=news" variant="mobile" className="min-w-0 flex-shrink">
              К видео
            </SecondaryButton>
          </div>
        </div>

        {/* Категории и Фото/Видео - планшет (в два ряда) */}
        <div className="hidden md:flex lg:hidden px-[36px] flex-col gap-[12px] mb-[64px]">
          {/* Категории */}
          <div className="flex flex-row gap-[14px] flex-wrap">
            <CategoryButton
              label="Все"
              isActive={category === undefined}
              onClick={() => {
                setCategory(undefined);
                setCurrentPage(1);
                router.push("/news");
              }}
              variant="tablet"
            />
            <CategoryButton
              label="Главные"
              isActive={category === "Главные"}
              onClick={() => {
                setCategory("Главные");
                setCurrentPage(1);
                router.push("/news?category=main");
              }}
              variant="tablet"
            />
            <CategoryButton
              label="Региональные"
              isActive={category === "Региональные"}
              onClick={() => {
                setCategory("Региональные");
                setCurrentPage(1);
                router.push("/news?category=regional");
              }}
              variant="tablet"
            />
          </div>

          {/* Кнопки Фотоальбомы / Видео */}
          <div className="flex gap-[14px] flex-wrap">
            <SecondaryButton href="/photo-albums?source=news" variant="tablet">
              К фотоальбомам
            </SecondaryButton>
            <SecondaryButton href="/videos?source=news" variant="tablet">
              К видео
            </SecondaryButton>
          </div>
        </div>

        {/* Категории и Фото/Видео - десктоп (в одну линию) */}
        <div className="hidden lg:flex px-[69px] flex-row items-start justify-between gap-0 mb-[64px]">
          {/* Категории */}
          <div className="flex flex-row gap-[23px] flex-wrap">
            <CategoryButton
              label="Все"
              isActive={category === undefined}
              onClick={() => {
                setCategory(undefined);
                setCurrentPage(1);
                router.push("/news");
              }}
              variant="desktop"
            />
            <CategoryButton
              label="Главные"
              isActive={category === "Главные"}
              onClick={() => {
                setCategory("Главные");
                setCurrentPage(1);
                router.push("/news?category=main");
              }}
              variant="desktop"
            />
            <CategoryButton
              label="Региональные"
              isActive={category === "Региональные"}
              onClick={() => {
                setCategory("Региональные");
                setCurrentPage(1);
                router.push("/news?category=regional");
              }}
              variant="desktop"
            />
          </div>

          {/* Кнопки Фотоальбомы / Видео */}
          <div className="flex gap-[15px] flex-wrap">
            <SecondaryButton href="/photo-albums?source=news" variant="desktop">
              К фотоальбомам
            </SecondaryButton>
            <SecondaryButton href="/videos?source=news" variant="desktop">
              К видео
            </SecondaryButton>
          </div>
        </div>

        {/* Блок новостей */}
        {isError ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">
              Не удалось загрузить новости. Попробуйте обновить страницу.
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">Загрузка...</div>
          </div>
        ) : newsList.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">Новостей пока нет</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-0 md:gap-x-[18px] lg:gap-x-[30px] gap-y-[25px] md:gap-y-[25px] lg:gap-y-[25px] mb-[60px] px-[19px] md:px-[36px] lg:px-[69px]">
            {newsList.map((news) => {
              const fullCoverUrl = getResponsiveImageUrl(
                news.media?.cover,
                "medium"
              );

              return (
                <NewsCard
                  key={news.id}
                  image={fullCoverUrl || "/images/news/news-1.png"}
                  date={formatDate(news.basic_info.published_at_date)}
                  title={news.title}
                  description={news.content_info?.excerpt || ""}
                  href={`/news/${news.slug}`}
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

export default withSearchParams(NewsPage);
