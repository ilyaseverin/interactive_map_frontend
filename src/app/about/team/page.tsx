"use client";

import { useRouter } from "next/navigation";
import PersonCard from "@/components/cards/PersonCard";
import { useGetTeamQuery } from "@/services/strapiApi";
import { BackButton } from "@/components/buttons";
import { getResponsiveImageUrl } from "@/utils/strapiUrl";

export default function TeamPage() {
  const router = useRouter();
  const { data, isFetching, isError } = useGetTeamQuery();
  const teamData = data?.data ?? [];

  if (isFetching) {
    return (
      <div className="w-full max-w-[1920px] mx-auto px-[35px] sm:px-[36px] lg:px-[64px] xl:px-[80px] pb-[30px] lg:pb-[194px]">
        <div className="flex justify-center items-center py-20">
          <div className="text-xl text-gray-600">Загрузка...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-[1920px] mx-auto px-[35px] sm:px-[36px] lg:px-[64px] xl:px-[80px] pb-[30px] lg:pb-[194px]">
        <div className="flex justify-center items-center py-20">
          <div className="text-xl text-gray-600">
            Не удалось загрузить данные команды. Попробуйте обновить страницу.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1920px] mx-auto px-[35px] sm:px-[36px] lg:px-[64px] xl:px-[80px] pb-[30px] lg:pb-[194px]">
      {/* Team Cards - точно как в макете: Mobile 20px, Tablet 25px, Desktop 65px */}
      <div className="mb-[30px] space-y-[20px] xs:space-y-[22px] sm:space-y-[25px] md:space-y-[25px] lg:space-y-[65px]">
        {teamData.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">
              Данные команды не найдены
            </div>
          </div>
        ) : (
          teamData.map((member) => {
            // Формируем URL изображения
            const imageUrl =
              getResponsiveImageUrl(member.photo, "medium") ||
              "/images/management/placeholder.jpg";

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

      {/* Back button внизу - только для mobile и tablet */}
      <div className="flex lg:hidden md:block md:ml-0">
        <BackButton
          onClick={() => router.back()}
          variant="default"
          className="mx-auto md:mx-0 md:ml-[36px] w-[124px] md:w-auto"
        />
      </div>
    </div>
  );
}
