"use client";

import { useState } from "react";
import BattleGloryMapWithData from "@/components/maps/BattleGloryMapWithData";
import Link from "next/link";

type FilterType =
  | null
  | "памятник/мемориал"
  | "мемориальная доска"
  | "воинское захоронение"
  | "history";

export default function BattleGloryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F1F2F3" }}>
      {/* Основной контент */}
      <main className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-[36px] lg:px-[133px] pt-[50px] md:pt-[30px] pb-[50px] md:pb-[30px]">
        {/* Контейнер контента */}
        <div className="w-full max-w-[1654px] mx-auto flex flex-col gap-[28px]">
          {/* Фильтры */}
          <div className="flex flex-wrap gap-[15px] items-center">
            <button
              onClick={() => handleFilterChange(null)}
              className={`bg-white box-border flex items-start gap-[10px] p-[15px] rounded-[10px] transition-colors ${
                activeFilter === null ? "bg-white" : "bg-white hover:bg-gray-50"
              }`}
            >
              <p className="font-montserrat font-normal leading-normal text-[16px] text-black">
                Все объекты
              </p>
            </button>

            <button
              onClick={() => handleFilterChange("памятник/мемориал")}
              className={`bg-white box-border flex items-center gap-[6px] p-[15px] rounded-[10px] transition-colors ${
                activeFilter === "памятник/мемориал"
                  ? "bg-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="w-[11px] h-[11px] rounded-full bg-red-600"></div>
              <p className="font-montserrat font-normal leading-normal text-[16px] text-black">
                Памятники
              </p>
            </button>

            <button
              onClick={() => handleFilterChange("мемориальная доска")}
              className={`bg-white box-border flex flex-col gap-[10px] items-start justify-center p-[15px] rounded-[10px] transition-colors ${
                activeFilter === "мемориальная доска"
                  ? "bg-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex gap-[6px] items-center w-full">
                <div className="w-[11px] h-[11px] rounded-full bg-blue-600"></div>
                <p className="font-montserrat font-normal leading-normal text-[16px] text-black">
                  Доски
                </p>
              </div>
            </button>

            <button
              onClick={() => handleFilterChange("воинское захоронение")}
              className={`bg-white box-border flex flex-col gap-[10px] items-start justify-center p-[15px] rounded-[10px] transition-colors ${
                activeFilter === "воинское захоронение"
                  ? "bg-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex gap-[6px] items-center w-full">
                <div className="w-[11px] h-[11px] rounded-full bg-green-600"></div>
                <p className="font-montserrat font-normal leading-normal text-[16px] text-black">
                  Захоронения
                </p>
              </div>
            </button>
          </div>

          {/* Карта */}
          {activeFilter === "history" ? (
            // Раздел истории
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                История Липецкой области в годы Великой Отечественной войны
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  Липецкая область внесла значительный вклад в победу в Великой
                  Отечественной войне. С территории области на фронт ушли тысячи
                  липчан, многие из которых не вернулись домой.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">
                  Статистика по муниципальным образованиям
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Липецк</h4>
                    <p className="text-sm text-gray-600">
                      Ушедших на фронт: данные уточняются
                    </p>
                    <p className="text-sm text-gray-600">
                      Погибших: данные уточняются
                    </p>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Елец</h4>
                    <p className="text-sm text-gray-600">
                      Ушедших на фронт: данные уточняются
                    </p>
                    <p className="text-sm text-gray-600">
                      Погибших: данные уточняются
                    </p>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Другие районы
                    </h4>
                    <p className="text-sm text-gray-600">
                      Данные собираются и будут добавлены позднее
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600 italic">
                    Раздел находится в разработке. Здесь будет представлена
                    подробная информация об истории Липецкой области в годы
                    Великой Отечественной войны с детальной статистикой по
                    муниципальным образованиям.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Карта
            <div className="bg-white rounded-[10px] overflow-hidden w-full h-[830px]">
              <BattleGloryMapWithData
                height="830px"
                className="rounded-[10px]"
                filterType={activeFilter}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}

          {/* Информационные карточки */}
          {activeFilter !== "history" && (
            <>
              <div className="flex flex-col md:flex-row flex-wrap gap-[15px] items-stretch">
                <div className="bg-white box-border flex flex-col gap-[7px] items-start p-[30px] rounded-[10px] w-full md:w-[calc((100%-30px)/3)]">
                  <div className="flex gap-[10px] items-center">
                    <div className="w-[15px] h-[15px] rounded-full bg-red-600"></div>
                    <p className="font-montserrat font-bold leading-normal text-[16px] text-black">
                      Памятники и мемориалы
                    </p>
                  </div>
                  <p className="font-montserrat font-normal leading-normal text-[16px] text-black whitespace-pre-wrap">
                    Объекты, увековечивающие память о погибших в годы Великой
                    Отечественной войны.
                  </p>
                </div>

                <div className="bg-white box-border flex flex-col gap-[7px] items-start p-[30px] rounded-[10px] w-full md:w-[calc((100%-30px)/3)]">
                  <div className="flex gap-[10px] items-center">
                    <div className="w-[15px] h-[15px] rounded-full bg-blue-600"></div>
                    <p className="font-montserrat font-bold leading-normal text-[16px] text-black">
                      Мемориальные доски
                    </p>
                  </div>
                  <p className="font-montserrat font-normal leading-normal text-[16px] text-black whitespace-pre-wrap">
                    Доски памяти, установленные в честь героев войны и значимых
                    событий.
                  </p>
                </div>

                <div className="bg-white box-border flex flex-col gap-[7px] items-start p-[30px] rounded-[10px] w-full md:w-[calc((100%-30px)/3)] overflow-hidden">
                  <div className="flex gap-[10px] items-center">
                    <div className="w-[15px] h-[15px] rounded-full bg-green-600"></div>
                    <p className="font-montserrat font-bold leading-normal text-[16px] text-black">
                      Воинские захоронения
                    </p>
                  </div>
                  <p className="font-montserrat font-normal leading-normal text-[16px] text-black whitespace-pre-wrap">
                    Места захоронения воинов, павших в годы Великой
                    Отечественной войны.
                  </p>
                </div>
              </div>

              {/* API и встраивание */}
              <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg shadow-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">
                  API для разработчиков
                </h2>
                <p className="mb-6 text-white">
                  Используйте наше публичное API для получения данных о
                  памятниках и мемориалах Липецкой области.
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
                    <h4 className="font-semibold mb-2 text-black">
                      🔍 Фильтрация
                    </h4>
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
            </>
          )}
        </div>
      </main>
    </div>
  );
}
