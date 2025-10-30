"use client";

import PersonCard from "@/components/cards/PersonCard";
import { useGetTeamQuery } from "@/services/strapiApi";

export default function TeamPage() {
  const { data, isFetching, isError } = useGetTeamQuery();
  const teamData = data?.data ?? [];

  if (isFetching) {
    return (
      <div className="w-full max-w-[1920px] mx-auto px-[16px] sm:px-[32px] md:px-[48px] lg:px-[64px] xl:px-[76px] pb-[30px] sm:pb-[40px] lg:pb-[50px]">
        <div className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[112px] mb-[100px] sm:mb-[120px] md:mb-[150px] lg:mb-[194px] flex justify-center items-center py-20">
          <div className="text-xl text-gray-600">Загрузка...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-[1920px] mx-auto px-[16px] sm:px-[32px] md:px-[48px] lg:px-[64px] xl:px-[76px] pb-[30px] sm:pb-[40px] lg:pb-[50px]">
        <div className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[112px] mb-[100px] sm:mb-[120px] md:mb-[150px] lg:mb-[194px] flex justify-center items-center py-20">
          <div className="text-xl text-gray-600">
            Не удалось загрузить данные команды. Попробуйте обновить страницу.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1920px] mx-auto px-[16px] sm:px-[32px] md:px-[48px] lg:px-[64px] xl:px-[76px] pb-[30px] sm:pb-[40px] lg:pb-[50px]">
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
