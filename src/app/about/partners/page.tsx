"use client";

import { useRouter } from "next/navigation";
import PartnerCard from "@/components/cards/PartnerCard";
import { BackButton } from "@/components/buttons";

// Данные партнеров (пока статические, как в примере)
const partnersData = [
  {
    id: 1,
    title:
      "Региональный штаб Всероссийского военно-патриотического общественного движения «Юнармия»",
    image: "/images/partners/partner-bg.png",
    websiteUrl: "https://yunarmy.ru",
    websiteText: "https://yunarmy.ru",
    vkUrl: "https://vk.com/yunarmy_lipetsk",
    vkText: "https://vk.com/yunarmy_lipetsk",
  },
  {
    id: 2,
    title:
      "Региональный штаб Всероссийского военно-патриотического общественного движения «Юнармия»",
    image: "/images/partners/partner-bg.png",
    websiteUrl: "https://yunarmy.ru",
    websiteText: "https://yunarmy.ru",
    vkUrl: "https://vk.com/yunarmy_lipetsk",
    vkText: "https://vk.com/yunarmy_lipetsk",
  },
  {
    id: 3,
    title:
      "Региональный штаб Всероссийского военно-патриотического общественного движения «Юнармия»",
    image: "/images/partners/partner-bg.png",
    websiteUrl: "https://yunarmy.ru",
    websiteText: "https://yunarmy.ru",
    vkUrl: "https://vk.com/yunarmy_lipetsk",
    vkText: "https://vk.com/yunarmy_lipetsk",
  },
  {
    id: 4,
    title:
      "Региональный штаб Всероссийского военно-патриотического общественного движения «Юнармия»",
    image: "/images/partners/partner-bg.png",
    websiteUrl: "https://yunarmy.ru",
    websiteText: "https://yunarmy.ru",
    vkUrl: "https://vk.com/yunarmy_lipetsk",
    vkText: "https://vk.com/yunarmy_lipetsk",
  },
  {
    id: 5,
    title:
      "Региональный штаб Всероссийского военно-патриотического общественного движения «Юнармия»",
    image: "/images/partners/partner-bg.png",
    websiteUrl: "https://yunarmy.ru",
    websiteText: "https://yunarmy.ru",
    vkUrl: "https://vk.com/yunarmy_lipetsk",
    vkText: "https://vk.com/yunarmy_lipetsk",
  },
  {
    id: 6,
    title:
      "Региональный штаб Всероссийского военно-патриотического общественного движения «Юнармия»",
    image: "/images/partners/partner-bg.png",
    websiteUrl: "https://yunarmy.ru",
    websiteText: "https://yunarmy.ru",
    vkUrl: "https://vk.com/yunarmy_lipetsk",
    vkText: "https://vk.com/yunarmy_lipetsk",
  },
];

export default function PartnersPage() {
  const router = useRouter();
  
  return (
    <div className="w-full max-w-[1920px] mx-auto px-[35px] sm:px-[36px] lg:px-[80px] pb-[30px] lg:pb-[194px]">
      {/* Partners Grid - точные gap из макетов */}
      <div className="mb-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[20px] gap-x-[20px] md:gap-y-[20px] md:gap-x-[28px] lg:gap-y-[89px] lg:gap-x-[19px]">
          {partnersData.map((partner) => (
            <PartnerCard
              key={partner.id}
              title={partner.title}
              image={partner.image}
              websiteUrl={partner.websiteUrl}
              websiteText={partner.websiteText}
              vkUrl={partner.vkUrl}
              vkText={partner.vkText}
            />
          ))}
        </div>
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
