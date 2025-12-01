"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type SubMenuItem = {
  label: string;
  href: string;
};

type MenuItem = {
  label: string;
  href: string;
  subMenu?: SubMenuItem[];
  twoColumns?: boolean;
};

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  mobileExtraItems: { label: string; href: string }[];
};

export default function MobileMenu({
  isOpen,
  onClose,
  menuItems,
  mobileExtraItems,
}: MobileMenuProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Анимация появления меню
  useEffect(() => {
    if (isOpen) {
      // Небольшая задержка для запуска анимации
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (isOpen) {
      // Сохраняем текущую позицию скролла
      const scrollY = window.scrollY;

      // Блокируем скролл
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";

      return () => {
        // Восстанавливаем скролл
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Функция закрытия с анимацией
  const handleClose = () => {
    setIsAnimating(false);
    setActiveSubmenu(null);
    // Даем время на анимацию перед фактическим закрытием
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Закрытие меню при клике на затемненную область
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/70 flex items-start justify-end pt-0 transition-opacity duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white rounded-b-[10px] w-full md:w-[543px] h-[568px] md:h-screen relative transition-transform duration-300 ease-in-out ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Крестик закрытия */}
        <button
          onClick={handleClose}
          className="absolute right-[18px] md:right-[44px] top-[24px] md:top-[44px] w-[28px] md:w-[36px] h-[25px] md:h-[32px] hover:opacity-70 transition-opacity z-10"
          aria-label="Закрыть меню"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 36 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 4L29 28M29 4L7 28" stroke="#000000" strokeWidth="5" />
          </svg>
        </button>

        {/* Список пунктов меню */}
        <nav className="absolute left-[17px] md:left-[78px] top-[73px] md:top-[76px] w-[286px] md:w-[388px] h-[423px] md:h-[586px]">
          <ul className="flex flex-col gap-[25px] px-[15px]">
            {menuItems.map((item) => (
              <li key={item.href}>
                {item.subMenu ? (
                  <div className="relative">
                    <button
                      onClick={() =>
                        setActiveSubmenu(
                          activeSubmenu === item.label ? null : item.label
                        )
                      }
                      className={`text-[14px] md:text-[18px] font-normal font-montserrat text-left flex items-center gap-1 ${
                        activeSubmenu === item.label
                          ? "text-[#1D4E89] border-t border-l border-r border-[#1D4E89] bg-white h-[32px] md:h-[34px] leading-[32px] rounded-t-[5px] px-[15px] py-[2px] w-fit -ml-[15px] -mt-[8.5px] -mb-[8.5px] md:-mt-[1px] md:-mb-[1px]"
                          : "text-black border-transparent h-[15px] md:h-[32px] w-full"
                      }`}
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-[12px] h-[12px] md:w-[14px] md:h-[14px] transition-transform duration-200 flex-shrink-0 ${
                          activeSubmenu === item.label ? "rotate-180" : "rotate-0"
                        }`}
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* Подменю рисуется прямо под кнопкой */}
                    {activeSubmenu === item.label && (
                      <div className="absolute top-full left-[-15px] w-[190px] md:w-[290px] bg-[#1D4E89] rounded-b-[5px] rounded-tr-[5px] pt-[8px] pb-[16px] z-10 shadow-lg md:py-[29px] md:pl-[30px]">
                        <ul className="px-[15px] md:px-[0] flex flex-col gap-[13px] md:gap-[18px]">
                          {item.subMenu.map((subItem) => (
                            <li key={subItem.href}>
                              <Link
                                href={subItem.href}
                                className="block text-[14px] md:text-[18px] font-normal font-montserrat text-white hover:underline"
                                style={{ lineHeight: "1.219em" }}
                                onClick={handleClose}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center text-[14px] md:text-[18px] font-normal font-montserrat text-black h-[15px] md:h-[32px]"
                    onClick={handleClose}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}

            {/* Дополнительные пункты для мобильной версии */}
            {mobileExtraItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center text-[14px] md:text-[18px] font-normal font-montserrat text-black leading-[1.219em] h-[17px] md:h-[22px]"
                  onClick={handleClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
