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
  // Разбиваем ФИО на две строки: Фамилия / Имя Отчество
  const formatName = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length >= 2) {
      const lastName = parts[0];
      const firstAndMiddle = parts.slice(1).join(" ");
      return { lastName, firstAndMiddle };
    }
    return { lastName: fullName, firstAndMiddle: "" };
  };

  const { lastName, firstAndMiddle } = formatName(person.name);

  return (
    <div className="relative w-full max-w-[250px] xs:max-w-[320px] sm:max-w-[500px] md:max-w-[696px] lg:max-w-[1252px] mx-auto">
      {/* Mobile shadow */}
      <div
        className="absolute w-[178px] h-[279.63px] bg-[#1D4E89] -z-10 md:hidden"
        style={{
          transform: "translate(36.27px, 33.8px)",
          filter: "blur(44px)",
        }}
      />
      {/* Tablet shadow */}
      <div
        className="absolute w-[619px] h-[130px] bg-[#1D4E89] -z-10 hidden md:block lg:hidden"
        style={{
          transform: "translate(36px, 44px)",
          filter: "blur(74px)",
        }}
      />
      {/* Desktop shadow */}
      <div
        className="absolute w-[1159px] h-[199px] bg-[#1D4E89] -z-10 hidden lg:block"
        style={{
          transform: "translate(48px, 38px)",
          filter: "blur(74px)",
        }}
      />

      <div className="relative bg-white rounded-[15px] w-full overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-start pt-[25px] pb-[25px] px-[25px] xs:pt-[28px] xs:pb-[28px] xs:px-[30px] sm:pt-[32px] sm:pb-[32px] sm:px-[35px] md:pt-[44px] md:pb-[30px] md:pl-[36px] md:pr-[30px] lg:pt-[38px] lg:pb-[30px] lg:pl-[81px] lg:pr-[30px]">
          <div className="flex-shrink-0 mx-auto md:mx-0 mb-[25px] xs:mb-[28px] sm:mb-[32px] md:mb-0">
            <div className="w-[130px] h-[130px] xs:w-[135px] xs:h-[135px] sm:w-[140px] sm:h-[140px] md:w-[130px] md:h-[130px] lg:w-[199px] lg:h-[199px] rounded-full overflow-hidden">
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
          </div>

          <div className="flex-1 flex flex-col gap-[14px] xs:gap-[15px] sm:gap-[16px] md:gap-0 min-w-0 md:ml-[38px] lg:ml-[48px]">
            <div className="md:mb-[9px] lg:mb-[24px]">
              <h3 className="text-[12px] xs:text-[13px] sm:text-[14px] md:text-[20px] lg:text-[32px] font-montserrat font-normal leading-[1.219] text-black">
                <span className="block whitespace-nowrap overflow-hidden text-ellipsis max-w-[183px] xs:max-w-none md:max-w-[240px] lg:max-w-[399px]">
                  {lastName}
                </span>
                {firstAndMiddle && (
                  <span className="block whitespace-nowrap">
                    {firstAndMiddle}
                  </span>
                )}
              </h3>
            </div>

            <div className="md:mb-[9px] lg:mb-[48px]">
              <p className="text-[12px] xs:text-[13px] sm:text-[14px] md:text-[16px] lg:text-[24px] font-montserrat font-normal leading-[1.219] text-black">
                {person.position}
              </p>
            </div>

            <div className="flex flex-wrap gap-y-[8px] gap-x-[20px] xs:gap-x-[25px] sm:gap-x-[30px] md:flex-nowrap md:gap-y-0 md:gap-x-0">
              <div className="flex items-center gap-[7px] xs:gap-[8px] sm:gap-[9px] md:gap-[10px] lg:gap-[14px] min-w-0">
                <div className="flex-shrink-0 w-[29.82px] h-[29.82px] xs:w-[30px] xs:h-[30px] sm:w-[30px] sm:h-[30px] md:w-[29.82px] md:h-[29.82px] lg:w-[40px] lg:h-[40px]">
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
                  className="text-[12px] sm:text-[13px] md:text-[16px] lg:text-[24px] font-montserrat font-normal leading-[2.5] md:leading-[1.875] lg:leading-[1.25] text-black hover:text-[#1D4E89] transition-colors truncate"
                >
                  {person.email}
                </a>
              </div>

              <div className="flex items-center gap-[7px] xs:gap-[8px] sm:gap-[9px] md:gap-[10px] lg:gap-[13px] min-w-0 md:ml-[40px] lg:ml-[53px]">
                <div className="flex-shrink-0 w-[29.82px] h-[29.82px] xs:w-[30px] xs:h-[30px] sm:w-[30px] sm:h-[30px] md:w-[29.82px] md:h-[29.82px] lg:w-[40px] lg:h-[40px]">
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
                  className="text-[12px] sm:text-[13px] md:text-[16px] lg:text-[24px] font-montserrat font-normal leading-[2.5] md:leading-[1.875] lg:leading-[1.25] text-black hover:text-[#1D4E89] transition-colors whitespace-nowrap"
                >
                  {person.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
