"use client";

import PartnerCard from "@/components/cards/PartnerCard";

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
  return (
    <div className="w-full px-[16px] sm:px-[32px] md:px-[48px] lg:px-[64px] xl:px-[76px] pb-[30px] sm:pb-[40px] lg:pb-[50px]">
      {/* Partners Grid - точно как в макете */}
      <div className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[112px] mb-[100px] sm:mb-[120px] md:mb-[150px] lg:mb-[194px]">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] sm:gap-[40px] lg:gap-[50px]">
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
    </div>
  );
}
