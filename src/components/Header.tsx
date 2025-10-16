"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Новости", href: "/news" },
    { label: "Календарь", href: "/calendar" },
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
      {/* Desktop версия (≥1920px) - точное соответствие макету */}
      <div className="hidden 2xl:block">
        <div className="relative w-full max-w-[1920px] h-[174px] mx-auto">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
          ></div>

          <Link href="/" className="absolute left-[60px] top-[34px]">
            <Image
              src="/images/logo-392dd2.png"
              alt="Патриот Центр 48"
              width={122}
              height={112}
              className="object-contain"
            />
          </Link>

          <Link
            href="/"
            className="absolute left-[196px] top-[74px] text-[32px] font-normal font-montserrat text-black leading-[32px]"
          >
            Патриот Центр 48
          </Link>

          <nav className="absolute left-[602px] top-[73px]">
            <ul className="flex items-center gap-[30px]">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[16px] font-normal font-montserrat text-black hover:text-gray-600 transition-colors leading-[32px] whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link href="/partners" className="absolute left-[1499px] top-[37px]">
            <Image
              src="/images/partners.svg"
              alt="Партнеры"
              width={240}
              height={105}
              className="object-contain"
            />
          </Link>

          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="absolute left-[1794px] top-[67px] hover:opacity-70 transition-opacity"
            aria-label="Поиск"
          >
            <Image
              src="/images/search-icon.svg"
              alt="Поиск"
              width={46}
              height={45}
              className="object-contain"
            />
          </button>
        </div>
      </div>

      {/* Адаптивная версия для экранов <1920px */}
      <div className="block 2xl:hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            {/* Логотип и название */}
            <Link href="/" className="flex items-center gap-3 lg:gap-4">
              <Image
                src="/images/logo-392dd2.png"
                alt="Патриот Центр 48"
                width={70}
                height={64}
                className="object-contain lg:w-[90px] lg:h-[82px]"
              />
              <h1 className="text-lg sm:text-xl lg:text-2xl font-normal font-montserrat text-black whitespace-nowrap">
                Патриот Центр 48
              </h1>
            </Link>

            {/* Кнопки */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Поиск"
              >
                <Image
                  src="/images/search-icon.svg"
                  alt="Поиск"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </button>

              {/* Бургер меню */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                aria-label="Меню"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Меню для планшетов (lg экраны) */}
          <nav className="hidden lg:flex 2xl:hidden mt-6 justify-center">
            <ul className="flex items-center gap-6 xl:gap-8">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm xl:text-base font-normal font-montserrat text-black hover:text-gray-600 transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Мобильное меню */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
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
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 2xl:px-[60px] py-4">
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
