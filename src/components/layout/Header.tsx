"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import MobileMenu from "./MobileMenu";
import Logo from "./header/Logo";
import SearchButton from "./header/SearchButton";
import BurgerButton from "./header/BurgerButton";
import PartnersLink from "./header/PartnersLink";
import DropdownMenu, { type SubMenuItem } from "./header/DropdownMenu";
import SearchForm from "@/components/forms/SearchForm";
import ExpandingSearch from "./header/ExpandingSearch";

type MenuItem = {
  label: string;
  href: string;
  subMenu?: SubMenuItem[];
  twoColumns?: boolean;
};

export default function Header() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const mobileSearchButtonRef = useRef<HTMLButtonElement>(null);

  const menuItems: MenuItem[] = [
    {
      label: "Новости",
      href: "/news",
      subMenu: [
        { label: "Главные", href: "/news?category=main" },
        { label: "Региональные", href: "/news?category=regional" },
        { label: "Фотоальбомы", href: "/photo-albums?source=news" },
        { label: "Видео", href: "/videos?source=news" },
      ],
    },
    {
      label: "Карта",
      href: "/battle-glory",
      subMenu: [
        {
          label: "История Липецкой области в годы ВОВ",
          href: "/battle-glory/history",
        },
        {
          label: "Памятники и мемориалы",
          href: "/battle-glory?filter=monument",
        },
        {
          label: "Мемориальные доски",
          href: "/battle-glory?filter=memorial-board",
        },
        {
          label: "Воинские захоронения",
          href: "/battle-glory?filter=burial",
        },
      ],
    },
    {
      label: "О центре",
      href: "/about",
      twoColumns: true,
      subMenu: [
        { label: "Об учреждении", href: "/about/organization" },
        { label: "Руководство", href: "/about/management" },
        { label: "Команда", href: "/about/team" },
        { label: "Партнеры", href: "/about/partners" },
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
    {
      label: "Наши проекты",
      href: "/projects",
      subMenu: [
        { label: "Проекты", href: "/projects" },
        { label: "Фотоальбомы", href: "/photo-albums?source=projects" },
        { label: "Видео", href: "/videos?source=projects" },
      ],
    },
    {
      label: "Для СМИ",
      href: "/media",
      subMenu: [
        { label: "Пресс-релизы", href: "/press-releases" },
        { label: "Фотоальбомы", href: "/photo-albums?source=press" },
      ],
    },
    { label: "Контакты", href: "/about/contacts" },
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
          style={{ minHeight: "clamp(80px, 7.292vw, 140px)" }}
        >
          <div
            className="flex items-center justify-between h-full"
            style={{
              gap: "clamp(6px, 0.833vw, 16px)",
              paddingTop: "clamp(8px, 1.042vw, 20px)",
              paddingBottom: "clamp(8px, 1.042vw, 20px)",
            }}
          >
            {/* Левая часть: Логотип и название */}
            <div className="flex-shrink-0">
              <div
                className="flex items-center"
                style={{ gap: "clamp(4px, 0.833vw, 16px)" }}
              >
                <Link href="/home" className="flex-shrink-0">
                  <Image
                    src="/images/logo-392dd2.png"
                    alt="Патриот Центр 48"
                    width={122}
                    height={112}
                    className="object-contain"
                    style={{
                      width: "clamp(35px, 6.35vw, 122px)",
                      height: "clamp(32px, 5.83vw, 112px)",
                    }}
                  />
                </Link>
                <Link
                  href="/home"
                  className="font-normal font-montserrat text-black whitespace-nowrap"
                  style={{
                    fontSize: "clamp(8px, calc(3.125vw - 20px), 40px)",
                    lineHeight: "1.2",
                  }}
                >
                  Патриот Центр 48
                </Link>
              </div>
            </div>

            {/* Центральная часть: Навигация без переноса */}
            <nav className="flex-1 flex justify-center min-w-0">
              <ul
                className="flex items-center justify-center"
                style={{ columnGap: "clamp(4px, 0.833vw, 16px)" }}
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
                    {item.subMenu ? (
                      <span
                        className={`font-normal font-montserrat whitespace-nowrap block cursor-default ${
                          activeDropdown === item.label
                            ? "text-white rounded-t-[5px]"
                            : "text-black hover:text-gray-600"
                        }`}
                        style={{
                          fontSize: "clamp(11px, 1.042vw, 20px)",
                          lineHeight: "clamp(16px, 1.667vw, 32px)",
                          padding:
                            "clamp(1px, 0.208vw, 4px) clamp(6px, 0.781vw, 15px)",
                          ...(activeDropdown === item.label
                            ? { backgroundColor: "#1D4E89" }
                            : {}),
                        }}
                      >
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="font-normal font-montserrat whitespace-nowrap block text-black hover:text-gray-600"
                        style={{
                          fontSize: "clamp(11px, 1.042vw, 20px)",
                          lineHeight: "clamp(16px, 1.667vw, 32px)",
                        }}
                      >
                        {item.label}
                      </Link>
                    )}

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
              style={{ gap: "clamp(6px, 1.25vw, 24px)" }}
            >
              <Link href="/about/partners" className="flex-shrink-0">
                <Image
                  src="/images/partners.svg"
                  alt="Партнеры"
                  width={240}
                  height={105}
                  className="object-contain"
                  style={{
                    width: "clamp(60px, 12.5vw, 240px)",
                    height: "clamp(26px, 5.469vw, 105px)",
                  }}
                />
              </Link>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex-shrink-0 hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Поиск"
              >
                <Image
                  src="/images/search-icon.svg"
                  alt="Поиск"
                  width={46}
                  height={45}
                  className="object-contain pointer-events-none"
                  style={{
                    width: "clamp(18px, 2.396vw, 46px)",
                    height: "clamp(18px, 2.344vw, 45px)",
                  }}
                />
              </button>
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
                lineWidth={47}
                lineHeight={5}
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
                gap={8}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Мобильная версия для экранов <768px */}
      <div className="block md:hidden">
        <div className="w-full px-[19px] mx-auto" style={{ height: "80px" }}>
          <div className="flex items-center justify-between h-full relative">
            <Logo
              logoSize={{ width: 49, height: 45 }}
              fontSize="12px"
              gap="14px"
              lineHeight="17px"
              hideText={mobileSearchOpen}
            />
            <div className="flex items-center gap-[14px] relative flex-1 justify-end">
              <div
                className={`transition-opacity duration-300 flex items-center ${
                  mobileSearchOpen
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
              >
                <SearchButton
                  ref={mobileSearchButtonRef}
                  onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                  size={{ width: 24, height: 24 }}
                />
              </div>
              <BurgerButton
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                lineWidth={27}
                lineHeight={3}
                gap={5}
              />
            </div>
            <ExpandingSearch
              isOpen={mobileSearchOpen}
              onClose={() => setMobileSearchOpen(false)}
              searchButtonRef={mobileSearchButtonRef}
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
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          searchOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-gray-200 bg-white">
          <div className="w-full mx-auto px-[19px] md:px-[35px] lg:px-[60px] xl:px-[70px] py-4">
            <SearchForm
              onSubmit={(query) => {
                router.push(`/search?q=${encodeURIComponent(query)}&page=1`);
                setSearchOpen(false);
              }}
              placeholder="Поиск"
              autoFocus
              variant="header"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
