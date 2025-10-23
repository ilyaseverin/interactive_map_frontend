"use client";

import PersonCard from "@/components/cards/PersonCard";
import { useEffect, useState } from "react";

// Типы для данных команды из Strapi
interface TeamMember {
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

interface TeamResponse {
  data: TeamMember[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Функция для получения данных команды из Strapi
async function getTeamData(): Promise<TeamResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  try {
    const res = await fetch(
      `${apiUrl}/api/team-members?populate[photo]=true&populate[basic_info]=true&sort=basic_info.order:asc`,
      {
        cache: "no-store", // Всегда без кэша
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch team data:", res.status, res.statusText);
      return { data: [], meta: {} };
    }

    const data = await res.json();
    console.log("Team data from API:", data); // Для отладки
    return data;
  } catch (error) {
    console.error("Error fetching team data:", error);
    return { data: [], meta: {} };
  }
}

export default function TeamPage() {
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTeamData()
      .then((response) => {
        console.log("Received team data:", response);
        setTeamData(response.data || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading team data:", error);
        setTeamData([]);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="w-full px-[16px] sm:px-[32px] md:px-[48px] lg:px-[64px] xl:px-[76px] pb-[30px] sm:pb-[40px] lg:pb-[50px]">
        <div className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[112px] mb-[100px] sm:mb-[120px] md:mb-[150px] lg:mb-[194px] flex justify-center items-center py-20">
          <div className="text-xl text-gray-600">Загрузка...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-[16px] sm:px-[32px] md:px-[48px] lg:px-[64px] xl:px-[76px] pb-[30px] sm:pb-[40px] lg:pb-[50px]">
      {/* Team Cards - точно как в макете */}
      <div className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[112px] mb-[100px] sm:mb-[120px] md:mb-[150px] lg:mb-[194px] space-y-[40px] sm:space-y-[50px] md:space-y-[60px] lg:space-y-[65px]">
        {teamData.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">
              Данные команды не найдены
            </div>
          </div>
        ) : (
          teamData.map((member) => {
            // Формируем URL изображения
            const imageUrl = member.photo?.url
              ? member.photo.url.startsWith("http")
                ? member.photo.url
                : `${
                    process.env.NEXT_PUBLIC_STRAPI_URL ||
                    "http://localhost:1337"
                  }${member.photo.url}`
              : "/images/management/placeholder.jpg";

            return (
              <PersonCard
                key={member.id}
                person={{
                  id: member.id,
                  name: member.full_name,
                  position: member.basic_info.position,
                  email: member.basic_info.email || "cpv48@mail.ru",
                  phone: member.basic_info.phone || "+7 (912)-345-67-89",
                  image: imageUrl,
                  description: member.bio,
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
