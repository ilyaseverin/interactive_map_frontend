"use client";

import Image from "next/image";
import Link from "next/link";

export default function OrganizationPage() {
  return (
    <div className="w-full px-[16px] sm:px-[32px] md:px-[48px] lg:px-[64px] xl:px-[76px] pb-[30px] sm:pb-[40px] lg:pb-[50px]">
      {/* Center Photo */}
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[666px] mb-[50px] sm:mb-[75px] lg:mb-[100px] rounded-[10px] sm:rounded-[15px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <Image
          src="/images/center-photo.png"
          alt="Центр подготовки граждан РФ к военной службе"
          width={870}
          height={580}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Blocks */}
      <div className="space-y-[30px] sm:space-y-[40px] lg:space-y-[50px]">
        {/* Introduction Text */}
        <div className="space-y-[20px] sm:space-y-[30px] lg:space-y-[40px]">
          <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.4] sm:leading-[1.5] lg:leading-[35px] text-black">
            Областное бюджетное учреждение «Региональный центр подготовки
            граждан РФ к военной службе и военно-патриотического воспитания
            населения Липецкой области» создано на основании Постановления
            администрации Липецкой области №206 от 23.04.2013 «О создании
            областного бюджетного учреждения «Региональный центр подготовки
            граждан РФ к военной службе и военно-патриотического воспитания
            населения Липецкой области».
          </p>

          <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.4] sm:leading-[1.5] lg:leading-[35px] text-black">
            Учреждение осуществляет функции по созданию условий для развития и
            совершенствования системы гражданско-патриотического воспитания
            населения Липецкой области и допризывной подготовки молодежи.
          </p>

          <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.4] sm:leading-[1.5] lg:leading-[35px] text-black">
            Учреждение осуществляет свою деятельность в соответствии с
            Федеральным законом от 12 января 1996 года N 7-ФЗ «О некоммерческих
            организациях», Законом Липецкой области от 28 апреля 2010 года N
            377-ОЗ «О молодежной политике в Липецкой области», постановлением
            администрации Липецкой области от 24 ноября 2010 года N 400 «Об
            утверждении Порядка принятия решений о создании областного
            бюджетного и казенного учреждения, о реорганизации и проведения
            реорганизации областных бюджетных или казенных учреждении, о
            ликвидации и проведения ликвидации областного бюджетного, казенного
            или автономного учреждения, изменения типа областного бюджетного
            учреждения в целях создания областного казенного учреждения,
            изменения типа областного казенного учреждения в целях создания
            областного бюджетного учреждения, утверждения устава областного
            бюджетного или казенного учреждения и внесения в него изменений»,
            Уставом Липецкой области. Учредителем Учреждения выступает
            министерство молодёжной политики Липецкой области.
          </p>
        </div>

        {/* Goal Block */}
        <div className="relative">
          <div className="absolute left-0 top-[30px] sm:top-[40px] lg:top-[58px] w-[8px] sm:w-[10px] lg:w-[13px] h-[60px] sm:h-[80px] lg:h-[115px] bg-[#1D4E89] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-montserrat font-medium leading-[1.2] sm:leading-[1.1] lg:leading-[30px] text-black mb-[20px] sm:mb-[25px] lg:mb-[30px] ml-[30px] sm:ml-[40px] lg:ml-[54px]">
            Цель деятельности Учреждения:
          </h2>
          <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.4] sm:leading-[1.5] lg:leading-[37px] text-black ml-[30px] sm:ml-[40px] lg:ml-[54px]">
            Развитие общественно-государственной системы патриотического и
            духовно-нравственного воспитания детей, подростков, молодежи и
            населения Липецкой области, способной на основе формирования
            гражданско-патриотических чувств и сознания обеспечить решение задач
            по консолидации общества, поддержанию общественной и экономической
            стабильности.
          </p>
        </div>

        {/* Subject Block */}
        <div className="relative">
          <div className="absolute left-0 top-[30px] sm:top-[40px] lg:top-[60px] w-[8px] sm:w-[10px] lg:w-[13px] h-[40px] sm:h-[55px] lg:h-[75px] bg-[#1D4E89] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-montserrat font-medium leading-[1.2] sm:leading-[1.1] lg:leading-[30px] text-black mb-[20px] sm:mb-[25px] lg:mb-[30px] ml-[30px] sm:ml-[40px] lg:ml-[54px]">
            Предмет деятельности Учреждения:
          </h2>
          <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.4] sm:leading-[1.5] lg:leading-[37px] text-black ml-[30px] sm:ml-[40px] lg:ml-[54px]">
            Предмет деятельности Учреждения – выполнение работ, оказание услуг
            физическим и юридическим лицам в сфере молодежной политики по
            направлению патриотического воспитания, в том числе на основе
            государственного задания.
          </p>
        </div>

        {/* Main Activities Block */}
        <div>
          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-montserrat font-medium leading-[1.2] sm:leading-[1.1] lg:leading-[30px] text-black mb-[20px] sm:mb-[25px] lg:mb-[29px] ml-[30px] sm:ml-[40px] lg:ml-[54px]">
            Основные виды деятельности Учреждения:
          </h2>

          <div className="space-y-[20px] sm:space-y-[25px] lg:space-y-[30px]">
            {/* Activity 1 */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-[6px] sm:w-[8px] lg:w-[11px] h-[40px] sm:h-[55px] lg:h-[75px] bg-[#C62828] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
              <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.4] sm:leading-[1.5] lg:leading-[37px] text-black ml-[30px] sm:ml-[40px] lg:ml-[54px]">
                Организация реализации мероприятий областной (ведомственной)
                целевой программы и планов мероприятий, проектов и программ в
                сфере государственной молодежной политики по направлению
                патриотического воспитания;
              </p>
            </div>

            {/* Activity 2 */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-[6px] sm:w-[8px] lg:w-[13px] h-[60px] sm:h-[80px] lg:h-[115px] bg-[#C62828] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
              <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.4] sm:leading-[1.5] lg:leading-[37px] text-black ml-[30px] sm:ml-[40px] lg:ml-[54px]">
                Информирование органов государственной власти, органов местного
                самоуправления, физических и юридических лиц о реализации
                молодежной политики по направлению патриотического воспитания на
                федеральном, региональном и муниципальном уровнях;
              </p>
            </div>

            {/* Activity 3 */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-[6px] sm:w-[8px] lg:w-[13px] h-[40px] sm:h-[55px] lg:h-[75px] bg-[#C62828] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
              <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.4] sm:leading-[1.5] lg:leading-[37px] text-black ml-[30px] sm:ml-[40px] lg:ml-[54px]">
                Создание справочно-информационной базы данных о проведении
                военно-патриотических, поисковых работ и мероприятий по
                подготовке молодежи к военной службе;
              </p>
            </div>

            {/* Activity 4 */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-[6px] sm:w-[8px] lg:w-[13px] h-[60px] sm:h-[80px] lg:h-[115px] bg-[#C62828] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
              <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.4] sm:leading-[1.5] lg:leading-[37px] text-black ml-[30px] sm:ml-[40px] lg:ml-[54px]">
                Организация и проведение мероприятий, направленных на
                формирование у молодежи основ здорового образа жизни, в том
                числе военно-спортивных соревнований, игр, слетов, сборов,
                походов, оборонно-спортивных оздоровительных лагерей для
                подростков и молодежи;
              </p>
            </div>

            {/* Activity 5 */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-[6px] sm:w-[8px] lg:w-[13px] h-[25px] sm:h-[35px] lg:h-[50px] bg-[#C62828] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
              <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.4] sm:leading-[1.5] lg:leading-[37px] text-black ml-[30px] sm:ml-[40px] lg:ml-[54px]">
                Координация проведения поисковых работ на территории Липецкой
                области;
              </p>
            </div>

            {/* Activity 6 */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-[6px] sm:w-[8px] lg:w-[13px] h-[60px] sm:h-[80px] lg:h-[115px] bg-[#C62828] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
              <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.4] sm:leading-[1.5] lg:leading-[37px] text-black ml-[30px] sm:ml-[40px] lg:ml-[54px]">
                Содействие органам исполнительной власти Липецкой области и
                общественным объединениям в военно-патриотическом воспитании и
                подготовке молодежи к военной службе, проведении мероприятий
                военно-патриотической направленности на территории Липецкой
                области;
              </p>
            </div>

            {/* Activity 7 */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-[6px] sm:w-[8px] lg:w-[13px] h-[20px] sm:h-[30px] lg:h-[40px] bg-[#C62828] rounded-[5px] sm:rounded-[8px] lg:rounded-[10px]"></div>
              <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-montserrat font-medium leading-[1.4] sm:leading-[1.5] lg:leading-[37px] text-black ml-[30px] sm:ml-[40px] lg:ml-[54px]">
                Информирование населения Липецкой области о деятельности
                Учреждения выступает министерство молодёжной политики.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button - positioned at bottom */}
      <div className="flex justify-center mt-[50px] sm:mt-[75px] lg:mt-[100px]">
        <Link
          href="/about"
          className="flex items-center gap-[8px] sm:gap-[10px] px-[16px] sm:px-[20px] lg:px-[24px] py-[12px] sm:py-[14px] lg:py-[16px] border border-[#C62828] rounded-[8px] sm:rounded-[10px] lg:rounded-[12px] text-[#C62828] text-[16px] sm:text-[18px] lg:text-[20px] font-montserrat hover:bg-red-50 transition-colors"
        >
          <svg
            width="24"
            height="18"
            viewBox="0 0 33 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[20px] h-[15px] sm:w-[24px] sm:h-[18px] lg:w-[33px] lg:h-[25px]"
          >
            <path
              d="M6 13H27M6 13L13 6M6 13L13 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Назад
        </Link>
      </div>
    </div>
  );
}
