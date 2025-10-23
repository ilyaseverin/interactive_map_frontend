"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="w-full max-w-[1920px] mx-auto px-[16px] sm:px-[32px] md:px-[48px] lg:px-[64px] xl:px-[76px] pb-[30px] sm:pb-[40px] lg:pb-[50px]">
      <div className="text-center py-[100px]">
        <h1 className="text-[48px] font-montserrat font-bold text-black mb-[30px]">
          О центре
        </h1>
        <p className="text-[24px] font-montserrat text-black mb-[50px] max-w-[800px] mx-auto">
          Региональный центр подготовки граждан Российской Федерации к военной
          службе и военно-патриотического воспитания населения Липецкой области
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-[30px] max-w-[1000px] mx-auto">
          <Link
            href="/about/organization"
            className="bg-white rounded-[15px] p-[30px] shadow-lg hover:shadow-xl transition-shadow text-center"
          >
            <div className="w-[60px] h-[60px] bg-[#1D4E89] rounded-full mx-auto mb-[20px] flex items-center justify-center">
              <span className="text-white text-[24px]">🏛️</span>
            </div>
            <h3 className="text-[20px] font-montserrat font-medium text-black mb-[10px]">
              Об учреждении
            </h3>
            <p className="text-[16px] font-montserrat text-gray-600">
              Информация о центре, его целях и деятельности
            </p>
          </Link>

          <Link
            href="/about/management"
            className="bg-white rounded-[15px] p-[30px] shadow-lg hover:shadow-xl transition-shadow text-center"
          >
            <div className="w-[60px] h-[60px] bg-[#1D4E89] rounded-full mx-auto mb-[20px] flex items-center justify-center">
              <span className="text-white text-[24px]">👥</span>
            </div>
            <h3 className="text-[20px] font-montserrat font-medium text-black mb-[10px]">
              Руководство
            </h3>
            <p className="text-[16px] font-montserrat text-gray-600">
              Руководящий состав центра
            </p>
          </Link>

          <Link
            href="/about/team"
            className="bg-white rounded-[15px] p-[30px] shadow-lg hover:shadow-xl transition-shadow text-center"
          >
            <div className="w-[60px] h-[60px] bg-[#1D4E89] rounded-full mx-auto mb-[20px] flex items-center justify-center">
              <span className="text-white text-[24px]">👨‍👩‍👧‍👦</span>
            </div>
            <h3 className="text-[20px] font-montserrat font-medium text-black mb-[10px]">
              Команда
            </h3>
            <p className="text-[16px] font-montserrat text-gray-600">
              Наша команда специалистов
            </p>
          </Link>

          <Link
            href="/about/partners"
            className="bg-white rounded-[15px] p-[30px] shadow-lg hover:shadow-xl transition-shadow text-center"
          >
            <div className="w-[60px] h-[60px] bg-[#1D4E89] rounded-full mx-auto mb-[20px] flex items-center justify-center">
              <span className="text-white text-[24px]">🤝</span>
            </div>
            <h3 className="text-[20px] font-montserrat font-medium text-black mb-[10px]">
              Партнеры
            </h3>
            <p className="text-[16px] font-montserrat text-gray-600">
              Наши партнеры и сотрудничество
            </p>
          </Link>

          <Link
            href="/about/contacts"
            className="bg-white rounded-[15px] p-[30px] shadow-lg hover:shadow-xl transition-shadow text-center"
          >
            <div className="w-[60px] h-[60px] bg-[#1D4E89] rounded-full mx-auto mb-[20px] flex items-center justify-center">
              <span className="text-white text-[24px]">📞</span>
            </div>
            <h3 className="text-[20px] font-montserrat font-medium text-black mb-[10px]">
              Контакты
            </h3>
            <p className="text-[16px] font-montserrat text-gray-600">
              Как с нами связаться
            </p>
          </Link>

          <Link
            href="/about/brand"
            className="bg-white rounded-[15px] p-[30px] shadow-lg hover:shadow-xl transition-shadow text-center"
          >
            <div className="w-[60px] h-[60px] bg-[#1D4E89] rounded-full mx-auto mb-[20px] flex items-center justify-center">
              <span className="text-white text-[24px]">🎨</span>
            </div>
            <h3 className="text-[20px] font-montserrat font-medium text-black mb-[10px]">
              Фирменный стиль
            </h3>
            <p className="text-[16px] font-montserrat text-gray-600">
              Брендинг и визуальная идентичность
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
