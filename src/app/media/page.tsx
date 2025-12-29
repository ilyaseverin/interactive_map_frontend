"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BackButton } from "@/components/buttons";

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      {/* Основной контент */}
      <main className="w-full max-w-[1920px] mx-auto pt-[15px] md:pt-[20px] lg:pt-[40px]">
        {/* Хлебные крошки */}
        <Breadcrumbs
          items={[{ label: "Главная", href: "/home" }, { label: "Для СМИ" }]}
          className="px-[19px] md:px-[34px] lg:px-[69px] mb-[15px] md:mb-[20px] lg:mb-[27px]"
        />

        {/* Заголовок и Кнопка Назад */}
        <div className="px-[19px] md:px-[34px] lg:px-[69px] flex flex-col md:flex-row md:items-start md:justify-between mb-[10px] md:mb-[20px] lg:mb-[27px] relative">
          {/* Заголовок */}
          <h1 className="text-[20px] md:text-[30px] lg:text-[40px] font-bold font-montserrat text-black leading-[1.219] mb-0 md:mb-0">
            Для СМИ
          </h1>

          {/* Кнопка Назад */}
          <div className="absolute top-1/2 -translate-y-1/2 right-[19px] md:static md:translate-y-0">
            <BackButton href="/home" variant="red" />
          </div>
        </div>

        {/* Описание */}
        <div className="px-[19px] md:px-[34px] lg:px-[69px] mb-[30px] md:mb-[40px] lg:mb-[50px]">
          <p className="text-[14px] md:text-[18px] lg:text-[20px] font-montserrat text-black max-w-[800px]">
            Информационные материалы для средств массовой информации:
            пресс-релизы и фотоальбомы о деятельности центра.
          </p>
        </div>

        {/* Карточки разделов */}
        <div className="px-[19px] md:px-[34px] lg:px-[69px] pb-[60px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] md:gap-[25px] lg:gap-[30px] max-w-[800px]">
            <Link
              href="/press-releases"
              className="bg-white rounded-[10px] md:rounded-[15px] p-[25px] md:p-[30px] lg:p-[40px] shadow-lg hover:shadow-xl transition-shadow text-center group"
            >
              <div className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] bg-[#C62828] rounded-full mx-auto mb-[20px] md:mb-[25px] flex items-center justify-center group-hover:bg-[#B71C1C] transition-colors">
                <span className="text-white text-[28px] md:text-[32px] lg:text-[36px]">
                  📰
                </span>
              </div>
              <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-montserrat font-bold text-black mb-[10px] md:mb-[12px]">
                Пресс-релизы
              </h3>
              <p className="text-[14px] md:text-[16px] font-montserrat text-gray-600">
                Официальные пресс-релизы и новости для средств массовой
                информации
              </p>
            </Link>

            <Link
              href="/photo-albums?source=press"
              className="bg-white rounded-[10px] md:rounded-[15px] p-[25px] md:p-[30px] lg:p-[40px] shadow-lg hover:shadow-xl transition-shadow text-center group"
            >
              <div className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] bg-[#C62828] rounded-full mx-auto mb-[20px] md:mb-[25px] flex items-center justify-center group-hover:bg-[#B71C1C] transition-colors">
                <span className="text-white text-[28px] md:text-[32px] lg:text-[36px]">
                  📸
                </span>
              </div>
              <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-montserrat font-bold text-black mb-[10px] md:mb-[12px]">
                Фотоальбомы
              </h3>
              <p className="text-[14px] md:text-[16px] font-montserrat text-gray-600">
                Фотоматериалы мероприятий и деятельности центра
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
