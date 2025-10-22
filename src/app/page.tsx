"use client";

import { useState } from "react";
import BattleGloryMapWithData from "@/components/maps/BattleGloryMapWithData";
import { BattleGloryFilterType } from "@/types/map";
import Link from "next/link";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<BattleGloryFilterType>(null);

  const handleFilterChange = (filter: BattleGloryFilterType) => {
    setActiveFilter(filter);
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
            <div className="flex space-x-4">
              <Link
                href="/news"
                className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                📰 Новости
              </Link>
              <Link
                href="/docs"
                className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                📚 Документация
              </Link>
              <Link
                href="/embed"
                className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                🗺️ Встраивание
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <BattleGloryMapWithData
            height="700px"
            className="rounded-lg"
            filterType={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Дополнительная информация */}
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
      </main>
    </div>
  );
}
