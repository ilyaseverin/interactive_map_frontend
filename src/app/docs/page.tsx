"use client";

import { useState, useEffect } from "react";

export default function DocsPage() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  const [copied, setCopied] = useState(false);
  const [embedCode, setEmbedCode] = useState({
    lng: "39.5703",
    lat: "52.6094",
    zoom: "8",
    width: "100%",
    height: "600",
    clustering: true,
  });

  const generateEmbedCode = () => {
    const params = new URLSearchParams({
      lng: embedCode.lng,
      lat: embedCode.lat,
      zoom: embedCode.zoom,
      clustering: embedCode.clustering.toString(),
    });

    return `<iframe
  src="${origin || "https://your-domain.com"}/embed?${params.toString()}"
  width="${embedCode.width}"
  height="${embedCode.height}"
  frameborder="0"
  style="border: 0;"
  allowfullscreen
></iframe>`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback для старых браузеров или HTTP
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Ошибка копирования:", err);
      // Показываем уведомление пользователю
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      // Дополнительно показываем код в alert как fallback
      alert("Код для копирования:\n\n" + text);
    }
  };

  const copyEmbedCode = () => copyToClipboard(generateEmbedCode());
  const copyApiCode = () =>
    copyToClipboard(`// Пример запроса
fetch('/api/battle-glory-points')
  .then(res => res.json())
  .then(points => console.log(points));`);
  const copyApiIdCode = () =>
    copyToClipboard(`// Пример запроса с фильтрацией
fetch('/api/battle-glory-points?point_type=памятник/мемориал')
  .then(res => res.json())
  .then(points => console.log(points));`);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Документация карты Боевой Славы
          </h1>
          <p className="mt-2 text-gray-600">
            API и встраивание карты памятников и мемориалов Липецкой области
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Генератор кода встраивания */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🛠️ Генератор кода встраивания
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Форма настроек */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Долгота (lng)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={embedCode.lng}
                  onChange={(e) =>
                    setEmbedCode({ ...embedCode, lng: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Широта (lat)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={embedCode.lat}
                  onChange={(e) =>
                    setEmbedCode({ ...embedCode, lat: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Зум (zoom)
                </label>
                <input
                  type="number"
                  min="0"
                  max="18"
                  value={embedCode.zoom}
                  onChange={(e) =>
                    setEmbedCode({ ...embedCode, zoom: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ширина
                </label>
                <input
                  type="text"
                  value={embedCode.width}
                  onChange={(e) =>
                    setEmbedCode({ ...embedCode, width: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="100%, 800px, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Высота
                </label>
                <input
                  type="text"
                  value={embedCode.height}
                  onChange={(e) =>
                    setEmbedCode({ ...embedCode, height: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="600px, 100vh, etc."
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="clustering"
                  checked={embedCode.clustering}
                  onChange={(e) =>
                    setEmbedCode({
                      ...embedCode,
                      clustering: e.target.checked,
                    })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="clustering"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Включить кластеризацию точек
                </label>
              </div>
            </div>

            {/* Код для встраивания */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Код для встраивания
              </label>
              <div className="relative">
                <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto text-sm">
                  <code>{generateEmbedCode()}</code>
                </pre>
                <button
                  onClick={copyEmbedCode}
                  className={`absolute top-2 right-2 px-3 py-1 rounded text-sm transition-colors ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                  disabled={copied}
                >
                  {copied ? "✓ Скопировано" : "Копировать"}
                </button>
              </div>
            </div>
          </div>

          {/* Предпросмотр */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Предпросмотр
            </h3>
            <div
              className="border border-gray-300 rounded-lg overflow-hidden"
              style={{ height: "400px" }}
            >
              <iframe
                src={`/embed?lng=${embedCode.lng}&lat=${embedCode.lat}&zoom=${embedCode.zoom}&clustering=${embedCode.clustering}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                title="Предпросмотр карты"
              />
            </div>
          </div>
        </div>

        {/* Быстрые примеры */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            📋 Быстрые примеры
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Липецк */}
            <button
              onClick={() =>
                setEmbedCode({
                  lng: "39.5703",
                  lat: "52.6094",
                  zoom: "12",
                  width: "100%",
                  height: "600",
                  clustering: true,
                })
              }
              className="p-4 border border-gray-300 rounded-lg hover:border-red-500 hover:shadow-md transition-all text-left"
            >
              <h3 className="font-semibold text-gray-900">Липецк</h3>
              <p className="text-sm text-gray-600 mt-1">
                Центр Липецкой области
              </p>
            </button>

            {/* Елец */}
            <button
              onClick={() =>
                setEmbedCode({
                  lng: "38.491781",
                  lat: "52.626138",
                  zoom: "12",
                  width: "100%",
                  height: "600",
                  clustering: true,
                })
              }
              className="p-4 border border-gray-300 rounded-lg hover:border-red-500 hover:shadow-md transition-all text-left"
            >
              <h3 className="font-semibold text-gray-900">Елец</h3>
              <p className="text-sm text-gray-600 mt-1">Город воинской славы</p>
            </button>

            {/* Вся область */}
            <button
              onClick={() =>
                setEmbedCode({
                  lng: "39.5703",
                  lat: "52.6094",
                  zoom: "8",
                  width: "100%",
                  height: "600",
                  clustering: true,
                })
              }
              className="p-4 border border-gray-300 rounded-lg hover:border-red-500 hover:shadow-md transition-all text-left"
            >
              <h3 className="font-semibold text-gray-900">Липецкая область</h3>
              <p className="text-sm text-gray-600 mt-1">
                Обзорная карта области
              </p>
            </button>
          </div>
        </div>

        {/* API Documentation */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🔌 API Endpoints
          </h2>

          <div className="space-y-6">
            {/* GET all points */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                  GET
                </span>
                <code className="text-sm text-gray-800">
                  /api/battle-glory-points
                </code>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Получить все объекты Боевой Славы
              </p>
              <div className="relative">
                <div className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto">
                  <pre className="text-xs">
                    {`// Пример запроса
fetch('/api/battle-glory-points')
  .then(res => res.json())
  .then(points => console.log(points));

// Ответ
{
  "data": [
    {
      "id": 20,
      "title": "Мемориальный комплекс на пл. Революции",
      "point_type": "памятник/мемориал",
      "municipality": "Елец",
      "coordinates": {
        "lat": 52.626138,
        "lng": 38.491781
      },
      ...
    }
  ],
  "meta": {
    "pagination": {
      "total": 317
    }
  }
}`}
                  </pre>
                </div>
                <button
                  onClick={copyApiCode}
                  className={`absolute top-2 right-2 px-3 py-1 rounded text-sm transition-colors ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                  disabled={copied}
                >
                  {copied ? "✓ Скопировано" : "Копировать"}
                </button>
              </div>
            </div>

            {/* GET single point */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                  GET
                </span>
                <code className="text-sm text-gray-800">
                  /api/map-points?id=1
                </code>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Получить конкретную точку по ID
              </p>
              <div className="relative">
                <div className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto">
                  <pre className="text-xs">
                    {`// Пример запроса
fetch('/api/map-points?id=1')
  .then(res => res.json())
  .then(point => console.log(point));

// Ответ
{
  "id": "1",
  "name": "Москва",
  "coordinates": [37.6173, 55.7558],
  ...
}`}
                  </pre>
                </div>
                <button
                  onClick={copyApiIdCode}
                  className={`absolute top-2 right-2 px-3 py-1 rounded text-sm transition-colors ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                  disabled={copied}
                >
                  {copied ? "✓ Скопировано" : "Копировать"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl mb-3">🗺️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Кластеризация
            </h3>
            <p className="text-gray-600 text-sm">
              Автоматическое объединение близко расположенных точек при
              отдалении для улучшения производительности
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Производительность
            </h3>
            <p className="text-gray-600 text-sm">
              Оптимизированная отрисовка и плавная анимация даже с большим
              количеством точек
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Кастомизация
            </h3>
            <p className="text-gray-600 text-sm">
              Настраиваемые цвета, размеры, позиция и уровень зуммирования карты
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
