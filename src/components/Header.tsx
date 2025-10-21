"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Новости", href: "/news" },
    { label: "Карта", href: "/battle-glory" },
    { label: "О центре", href: "/about" },
    { label: "Наши проекты", href: "/projects" },
    { label: "Для СМИ", href: "/media" },
    { label: "Контакты", href: "/contacts" },
    { label: "Документы", href: "/documents" },
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
            <nav
              className="flex-1 flex justify-center min-w-0"
              style={{
                paddingLeft: "clamp(8px, 1vw, 24px)",
                paddingRight: "clamp(8px, 1vw, 24px)",
              }}
            >
              <ul
                className="flex flex-wrap items-center justify-center gap-y-2"
                style={{ columnGap: "clamp(10px, 1.5vw, 24px)" }}
              >
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[18px] font-normal font-montserrat text-black hover:text-gray-600 transition-colors leading-[28px] whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
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
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Меню"
            >
              <svg
                className="w-[27px] h-[16px] sm:w-6 sm:h-6"
                fill="none"
                stroke="#030303"
                viewBox="0 0 27 16"
                strokeWidth={3}
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3L24 13M3 13l21-10"
                  />
                ) : (
                  <>
                    <path strokeLinecap="round" d="M0 0h27" />
                    <path strokeLinecap="round" d="M0 8h27" />
                    <path strokeLinecap="round" d="M0 16h27" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Мобильное меню */}
          {mobileMenuOpen && (
            <nav className="mt-4 pb-4 border-t border-gray-200 pt-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block text-base font-normal font-montserrat text-black hover:text-gray-600 transition-colors py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>

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
