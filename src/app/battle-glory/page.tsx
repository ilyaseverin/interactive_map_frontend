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
  const [showMenu, setShowMenu] = useState(false);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setShowMenu(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <header className="bg-gradient-to-r from-red-800 to-red-600 shadow-lg border-b border-red-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Карта Боевой славы Липецкой области
              </h1>
              <p className="mt-2 text-red-100">
                Памятники, мемориалы и места воинской славы времен Великой
                Отечественной войны
              </p>
            </div>
            <Link
              href="/home"
              className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold"
            >
              ← На главную
            </Link>
          </div>
        </div>
      </header>

      {/* Меню с подразделами */}
      <div className="bg-white shadow-md border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap gap-1 py-2">
            {/* Главное меню с подразделами при наведении */}
            <div
              className="relative"
              onMouseEnter={() => setShowMenu(true)}
              onMouseLeave={() => setShowMenu(false)}
            >
              <button
                className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                  activeFilter === null
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => handleFilterChange(null)}
              >
                Все объекты
              </button>

              {/* Выпадающее меню */}
              {showMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[280px] overflow-hidden">
                  <button
                    onClick={() => handleFilterChange("history")}
                    className={`w-full text-left px-4 py-3 transition-colors border-b ${
                      activeFilter === "history"
                        ? "bg-red-50 text-red-700"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-semibold text-sm">
                      📜 История в годы ВОВ
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      История Липецкой области, статистика по муниципальным
                      образованиям
                    </div>
                  </button>

                  <button
                    onClick={() => handleFilterChange("памятник/мемориал")}
                    className={`w-full text-left px-4 py-3 transition-colors border-b ${
                      activeFilter === "памятник/мемориал"
                        ? "bg-red-50 text-red-700"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-semibold text-sm flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-600"></span>
                      Памятники и мемориалы
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Все памятники и мемориалы на территории области
                    </div>
                  </button>

                  <button
                    onClick={() => handleFilterChange("мемориальная доска")}
                    className={`w-full text-left px-4 py-3 transition-colors border-b ${
                      activeFilter === "мемориальная доска"
                        ? "bg-red-50 text-red-700"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-semibold text-sm flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                      Мемориальные доски
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Все мемориальные доски на территории области
                    </div>
                  </button>

                  <button
                    onClick={() => handleFilterChange("воинское захоронение")}
                    className={`w-full text-left px-4 py-3 transition-colors ${
                      activeFilter === "воинское захоронение"
                        ? "bg-red-50 text-red-700"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-semibold text-sm flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-green-600"></span>
                      Воинские захоронения
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Все воинские захоронения на территории области
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Быстрые фильтры */}
            <button
              onClick={() => handleFilterChange("памятник/мемориал")}
              className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                activeFilter === "памятник/мемориал"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-600"></span>
                Памятники
              </span>
            </button>

            <button
              onClick={() => handleFilterChange("мемориальная доска")}
              className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                activeFilter === "мемориальная доска"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                Доски
              </span>
            </button>

            <button
              onClick={() => handleFilterChange("воинское захоронение")}
              className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                activeFilter === "воинское захоронение"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-600"></span>
                Захоронения
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <BattleGloryMapWithData
              height="700px"
              className="rounded-lg"
              filterType={activeFilter}
            />
          </div>
        )}

        {/* Дополнительная информация */}
        {activeFilter !== "history" && (
          <>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-600"></span>
                  Памятники и мемориалы
                </h3>
                <p className="text-gray-600 text-sm">
                  Объекты, увековечивающие память о погибших в годы Великой
                  Отечественной войны.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-600"></span>
                  Мемориальные доски
                </h3>
                <p className="text-gray-600 text-sm">
                  Доски памяти, установленные в честь героев войны и значимых
                  событий.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-green-600"></span>
                  Воинские захоронения
                </h3>
                <p className="text-gray-600 text-sm">
                  Места захоронения воинов, павших в годы Великой Отечественной
                  войны.
                </p>
              </div>
            </div>

            {/* API и встраивание */}
            <div className="mt-8 bg-gradient-to-r from-red-600 to-red-800 rounded-lg shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">API для разработчиков</h2>
              <p className="mb-6 text-white">
                Используйте наше публичное API для получения данных о памятниках и
                мемориалах Липецкой области.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-black">📡 API Endpoint</h4>
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
          </>
        )}
      </main>
    </div>
  );
}
