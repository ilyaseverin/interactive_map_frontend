"use client";

import Image from "next/image";

interface Person {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  image: string;
  description?: string;
}

interface PersonCardProps {
  person: Person;
}

export default function PersonCard({ person }: PersonCardProps) {
  return (
    <div className="relative w-full max-w-[1252px] mx-auto">
      {/* Shadow - адаптивная */}
      <div
        className="absolute w-full h-full bg-[#1D4E89] rounded-[15px] -z-10"
        style={{
          transform: "translate(24px, 19px)",
          filter: "blur(37px)",
        }}
      />
      <div
        className="absolute w-full h-full bg-[#1D4E89] rounded-[15px] -z-10 sm:block hidden"
        style={{
          transform: "translate(32px, 25px)",
          filter: "blur(55px)",
        }}
      />
      <div
        className="absolute w-full h-full bg-[#1D4E89] rounded-[15px] -z-10 md:block hidden"
        style={{
          transform: "translate(40px, 32px)",
          filter: "blur(65px)",
        }}
      />
      <div
        className="absolute w-full h-full bg-[#1D4E89] rounded-[15px] -z-10 lg:block hidden"
        style={{
          transform: "translate(48px, 38px)",
          filter: "blur(74px)",
        }}
      />

      {/* Main Card - адаптивная высота */}
      <div className="relative bg-white rounded-[15px] w-full h-[200px] sm:h-[220px] md:h-[250px] lg:h-[275px] overflow-hidden">
        {/* Photo - адаптивное позиционирование */}
        <div className="absolute w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[170px] md:h-[170px] lg:w-[199px] lg:h-[199px] rounded-full overflow-hidden left-[20px] top-[20px] sm:left-[40px] sm:top-[30px] md:left-[60px] md:top-[35px] lg:left-[81px] lg:top-[38px]">
          <Image
            src={person.image}
            alt={person.name}
            width={199}
            height={199}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk5IiBoZWlnaHQ9IjE5OSIgdmlld0JveD0iMCAwIDE5OSAxOTkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxOTkiIGhlaWdodD0iMTk5IiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9Ijk5LjUiIGN5PSI5OS41IiByPSI0MCIgZmlsbD0iI0Q1RjVGNyIvPgo8cGF0aCBkPSJNMTE5LjUgMTE5LjVIMTQ5LjVWMTQ5LjVIMTE5LjVWMTE5LjVaIiBmaWxsPSIjQzVEMUQ1Ii8+CjxwYXRoIGQ9Ik0xMTkuNSAxNDkuNUgxNDkuNVYxNzkuNUgxMTkuNVYxNDkuNVoiIGZpbGw9IiNDNUQxRDUiLz4KPHN2ZyB4PSI3OSIgeT0iNzkiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTIwIDIxVjE5QzIwIDE2Ljc5IDE4LjIxIDE1IDE2IDE1SDhDNS43OSAxNSA0IDE2Ljc5IDQgMTlWMjFIMjBaIiBzdHJva2U9IiM2Qjc1ODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCIgc3Ryb2tlPSIjNkI3NTgwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4KPC9zdmc+";
            }}
          />
        </div>

        {/* Information - точно как в макете с адаптивностью */}
        <div className="absolute left-[160px] top-[20px] w-[calc(100%-180px)] h-[calc(100%-40px)] sm:left-[200px] sm:top-[25px] sm:w-[calc(100%-220px)] sm:h-[calc(100%-50px)] md:left-[250px] md:top-[28px] md:w-[calc(100%-270px)] md:h-[calc(100%-56px)] lg:left-[329px] lg:top-[30px] lg:w-[calc(100%-349px)] lg:h-[calc(100%-60px)]">
          {/* Name - точно как в макете: 0px, 0px, 399x78px */}
          <div className="absolute left-0 top-0 w-[399px] h-[78px]">
            <h3 className="text-[18px] sm:text-[22px] md:text-[26px] lg:text-[32px] font-montserrat font-normal leading-[1.22] text-black">
              {person.name}
            </h3>
          </div>

          {/* Position - точно как в макете: 3px, 95px, 703x58px */}
          <div className="absolute left-[3px] top-[95px] w-[703px] h-[58px]">
            <p className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-montserrat font-normal leading-[1.22] text-black">
              {person.position}
            </p>
          </div>

          {/* Contact Information - точно как в макете */}
          <div className="absolute left-0 top-[165px] w-[543px] h-[40px]">
            {/* Email - точно как в макете: 0px, 165px, 40x40px иконка + 53px отступ */}
            <div className="absolute flex items-center left-0 top-0">
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px] flex items-center justify-center flex-shrink-0">
                <Image
                  src="/images/management/email-icon-direct.png"
                  alt="Email"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <a
                href={`mailto:${person.email}`}
                className="ml-[8px] sm:ml-[10px] md:ml-[12px] lg:ml-[13px] text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-montserrat font-normal leading-[1.25] text-black hover:text-[#1D4E89] transition-colors whitespace-nowrap"
              >
                {person.email}
              </a>
            </div>

            {/* Phone - точно как в макете: 275px, 165px, 40x40px иконка + 53px отступ */}
            <div className="absolute flex items-center left-[275px] top-0">
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px] flex items-center justify-center flex-shrink-0">
                <Image
                  src="/images/management/phone-icon-direct.png"
                  alt="Phone"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <a
                href={`tel:${person.phone}`}
                className="ml-[8px] sm:ml-[10px] md:ml-[12px] lg:ml-[13px] text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-montserrat font-normal leading-[1.25] text-black hover:text-[#1D4E89] transition-colors whitespace-nowrap"
              >
                {person.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
