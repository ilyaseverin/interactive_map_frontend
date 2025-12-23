import { NextResponse } from "next/server";
import { BattleGloryResponse, BattleGloryPoint } from "@/types/strapi";
import { getStrapiUrl } from "@/utils/strapiUrl";

const STRAPI_URL = getStrapiUrl();

// Функция для получения всех данных с пагинацией
async function fetchAllData(filters: string[]): Promise<BattleGloryResponse> {
  const filterString = filters.length > 0 ? `&${filters.join("&")}` : "";
  let allData: BattleGloryPoint[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const url = `${STRAPI_URL}/api/battle-glory-points?pagination[page]=${page}&pagination[pageSize]=100&populate=*${filterString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    // На проде Strapi может вернуть 404, если коллекция отсутствует/не опубликована.
    // Не роняем весь запрос, а возвращаем пустой результат.
    if (response.status === 404) {
      return {
        data: [],
        meta: {
          pagination: {
            total: 0,
            pageSize: 0,
            pageCount: 0,
            page: 1,
          },
        },
      };
    }

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      allData = allData.concat(data.data);

      // Проверяем, есть ли еще страницы
      const pagination = data.meta?.pagination;
      hasMore = page < (pagination?.pageCount || 1);
      page++;
    } else {
      hasMore = false;
    }
  }

  return {
    data: allData,
    meta: {
      pagination: {
        total: allData.length,
        pageSize: allData.length,
        pageCount: 1,
        page: 1,
      },
    },
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pointType = searchParams.get("point_type");
  const municipality = searchParams.get("municipality");

  try {
    // Построение фильтров
    const filters: string[] = [];

    if (pointType) {
      filters.push(`filters[point_type][$eq]=${encodeURIComponent(pointType)}`);
    }

    if (municipality) {
      filters.push(
        `filters[municipality][$eq]=${encodeURIComponent(municipality)}`
      );
    }

    // Получаем все данные с помощью пагинации
    const data = await fetchAllData(filters);

    // Логирование для отладки
    console.log(`Fetched ${data.data?.length || 0} objects for filters:`, {
      pointType,
      municipality,
      totalInResponse: data.meta?.pagination?.total || 0,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching battle glory points:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch battle glory points",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// CORS headers для встраивания на сторонние сайты
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
