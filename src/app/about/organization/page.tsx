"use client";

import Image from "next/image";
import { BackButton } from "@/components/buttons";
import { useGetAboutQuery } from "@/services/strapiApi";
import { getResponsiveImageUrl } from "@/utils/strapiUrl";

export default function OrganizationPage() {
  const { data, isFetching, isError } = useGetAboutQuery();
  const organizationData = data?.data ?? null;

  // Отладка: проверяем, что приходит из API
  if (typeof window !== "undefined") {
    console.log("Organization API Response:", data);
    console.log("Organization Data:", organizationData);
    console.log("Is Fetching:", isFetching);
    console.log("Is Error:", isError);
  }

  // Статические данные как fallback
  const staticData = {
    center_photo: null,
    introduction_texts: [
      "Областное бюджетное учреждение «Региональный центр подготовки граждан РФ к военной службе и военно-патриотического воспитания населения Липецкой области» создано на основании Постановления администрации Липецкой области №206 от 23.04.2013 «О создании областного бюджетного учреждения «Региональный центр подготовки граждан РФ к военной службе и военно-патриотического воспитания населения Липецкой области».",
      "Учреждение осуществляет функции по созданию условий для развития и совершенствования системы гражданско-патриотического воспитания населения Липецкой области и допризывной подготовки молодежи.",
      "Учреждение осуществляет свою деятельность в соответствии с Федеральным законом от 12 января 1996 года N 7-ФЗ «О некоммерческих организациях», Законом Липецкой области от 28 апреля 2010 года N 377-ОЗ «О молодежной политике в Липецкой области», постановлением администрации Липецкой области от 24 ноября 2010 года N 400 «Об утверждении Порядка принятия решений о создании областного бюджетного и казенного учреждения, о реорганизации и проведения реорганизации областных бюджетных или казенных учреждении, о ликвидации и проведения ликвидации областного бюджетного, казенного или автономного учреждения, изменения типа областного бюджетного учреждения в целях создания областного казенного учреждения, изменения типа областного казенного учреждения в целях создания областного бюджетного учреждения, утверждения устава областного бюджетного или казенного учреждения и внесения в него изменений», Уставом Липецкой области. Учредителем Учреждения выступает министерство молодёжной политики Липецкой области.",
    ],
    goal_title: "Цель деятельности Учреждения:",
    goal_text:
      "Развитие общественно-государственной системы патриотического и духовно-нравственного воспитания детей, подростков, молодежи и населения Липецкой области, способной на основе формирования гражданско-патриотических чувств и сознания обеспечить решение задач по консолидации общества, поддержанию общественной и экономической стабильности.",
    subject_title: "Предмет деятельности Учреждения:",
    subject_text:
      "Предмет деятельности Учреждения – выполнение работ, оказание услуг физическим и юридическим лицам в сфере молодежной политики по направлению патриотического воспитания, в том числе на основе государственного задания.",
    activities_title: "Основные виды деятельности Учреждения:",
    activities: [
      "Организация реализации мероприятий областной (ведомственной) целевой программы и планов мероприятий, проектов и программ в сфере государственной молодежной политики по направлению патриотического воспитания;",
      "Информирование органов государственной власти, органов местного самоуправления, физических и юридических лиц о реализации молодежной политики по направлению патриотического воспитания на федеральном, региональном и муниципальном уровнях;",
      "Создание справочно-информационной базы данных о проведении военно-патриотических, поисковых работ и мероприятий по подготовке молодежи к военной службе;",
      "Организация и проведение мероприятий, направленных на формирование у молодежи основ здорового образа жизни, в том числе военно-спортивных соревнований, игр, слетов, сборов, походов, оборонно-спортивных оздоровительных лагерей для подростков и молодежи;",
      "Координация проведения поисковых работ на территории Липецкой области;",
      "Содействие органам исполнительной власти Липецкой области и общественным объединениям в военно-патриотическом воспитании и подготовке молодежи к военной службе, проведении мероприятий военно-патриотической направленности на территории Липецкой области;",
      "Информирование населения Липецкой области о деятельности Учреждения выступает министерство молодёжной политики.",
    ],
  };

  // Используем данные из Strapi или fallback на статические
  // Проверяем наличие данных и используем их, если они есть
  const hasData = organizationData !== null && organizationData !== undefined;

  const centerPhoto =
    hasData && organizationData.center_photo
      ? getResponsiveImageUrl(organizationData.center_photo, "large") ||
        "/images/center-photo.png"
      : "/images/center-photo.png";

  // Обрабатываем introduction_texts - может быть строкой или массивом
  let introductionTexts: string[] = staticData.introduction_texts;
  if (hasData && organizationData.introduction_texts) {
    const introData = organizationData.introduction_texts;
    if (Array.isArray(introData)) {
      if (introData.length > 0) {
        introductionTexts = introData;
      }
    } else {
      // Проверяем, что это строка
      const textValue = String(introData).trim();
      if (textValue) {
        introductionTexts = [textValue];
      }
    }
  }

  const goalTitle =
    hasData && organizationData.goal_title && organizationData.goal_title.trim()
      ? organizationData.goal_title
      : staticData.goal_title;
  const goalText =
    hasData && organizationData.goal_text && organizationData.goal_text.trim()
      ? organizationData.goal_text
      : staticData.goal_text;
  const subjectTitle =
    hasData &&
    organizationData.subject_title &&
    organizationData.subject_title.trim()
      ? organizationData.subject_title
      : staticData.subject_title;
  const subjectText =
    hasData &&
    organizationData.subject_text &&
    organizationData.subject_text.trim()
      ? organizationData.subject_text
      : staticData.subject_text;
  const activitiesTitle =
    hasData &&
    organizationData.activities_title &&
    organizationData.activities_title.trim()
      ? organizationData.activities_title
      : staticData.activities_title;
  // Обрабатываем activities - может быть строкой или массивом
  let activities: string[] = staticData.activities;
  if (hasData && organizationData.activities) {
    const activitiesData = organizationData.activities;
    if (Array.isArray(activitiesData)) {
      if (activitiesData.length > 0) {
        activities = activitiesData;
      }
    } else {
      // Проверяем, что это строка
      const textValue = String(activitiesData).trim();
      if (textValue) {
        // Разбиваем строку по точкам с запятой или переводам строк
        activities = textValue
          .split(/[;\n]/)
          .map((item: string) => item.trim())
          .filter((item: string) => item.length > 0);
      }
    }
  }

  if (isFetching && !organizationData) {
    return (
      <div className="w-full max-w-[1920px] mx-auto px-[16px] sm:px-[32px] md:px-[36px] lg:px-[64px] xl:px-[80px] pb-[30px] sm:pb-[40px] lg:pb-[50px]">
        <div className="flex justify-center items-center py-20">
          <div className="text-[12px] md:text-[16px] lg:text-[24px] font-montserrat font-normal text-gray-600">
            Загрузка...
          </div>
        </div>
      </div>
    );
  }

  // Показываем предупреждение, если данные не загрузились, но используем fallback
  const showFallbackWarning = !isFetching && !hasData && !isError;

  return (
    <div className="w-full max-w-[1920px] mx-auto px-[16px] sm:px-[32px] md:px-[36px] lg:px-[64px] xl:px-[80px] pb-[30px] sm:pb-[40px] lg:pb-[50px]">
      {/* Предупреждение, если данные не загрузились */}
      {showFallbackWarning && (
        <div className="mb-4 rounded-lg bg-yellow-100 px-4 py-3">
          <p className="text-[12px] md:text-[16px] font-montserrat font-normal text-yellow-800">
            ⚠️ Данные из Strapi не загружены. Отображаются статические данные.
            Проверьте консоль браузера для отладки.
          </p>
        </div>
      )}
      {/* Center Photo */}
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[666px] mb-[20px] sm:mb-[75px] md:mb-[30px] lg:mb-[71px] rounded-[10px] sm:rounded-[15px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <Image
          src={centerPhoto}
          alt="Центр подготовки граждан РФ к военной службе"
          width={870}
          height={580}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Blocks */}
      <div className="bg-white rounded-[10px] px-[19px] pt-[20px] pb-[30px] md:rounded-[12px] md:px-[30px] md:pt-[30px] lg:rounded-[15px] lg:px-[80px] lg:pt-[71px] lg:pb-[65px]">
        <div className="space-y-[30px] sm:space-y-[40px]">
          <div className="space-y-0 md:space-y-0 lg:space-y-0">
            {/* Introduction Text */}
            <div className="pl-0 pr-0 space-y-[20px] md:space-y-[15px] sm:space-y-[30px] lg:space-y-[40px] mb-[30px] md:mb-[40px] lg:mb-[69px]">
              {introductionTexts.map((text, index) => (
                <p
                  key={index}
                  className="text-[12px] md:text-[16px] lg:text-[24px] font-montserrat font-normal md:font-medium leading-[1.666] md:leading-[1.5625] lg:leading-[1.458] text-black"
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Goal Block */}
            <div className="mb-[30px] md:mb-[40px] lg:mb-[34px]">
              <h2 className="text-[20px] sm:text-[28px] md:text-[30px] lg:text-[36px] xl:text-[40px] font-montserrat font-medium leading-[1.25] sm:leading-[1.1] md:leading-[1] lg:leading-[30px] text-black mb-[20px] sm:mb-[25px] md:mb-[20px] lg:mb-[29px] pl-[30px] sm:pl-[40px] md:pl-0 lg:pl-0">
                {goalTitle}
              </h2>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-[8px] sm:w-[10px] lg:w-[13px] bg-[#1D4E89] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
                <p className="text-[12px] md:text-[16px] lg:text-[24px] font-montserrat font-normal md:font-medium leading-[1.666] md:leading-[1.5625] lg:leading-[1.458] text-black pl-[30px] sm:pl-[40px] md:pl-[30px] lg:pl-[33px]">
                  {goalText}
                </p>
              </div>
            </div>

            {/* Subject Block */}
            <div className="mb-[30px] md:mb-[40px] lg:mb-[75px]">
              <h2 className="text-[20px] sm:text-[28px] md:text-[30px] lg:text-[36px] xl:text-[40px] font-montserrat font-medium leading-[1.25] sm:leading-[1.1] md:leading-[1] lg:leading-[30px] text-black mb-[20px] sm:mb-[25px] md:mb-[20px] lg:mb-[29px] pl-[30px] sm:pl-[40px] md:pl-0 lg:pl-0">
                {subjectTitle}
              </h2>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-[8px] sm:w-[10px] lg:w-[13px] bg-[#1D4E89] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
                <p className="text-[12px] md:text-[16px] lg:text-[24px] font-montserrat font-normal md:font-medium leading-[1.666] md:leading-[1.5625] lg:leading-[1.458] text-black pl-[30px] sm:pl-[40px] md:pl-[30px] lg:pl-[33px]">
                  {subjectText}
                </p>
              </div>
            </div>

            {/* Main Activities Block */}
            <div>
              <h2 className="text-[20px] sm:text-[28px] md:text-[30px] lg:text-[36px] xl:text-[40px] font-montserrat font-medium leading-[1.25] sm:leading-[1.1] md:leading-[1] lg:leading-[30px] text-black mb-[20px] sm:mb-[25px] md:mb-[20px] lg:mb-[29px] pl-[30px] sm:pl-[40px] md:pl-0 lg:pl-0">
                {activitiesTitle}
              </h2>

              <div className="space-y-[20px] sm:space-y-[25px] md:space-y-[15px] lg:space-y-[30px]">
                {activities.map((activity, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-[6px] sm:w-[8px] lg:w-[13px] bg-[#C62828] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
                    <p className="text-[12px] md:text-[16px] lg:text-[24px] font-montserrat font-normal md:font-medium leading-[1.666] md:leading-[1.5625] lg:leading-[1.458] text-black pl-[30px] sm:pl-[40px] md:pl-[30px] lg:pl-[33px]">
                      {activity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Back Button - positioned at bottom */}
            <div className="flex justify-center md:justify-start mt-[30px] sm:mt-[75px] md:mt-[40px] md:pb-[40px] lg:mt-[45px] lg:pb-0 pl-[30px] sm:pl-[40px] md:pl-0 lg:pl-0 pr-[30px] sm:pr-[40px] md:pr-0 lg:pr-0">
              <BackButton href="/about" variant="default" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
