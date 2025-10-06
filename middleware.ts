import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Для embed страниц добавляем специальные заголовки
  if (request.nextUrl.pathname.startsWith("/embed")) {
    const response = NextResponse.next();

    // Добавляем заголовки для embed страниц
    response.headers.set("X-Frame-Options", "ALLOWALL");
    response.headers.set("X-Content-Type-Options", "nosniff");

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/embed/:path*"],
};
