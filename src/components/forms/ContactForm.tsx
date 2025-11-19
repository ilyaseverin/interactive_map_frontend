import Image from "next/image";
import { SubmitButton } from "@/components/buttons";

export default function ContactForm() {
  return (
    <section className="relative w-full min-h-[492px] md:min-h-[1026px] lg:min-h-[1026px] mt-[100px] md:mt-[0px] lg:mt-[159px]">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 25%, rgba(0, 0, 0, 0.8) 75%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 25%, rgba(0, 0, 0, 0.8) 75%, transparent 100%)",
          }}
        >
          <Image
            src="/images/contact-form-bg.png"
            alt="Форма обратной связи"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Content - Constrained to max-width */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto pt-[32px] md:pt-[114px] lg:pt-[108px] pb-12 px-[24px] md:px-[35px] lg:px-0">
        {/* Form Container */}
        <div className="relative mx-auto w-full md:w-full lg:max-w-[906px] h-auto md:h-[798px] lg:h-[799px]">
          {/* Blur Background */}
          <div className="absolute left-[5%] md:left-[5%] lg:left-[43px] top-[92px] md:top-[150px] lg:top-[150px] w-[90%] md:w-[90%] lg:w-[821px] h-[384px] md:h-[624px] lg:h-[624px] bg-[rgba(74,74,74,0.7)] blur-[84px] z-0" />

          {/* White Card */}
          <div className="relative bg-white rounded-[19px] w-full md:w-full lg:max-w-[906px] h-auto md:h-[798px] lg:h-[799px] z-10 p-[30px] md:p-0 lg:p-0">
            {/* Title */}
            <h2 className="w-full text-[20px] md:text-[30px] lg:text-[40px] font-bold font-montserrat text-black text-center md:text-center lg:text-center leading-[1.219] mb-6 md:mb-0 lg:mb-0 md:absolute md:left-0 md:right-0 md:top-[60px] md:w-full lg:absolute lg:left-0 lg:right-0 lg:top-[60px] lg:w-full">
              Задайте свой вопрос
            </h2>

            {/* Form Fields Container */}
            <div className="flex flex-col gap-5 md:gap-0 lg:gap-0">
              {/* Name Field */}
              <div className="md:absolute md:left-[21%] md:top-[142px] md:w-[58%] lg:absolute lg:left-[203px] lg:top-[163px] lg:w-[500px]">
                <label className="block text-[12px] md:text-[20px] lg:text-[24px] font-normal font-montserrat text-[#2C2C2C] leading-[1.219] mb-1 md:mb-0 lg:mb-0 md:absolute md:left-[19px] md:top-0 lg:absolute lg:left-[23.29px] lg:top-0">
                  Имя
                </label>
                <input
                  type="text"
                  placeholder="Иван"
                  className="w-full h-[50px] md:h-[67px] lg:h-[67px] bg-[#EDEDED] rounded-[12px] text-[12px] md:text-[20px] lg:text-[24px] font-normal font-montserrat text-[#979797] px-4 md:px-[22px] lg:px-[27px] outline-none focus:ring-2 focus:ring-[#C62828] leading-[1.219] md:absolute md:left-0 md:top-[40px] lg:absolute lg:left-0 lg:top-[40px]"
                />
              </div>

              {/* Email Field */}
              <div className="md:absolute md:left-[21%] md:top-[281px] md:w-[58%] lg:absolute lg:left-[203px] lg:top-[302px] lg:w-[500px]">
                <label className="block text-[12px] md:text-[20px] lg:text-[24px] font-normal font-montserrat text-[#2C2C2C] leading-[1.219] mb-1 md:mb-0 lg:mb-0 md:absolute md:left-[19px] md:top-0 lg:absolute lg:left-[23.29px] lg:top-0">
                  Эл. почта
                </label>
                <input
                  type="email"
                  placeholder="example@yandex.ru"
                  className="w-full h-[50px] md:h-[67px] lg:h-[67px] bg-[#EDEDED] rounded-[12px] text-[12px] md:text-[20px] lg:text-[24px] font-normal font-montserrat text-[#979797] px-4 md:px-[22px] lg:px-[27px] outline-none focus:ring-2 focus:ring-[#C62828] leading-[1.219] md:absolute md:left-0 md:top-[40px] lg:absolute lg:left-0 lg:top-[40px]"
                />
              </div>

              {/* Question Field */}
              <div className="md:absolute md:left-[21%] md:top-[421px] md:w-[58%] lg:absolute lg:left-[203px] lg:top-[442px] lg:w-[500px]">
                <label className="block text-[12px] md:text-[20px] lg:text-[24px] font-normal font-montserrat text-[#2C2C2C] leading-[1.219] mb-1 md:mb-0 lg:mb-0 md:absolute md:left-[19px] md:top-0 lg:absolute lg:left-[23.2px] lg:top-0">
                  Ваш вопрос
                </label>
                <textarea
                  placeholder="Введите вопрос"
                  className="w-full h-[88px] md:h-[148px] lg:h-[148px] bg-[#EDEDED] rounded-[12px] text-[12px] md:text-[20px] lg:text-[24px] font-normal font-montserrat text-[#979797] px-4 md:px-[22px] lg:px-[27px] py-3 md:py-[19px] lg:py-[19px] outline-none focus:ring-2 focus:ring-[#C62828] resize-none leading-[1.219] md:absolute md:left-0 md:top-[40px] lg:absolute lg:left-0 lg:top-[40px]"
                />
              </div>

              {/* Submit Button */}
              <SubmitButton
                variant="form"
                className="mt-2 md:mt-0 lg:mt-0 md:absolute md:left-[21%] md:top-[654px] lg:absolute lg:left-[203px] lg:top-[676px]"
              >
                Отправить
              </SubmitButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
