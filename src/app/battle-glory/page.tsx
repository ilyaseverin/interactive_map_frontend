"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BattleGloryMapWithData from "@/components/maps/BattleGloryMapWithData";
import Link from "next/link";
import FilterButton from "@/components/battle-glory/FilterButton";
import InfoCard from "@/components/battle-glory/InfoCard";

type FilterType =
  | null
  | "памятник/мемориал"
  | "мемориальная доска"
  | "воинское захоронение";

// Маппинг английских URL параметров на русские значения фильтров
const filterUrlToType: Record<string, Exclude<FilterType, null>> = {
  monument: "памятник/мемориал",
  "memorial-board": "мемориальная доска",
  burial: "воинское захоронение",
};

// Обратный маппинг: русские значения на английские URL параметры
const filterTypeToUrl: Record<Exclude<FilterType, null>, string> = {
  "памятник/мемориал": "monument",
  "мемориальная доска": "memorial-board",
  "воинское захоронение": "burial",
};

export default function BattleGloryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterParam = searchParams.get("filter");

  const [activeFilter, setActiveFilter] = useState<FilterType>(null);

  // Инициализация фильтра из URL параметра
  useEffect(() => {
    if (filterParam) {
      const decodedFilter = decodeURIComponent(filterParam);
      const filterType = filterUrlToType[decodedFilter];
      if (filterType) {
        setActiveFilter(filterType);
      }
    } else {
      setActiveFilter(null);
    }
  }, [filterParam]);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    // Обновляем URL без перезагрузки страницы с английскими значениями
    if (filter) {
      const urlParam = filterTypeToUrl[filter];
      router.push(`/battle-glory?filter=${urlParam}`, {
        scroll: false,
      });
    } else {
      router.push("/battle-glory", { scroll: false });
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F1F2F3" }}>
      {/* Основной контент */}
      <main className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-[36px] lg:px-[133px] pt-[50px] md:pt-[30px] pb-[50px] md:pb-[30px]">
        {/* Контейнер контента */}
        <div className="w-full max-w-[1654px] mx-auto flex flex-col gap-[28px]">
          {/* Фильтры */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-[15px] items-center">
            <FilterButton
              filter={null}
              label="Все объекты"
              activeFilter={activeFilter}
              onClick={handleFilterChange}
            />
            <FilterButton
              filter="памятник/мемориал"
              label="Памятники"
              activeFilter={activeFilter}
              onClick={handleFilterChange}
            />
            <FilterButton
              filter="мемориальная доска"
              label="Доски"
              activeFilter={activeFilter}
              onClick={handleFilterChange}
            />
            <FilterButton
              filter="воинское захоронение"
              label="Захоронения"
              activeFilter={activeFilter}
              onClick={handleFilterChange}
            />
          </div>

          {/* Карта */}
          <div className="bg-white rounded-[10px] overflow-hidden w-full h-[514px] md:h-[753px] lg:h-[830px]">
            <BattleGloryMapWithData
              height="100%"
              className="rounded-[10px] h-full"
              filterType={activeFilter}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Информационные карточки */}
          <div className="flex flex-col lg:flex-row flex-wrap gap-[15px] items-stretch">
            <InfoCard
              title="Памятники и мемориалы"
              description="Объекты, увековечивающие память о погибших в годы Великой Отечественной войны."
              color="#C62828"
            />
            <InfoCard
              title="Мемориальные доски"
              description="Доски памяти, установленные в честь героев войны и значимых событий."
              color="#1D4E89"
            />
            <InfoCard
              title="Воинские захоронения"
              description="Места захоронения воинов, павших в годы Великой Отечественной войны."
              color="#545455"
            />
          </div>

          {/* API и встраивание */}
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">API для разработчиков</h2>
            <p className="mb-6 text-white">
              Используйте наше публичное API для получения данных о памятниках и
              мемориалах Липецкой области.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-black">
                  📡 API Endpoint
                </h4>
                <code className="text-sm bg-black bg-opacity-30 px-2 py-1 rounded text-white">
                  GET /api/battle-glory-points
                </code>
                <p className="text-sm mt-2 text-black">
                  Получите все объекты Боевой Славы в JSON формате
                </p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-black">🔍 Фильтрация</h4>
                <code className="text-sm bg-black bg-opacity-30 px-2 py-1 rounded text-white">
                  ?point_type=памятник/мемориал
                </code>
                <p className="text-sm mt-2 text-black">
                  Фильтруйте объекты по типу и району
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/docs"
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
              >
                Документация и примеры
              </Link>
              <a
                href="/api/battle-glory-points"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
              >
                Попробовать API
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
