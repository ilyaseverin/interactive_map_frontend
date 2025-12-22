"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="w-full max-w-[1920px] mx-auto px-[19px] sm:px-[32px] md:px-[48px] lg:px-[64px] xl:px-[76px] pb-[30px] sm:pb-[40px] lg:pb-[50px]">
      <div className="text-center pt-[15px] sm:pt-[20px] md:pt-[25px] lg:pt-[30px] pb-[20px] sm:pb-[25px] md:pb-[30px] lg:pb-[40px]">
        <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-montserrat font-bold text-black mb-[10px] sm:mb-[15px] md:mb-[20px] lg:mb-[25px]">
          О центре
        </h1>
        <p className="text-[14px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-montserrat text-black mb-[20px] sm:mb-[25px] md:mb-[30px] lg:mb-[35px] max-w-[800px] mx-auto px-[10px]">
          Региональный центр подготовки граждан Российской Федерации к военной
          службе и военно-патриотического воспитания населения Липецкой области
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[15px] sm:gap-[20px] md:gap-[25px] lg:gap-[30px] max-w-[1000px] mx-auto">
          <Link
            href="/about/organization"
            className="bg-white rounded-[10px] sm:rounded-[15px] p-[20px] sm:p-[25px] md:p-[30px] shadow-lg hover:shadow-xl transition-shadow text-center"
          >
            <div className="w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] md:w-[60px] md:h-[60px] bg-[#1D4E89] rounded-full mx-auto mb-[15px] sm:mb-[18px] md:mb-[20px] flex items-center justify-center">
              <span className="text-white text-[20px] sm:text-[22px] md:text-[24px]">🏛️</span>
            </div>
            <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-montserrat font-medium text-black mb-[8px] sm:mb-[10px]">
              Об учреждении
            </h3>
            <p className="text-[12px] sm:text-[14px] md:text-[16px] font-montserrat text-gray-600">
              Информация о центре, его целях и деятельности
            </p>
          </Link>

          <Link
            href="/about/management"
            className="bg-white rounded-[10px] sm:rounded-[15px] p-[20px] sm:p-[25px] md:p-[30px] shadow-lg hover:shadow-xl transition-shadow text-center"
          >
            <div className="w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] md:w-[60px] md:h-[60px] bg-[#1D4E89] rounded-full mx-auto mb-[15px] sm:mb-[18px] md:mb-[20px] flex items-center justify-center">
              <span className="text-white text-[20px] sm:text-[22px] md:text-[24px]">👥</span>
            </div>
            <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-montserrat font-medium text-black mb-[8px] sm:mb-[10px]">
              Руководство
            </h3>
            <p className="text-[12px] sm:text-[14px] md:text-[16px] font-montserrat text-gray-600">
              Руководящий состав центра
            </p>
          </Link>

          <Link
            href="/about/team"
            className="bg-white rounded-[10px] sm:rounded-[15px] p-[20px] sm:p-[25px] md:p-[30px] shadow-lg hover:shadow-xl transition-shadow text-center"
          >
            <div className="w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] md:w-[60px] md:h-[60px] bg-[#1D4E89] rounded-full mx-auto mb-[15px] sm:mb-[18px] md:mb-[20px] flex items-center justify-center">
              <span className="text-white text-[20px] sm:text-[22px] md:text-[24px]">👨‍👩‍👧‍👦</span>
            </div>
            <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-montserrat font-medium text-black mb-[8px] sm:mb-[10px]">
              Команда
            </h3>
            <p className="text-[12px] sm:text-[14px] md:text-[16px] font-montserrat text-gray-600">
              Наша команда специалистов
            </p>
          </Link>

          <Link
            href="/about/partners"
            className="bg-white rounded-[10px] sm:rounded-[15px] p-[20px] sm:p-[25px] md:p-[30px] shadow-lg hover:shadow-xl transition-shadow text-center"
          >
            <div className="w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] md:w-[60px] md:h-[60px] bg-[#1D4E89] rounded-full mx-auto mb-[15px] sm:mb-[18px] md:mb-[20px] flex items-center justify-center">
              <span className="text-white text-[20px] sm:text-[22px] md:text-[24px]">🤝</span>
            </div>
            <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-montserrat font-medium text-black mb-[8px] sm:mb-[10px]">
              Партнеры
            </h3>
            <p className="text-[12px] sm:text-[14px] md:text-[16px] font-montserrat text-gray-600">
              Наши партнеры и сотрудничество
            </p>
          </Link>

          <Link
            href="/about/contacts"
            className="bg-white rounded-[10px] sm:rounded-[15px] p-[20px] sm:p-[25px] md:p-[30px] shadow-lg hover:shadow-xl transition-shadow text-center"
          >
            <div className="w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] md:w-[60px] md:h-[60px] bg-[#1D4E89] rounded-full mx-auto mb-[15px] sm:mb-[18px] md:mb-[20px] flex items-center justify-center">
              <span className="text-white text-[20px] sm:text-[22px] md:text-[24px]">📞</span>
            </div>
            <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-montserrat font-medium text-black mb-[8px] sm:mb-[10px]">
              Контакты
            </h3>
            <p className="text-[12px] sm:text-[14px] md:text-[16px] font-montserrat text-gray-600">
              Как с нами связаться
            </p>
          </Link>

          <Link
            href="/about/brand"
            className="bg-white rounded-[10px] sm:rounded-[15px] p-[20px] sm:p-[25px] md:p-[30px] shadow-lg hover:shadow-xl transition-shadow text-center"
          >
            <div className="w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] md:w-[60px] md:h-[60px] bg-[#1D4E89] rounded-full mx-auto mb-[15px] sm:mb-[18px] md:mb-[20px] flex items-center justify-center">
              <span className="text-white text-[20px] sm:text-[22px] md:text-[24px]">🎨</span>
            </div>
            <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-montserrat font-medium text-black mb-[8px] sm:mb-[10px]">
              Фирменный стиль
            </h3>
            <p className="text-[12px] sm:text-[14px] md:text-[16px] font-montserrat text-gray-600">
              Брендинг и визуальная идентичность
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
