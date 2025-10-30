"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "rgba(241, 242, 243, 1)" }}
    >
      {/* Breadcrumb Navigation */}
      <div className="w-full px-[16px] sm:px-[32px] md:px-[48px] lg:px-[64px] xl:px-[76px] py-[16px] sm:py-[18px] lg:py-[21px]">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "О центре", href: "/about" },
          ]}
        />
      </div>

      {/* Submenu Navigation */}
      <div className="w-full px-[16px] sm:px-[32px] md:px-[48px] lg:px-[64px] xl:px-[80px] pb-[30px] sm:pb-[40px] lg:pb-[51px]">
        <div className="flex flex-wrap items-center gap-[20px] sm:gap-[30px] md:gap-[40px] lg:gap-[50px]">
          {subMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-montserrat leading-[1.2] sm:leading-[1.3] lg:leading-[29px] ${
                pathname === item.href
                  ? "text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-bold text-black"
                  : "text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] font-medium text-black hover:text-gray-600"
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
