"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Не показываем header и footer на странице embed
  const shouldShowLayout = !pathname?.startsWith("/embed");

  if (!shouldShowLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
}
