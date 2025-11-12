"use client";

import { useRouter } from "next/navigation";
import PersonCard from "@/components/cards/PersonCard";
import { useGetManagementQuery } from "@/services/strapiApi";

export default function ManagementPage() {
  const router = useRouter();
  const { data, isFetching, isError } = useGetManagementQuery();
  const managementData = data?.data ?? [];

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
            Не удалось загрузить данные руководства. Попробуйте обновить
            страницу.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1920px] mx-auto px-[35px] sm:px-[36px] lg:px-[64px] xl:px-[80px] pb-[30px] lg:pb-[194px]">
      {/* Management Cards - точно как в макете: Mobile 20px, Tablet 25px, Desktop 65px */}
      <div className="mb-[30px] space-y-[20px] xs:space-y-[22px] sm:space-y-[25px] md:space-y-[25px] lg:space-y-[65px]">
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

      {/* Back button внизу - только для mobile и tablet */}
      <div className="flex lg:hidden md:block md:ml-0">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center justify-center gap-[10px] px-[24px] w-[124px] h-[40px] md:w-auto md:h-[48px] mx-auto md:mx-0 md:ml-[36px] border border-[#C62828] text-[#C62828] text-[12px] md:text-[16px] font-normal font-montserrat rounded-[12px] hover:bg-[#C62828] hover:text-white transition-colors leading-[1.219]"
        >
          <svg
            width="33"
            height="25"
            viewBox="0 0 33 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[18px] h-[13px] md:w-[33px] md:h-[25px]"
          >
            <path
              d="M6 13L22 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 6L6 12.5L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Назад
        </button>
      </div>
    </div>
  );
}
