"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

type SubMenuItem = {
  label: string;
  href: string;
};

type MenuItem = {
  label: string;
  href: string;
  subMenu?: SubMenuItem[];
  twoColumns?: boolean; // Для меню с двумя колонками
};

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      label: "Новости",
      href: "/news",
      subMenu: [
        { label: "Главные", href: "/news?category=main" },
        { label: "Региональные", href: "/news?category=regional" },
      ],
    },
    { label: "Карта", href: "/battle-glory" },
    {
      label: "О центре",
      href: "/about",
      twoColumns: true,
      subMenu: [
        { label: "Об учреждении", href: "/about/organization" },
        { label: "Руководство", href: "/about/management" },
        { label: "Команда", href: "/about/team" },
        { label: "Партнеры", href: "/about/partners" },
        { label: "Контакты", href: "/about/contacts" },
        { label: "Фирменный стиль", href: "/about/brand" },
        { label: "Антимонопольный комплекс", href: "/documents/antimonopoly" },
        {
          label: "Антикоррупционная деятельность",
          href: "/documents/anticorruption",
        },
        {
          label: "Противодействие терроризму",
          href: "/documents/counterterrorism",
        },
        {
          label: "Антинаркотическая кампания",
          href: "/documents/antidrug",
        },
      ],
    },
    { label: "Наши проекты", href: "/projects" },
    {
      label: "Для СМИ",
      href: "/media",
      subMenu: [
        { label: "Пресс-релизы", href: "/media/press-releases" },
        { label: "Фотоальбомы", href: "/media/photo-albums" },
      ],
    },
    { label: "Контакты", href: "/contacts" },
    { label: "Документы", href: "/documents" },
  ];

  // Меню для мобильной версии - у "О центре" только первые 6 пунктов
  const mobileMenuItems: MenuItem[] = menuItems.map((item) => {
    if (item.label === "О центре" && item.subMenu) {
      return {
        ...item,
        subMenu: item.subMenu.slice(0, 6), // Только первые 6 пунктов
      };
    }
    return item;
  });

  // Дополнительные пункты для мобильной версии (вынесены из "О центре")
  const mobileExtraItems = [
    { label: "Антимонопольный комплекс", href: "/documents/antimonopoly" },
    {
      label: "Противодействие терроризму",
      href: "/documents/counterterrorism",
    },
    { label: "Антинаркотическая кампания", href: "/documents/antidrug" },
    {
      label: "Антикоррупционная деятельность",
      href: "/documents/anticorruption",
    },
  ];

  return (
    <header
      style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
      className="border-none"
    >
      {/* Desktop версия (≥1024px) - с фиксированными отступами 70px */}
      <div className="hidden lg:block">
        <div
          className="w-full px-[70px] mx-auto"
          style={{ minHeight: "clamp(140px, 15vh, 174px)" }}
        >
          <div
            className="flex items-center justify-between h-full"
            style={{
              gap: "clamp(8px, 1vw, 16px)",
              paddingTop: "clamp(16px, 2vh, 34px)",
              paddingBottom: "clamp(16px, 2vh, 34px)",
            }}
          >
            {/* Левая часть: Логотип и название */}
            <div
              className="flex items-center flex-shrink-0"
              style={{ gap: "clamp(12px, 1.2vw, 20px)" }}
            >
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/images/logo-392dd2.png"
                  alt="Патриот Центр 48"
                  width={122}
                  height={112}
                  className="object-contain"
                  style={{
                    width: "clamp(70px, 7vw, 122px)",
                    height: "auto",
                  }}
                />
              </Link>
              <Link
                href="/"
                className="font-normal font-montserrat text-black whitespace-nowrap"
                style={{
                  fontSize: "clamp(20px, 2.5vw, 40px)",
                  lineHeight: "1.2",
                }}
              >
                Патриот Центр 48
              </Link>
            </div>

            {/* Центральная часть: Навигация с переносом */}
            <nav className="flex-1 flex justify-center min-w-0">
              <ul
                className="flex flex-wrap items-center justify-center gap-y-2"
                style={{ columnGap: "clamp(10px, 1.5vw, 24px)" }}
              >
                {menuItems.map((item) => (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() =>
                      item.subMenu && setActiveDropdown(item.label)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={`text-[18px] font-normal font-montserrat leading-[32px] whitespace-nowrap block ${
                        item.subMenu ? "px-[15px] py-[2px]" : ""
                      } ${
                        item.subMenu && activeDropdown === item.label
                          ? "text-white rounded-t-[5px]"
                          : "text-black hover:text-gray-600"
                      }`}
                      style={
                        item.subMenu && activeDropdown === item.label
                          ? { backgroundColor: "#1D4E89" }
                          : {}
                      }
                    >
                      {item.label}
                    </Link>

                    {/* Всплывающее подменю */}
                    {item.subMenu && activeDropdown === item.label && (
                      <div
                        className={`absolute top-full left-0 z-50 rounded-b-[5px] rounded-tr-[5px] ${
                          item.twoColumns
                            ? "grid grid-cols-2 gap-x-[30px] px-[15px] py-[19px]"
                            : "px-[15px] py-[19px]"
                        }`}
                        style={{
                          backgroundColor: "#1D4E89",
                          minWidth: item.twoColumns ? "449px" : "217px",
                        }}
                      >
                        {item.twoColumns ? (
                          <>
                            {/* Первая колонка (первые 6 элементов) */}
                            <ul className="space-y-[16px]">
                              {item.subMenu.slice(0, 6).map((subItem) => (
                                <li key={subItem.href}>
                                  <Link
                                    href={subItem.href}
                                    className="block font-montserrat font-normal text-[16px] leading-[20px] text-white hover:underline"
                                  >
                                    {subItem.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            {/* Вторая колонка (элементы с 7 по 10) */}
                            <ul className="space-y-[16px]">
                              {item.subMenu.slice(6).map((subItem) => (
                                <li key={subItem.href}>
                                  <Link
                                    href={subItem.href}
                                    className="block font-montserrat font-normal text-[16px] leading-[20px] text-white hover:underline"
                                  >
                                    {subItem.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          /* Одна колонка для остальных пунктов */
                          <ul className="space-y-[16px]">
                            {item.subMenu.map((subItem) => (
                              <li key={subItem.href}>
                                <Link
                                  href={subItem.href}
                                  className="block font-montserrat font-normal text-[18px] leading-[22px] text-white hover:underline"
                                >
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Правая часть: Партнеры и поиск */}
            <div
              className="flex items-center flex-shrink-0"
              style={{ gap: "clamp(16px, 2vw, 40px)" }}
            >
              <Link href="/partners" className="flex-shrink-0">
                <Image
                  src="/images/partners.svg"
                  alt="Партнеры"
                  width={240}
                  height={105}
                  className="object-contain"
                  style={{
                    width: "clamp(140px, 14vw, 240px)",
                    height: "auto",
                  }}
                />
              </Link>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex-shrink-0 hover:opacity-70 transition-opacity"
                aria-label="Поиск"
              >
                <Image
                  src="/images/search-icon.svg"
                  alt="Поиск"
                  width={46}
                  height={45}
                  className="object-contain"
                  style={{
                    width: "clamp(32px, 3vw, 46px)",
                    height: "auto",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Мобильная и планшетная версия для экранов <1024px */}
      <div className="block lg:hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 py-[18px] sm:py-4 md:py-6">
          <div className="flex items-center justify-between">
            {/* Логотип и название */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 md:gap-4"
            >
              <Image
                src="/images/logo-392dd2.png"
                alt="Патриот Центр 48"
                width={49}
                height={45}
                className="object-contain sm:w-[60px] sm:h-[55px] md:w-[80px] md:h-[73px]"
              />
              <h1 className="text-sm sm:text-base md:text-xl font-normal font-montserrat text-black whitespace-nowrap">
                Патриот Центр 48
              </h1>
            </Link>

            {/* Бургер меню */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-[27px] h-[16px] hover:opacity-70 transition-opacity flex items-center justify-center"
              aria-label="Меню"
            >
              <div className="flex flex-col gap-[5px]">
                <div className="w-[27px] h-[3px] rounded-[3px] bg-black"></div>
                <div className="w-[27px] h-[3px] rounded-[3px] bg-black"></div>
                <div className="w-[27px] h-[3px] rounded-[3px] bg-black"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню - вынесено из контейнера для полной ширины */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        menuItems={mobileMenuItems}
        mobileExtraItems={mobileExtraItems}
      />

      {/* Search Bar */}
      {searchOpen && (
        <div className="border-t border-gray-200">
          <div className="w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-[70px] py-4">
            <input
              type="text"
              placeholder="Поиск..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
