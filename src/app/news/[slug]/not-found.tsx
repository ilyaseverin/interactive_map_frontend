import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Новость не найдена
        </h2>
        <p className="text-gray-600 mb-8">
          К сожалению, запрашиваемая новость не существует или была удалена.
        </p>
        <Link
          href="/news"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          ← Вернуться к новостям
        </Link>
      </div>
    </div>
  );
}
