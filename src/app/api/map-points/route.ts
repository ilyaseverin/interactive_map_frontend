import { NextResponse } from "next/server";
import { MapPoint } from "@/types/map";

// Демонстрационные точки (в реальном приложении это будет из базы данных)
const mapPoints: MapPoint[] = [
  // Москва и окрестности - много точек для демонстрации кластеризации
  {
    id: "1",
    name: "Красная площадь",
    description: "Главная площадь Москвы",
    coordinates: [37.6213, 55.7539],
    color: "#dc2626",
    image:
      "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=300&h=200&fit=crop",
    population: "Исторический центр",
    founded: "XV век",
  },
  {
    id: "2",
    name: "Кремль",
    description: "Резиденция президента России",
    coordinates: [37.6156, 55.752],
    color: "#dc2626",
    image:
      "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=300&h=200&fit=crop",
    population: "Административный центр",
    founded: "XIV век",
  },
  {
    id: "3",
    name: "Большой театр",
    description: "Знаменитый оперный театр",
    coordinates: [37.6186, 55.7596],
    color: "#dc2626",
    image:
      "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=300&h=200&fit=crop",
    population: "Культурный центр",
    founded: "1776 г.",
  },
  {
    id: "4",
    name: "Третьяковская галерея",
    description: "Крупнейший музей русского искусства",
    coordinates: [37.62, 55.7414],
    color: "#dc2626",
    image:
      "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=300&h=200&fit=crop",
    population: "Музейный комплекс",
    founded: "1856 г.",
  },
  {
    id: "5",
    name: "Храм Христа Спасителя",
    description: "Кафедральный соборный храм",
    coordinates: [37.6051, 55.7445],
    color: "#dc2626",
    image:
      "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=300&h=200&fit=crop",
    population: "Религиозный центр",
    founded: "2000 г.",
  },
  {
    id: "6",
    name: "Парк Горького",
    description: "Центральный парк культуры и отдыха",
    coordinates: [37.6014, 55.7317],
    color: "#dc2626",
    image:
      "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=300&h=200&fit=crop",
    population: "Парковая зона",
    founded: "1928 г.",
  },
  {
    id: "7",
    name: "МГУ",
    description: "Московский государственный университет",
    coordinates: [37.5304, 55.7031],
    color: "#dc2626",
    image:
      "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=300&h=200&fit=crop",
    population: "Образовательный центр",
    founded: "1755 г.",
  },
  {
    id: "8",
    name: "Воробьёвы горы",
    description: "Смотровая площадка с видом на Москву",
    coordinates: [37.54, 55.71],
    color: "#dc2626",
    image:
      "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=300&h=200&fit=crop",
    population: "Природная зона",
    founded: "Древние времена",
  },
  {
    id: "9",
    name: "Арбат",
    description: "Пешеходная улица в центре Москвы",
    coordinates: [37.5911, 55.7522],
    color: "#dc2626",
    image:
      "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=300&h=200&fit=crop",
    population: "Туристическая зона",
    founded: "XV век",
  },
  {
    id: "10",
    name: "Останкинская башня",
    description: "Телевизионная и радиовещательная башня",
    coordinates: [37.6114, 55.8194],
    color: "#dc2626",
    image:
      "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=300&h=200&fit=crop",
    population: "Технический объект",
    founded: "1967 г.",
  },
  {
    id: "11",
    name: "ВДНХ",
    description: "Выставка достижений народного хозяйства",
    coordinates: [37.64, 55.83],
    color: "#dc2626",
    image:
      "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=300&h=200&fit=crop",
    population: "Выставочный комплекс",
    founded: "1939 г.",
  },
  {
    id: "12",
    name: "Санкт-Петербург",
    description: "Культурная столица России",
    coordinates: [30.3351, 59.9311],
    color: "#2563eb",
    image:
      "https://images.unsplash.com/photo-1556610961-2fecc5927173?w=300&h=200&fit=crop",
    population: "5.4 млн",
    founded: "1703 г.",
  },
  {
    id: "13",
    name: "Новосибирск",
    description: "Крупнейший город Сибири",
    coordinates: [82.9346, 55.0084],
    color: "#059669",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    population: "1.6 млн",
    founded: "1893 г.",
  },
  {
    id: "14",
    name: "Екатеринбург",
    description: "Столица Урала",
    coordinates: [60.6122, 56.8431],
    color: "#d97706",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&h=200&fit=crop",
    population: "1.5 млн",
    founded: "1723 г.",
  },
  {
    id: "15",
    name: "Казань",
    description: "Столица Татарстана",
    coordinates: [49.1221, 55.8304],
    color: "#7c3aed",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    population: "1.2 млн",
    founded: "1005 г.",
  },
  // Дополнительные точки в других регионах для разнообразия
  {
    id: "16",
    name: "Нижний Новгород",
    description: "Крупный город на Волге",
    coordinates: [44.002, 56.3269],
    color: "#059669",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    population: "1.2 млн",
    founded: "1221 г.",
  },
  {
    id: "17",
    name: "Самара",
    description: "Крупный промышленный центр",
    coordinates: [50.1, 53.2],
    color: "#059669",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    population: "1.1 млн",
    founded: "1586 г.",
  },
  {
    id: "18",
    name: "Омск",
    description: "Крупный город в Сибири",
    coordinates: [73.3686, 54.9885],
    color: "#059669",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    population: "1.1 млн",
    founded: "1716 г.",
  },
  {
    id: "19",
    name: "Ростов-на-Дону",
    description: "Столица Южного федерального округа",
    coordinates: [39.7158, 47.2354],
    color: "#059669",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    population: "1.1 млн",
    founded: "1749 г.",
  },
  {
    id: "20",
    name: "Уфа",
    description: "Столица Башкортостана",
    coordinates: [55.9587, 54.7388],
    color: "#059669",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    population: "1.1 млн",
    founded: "1574 г.",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // Если запрашивается конкретная точка по ID
  if (id) {
    const point = mapPoints.find((p) => p.id === id);
    if (!point) {
      return NextResponse.json({ error: "Point not found" }, { status: 404 });
    }
    return NextResponse.json(point);
  }

  // Возвращаем все точки
  return NextResponse.json(mapPoints);
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
