"use client";

import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import Logo from "./header/Logo";
import SearchButton from "./header/SearchButton";
import BurgerButton from "./header/BurgerButton";
import PartnersLink from "./header/PartnersLink";
import DropdownMenu, { type SubMenuItem } from "./header/DropdownMenu";

type MenuItem = {
  label: string;
  href: string;
  subMenu?: SubMenuItem[];
  twoColumns?: boolean;
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
      {/* Desktop версия (≥1280px) - с фиксированными отступами 70px */}
      <div className="hidden xl:block">
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
            <div className="flex-shrink-0">
              <Logo
                logoSize={{ width: 122, height: 112 }}
                fontSize="clamp(20px, 2.5vw, 40px)"
                gap="clamp(12px, 1.2vw, 20px)"
              />
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
                      <DropdownMenu
                        subMenu={item.subMenu}
                        twoColumns={item.twoColumns}
                      />
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
              <PartnersLink size={{ width: 240, height: 105 }} />
              <SearchButton
                onClick={() => setSearchOpen(!searchOpen)}
                size={{ width: 46, height: 45 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Версия для 1024px - упрощенный хедер с бургером */}
      <div className="hidden lg:block xl:hidden">
        <div className="w-full px-[60px] mx-auto" style={{ height: "158px" }}>
          <div className="flex items-center justify-between h-full">
            <Logo
              logoSize={{ width: 98, height: 90 }}
              fontSize="24px"
              gap="20px"
              lineHeight="32px"
            />

            <div className="flex items-center gap-[41px]">
              <PartnersLink size={{ width: 187, height: 82 }} />
              <SearchButton
                onClick={() => setSearchOpen(!searchOpen)}
                size={{ width: 35, height: 34 }}
              />
              <BurgerButton
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                lineWidth={37}
                lineHeight={4}
                gap={11}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Версия для планшетов 768px */}
      <div className="hidden md:block lg:hidden">
        <div className="w-full px-[35px] mx-auto" style={{ height: "100px" }}>
          <div className="flex items-center justify-between h-full">
            <Logo
              logoSize={{ width: 63, height: 58 }}
              fontSize="20px"
              gap="16px"
              lineHeight="32px"
            />

            <div className="flex items-center gap-[43px]">
              <SearchButton
                onClick={() => setSearchOpen(!searchOpen)}
                size={{ width: 32, height: 31 }}
              />
              <BurgerButton
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                lineWidth={37}
                lineHeight={4}
                gap={11}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Мобильная версия для экранов <768px */}
      <div className="block md:hidden">
        <div className="w-full px-[19px] mx-auto" style={{ height: "80px" }}>
          <div className="flex items-center justify-between h-full">
            <Logo
              logoSize={{ width: 49, height: 45 }}
              fontSize="14px"
              gap="14px"
              lineHeight="17px"
            />
            <BurgerButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              lineWidth={27}
              lineHeight={3}
              gap={8}
            />
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
          <div className="w-full mx-auto px-[19px] md:px-[35px] lg:px-[60px] xl:px-[70px] py-4">
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
