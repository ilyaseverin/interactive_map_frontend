"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BackButton } from "@/components/buttons";

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
      <div className="w-full px-[19px] sm:px-[32px] md:px-[36px] lg:px-[64px] xl:px-[80px] pt-[15px] sm:pt-[20px] lg:pt-[40px] pb-[16px] sm:pb-[18px] lg:pb-[21px] xl:pb-[39px]">
        <div className="flex items-center justify-between gap-[10px]">
          <div className="flex-1 min-w-0">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "О центре", href: "/about" },
              ]}
            />
          </div>

          {/* Back button - mobile: только иконка */}
          <div className="flex-shrink-0 md:hidden">
            <BackButton
              onClick={() => router.back()}
              variant="icon"
              ariaLabel="Назад"
            />
          </div>

          {/* Back button - tablet и desktop */}
          <div className="hidden md:block flex-shrink-0">
            <BackButton onClick={() => router.back()} variant="default" />
          </div>
        </div>
      </div>

      {/* Submenu Navigation */}
      <div className="w-full px-[19px] sm:px-[32px] md:px-[36px] lg:px-[64px] xl:px-[80px] pb-[15px] md:pb-[20px] lg:pb-[30px]">
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
