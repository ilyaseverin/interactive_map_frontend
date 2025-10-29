"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  date?: string;
  alt: string;
  imageName?: string;
}

export default function PhotoModal({
  isOpen,
  onClose,
  imageUrl,
  title,
  date,
  alt,
  imageName,
}: PhotoModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Фон затемнения */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0"
            style={{ backgroundColor: "rgba(128, 128, 128, 0.6)" }}
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className="flex min-h-full items-center justify-center p-4 text-center"
            onClick={onClose}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="relative w-full max-w-[1262px] h-[500px] sm:h-[765px] lg:h-[765px] transform overflow-hidden rounded-[15px] bg-[#FEFEFE] text-left align-middle shadow-xl transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Крестик закрытия */}
                <button
                  onClick={onClose}
                  className="absolute right-[16px] sm:right-[24px] lg:right-[24px] top-[16px] sm:top-[24px] lg:top-[24px] z-10 w-[44px] h-[44px] rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center group"
                  aria-label="Закрыть"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white group-hover:rotate-90 transition-all duration-200"
                  >
                    <path
                      d="M15 5L5 15M5 5L15 15"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Контент попапа */}
                <div className="relative h-full p-[16px] sm:p-[94px] lg:p-[94px]">
                  {/* Фото */}
                  <div className="absolute left-[16px] sm:left-[94px] lg:left-[94px] top-[16px] sm:top-[57px] lg:top-[57px] right-[16px] sm:right-[94px] lg:right-[94px]">
                    <div className="relative w-full h-[300px] sm:h-[550px] lg:h-[550px] rounded-[15px] overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1074px"
                      />
                    </div>
                  </div>

                  {/* Текст под фото */}
                  <div className="absolute left-[16px] sm:left-[94px] lg:left-[94px] bottom-[16px] sm:bottom-[44px] lg:bottom-[44px] right-[120px] sm:right-[259px] lg:right-[165px]">
                    <h3 className="text-[16px] sm:text-[24px] lg:text-[24px] font-montserrat font-medium leading-[1.219] text-black mb-[5px] sm:mb-[10px] lg:mb-[10px]">
                      {title}
                    </h3>
                    {date && (
                      <p className="text-[14px] sm:text-[24px] lg:text-[24px] font-montserrat font-medium leading-[1.219] text-black">
                        {date}
                      </p>
                    )}
                  </div>

                  {/* Кнопка скачать */}
                  <div className="absolute right-[16px] sm:right-[94px] lg:right-[94px] bottom-[16px] sm:bottom-[44px] lg:bottom-[44px]">
                    <button
                      onClick={async () => {
                        try {
                          // Загружаем изображение как blob
                          const response = await fetch(imageUrl);
                          const blob = await response.blob();

                          // Создаем URL для blob
                          const blobUrl = window.URL.createObjectURL(blob);

                          // Создаем ссылку для скачивания
                          const link = document.createElement("a");
                          link.href = blobUrl;
                          link.download =
                            imageName || `${title || "photo"}.jpg`;
                          document.body.appendChild(link);
                          link.click();

                          // Очищаем
                          document.body.removeChild(link);
                          window.URL.revokeObjectURL(blobUrl);
                        } catch (error) {
                          console.error("Ошибка при скачивании:", error);
                          // Fallback - открываем в новой вкладке
                          window.open(imageUrl, "_blank");
                        }
                      }}
                      className="flex items-center gap-[6px] sm:gap-[9px] lg:gap-[9px] px-[16px] sm:px-[24px] lg:px-[24px] py-[12px] sm:py-[16px] lg:py-[16px] bg-[#C62828] text-[#EDF3F7] text-[16px] sm:text-[20px] lg:text-[20px] font-montserrat font-medium rounded-[12px] hover:bg-[#B71C1C] transition-colors"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 sm:w-6 sm:h-6 lg:w-6 lg:h-6"
                      >
                        <path
                          d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 10L12 15L17 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 15V3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Скачать
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
