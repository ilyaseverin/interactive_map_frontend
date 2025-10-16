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
      <main
        className="min-h-screen overflow-x-hidden"
        style={{ backgroundColor: "rgba(241, 242, 243, 1)" }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
