"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";

const subMenuItems = [
  { label: "Об учреждении", href: "/about/organization" },
  { label: "Руководство", href: "/about/management" },
  { label: "Команда", href: "/about/team" },
  { label: "Партнеры", href: "/about/partners" },
  { label: "Контакты", href: "/about/contacts" },
  { label: "Фирменный стиль", href: "/about/brand" },
];

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "rgba(241, 242, 243, 1)" }}
    >
      {/* Breadcrumb Navigation */}
      <div className="w-full px-[19px] sm:px-[32px] md:px-[36px] lg:px-[64px] xl:px-[80px] py-[16px] sm:py-[18px] lg:py-[21px] xl:py-[39px]">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "О центре", href: "/about" },
            ]}
          />

          {/* Back button - mobile: только иконка */}
          <button
            onClick={() => router.back()}
            className="md:hidden inline-flex items-center justify-center w-[34px] h-[34px] rounded-[7px] border border-[#C62828] hover:bg-[#C62828] active:bg-[#B71C1C] active:scale-95 transition-all duration-150 group"
          >
            <svg
              width="18"
              height="13"
              viewBox="0 0 18 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180"
            >
              <path
                d="M2 7L16 7"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                className="stroke-[#C62828] group-hover:stroke-white group-active:stroke-white"
              />
              <path
                d="M10 2L16 7L10 12"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-[#C62828] group-hover:stroke-white group-active:stroke-white"
              />
            </svg>
          </button>

          {/* Back button - tablet и desktop */}
          <button
            onClick={() => router.back()}
            className="hidden md:inline-flex items-center justify-center gap-[10px] px-[24px] md:h-[48px] lg:py-[16px] lg:h-auto border border-[#C62828] text-[#C62828] text-[16px] lg:text-[20px] font-normal font-montserrat rounded-[12px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219]"
          >
            <svg
              width="33"
              height="25"
              viewBox="0 0 33 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 13L22 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 6L6 12.5L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Назад
          </button>
        </div>
      </div>

      {/* Submenu Navigation */}
      <div className="w-full px-[19px] sm:px-[32px] md:px-[36px] lg:px-[64px] xl:px-[80px] pb-[30px] md:pb-[30px] lg:pb-[112px]">
        {/* Mobile/Small: активный сверху, остальные снизу с wrap */}
        <div className="md:hidden">
          {subMenuItems.map((item) => {
            const isActive = pathname === item.href;

            if (isActive) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block font-montserrat font-bold leading-[1.219] text-black mb-[10px] text-[20px]"
                >
                  {item.label}
                </Link>
              );
            }
            return null;
          })}

          <div className="flex flex-wrap items-center gap-[10px]">
            {subMenuItems.map((item) => {
              const isActive = pathname === item.href;

              if (!isActive) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-montserrat font-medium leading-[1.219] text-black hover:text-gray-600 text-[12px]"
                  >
                    {item.label}
                  </Link>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Tablet: активный сверху, остальные снизу */}
        <div className="hidden md:block lg:hidden">
          {subMenuItems.map((item) => {
            const isActive = pathname === item.href;

            if (isActive) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block font-montserrat font-bold leading-[1.219] text-black mb-[11px] text-[30px]"
                >
                  {item.label}
                </Link>
              );
            }
            return null;
          })}

          <div className="flex flex-wrap items-center gap-x-[20px] gap-y-[10px]">
            {subMenuItems.map((item) => {
              const isActive = pathname === item.href;

              if (!isActive) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-montserrat font-medium leading-[1.219] text-black hover:text-gray-600 text-[16px]"
                  >
                    {item.label}
                  </Link>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Desktop: все в одну строку flex wrap */}
        <div className="hidden lg:flex flex-wrap items-center gap-[30px]">
          {subMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-montserrat leading-[1.219] ${
                pathname === item.href
                  ? "text-[40px] font-bold text-black"
                  : "text-[24px] font-medium text-black hover:text-gray-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Page Content */}
      <div className="w-full">{children}</div>
    </div>
  );
}
