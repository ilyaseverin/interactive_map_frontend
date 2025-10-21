import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
      className="border-none w-full overflow-hidden"
    >
      {/* Desktop версия (≥1920px) - точное соответствие макету */}
      <div className="hidden min-[1920px]:block w-full">
        <div className="relative w-full max-w-[1920px] h-[362px] mx-auto">
          {/* Фон */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
          ></div>

          {/* Group 129 - основной контент (размещаем первым, чтобы он был под меню) */}
          <div className="absolute left-[75px] top-[115px] w-[1691px] h-[222px]">
            {/* Логотип */}
            <div className="absolute left-0 top-0">
              <Image
                src="/images/footer-logo-392dd2.png"
                alt="Патриот Центр 48"
                width={153}
                height={140}
                className="object-contain"
              />
            </div>

            {/* Frame 182 - горизонтальная группа с информацией */}
            <div className="absolute left-[186px] top-[52px] flex flex-row items-start gap-[136px]">
              {/* Описание организации */}
              <div className="w-[508px]">
                <p className="text-[20px] font-normal font-montserrat text-[#222222] leading-[1.219em]">
                  Региональный центр подготовки граждан Российской Федерации к
                  военной службе и военно-патриотического воспитания населения
                  Липецкой области
                </p>
              </div>

              {/* Телефоны */}
              <div>
                <p className="text-[20px] font-normal font-montserrat text-[#222222] leading-[1.219em] whitespace-pre-line">
                  {`Контактные номера телефонов:
8(4742) 74-69-23 - Директор
8(4742) 74-68-54 - Заместитель директора
8(4742) 74-68-54; 8(4742) 22-78-24`}
                </p>
              </div>

              {/* Контактная информация */}
              <div>
                <p className="text-[20px] font-normal font-montserrat text-[#21425F] leading-[1.219em] whitespace-pre-line">
                  {`Контактная информация:
г. Липецк, ул. Советская, д. 7
Сайт: патриот48.рф
Эл. почта: cpv48@mail.ru`}
                </p>
              </div>
            </div>

            {/* Frame 184 - социальные сети и копирайт */}
            <div className="absolute left-[186px] top-[175px] flex flex-row items-center gap-[534px]">
              {/* Frame 183 - Социальные сети */}
              <div className="flex gap-[14px]">
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

              {/* Копирайт */}
              <div>
                <p className="text-[18px] font-normal font-montserrat text-[#222222] leading-[1.219em]">
                  (с) Все права организации защищены
                </p>
              </div>
            </div>
          </div>

          {/* Верхняя строка ссылок - абсолютное позиционирование от контейнера */}
          <Link
            href="/documents/antimonopoly"
            className="absolute left-[261px] top-[74px] text-[20px] font-normal font-montserrat text-[#000000] leading-[1.219em] hover:opacity-70 transition-opacity"
          >
            Антимонопольный комплекс
          </Link>
          <Link
            href="/documents/antidrug"
            className="absolute left-[633px] top-[74px] text-[20px] font-normal font-montserrat text-[#000000] leading-[1.219em] hover:opacity-70 transition-opacity"
          >
            Антинаркотическая кампания
          </Link>
          <Link
            href="/documents/counterterrorism"
            className="absolute left-[1016px] top-[74px] text-[20px] font-normal font-montserrat text-[#000000] leading-[1.219em] hover:opacity-70 transition-opacity"
          >
            Противодействие терроризму
          </Link>
          <Link
            href="/documents/anticorruption"
            className="absolute left-[1403px] top-[74px] text-[20px] font-normal font-montserrat text-[#000000] leading-[1.219em] hover:opacity-70 transition-opacity"
          >
            Антикоррупционная деятельность
          </Link>

          {/* Основная навигация - абсолютное позиционирование от контейнера */}
          <Link
            href="/news"
            className="absolute left-[261px] top-[103px] text-[20px] font-normal font-montserrat text-[#000000] leading-[1.6em] hover:opacity-70 transition-opacity"
          >
            Новости
          </Link>
          <Link
            href="/battle-glory"
            className="absolute left-[401px] top-[103px] text-[20px] font-normal font-montserrat text-[#000000] leading-[1.6em] hover:opacity-70 transition-opacity"
          >
            Карта
          </Link>
          <Link
            href="/about"
            className="absolute left-[512px] top-[103px] text-[20px] font-normal font-montserrat text-[#000000] leading-[1.6em] hover:opacity-70 transition-opacity"
          >
            О центре
          </Link>
          <Link
            href="/projects"
            className="absolute left-[661px] top-[103px] text-[20px] font-normal font-montserrat text-[#000000] leading-[1.6em] hover:opacity-70 transition-opacity"
          >
            Наши проекты
          </Link>
          <Link
            href="/media"
            className="absolute left-[867px] top-[103px] text-[20px] font-normal font-montserrat text-[#000000] leading-[1.6em] hover:opacity-70 transition-opacity"
          >
            Для СМИ
          </Link>
          <Link
            href="/contacts"
            className="absolute left-[1014px] top-[103px] text-[20px] font-normal font-montserrat text-[#000000] leading-[1.6em] hover:opacity-70 transition-opacity"
          >
            Контакты
          </Link>
          <Link
            href="/documents"
            className="absolute left-[1163px] top-[103px] text-[20px] font-normal font-montserrat text-[#000000] leading-[1.6em] hover:opacity-70 transition-opacity"
          >
            Документы
          </Link>
        </div>
      </div>

      {/* Адаптивная версия для экранов <1920px */}
      <div className="block min-[1920px]:hidden">
        {/* Планшетная версия (sm до lg: 640px - 1023px) - адаптивная */}
        <div className="hidden sm:block lg:hidden w-full">
          <div className="w-full mx-auto bg-white py-6 sm:py-8 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-start justify-center gap-6 sm:gap-8 max-w-[768px] mx-auto">
              {/* Левая часть с контентом */}
              <div className="flex-1 flex flex-col gap-4">
                {/* Логотип и описание */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <Image
                    src="/images/footer-logo-392dd2.png"
                    alt="Патриот Центр 48"
                    width={120}
                    height={110}
                    className="object-contain flex-shrink-0"
                  />
                  <p className="text-sm sm:text-base font-normal font-montserrat text-[#222222] leading-[1.219em] text-center sm:text-left">
                    Региональный центр подготовки граждан Российской Федерации к
                    военной службе и военно-патриотического воспитания населения
                    Липецкой области
                  </p>
                </div>

                {/* Телефоны и контакты */}
                <div className="flex flex-col gap-3">
                  <p className="text-sm sm:text-base font-normal font-montserrat text-[#222222] leading-[1.219em] whitespace-pre-line">
                    {`Контактные номера телефонов:
8(4742) 74-69-23 - Директор
8(4742) 74-68-54 - Заместитель директора
8(4742) 74-68-54; 8(4742) 22-78-24`}
                  </p>

                  <p className="text-sm sm:text-base font-normal font-montserrat text-[#21425F] leading-[1.219em] whitespace-pre-line">
                    {`Контактная информация:
г. Липецк, ул. Советская, д. 7
Сайт: патриот48.рф
Эл. почта: cpv48@mail.ru`}
                  </p>
                </div>

                {/* Соцсети и копирайт */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex gap-[11px]">
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
                  <p className="text-xs sm:text-sm font-normal font-montserrat text-[#222222] leading-[1.219em]">
                    (с) Все права организации защищены
                  </p>
                </div>
              </div>

              {/* Разделитель */}
              <div className="hidden sm:block w-px bg-[#BABABA] self-stretch min-h-[300px]"></div>

              {/* Правое меню */}
              <nav className="flex flex-col gap-3 sm:w-[180px]">
                <Link
                  href="/news"
                  className="text-sm font-normal font-montserrat text-[#000000] hover:opacity-70 transition-opacity"
                >
                  Новости
                </Link>
                <Link
                  href="/battle-glory"
                  className="text-sm font-normal font-montserrat text-[#000000] hover:opacity-70 transition-opacity"
                >
                  Карта
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-normal font-montserrat text-[#000000] hover:opacity-70 transition-opacity"
                >
                  О центре
                </Link>
                <Link
                  href="/projects"
                  className="text-sm font-normal font-montserrat text-[#000000] hover:opacity-70 transition-opacity"
                >
                  Наши проекты
                </Link>
                <Link
                  href="/media"
                  className="text-sm font-normal font-montserrat text-[#000000] hover:opacity-70 transition-opacity"
                >
                  Для СМИ
                </Link>
                <Link
                  href="/contacts"
                  className="text-sm font-normal font-montserrat text-[#000000] hover:opacity-70 transition-opacity"
                >
                  Контакты
                </Link>
                <Link
                  href="/documents"
                  className="text-sm font-normal font-montserrat text-[#000000] hover:opacity-70 transition-opacity"
                >
                  Документы
                </Link>
                <Link
                  href="/documents/antimonopoly"
                  className="text-sm font-normal font-montserrat text-[#000000] hover:opacity-70 transition-opacity"
                >
                  Антимонопольный комплекс
                </Link>
                <Link
                  href="/documents/counterterrorism"
                  className="text-sm font-normal font-montserrat text-[#000000] hover:opacity-70 transition-opacity"
                >
                  Противодействие терроризму
                </Link>
                <Link
                  href="/documents/antidrug"
                  className="text-sm font-normal font-montserrat text-[#000000] hover:opacity-70 transition-opacity"
                >
                  Антинаркотическая кампания
                </Link>
                <Link
                  href="/documents/anticorruption"
                  className="text-sm font-normal font-montserrat text-[#000000] hover:opacity-70 transition-opacity"
                >
                  Антикоррупционная деятельность
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Мобильная версия (до sm: до 640px) - адаптивная */}
        <div className="sm:hidden w-full">
          <div className="w-full mx-auto bg-white py-6 px-[50px]">
            {/* Frame 17 - главный контейнер */}
            <div className="flex flex-col items-center gap-4 w-full">
              {/* Frame 19 */}
              <div className="flex flex-col justify-center items-center gap-5 w-full">
                {/* Логотип */}
                <Image
                  src="/images/footer-logo-392dd2.png"
                  alt="Патриот Центр 48"
                  width={153}
                  height={140}
                  className="object-contain"
                />

                {/* Описание */}
                <div className="w-full flex justify-center items-center">
                  <p className="inline-block text-[12px] font-normal font-montserrat text-[#222222] leading-[1.219em] text-left px-[5px] max-w-[250px]">
                    Региональный центр подготовки граждан Российской Федерации к
                    военной службе и военно-патриотического воспитания населения
                    Липецкой области
                  </p>
                </div>

                {/* Frame 185 - меню и контакты */}
                <div className="flex flex-col items-center gap-3 w-full">
                  <Link
                    href="/news"
                    className="text-[12px] font-normal font-montserrat text-[#000000] leading-[15px] hover:opacity-70 transition-opacity"
                  >
                    Новости
                  </Link>
                  <Link
                    href="/battle-glory"
                    className="text-[12px] font-normal font-montserrat text-[#000000] leading-[15px] hover:opacity-70 transition-opacity"
                  >
                    Карта
                  </Link>
                  <Link
                    href="/about"
                    className="text-[12px] font-normal font-montserrat text-[#000000] leading-[15px] hover:opacity-70 transition-opacity"
                  >
                    О центре
                  </Link>
                  <Link
                    href="/projects"
                    className="text-[12px] font-normal font-montserrat text-[#000000] leading-[15px] hover:opacity-70 transition-opacity"
                  >
                    Наши проекты
                  </Link>
                  <Link
                    href="/media"
                    className="text-[12px] font-normal font-montserrat text-[#000000] leading-[15px] hover:opacity-70 transition-opacity"
                  >
                    Для СМИ
                  </Link>
                  <Link
                    href="/contacts"
                    className="text-[12px] font-normal font-montserrat text-[#000000] leading-[15px] hover:opacity-70 transition-opacity"
                  >
                    Контакты
                  </Link>
                  <Link
                    href="/documents"
                    className="text-[12px] font-normal font-montserrat text-[#000000] leading-[15px] hover:opacity-70 transition-opacity"
                  >
                    Документы
                  </Link>
                  <Link
                    href="/documents/antimonopoly"
                    className="text-[12px] font-normal font-montserrat text-[#000000] leading-[15px] hover:opacity-70 transition-opacity"
                  >
                    Антимонопольный комплекс
                  </Link>
                  <Link
                    href="/documents/counterterrorism"
                    className="text-[12px] font-normal font-montserrat text-[#000000] leading-[15px] hover:opacity-70 transition-opacity"
                  >
                    Противодействие терроризму
                  </Link>
                  <Link
                    href="/documents/antidrug"
                    className="text-[12px] font-normal font-montserrat text-[#000000] leading-[15px] hover:opacity-70 transition-opacity"
                  >
                    Антинаркотическая кампания
                  </Link>
                  <Link
                    href="/documents/anticorruption"
                    className="text-[12px] font-normal font-montserrat text-[#000000] leading-[15px] hover:opacity-70 transition-opacity"
                  >
                    Антикоррупционная деятельность
                  </Link>

                  {/* Телефоны */}
                  <div className="w-full flex justify-center items-center">
                    <p className="inline-block text-[12px] font-normal font-montserrat text-[#222222] leading-[1.219em] whitespace-pre-line text-left px-[5px]">
                      {`Контактные номера телефонов:
8(4742) 74-69-23 - Директор
8(4742) 74-68-54 - Заместитель директора
8(4742) 74-68-54; 8(4742) 22-78-24`}
                    </p>
                  </div>

                  {/* Контактная информация */}
                  <div className="w-full flex justify-center items-center">
                    <p className="inline-block text-[12px] font-normal font-montserrat text-[#21425F] leading-[1.219em] whitespace-pre-line text-left px-[5px]">
                      {`Контактная информация:
г. Липецк, ул. Советская, д. 7
Сайт: патриот48.рф
Эл. почта: cpv48@mail.ru`}
                    </p>
                  </div>
                </div>

                {/* Frame 18 - Социальные сети */}
                <div className="flex gap-[11px]">
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

                {/* Копирайт */}
                <p className="text-[10px] font-normal font-montserrat text-[#222222] leading-[1.219em]">
                  (с) Все права организации защищены
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Версия для больших экранов (lg до min-[1920px]: 1024px - 1919px) - адаптивная */}
        <div className="hidden lg:block min-[1920px]:hidden w-full">
          <div className="w-full py-8 lg:py-10">
            {/* Навигационное меню сверху на всю ширину */}
            <nav className="w-full mb-8 lg:mb-10 px-6 lg:px-12 xl:px-16">
              {/* Верхняя строка ссылок */}
              <div className="flex flex-wrap justify-center items-center gap-x-6 lg:gap-x-8 gap-y-2 mb-4">
                <Link
                  href="/documents/antimonopoly"
                  className="text-base lg:text-lg font-normal font-montserrat text-[#000000] leading-[1.219em] hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  Антимонопольный комплекс
                </Link>
                <Link
                  href="/documents/antidrug"
                  className="text-base lg:text-lg font-normal font-montserrat text-[#000000] leading-[1.219em] hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  Антинаркотическая кампания
                </Link>
                <Link
                  href="/documents/counterterrorism"
                  className="text-base lg:text-lg font-normal font-montserrat text-[#000000] leading-[1.219em] hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  Противодействие терроризму
                </Link>
                <Link
                  href="/documents/anticorruption"
                  className="text-base lg:text-lg font-normal font-montserrat text-[#000000] leading-[1.219em] hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  Антикоррупционная деятельность
                </Link>
              </div>

              {/* Основная навигация */}
              <div className="flex flex-wrap justify-center items-center gap-x-6 lg:gap-x-8 gap-y-2">
                <Link
                  href="/news"
                  className="text-base lg:text-lg font-normal font-montserrat text-[#000000] leading-[1.6em] hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  Новости
                </Link>
                <Link
                  href="/battle-glory"
                  className="text-base lg:text-lg font-normal font-montserrat text-[#000000] leading-[1.6em] hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  Карта
                </Link>
                <Link
                  href="/about"
                  className="text-base lg:text-lg font-normal font-montserrat text-[#000000] leading-[1.6em] hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  О центре
                </Link>
                <Link
                  href="/projects"
                  className="text-base lg:text-lg font-normal font-montserrat text-[#000000] leading-[1.6em] hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  Наши проекты
                </Link>
                <Link
                  href="/media"
                  className="text-base lg:text-lg font-normal font-montserrat text-[#000000] leading-[1.6em] hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  Для СМИ
                </Link>
                <Link
                  href="/contacts"
                  className="text-base lg:text-lg font-normal font-montserrat text-[#000000] leading-[1.6em] hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  Контакты
                </Link>
                <Link
                  href="/documents"
                  className="text-base lg:text-lg font-normal font-montserrat text-[#000000] leading-[1.6em] hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  Документы
                </Link>
              </div>
            </nav>

            {/* Контейнер с логотипом и информационными блоками */}
            <div className="flex flex-row items-start gap-8 xl:gap-12 px-6 lg:px-12 xl:px-16">
              {/* Логотип слева */}
              <div className="flex-shrink-0">
                <Image
                  src="/images/footer-logo-392dd2.png"
                  alt="Патриот Центр 48"
                  width={120}
                  height={110}
                  className="object-contain"
                />
              </div>

              {/* Основной контент: Grid с информационными блоками в центре */}
              <div className="flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
                  {/* Описание организации */}
                  <div className="min-w-0">
                    <p className="text-base lg:text-lg font-normal font-montserrat text-[#222222] leading-[1.219em]">
                      Региональный центр подготовки граждан Российской Федерации
                      к военной службе и военно-патриотического воспитания
                      населения Липецкой области
                    </p>
                  </div>

                  {/* Телефоны */}
                  <div className="min-w-0">
                    <p className="text-base lg:text-lg font-normal font-montserrat text-[#222222] leading-[1.219em] whitespace-pre-line">
                      {`Контактные номера телефонов:
8(4742) 74-69-23 - Директор
8(4742) 74-68-54 - Заместитель директора
8(4742) 74-68-54; 8(4742) 22-78-24`}
                    </p>
                  </div>

                  {/* Контактная информация */}
                  <div className="min-w-0">
                    <p className="text-base lg:text-lg font-normal font-montserrat text-[#21425F] leading-[1.219em] whitespace-pre-line">
                      {`Контактная информация:
г. Липецк, ул. Советская, д. 7
Сайт: патриот48.рф
Эл. почта: cpv48@mail.ru`}
                    </p>
                  </div>
                </div>

                {/* Нижняя строка - социальные сети и копирайт */}
                <div className="flex flex-row items-center justify-between flex-wrap gap-6 mt-8 lg:mt-10">
                  {/* Социальные сети */}
                  <div className="flex gap-[14px]">
                    <Link
                      href="https://vk.com/patriot48"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                    >
                      <Image
                        src="/images/social-vk-1718c2.png"
                        alt="ВКонтакте"
                        width={42}
                        height={42}
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
                        width={42}
                        height={42}
                        className="object-contain"
                      />
                    </Link>
                  </div>

                  {/* Копирайт */}
                  <p className="text-base lg:text-[17px] font-normal font-montserrat text-[#222222] leading-[1.219em]">
                    (с) Все права организации защищены
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
