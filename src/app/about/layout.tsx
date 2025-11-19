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
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "О центре", href: "/about" },
            ]}
          />

          {/* Back button - mobile: только иконка */}
          <div className="md:hidden">
            <BackButton
            onClick={() => router.back()}
              variant="icon"
              ariaLabel="Назад"
              />
          </div>

          {/* Back button - tablet и desktop */}
          <div className="hidden md:block">
            <BackButton
            onClick={() => router.back()}
              variant="default"
              className="md:h-[48px] lg:py-[16px] lg:h-auto"
            />
          </div>
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
