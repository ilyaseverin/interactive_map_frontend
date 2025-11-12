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
            className="flex min-h-full items-center justify-center px-[25px] py-4 sm:p-4 text-center"
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
                className="relative w-full sm:max-w-[648px] lg:max-w-[1262px] h-auto sm:h-[525px] lg:h-[736px] max-h-[90vh] transform overflow-hidden rounded-[10px] sm:rounded-[15px] lg:rounded-[15px] bg-[#FEFEFE] text-left align-middle shadow-xl transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Крестик закрытия */}
                <button
                  onClick={onClose}
                  className="absolute right-[10px] sm:right-[8px] lg:right-[20px] top-[10px] sm:top-[8px] lg:top-[20px] z-10 w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] lg:w-[60px] lg:h-[60px] rounded-full hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center group"
                  style={{ backgroundColor: "rgba(54, 54, 54, 0.7)" }}
                  aria-label="Закрыть"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white group-hover:rotate-90 transition-all duration-200 w-[12px] h-[12px] sm:w-[16px] sm:h-[16px] lg:w-[20px] lg:h-[20px]"
                  >
                    <path
                      d="M1 1L19 19M19 1L1 19"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Контент попапа */}
                <div className="relative h-auto sm:h-full px-[10px] pt-[10px] pb-0 sm:p-[23px] lg:p-[50px] flex flex-col">
                  {/* Фото */}
                  <div className="w-full aspect-[250/168] sm:flex-1 sm:aspect-auto sm:min-h-0 mb-[16px] sm:mb-[15px] lg:mb-[23px]">
                    <div className="relative w-full h-full rounded-[7px] sm:rounded-[7px] lg:rounded-[15px] overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1074px"
                      />
                    </div>
                  </div>

                  {/* Текст и кнопка под фото */}
                  <div className="flex flex-col sm:flex-col lg:flex-row items-center sm:items-start lg:items-end justify-between gap-4 sm:gap-[20px] lg:gap-4 pb-[20px] sm:pb-0">
                    {/* Текст под фото */}
                    <div className="w-full sm:flex-1 min-w-0 text-left lg:ml-[8px] flex flex-col">
                      {/* На мобильной и планшете: сначала дата, потом заголовок */}
                      {date && (
                        <p className="text-[12px] sm:text-[16px] lg:text-[24px] font-montserrat font-medium leading-[1.219] text-black mb-[5px] sm:mb-[10px] lg:mb-[10px] order-1 sm:order-1 lg:order-2">
                          {date}
                        </p>
                      )}
                      <h3 className="text-[12px] sm:text-[16px] lg:text-[24px] font-montserrat font-medium leading-[1.219] text-black order-2 sm:order-2 lg:order-1 lg:mb-[10px]">
                        {title}
                      </h3>
                    </div>

                    {/* Кнопка скачать */}
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
                      className="flex items-center justify-center gap-[5px] sm:gap-[5px] lg:gap-[10px] px-[20px] sm:px-[24px] lg:px-[24px] py-0 sm:py-0 lg:py-[16px] h-[40px] sm:h-[47px] lg:h-auto bg-[#C62828] text-[#EDF3F7] text-[12px] sm:text-[16px] lg:text-[20px] font-montserrat font-medium rounded-[12px] hover:bg-[#B71C1C] active:scale-95 transition-all duration-150 shrink-0 w-full sm:w-full sm:max-w-[260px] self-center sm:self-center lg:w-auto lg:self-auto"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 sm:w-[24px] sm:h-[24px] lg:w-[24px] lg:h-[24px]"
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
