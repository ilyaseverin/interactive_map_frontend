"use client";

import { useState, FormEvent, useEffect } from "react";
import Image from "next/image";
import { SubmitButton } from "@/components/buttons";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    question?: string;
  }>({});
  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    question?: boolean;
  }>({});

  // Автоматическое закрытие уведомления через 5 секунд
  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setMessage(null), 300); // Ждем окончания анимации
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  type Field = "name" | "email" | "question";
  const fields: Record<Field, string> = { name, email, question };

  const validateField = (field: Field, value: string) => {
    const newErrors = { ...errors };
    const trimmed = value.trim();
    const rules: Record<Field, () => string | undefined> = {
      name: () =>
        !trimmed
          ? "Пожалуйста, укажите ваше имя"
          : trimmed.length < 2
          ? "Имя должно содержать минимум 2 символа"
          : undefined,
      email: () =>
        !trimmed
          ? "Пожалуйста, укажите email"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Пожалуйста, введите корректный email адрес"
          : undefined,
      question: () =>
        !trimmed
          ? "Пожалуйста, задайте ваш вопрос"
          : trimmed.length < 10
          ? "Вопрос должен содержать минимум 10 символов"
          : undefined,
    };
    const error = rules[field]();
    if (error) newErrors[field] = error;
    else delete newErrors[field];
    setErrors(newErrors);
  };

  const handleBlur = (field: Field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, fields[field]);
  };

  const handleChange = (field: Field, value: string) => {
    if (field === "name") setName(value);
    else if (field === "email") setEmail(value);
    else setQuestion(value);
    if (touched[field]) validateField(field, value);
  };

  const validateForm = () => {
    setTouched({ name: true, email: true, question: true });
    const newErrors: Record<Field, string | undefined> = {
      name: undefined,
      email: undefined,
      question: undefined,
    };
    (["name", "email", "question"] as Field[]).forEach((field) => {
      const trimmed = fields[field].trim();
      if (field === "name")
        newErrors.name = !trimmed
          ? "Пожалуйста, укажите ваше имя"
          : trimmed.length < 2
          ? "Имя должно содержать минимум 2 символа"
          : undefined;
      else if (field === "email")
        newErrors.email = !trimmed
          ? "Пожалуйста, укажите email"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields[field])
          ? "Пожалуйста, введите корректный email адрес"
          : undefined;
      else
        newErrors.question = !trimmed
          ? "Пожалуйста, задайте ваш вопрос"
          : trimmed.length < 10
          ? "Вопрос должен содержать минимум 10 символов"
          : undefined;
    });
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.question;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Валидация перед отправкой
    if (!validateForm()) {
      setMessage({
        type: "error",
        text: "Пожалуйста, заполните все поля корректно",
      });
      setIsVisible(true);
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          question,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.",
        });
        // Очищаем форму
        setName("");
        setEmail("");
        setQuestion("");
        setErrors({});
        setTouched({});
      } else {
        setMessage({
          type: "error",
          text:
            data.error ||
            "Произошла ошибка при отправке сообщения. Попробуйте позже.",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "Произошла ошибка при отправке сообщения. Проверьте подключение к интернету и попробуйте снова.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full min-h-[492px] md:min-h-[1026px] lg:min-h-[1026px] md:mt-[0px] lg:mt-[100px]">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.9) 25%, rgba(0, 0, 0, 0.9) 75%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.9) 25%, rgba(0, 0, 0, 0.9) 75%, transparent 100%)",
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
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5 md:gap-0 lg:gap-0"
            >
              {/* Name Field */}
              <div className="md:absolute md:left-[21%] md:top-[142px] md:w-[58%] lg:absolute lg:left-[203px] lg:top-[163px] lg:w-[500px]">
                <label className="block text-[12px] md:text-[20px] lg:text-[24px] font-normal font-montserrat text-[#2C2C2C] leading-[1.219] mb-1 md:mb-0 lg:mb-0 md:absolute md:left-[19px] md:top-0 lg:absolute lg:left-[23.29px] lg:top-0">
                  Имя
                </label>
                <div className="md:absolute md:left-0 md:top-[40px] lg:absolute lg:left-0 lg:top-[40px] w-full">
                  <input
                    type="text"
                    placeholder="Иван"
                    value={name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={`w-full h-[50px] md:h-[67px] lg:h-[67px] bg-[#EDEDED] rounded-[12px] text-[12px] md:text-[20px] lg:text-[24px] font-normal font-montserrat text-[#979797] px-4 md:px-[22px] lg:px-[27px] outline-none focus:ring-2 leading-[1.219] transition-colors ${
                      errors.name && touched.name
                        ? "ring-2 ring-[#EF5350] bg-[#FFEBEE]"
                        : "focus:ring-[#C62828]"
                    }`}
                  />
                  {errors.name && touched.name && (
                    <div className="mt-1.5 md:mt-2 flex items-start gap-1.5 transition-all duration-200 ease-out opacity-100">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 text-[#EF5350] flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-[11px] md:text-[13px] lg:text-[14px] text-[#EF5350] font-montserrat leading-[1.4]">
                        {errors.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="md:absolute md:left-[21%] md:top-[281px] md:w-[58%] lg:absolute lg:left-[203px] lg:top-[302px] lg:w-[500px]">
                <label className="block text-[12px] md:text-[20px] lg:text-[24px] font-normal font-montserrat text-[#2C2C2C] leading-[1.219] mb-1 md:mb-0 lg:mb-0 md:absolute md:left-[19px] md:top-0 lg:absolute lg:left-[23.29px] lg:top-0">
                  Эл. почта
                </label>
                <div className="md:absolute md:left-0 md:top-[40px] lg:absolute lg:left-0 lg:top-[40px] w-full">
                  <input
                    type="email"
                    placeholder="example@yandex.ru"
                    value={email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={`w-full h-[50px] md:h-[67px] lg:h-[67px] bg-[#EDEDED] rounded-[12px] text-[12px] md:text-[20px] lg:text-[24px] font-normal font-montserrat text-[#979797] px-4 md:px-[22px] lg:px-[27px] outline-none focus:ring-2 leading-[1.219] transition-colors ${
                      errors.email && touched.email
                        ? "ring-2 ring-[#EF5350] bg-[#FFEBEE]"
                        : "focus:ring-[#C62828]"
                    }`}
                  />
                  {errors.email && touched.email && (
                    <div className="mt-1.5 md:mt-2 flex items-start gap-1.5 transition-all duration-200 ease-out opacity-100">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 text-[#EF5350] flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-[11px] md:text-[13px] lg:text-[14px] text-[#EF5350] font-montserrat leading-[1.4]">
                        {errors.email}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Question Field */}
              <div className="md:absolute md:left-[21%] md:top-[421px] md:w-[58%] lg:absolute lg:left-[203px] lg:top-[442px] lg:w-[500px]">
                <label className="block text-[12px] md:text-[20px] lg:text-[24px] font-normal font-montserrat text-[#2C2C2C] leading-[1.219] mb-1 md:mb-0 lg:mb-0 md:absolute md:left-[19px] md:top-0 lg:absolute lg:left-[23.2px] lg:top-0">
                  Ваш вопрос
                </label>
                <div className="md:absolute md:left-0 md:top-[40px] lg:absolute lg:left-0 lg:top-[40px] w-full">
                  <textarea
                    placeholder="Введите вопрос"
                    value={question}
                    onChange={(e) => handleChange("question", e.target.value)}
                    onBlur={() => handleBlur("question")}
                    className={`w-full h-[88px] md:h-[148px] lg:h-[148px] bg-[#EDEDED] rounded-[12px] text-[12px] md:text-[20px] lg:text-[24px] font-normal font-montserrat text-[#979797] px-4 md:px-[22px] lg:px-[27px] py-3 md:py-[19px] lg:py-[19px] outline-none focus:ring-2 resize-none leading-[1.219] transition-colors ${
                      errors.question && touched.question
                        ? "ring-2 ring-[#EF5350] bg-[#FFEBEE]"
                        : "focus:ring-[#C62828]"
                    }`}
                  />
                  {errors.question && touched.question && (
                    <div className="mt-1.5 md:mt-2 flex items-start gap-1.5 transition-all duration-200 ease-out opacity-100">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 text-[#EF5350] flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-[11px] md:text-[13px] lg:text-[14px] text-[#EF5350] font-montserrat leading-[1.4]">
                        {errors.question}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <SubmitButton
                variant="form"
                type="submit"
                disabled={isSubmitting}
                className="mt-2 md:mt-0 lg:mt-0 md:absolute md:left-[21%] md:top-[654px] lg:absolute lg:left-[203px] lg:top-[676px]"
              >
                {isSubmitting ? "Отправка..." : "Отправить"}
              </SubmitButton>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Notification - фиксированное позиционирование */}
      {message && (
        <div
          className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-auto md:max-w-[420px] z-[9999] transition-all duration-300 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div
            className={`px-4 py-3 md:px-5 md:py-4 rounded-[12px] shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex items-start gap-3 backdrop-blur-sm ${
              message.type === "success"
                ? "bg-[#E8F5E9] text-[#2E7D32] border border-[#4CAF50]/30"
                : "bg-[#FFEBEE] text-[#C62828] border border-[#EF5350]/30"
            }`}
          >
            {/* Иконка только для success */}
            {message.type === "success" && (
              <div className="flex-shrink-0 mt-0.5">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-[#4CAF50]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}

            {/* Текст */}
            <div className="flex-1 text-[14px] md:text-[15px] font-montserrat leading-[1.5] pr-2">
              {message.text}
            </div>

            {/* Кнопка закрытия */}
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => setMessage(null), 300);
              }}
              className={`flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-colors hover:bg-black/10 ${
                message.type === "success"
                  ? "text-[#2E7D32] hover:bg-[#2E7D32]/10"
                  : "text-[#C62828] hover:bg-[#C62828]/10"
              }`}
              aria-label="Закрыть уведомление"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
