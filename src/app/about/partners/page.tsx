"use client";

import { useRouter } from "next/navigation";
import PartnerCard from "@/components/cards/PartnerCard";
import { BackButton } from "@/components/buttons";
import { useGetPartnersQuery } from "@/services/strapiApi";
import { useCallback } from "react";
import { StrapiImage } from "@/types/strapi";
import { getResponsiveImageUrl } from "@/utils/strapiUrl";

export default function PartnersPage() {
  const router = useRouter();

  // Получаем партнеров из API
  const { data: partnersData, isLoading: isPartnersLoading } =
    useGetPartnersQuery({
      page: 1,
      pageSize: 100,
    });

  // Получаем URL изображения с учетом адаптивности
  const getImageUrl = useCallback(
    (
      image: StrapiImage | string | undefined | null,
      fallback: string,
      size: "thumbnail" | "small" | "medium" | "large" | "original" = "medium"
    ): string => {
      if (typeof image === "string") {
        return image;
      }
      if (!image) {
        return fallback;
      }
      return getResponsiveImageUrl(image, size) || fallback;
    },
    []
  );

  if (isPartnersLoading) {
    return (
      <div className="w-full max-w-[1920px] mx-auto px-[35px] sm:px-[36px] lg:px-[80px] pb-[30px] lg:pb-[194px]">
        <div className="flex justify-center items-center py-20">
          <div className="text-[12px] md:text-[16px] lg:text-[24px] font-montserrat font-normal text-gray-600">
            Загрузка...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1920px] mx-auto px-[35px] sm:px-[36px] lg:px-[80px] pb-[30px] lg:pb-[194px]">
      {/* Partners Grid - точные gap из макетов */}
      <div className="mb-[30px]">
        {partnersData?.data && partnersData.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[20px] gap-x-[20px] md:gap-y-[20px] md:gap-x-[28px] lg:gap-y-[89px] lg:gap-x-[19px]">
            {partnersData.data.map((partner) => (
              <PartnerCard
                key={partner.id}
                title={partner.name}
                image={getImageUrl(
                  partner.logo,
                  "/images/partners/partner-bg.png",
                  "medium"
                )}
                websiteUrl={partner.url || "#"}
                websiteText={partner.url || ""}
                vkUrl={partner.vk_url || "#"}
                vkText={partner.vk_url || ""}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-20">
            <div className="text-[12px] md:text-[16px] lg:text-[24px] font-montserrat font-normal text-gray-600">
              Партнеры не найдены
            </div>
          </div>
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
