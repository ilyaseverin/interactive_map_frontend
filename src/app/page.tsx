import InteractiveMap from "@/components/InteractiveMap";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Интерактивная карта
          </h1>
          <p className="mt-2 text-gray-600">Исследуйте точки на карте России</p>
        </div>
      </header>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <InteractiveMap height="600px" className="rounded-lg" />
        </div>

        {/* Дополнительная информация */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🗺️ Интерактивность
            </h3>
            <p className="text-gray-600 text-sm">
              Кликайте по маркерам для получения подробной информации о каждой
              точке
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🎨 Кастомизация
            </h3>
            <p className="text-gray-600 text-sm">
              Легко настраиваемые цвета, иконки и описания для каждой точки
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              📱 Адаптивность
            </h3>
            <p className="text-gray-600 text-sm">
              Карта адаптируется под любые размеры экрана и устройства
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
