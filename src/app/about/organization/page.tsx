"use client";

import Image from "next/image";
import { BackButton } from "@/components/buttons";

export default function OrganizationPage() {
  return (
    <div className="w-full max-w-[1920px] mx-auto px-[16px] sm:px-[32px] md:px-[36px] lg:px-[64px] xl:px-[80px] pb-[30px] sm:pb-[40px] lg:pb-[50px]">
      {/* Center Photo */}
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[666px] mb-[20px] sm:mb-[75px] md:mb-[30px] lg:mb-[71px] rounded-[10px] sm:rounded-[15px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <Image
          src="/images/center-photo.png"
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
              <p className="text-[12px] md:text-[16px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.667] md:leading-[1.875] lg:leading-[35px] text-black">
                Областное бюджетное учреждение «Региональный центр подготовки
                граждан РФ к военной службе и военно-патриотического воспитания
                населения Липецкой области» создано на основании Постановления
                администрации Липецкой области №206 от 23.04.2013 «О создании
                областного бюджетного учреждения «Региональный центр подготовки
                граждан РФ к военной службе и военно-патриотического воспитания
                населения Липецкой области».
              </p>

              <p className="text-[12px] md:text-[16px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.667] md:leading-[1.875] lg:leading-[35px] text-black">
                Учреждение осуществляет функции по созданию условий для развития
                и совершенствования системы гражданско-патриотического
                воспитания населения Липецкой области и допризывной подготовки
                молодежи.
              </p>

              <p className="text-[12px] md:text-[16px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.667] md:leading-[1.875] lg:leading-[35px] text-black">
                Учреждение осуществляет свою деятельность в соответствии с
                Федеральным законом от 12 января 1996 года N 7-ФЗ «О
                некоммерческих организациях», Законом Липецкой области от 28
                апреля 2010 года N 377-ОЗ «О молодежной политике в Липецкой
                области», постановлением администрации Липецкой области от 24
                ноября 2010 года N 400 «Об утверждении Порядка принятия решений
                о создании областного бюджетного и казенного учреждения, о
                реорганизации и проведения реорганизации областных бюджетных или
                казенных учреждении, о ликвидации и проведения ликвидации
                областного бюджетного, казенного или автономного учреждения,
                изменения типа областного бюджетного учреждения в целях создания
                областного казенного учреждения, изменения типа областного
                казенного учреждения в целях создания областного бюджетного
                учреждения, утверждения устава областного бюджетного или
                казенного учреждения и внесения в него изменений», Уставом
                Липецкой области. Учредителем Учреждения выступает министерство
                молодёжной политики Липецкой области.
              </p>
            </div>

            {/* Goal Block */}
            <div className="mb-[30px] md:mb-[40px] lg:mb-[34px]">
              <h2 className="text-[20px] sm:text-[28px] md:text-[30px] lg:text-[36px] xl:text-[40px] font-montserrat font-medium leading-[1.25] sm:leading-[1.1] md:leading-[1] lg:leading-[30px] text-black mb-[20px] sm:mb-[25px] md:mb-[20px] lg:mb-[38px] pl-[30px] sm:pl-[40px] md:pl-0 lg:pl-0">
                Цель деятельности Учреждения:
              </h2>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-[8px] sm:w-[10px] lg:w-[13px] bg-[#1D4E89] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
                <p className="text-[12px] md:text-[16px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.667] md:leading-[1.875] lg:leading-[37px] text-black pl-[30px] sm:pl-[40px] md:pl-[30px] lg:pl-[33px]">
                  Развитие общественно-государственной системы патриотического и
                  духовно-нравственного воспитания детей, подростков, молодежи и
                  населения Липецкой области, способной на основе формирования
                  гражданско-патриотических чувств и сознания обеспечить решение
                  задач по консолидации общества, поддержанию общественной и
                  экономической стабильности.
                </p>
              </div>
            </div>

            {/* Subject Block */}
            <div className="mb-[30px] md:mb-[40px] lg:mb-[75px]">
              <h2 className="text-[20px] sm:text-[28px] md:text-[30px] lg:text-[36px] xl:text-[40px] font-montserrat font-medium leading-[1.25] sm:leading-[1.1] md:leading-[1] lg:leading-[30px] text-black mb-[20px] sm:mb-[25px] md:mb-[20px] lg:mb-[30px] pl-[30px] sm:pl-[40px] md:pl-0 lg:pl-0">
                Предмет деятельности Учреждения:
              </h2>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-[8px] sm:w-[10px] lg:w-[13px] bg-[#1D4E89] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
                <p className="text-[12px] md:text-[16px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.667] md:leading-[1.875] lg:leading-[37px] text-black pl-[30px] sm:pl-[40px] md:pl-[30px] lg:pl-[33px]">
                  Предмет деятельности Учреждения – выполнение работ, оказание
                  услуг физическим и юридическим лицам в сфере молодежной
                  политики по направлению патриотического воспитания, в том
                  числе на основе государственного задания.
                </p>
              </div>
            </div>

            {/* Main Activities Block */}
            <div>
              <h2 className="text-[20px] sm:text-[28px] md:text-[30px] lg:text-[36px] xl:text-[40px] font-montserrat font-medium leading-[1.25] sm:leading-[1.1] md:leading-[1] lg:leading-[30px] text-black mb-[20px] sm:mb-[25px] md:mb-[20px] lg:mb-[29px] pl-[30px] sm:pl-[40px] md:pl-0 lg:pl-0">
                Основные виды деятельности Учреждения:
              </h2>

              <div className="space-y-[20px] sm:space-y-[25px] md:space-y-[15px] lg:space-y-[30px]">
                {/* Activity 1 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-[6px] sm:w-[8px] lg:w-[11px] bg-[#C62828] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
                  <p className="text-[12px] md:text-[16px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.667] md:leading-[1.875] lg:leading-[37px] text-black pl-[30px] sm:pl-[40px] md:pl-[30px] lg:pl-[33px]">
                    Организация реализации мероприятий областной (ведомственной)
                    целевой программы и планов мероприятий, проектов и программ
                    в сфере государственной молодежной политики по направлению
                    патриотического воспитания;
                  </p>
                </div>

                {/* Activity 2 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-[6px] sm:w-[8px] lg:w-[13px] bg-[#C62828] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
                  <p className="text-[12px] md:text-[16px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.667] md:leading-[1.875] lg:leading-[37px] text-black pl-[30px] sm:pl-[40px] md:pl-[30px] lg:pl-[33px]">
                    Информирование органов государственной власти, органов
                    местного самоуправления, физических и юридических лиц о
                    реализации молодежной политики по направлению
                    патриотического воспитания на федеральном, региональном и
                    муниципальном уровнях;
                  </p>
                </div>

                {/* Activity 3 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-[6px] sm:w-[8px] lg:w-[13px] bg-[#C62828] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
                  <p className="text-[12px] md:text-[16px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.667] md:leading-[1.875] lg:leading-[37px] text-black pl-[30px] sm:pl-[40px] md:pl-[30px] lg:pl-[33px]">
                    Создание справочно-информационной базы данных о проведении
                    военно-патриотических, поисковых работ и мероприятий по
                    подготовке молодежи к военной службе;
                  </p>
                </div>

                {/* Activity 4 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-[6px] sm:w-[8px] lg:w-[13px] bg-[#C62828] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
                  <p className="text-[12px] md:text-[16px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.667] md:leading-[1.875] lg:leading-[37px] text-black pl-[30px] sm:pl-[40px] md:pl-[30px] lg:pl-[33px]">
                    Организация и проведение мероприятий, направленных на
                    формирование у молодежи основ здорового образа жизни, в том
                    числе военно-спортивных соревнований, игр, слетов, сборов,
                    походов, оборонно-спортивных оздоровительных лагерей для
                    подростков и молодежи;
                  </p>
                </div>

                {/* Activity 5 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-[6px] sm:w-[8px] lg:w-[13px] bg-[#C62828] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
                  <p className="text-[12px] md:text-[16px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.667] md:leading-[1.875] lg:leading-[37px] text-black pl-[30px] sm:pl-[40px] md:pl-[30px] lg:pl-[33px]">
                    Координация проведения поисковых работ на территории
                    Липецкой области;
                  </p>
                </div>

                {/* Activity 6 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-[6px] sm:w-[8px] lg:w-[13px] bg-[#C62828] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
                  <p className="text-[12px] md:text-[16px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.667] md:leading-[1.875] lg:leading-[37px] text-black pl-[30px] sm:pl-[40px] md:pl-[30px] lg:pl-[33px]">
                    Содействие органам исполнительной власти Липецкой области и
                    общественным объединениям в военно-патриотическом воспитании
                    и подготовке молодежи к военной службе, проведении
                    мероприятий военно-патриотической направленности на
                    территории Липецкой области;
                  </p>
                </div>

                {/* Activity 7 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-[6px] sm:w-[8px] lg:w-[13px] bg-[#C62828] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
                  <p className="text-[12px] md:text-[16px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.667] md:leading-[1.875] lg:leading-[37px] text-black pl-[30px] sm:pl-[40px] md:pl-[30px] lg:pl-[33px]">
                    Информирование населения Липецкой области о деятельности
                    Учреждения выступает министерство молодёжной политики.
                  </p>
                </div>
              </div>
            </div>

            {/* Back Button - positioned at bottom */}
            <div className="flex justify-center md:justify-start mt-[30px] sm:mt-[75px] md:mt-[40px] md:pb-[40px] lg:mt-[45px] lg:pb-0 pl-[30px] sm:pl-[40px] md:pl-0 lg:pl-0 pr-[30px] sm:pr-[40px] md:pr-0 lg:pr-0">
              <BackButton
                href="/about"
                variant="default"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
