import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-2xl w-full">
        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-gray-200 font-montserrat leading-none">
            404
          </h1>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-montserrat">
          Страница не найдена
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-600 mb-10 font-montserrat max-w-md mx-auto">
          К сожалению, запрашиваемая страница не существует или была удалена.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-lg md:rounded-xl transition-colors font-medium font-montserrat text-base md:text-lg shadow-lg"
          >
            ← Вернуться на главную
          </Link>
          <Link
            href="/home"
            className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg md:rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-colors font-medium font-montserrat text-base md:text-lg"
          >
            Перейти к карте
          </Link>
        </div>

        {/* Additional Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4 font-montserrat">
            Популярные разделы:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/news"
              className="text-[#1D4E89] hover:text-[#C62828] hover:underline transition-colors font-montserrat"
            >
              Новости
            </Link>
            <Link
              href="/press-releases"
              className="text-[#1D4E89] hover:text-[#C62828] hover:underline transition-colors font-montserrat"
            >
              Пресс-релизы
            </Link>
            <Link
              href="/projects"
              className="text-[#1D4E89] hover:text-[#C62828] hover:underline transition-colors font-montserrat"
            >
              Наши проекты
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

