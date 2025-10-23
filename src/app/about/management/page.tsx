"use client";

import PersonCard from "@/components/cards/PersonCard";
import { useEffect, useState } from "react";

// Типы для данных руководства из Strapi
interface ManagementPerson {
  id: number;
  documentId: string;
  full_name: string;
  slug: string;
  photo?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
  basic_info: {
    position: string;
    phone?: string;
    email?: string;
    order: number;
  };
  bio?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ManagementResponse {
  data: ManagementPerson[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Функция для получения данных руководства из Strapi
async function getManagementData(): Promise<ManagementResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  try {
    const res = await fetch(
      `${apiUrl}/api/managements?populate[photo]=true&populate[basic_info]=true&sort=basic_info.order:asc`,
      {
        cache: "no-store", // Всегда без кэша
      }
    );

    if (!res.ok) {
      console.error(
        "Failed to fetch management data:",
        res.status,
        res.statusText
      );
      return { data: [], meta: {} };
    }

    const data = await res.json();
    console.log("Management data from API:", data); // Для отладки
    return data;
  } catch (error) {
    console.error("Error fetching management data:", error);
    return { data: [], meta: {} };
  }
}

export default function ManagementPage() {
  const [managementData, setManagementData] = useState<ManagementPerson[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getManagementData()
      .then((response) => {
        console.log("Received management data:", response);
        setManagementData(response.data || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading management data:", error);
        setManagementData([]);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-[1920px] mx-auto px-[16px] sm:px-[32px] md:px-[48px] lg:px-[64px] xl:px-[76px] pb-[30px] sm:pb-[40px] lg:pb-[50px]">
        <div className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[112px] mb-[100px] sm:mb-[120px] md:mb-[150px] lg:mb-[194px] flex justify-center items-center py-20">
          <div className="text-xl text-gray-600">Загрузка...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1920px] mx-auto px-[16px] sm:px-[32px] md:px-[48px] lg:px-[64px] xl:px-[76px] pb-[30px] sm:pb-[40px] lg:pb-[50px]">
      {/* Management Cards - точно как в макете */}
      <div className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[112px] mb-[100px] sm:mb-[120px] md:mb-[150px] lg:mb-[194px] space-y-[40px] sm:space-y-[50px] md:space-y-[60px] lg:space-y-[65px]">
        {managementData.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">
              Данные руководства не найдены
            </div>
          </div>
        ) : (
          managementData.map((person) => {
            // Формируем URL изображения
            const imageUrl = person.photo?.url
              ? person.photo.url.startsWith("http")
                ? person.photo.url
                : `${
                    process.env.NEXT_PUBLIC_STRAPI_URL ||
                    "http://localhost:1337"
                  }${person.photo.url}`
              : "/images/management/placeholder.jpg";

            return (
              <PersonCard
                key={person.id}
                person={{
                  id: person.id,
                  name: person.full_name,
                  position: person.basic_info.position,
                  email: person.basic_info.email || "cpv48@mail.ru",
                  phone: person.basic_info.phone || "+7 (912)-345-67-89",
                  image: imageUrl,
                  description: person.bio,
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
