"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import { BackButton } from "@/components/buttons";
import { withSearchParams } from "@/utils/withSearchParams";
import SearchForm from "@/components/forms/SearchForm";
import SearchResultCard, {
  type SearchResultItem,
} from "@/components/cards/SearchResultCard";

interface SearchResponse {
  data: SearchResultItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const PAGE_SIZE = 10;

// Маппинг типов контента на URL
const getItemUrl = (item: SearchResultItem): string => {
  const urlMap: Record<SearchResultItem["type"], string> = {
    news: `/news/${item.slug}`,
    project: `/projects/${item.slug}`,
    "press-release": `/press-releases/${item.slug}`,
    event: `/events/${item.slug}`,
  };
  return urlMap[item.type] || "/";
};

// Компонент для сообщений (loading, error, empty)
function SearchMessage({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="text-[16px] md:text-[18px] lg:text-[20px] text-gray-600 font-montserrat">
        {message}
      </div>
    </div>
  );
}

function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("q") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Синхронизация с URL
  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  // Загрузка результатов поиска
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!queryParam.trim()) {
        setSearchResults([]);
        setTotalPages(1);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(
            queryParam
          )}&page=${pageParam}&pageSize=${PAGE_SIZE}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data: SearchResponse = await response.json();
        setSearchResults(data.data);
        setTotalPages(data.meta.pagination.pageCount);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setIsError(true);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [queryParam, pageParam]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}&page=1`);
    }
  };

  const handlePageChange = (page: number) => {
    router.push(`/search?q=${encodeURIComponent(queryParam)}&page=${page}`);
  };

  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      <main className="w-full max-w-[1920px] mx-auto pt-[15px] md:pt-[20px] lg:pt-[40px]">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[{ label: "Главная", href: "/home" }, { label: "Поиск" }]}
          className="px-[19px] md:px-[36px] lg:px-[80px] mb-[15px] md:mb-[20px] lg:mb-[30px]"
        />

        {/* Header section */}
        <div className="px-[19px] md:px-[36px] lg:px-[80px] mb-[25px] md:mb-[40px] lg:mb-[60px]">
          {/* Title and Back button */}
          <div className="flex flex-row items-center justify-between md:flex-row md:items-center md:justify-between gap-[20px] md:gap-0">
            <h1 className="text-[20px] md:text-[30px] lg:text-[40px] font-bold font-montserrat text-black leading-[1.219]">
              Поиск
            </h1>

            {/* Back to Home button - иконка на мобильной, с текстом на планшете/десктопе */}
            <div className="flex-shrink-0">
              <div className="md:hidden">
                <BackButton
                  href="/home"
                  variant="icon"
                  ariaLabel="На главную"
                />
              </div>
              <div className="hidden md:block">
                <BackButton href="/home" ariaLabel="На главную">
                  На главную
                </BackButton>
              </div>
            </div>
          </div>
        </div>

        {/* Search form */}
        <div className="px-[19px] md:px-[36px] lg:px-[80px] mb-[30px] md:mb-[40px] lg:mb-[50px]">
          <SearchForm
            onSubmit={handleSearch}
            initialValue={searchQuery}
            placeholder="Поиск"
            variant="page"
          />
        </div>

        {/* Белое полотно с результатами поиска */}
        <div className="bg-white mx-[19px] md:mx-[36px] lg:mx-[80px] mb-[30px] md:mb-[40px] lg:mb-[60px] rounded-[12px] px-[19px] md:px-[36px] lg:px-[80px] pt-[24px] md:pt-[40px] lg:pt-[56px] pb-[24px] md:pb-[40px] lg:pb-[68px]">
          {/* Search results */}
          {!queryParam.trim() && (
            <SearchMessage message="Введите запрос для поиска" />
          )}
          {queryParam.trim() && isError && (
            <SearchMessage message="Не удалось выполнить поиск. Попробуйте обновить страницу." />
          )}
          {queryParam.trim() && isLoading && (
            <SearchMessage message="Поиск..." />
          )}
          {queryParam.trim() &&
            !isLoading &&
            !isError &&
            searchResults.length === 0 && (
              <SearchMessage message="По вашему запросу ничего не найдено" />
            )}
          {queryParam.trim() &&
            !isLoading &&
            !isError &&
            searchResults.length > 0 && (
              <div className="space-y-0">
                {searchResults.map((item, index) => (
                  <SearchResultCard
                    key={item.id}
                    item={item}
                    isFirst={index === 0}
                    isLast={index === searchResults.length - 1}
                    getItemUrl={getItemUrl}
                  />
                ))}
              </div>
            )}
        </div>

        {/* Pagination - снаружи белого полотна */}
        {totalPages > 1 && (
          <div className="px-[19px] md:px-[36px] lg:px-[80px]">
            <Pagination
              currentPage={pageParam}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mb-0"
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default withSearchParams(SearchPage);
