import Image from "next/image";

interface ContactsInfoProps {
  address: string;
  phones: string[];
  email: string;
  website: string;
}

export default function ContactsInfo({
  address,
  phones,
  email,
  website,
}: ContactsInfoProps) {
  return (
    <div className="w-full">
      {/* Контактная информация */}
      <div className="mb-[30px] sm:mb-[50px] md:mb-[70px] lg:mb-[100px] xl:mb-[120px]">
        {/* Контейнер на всю ширину страницы */}
        <div className="w-full">
          <div className="max-w-[1920px] mx-auto px-[16px] sm:px-[19px] md:px-[35px] lg:px-[50px] xl:px-[80px]">
            {/* Информационный блок - Mobile: 282x362, padding 34px 42px */}
            <div className="relative bg-white rounded-[15px] shadow-lg py-[34px] px-[42px] sm:p-[20px] md:p-[35px] lg:p-[50px] xl:p-[125px]">
              {/* Тень - Mobile: 212x264 at 28, 59, blur 24px */}
              <div
                className="absolute w-[212px] h-[264px] bg-[#1D4E89] -z-10 rounded-[15px] sm:hidden"
                style={{
                  transform: "translate(28px, 59px)",
                  filter: "blur(24px)",
                }}
              />
              {/* Тень - Desktop */}
              <div className="hidden lg:block absolute left-[39px] top-[43px] w-[1687px] h-[785px] bg-[#1D4E89] blur-[74px] -z-10 rounded-[15px]" />

              <div className="relative z-10">
                {/* Адрес - Mobile: icon 15x15, gap 25px, font 12px, mb 35px */}
                <div className="flex items-center gap-[25px] sm:gap-[24px] md:gap-[32px] lg:gap-[48px] xl:gap-[64px] mb-[35px] sm:mb-[32px] md:mb-[40px] lg:mb-[48px] xl:mb-[64px]">
                  <div className="w-[15px] h-[15px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px] lg:w-[64px] lg:h-[64px] xl:w-[68px] xl:h-[68px] flex-shrink-0">
                    <Image
                      src="/images/contacts/location-icon.png"
                      alt="Адрес"
                      width={68}
                      height={68}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[12px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] font-normal font-montserrat text-black leading-[1.219] flex-1">
                    {address}
                  </p>
                </div>

                {/* Телефоны - Mobile: icon 15x15, gap 25px, font 12px, mb 35px */}
                {phones.map((phone, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-[25px] sm:gap-[24px] md:gap-[32px] lg:gap-[48px] xl:gap-[64px] mb-[35px] sm:mb-[32px] md:mb-[40px] lg:mb-[48px] xl:mb-[64px] last:mb-0"
                  >
                    <div className="w-[15px] h-[15px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px] lg:w-[64px] lg:h-[64px] xl:w-[68px] xl:h-[68px] flex-shrink-0">
                      <Image
                        src="/images/contacts/phone-icon.png"
                        alt="Телефон"
                        width={68}
                        height={68}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-[12px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] font-normal font-montserrat text-black leading-[1.219] flex-1">
                      {phone}
                    </p>
                  </div>
                ))}

                {/* Сайт - Mobile: icon 15x15, gap 25px, font 12px, mb 35px */}
                <div className="flex items-center gap-[25px] sm:gap-[24px] md:gap-[32px] lg:gap-[48px] xl:gap-[64px] mb-[35px] sm:mb-[32px] md:mb-[40px] lg:mb-[48px] xl:mb-[64px]">
                  <div className="w-[15px] h-[15px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px] lg:w-[64px] lg:h-[64px] xl:w-[68px] xl:h-[68px] flex-shrink-0">
                    <Image
                      src="/images/contacts/website-icon.png"
                      alt="Сайт"
                      width={68}
                      height={68}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[12px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] font-normal font-montserrat text-black leading-[1.219] flex-1">
                    {website}
                  </p>
                </div>

                {/* Email - Mobile: icon 15x15, gap 25px, font 12px */}
                <div className="flex items-center gap-[25px] sm:gap-[24px] md:gap-[32px] lg:gap-[48px] xl:gap-[64px]">
                  <div className="w-[15px] h-[15px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px] lg:w-[64px] lg:h-[64px] xl:w-[68px] xl:h-[68px] flex-shrink-0">
                    <Image
                      src="/images/contacts/email-icon.png"
                      alt="Email"
                      width={68}
                      height={68}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[12px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] font-normal font-montserrat text-black leading-[1.219] flex-1">
                    {email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
