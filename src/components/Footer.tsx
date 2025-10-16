import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
      className="border-none"
    >
      {/* Desktop версия (≥1920px) - точное соответствие макету */}
      <div className="hidden 2xl:block">
        <div className="relative w-full max-w-[1920px] h-[362px] mx-auto">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
          ></div>

          <div className="absolute left-[75px] top-[84px] w-[1576px] h-[215px]">
            <div className="absolute left-0 top-0">
              <Image
                src="/images/footer-logo-392dd2.png"
                alt="Патриот Центр 48"
                width={153}
                height={140}
                className="object-contain"
              />
            </div>

            <div className="absolute left-[186px] top-[34px] w-[368px]">
              <p className="text-[16px] font-normal font-montserrat text-[#222222] leading-[19.5px]">
                Региональный центр подготовки граждан Российской Федерации к
                военной службе и военно-патриотического воспитания населения
                Липецкой области
              </p>
            </div>

            <div className="absolute left-[692px] top-[34px] w-[390px]">
              <p className="text-[18px] font-normal font-montserrat text-[#222222] leading-[21.94px] whitespace-pre-line">
                {`Контактные номера телефонов:
8(4742) 74-69-23 - Директор
8(4742) 74-68-54 - Заместитель директора
8(4742) 74-68-54; 8(4742) 22-78-24`}
              </p>
            </div>

            <div className="absolute left-[692px] top-[168px] flex gap-[14px]">
              <Link
                href="https://vk.com/patriot48"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <Image
                  src="/images/social-vk-1718c2.png"
                  alt="ВКонтакте"
                  width={47}
                  height={47}
                  className="object-contain"
                />
              </Link>
              <Link
                href="https://t.me/patriot48"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <Image
                  src="/images/social-telegram.png"
                  alt="Telegram"
                  width={47}
                  height={47}
                  className="object-contain"
                />
              </Link>
            </div>

            <div className="absolute left-[1216px] top-[34px] w-[262px]">
              <div className="text-[18px] font-normal font-montserrat text-[#21425F] leading-[21.94px] whitespace-pre-line">
                {`Контактная информация:
г. Липецк, ул. Советская, д. 7
Сайт: патриот48.рф
Эл. почта: cpv48@mail.ru`}
              </div>
            </div>

            <div className="absolute left-[1216px] top-[192px] w-[360px]">
              <p className="text-[18px] font-normal font-montserrat text-[#222222] leading-[21.94px]">
                (с) Все права организации защищены
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Адаптивная версия для экранов <1920px */}
      <div className="block 2xl:hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Логотип и описание */}
            <div className="md:col-span-2 lg:col-span-1">
              <Image
                src="/images/footer-logo-392dd2.png"
                alt="Патриот Центр 48"
                width={120}
                height={110}
                className="object-contain mb-4"
              />
              <p className="text-sm font-normal font-montserrat text-[#222222] leading-relaxed">
                Региональный центр подготовки граждан Российской Федерации к
                военной службе и военно-патриотического воспитания населения
                Липецкой области
              </p>
            </div>

            {/* Телефоны */}
            <div>
              <h3 className="text-base font-semibold font-montserrat text-[#222222] mb-3">
                Телефоны
              </h3>
              <p className="text-sm font-normal font-montserrat text-[#222222] leading-relaxed whitespace-pre-line">
                {`8(4742) 74-69-23
Директор

8(4742) 74-68-54
Заместитель директора

8(4742) 22-78-24`}
              </p>

              <div className="flex gap-3 mt-6">
                <Link
                  href="https://vk.com/patriot48"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                >
                  <Image
                    src="/images/social-vk-1718c2.png"
                    alt="ВКонтакте"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </Link>
                <Link
                  href="https://t.me/patriot48"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                >
                  <Image
                    src="/images/social-telegram.png"
                    alt="Telegram"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </Link>
              </div>
            </div>

            {/* Контакты */}
            <div className="md:col-span-2 lg:col-span-1">
              <h3 className="text-base font-semibold font-montserrat text-[#222222] mb-3">
                Контакты
              </h3>
              <div className="text-sm font-normal font-montserrat text-[#21425F] leading-relaxed whitespace-pre-line">
                {`г. Липецк,
ул. Советская, д. 7

Сайт: патриот48.рф

Эл. почта:
cpv48@mail.ru`}
              </div>
            </div>

            {/* Копирайт */}
            <div className="md:col-span-2 lg:col-span-1">
              <p className="text-sm font-normal font-montserrat text-[#222222] leading-relaxed">
                (с) Все права организации защищены
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
