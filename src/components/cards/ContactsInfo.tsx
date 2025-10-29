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
      <div className="mt-[40px] sm:mt-[60px] md:mt-[80px] lg:mt-[100px] xl:mt-[112px] mb-[30px] sm:mb-[50px] md:mb-[70px] lg:mb-[100px] xl:mb-[120px]">
        {/* Контейнер на всю ширину страницы */}
        <div className="w-full">
          <div className="max-w-[1920px] mx-auto px-[16px] sm:px-[24px] md:px-[35px] lg:px-[50px] xl:px-[78px]">
            {/* Информационный блок */}
            <div className="relative bg-white rounded-[10px] sm:rounded-[12px] md:rounded-[15px] shadow-lg p-[16px] sm:p-[20px] md:p-[30px] lg:p-[50px] xl:p-[125px]">
              {/* Тень - скрыта на мобильных устройствах */}
              <div className="hidden lg:block absolute left-[20px] md:left-[30px] lg:left-[39px] top-[20px] md:top-[30px] lg:top-[43px] w-[calc(100%-40px)] md:w-[calc(100%-60px)] lg:w-[1687px] h-[200px] md:h-[400px] lg:h-[785px] bg-[#1D4E89] blur-[30px] md:blur-[50px] lg:blur-[74px] -z-10" />

              <div className="relative z-10">
                {/* Адрес */}
                <div className="flex items-center gap-[16px] sm:gap-[24px] md:gap-[32px] lg:gap-[48px] xl:gap-[64px] mb-[24px] sm:mb-[32px] md:mb-[40px] lg:mb-[48px] xl:mb-[64px]">
                  <div className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px] lg:w-[64px] lg:h-[64px] xl:w-[68px] xl:h-[68px] flex-shrink-0">
                    <Image
                      src="/images/contacts/location-icon.png"
                      alt="Адрес"
                      width={68}
                      height={68}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] font-normal font-montserrat text-black leading-[1.219] flex-1">
                    {address}
                  </p>
                </div>

                {/* Телефоны */}
                {phones.map((phone, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-[16px] sm:gap-[24px] md:gap-[32px] lg:gap-[48px] xl:gap-[64px] mb-[24px] sm:mb-[32px] md:mb-[40px] lg:mb-[48px] xl:mb-[64px]"
                  >
                    <div className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px] lg:w-[64px] lg:h-[64px] xl:w-[68px] xl:h-[68px] flex-shrink-0">
                      <Image
                        src="/images/contacts/phone-icon.png"
                        alt="Телефон"
                        width={68}
                        height={68}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] font-normal font-montserrat text-black leading-[1.219] flex-1">
                      {phone}
                    </p>
                  </div>
                ))}

                {/* Сайт */}
                <div className="flex items-center gap-[16px] sm:gap-[24px] md:gap-[32px] lg:gap-[48px] xl:gap-[64px] mb-[24px] sm:mb-[32px] md:mb-[40px] lg:mb-[48px] xl:mb-[64px]">
                  <div className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px] lg:w-[64px] lg:h-[64px] xl:w-[68px] xl:h-[68px] flex-shrink-0">
                    <Image
                      src="/images/contacts/website-icon.png"
                      alt="Сайт"
                      width={68}
                      height={68}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] font-normal font-montserrat text-black leading-[1.219] flex-1">
                    {website}
                  </p>
                </div>

                {/* Email */}
                <div className="flex items-center gap-[16px] sm:gap-[24px] md:gap-[32px] lg:gap-[48px] xl:gap-[64px]">
                  <div className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px] lg:w-[64px] lg:h-[64px] xl:w-[68px] xl:h-[68px] flex-shrink-0">
                    <Image
                      src="/images/contacts/email-icon.png"
                      alt="Email"
                      width={68}
                      height={68}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] font-normal font-montserrat text-black leading-[1.219] flex-1">
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
