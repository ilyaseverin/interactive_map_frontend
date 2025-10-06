import MapWithData from "@/components/MapWithData";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Интерактивная карта с кластеризацией
              </h1>
              <p className="mt-2 text-gray-600">
                Исследуйте достопримечательности Москвы и других городов России
                с автоматическим кластерингом
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/docs"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                📚 Документация
              </Link>
              <Link
                href="/embed"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
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
          <MapWithData height="600px" className="rounded-lg" />
        </div>

        {/* Дополнительная информация */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🎯 Кластеризация точек
            </h3>
            <p className="text-gray-600 text-sm">
              При отдалении карты близкие достопримечательности автоматически
              объединяются в кластеры с числом. Кликните на кластер для
              раскрытия отдельных точек.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🔌 Встраивание на сайты
            </h3>
            <p className="text-gray-600 text-sm">
              Легко встраивайте карту на любой сайт с помощью iframe. Публичное
              API для доступа к данным карты.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🎨 Кастомизация
            </h3>
            <p className="text-gray-600 text-sm">
              Настраиваемые цвета, размеры, начальная позиция и уровень зума.
              Включение/отключение кластеризации.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ⚡ Производительность
            </h3>
            <p className="text-gray-600 text-sm">
              Оптимизированная отрисовка для работы с большим количеством точек.
              Плавная анимация и быстрая загрузка.
            </p>
          </div>
        </div>

        {/* API и встраивание */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Встройте карту на свой сайт
          </h2>
          <p className="mb-6 text-white">
            Используйте наше публичное API и систему встраивания для интеграции
            интерактивной карты с кластеризацией на любой веб-ресурс.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-black">📡 API Endpoint</h4>
              <code className="text-sm bg-black bg-opacity-30 px-2 py-1 rounded">
                GET /api/map-points
              </code>
              <p className="text-sm mt-2 text-black">
                Получите все точки карты в JSON формате
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-black">🔗 Встраивание</h4>
              <code className="text-sm bg-black bg-opacity-30 px-2 py-1 rounded">
                /embed?lng=X&lat=Y&zoom=Z
              </code>
              <p className="text-sm mt-2 text-black">
                Встройте карту с настраиваемыми параметрами
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/docs"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Документация и примеры
            </Link>
            <a
              href="/api/map-points"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Попробовать API
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
