"use client";

import { useState } from "react";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import JSZip from "jszip";
import type { StrapiImage } from "@/types/strapi";
import DownloadLink, { isImageFile } from "@/components/DownloadLink";
import { getStrapiMediaUrl } from "@/utils/strapiUrl";
import { formatFileSize } from "@/utils/fileSize";

interface AttachmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: StrapiImage[];
}

export default function AttachmentsModal({
  isOpen,
  onClose,
  files,
}: AttachmentsModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadAll = async () => {
    setIsDownloading(true);
    try {
      const zip = new JSZip();

      // Добавляем все файлы в архив
      const filePromises = files.map(async (file) => {
        const fileUrl = getStrapiMediaUrl(file.url);
        if (!fileUrl) return;

        try {
          const response = await fetch(fileUrl);
          if (!response.ok) return;

          const blob = await response.blob();
          const fileName = file.name || `file_${file.id}`;
          zip.file(fileName, blob);
        } catch (error) {
          console.error(`Ошибка при загрузке файла ${file.name}:`, error);
        }
      });

      // Ждем загрузки всех файлов
      await Promise.all(filePromises);

      // Генерируем ZIP-архив
      const zipBlob = await zip.generateAsync({ type: "blob" });

      // Скачиваем архив
      const blobUrl = window.URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "Приложения.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Ошибка при создании архива:", error);
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Фон затемнения */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/60 transition-opacity duration-300 ease-out data-[closed]:opacity-0 z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 overflow-y-auto z-40">
        <div
          className="flex min-h-full items-center justify-center px-[19px] md:px-[34px] lg:px-[50px] py-4 text-center"
          onClick={onClose}
        >
          <DialogPanel
            transition
            className="relative w-full max-w-[680px] lg:max-w-[1100px] max-h-[90vh] transform overflow-hidden rounded-[15px] bg-white text-left align-middle shadow-xl transition-all duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Крестик закрытия */}
            <button
              onClick={onClose}
              className="absolute right-[10px] sm:right-[20px] top-[10px] sm:top-[20px] z-10 w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] lg:w-[60px] lg:h-[60px] rounded-full hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center group cursor-pointer"
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
            <div className="px-[20px] md:px-[40px] lg:px-[58px] py-[25px] md:py-[35px] lg:py-[50px] overflow-y-auto max-h-[90vh] flex flex-col">
              {/* Заголовок */}
              <div className="mb-[20px] md:mb-[30px] lg:mb-[40px] text-center">
                <h2 className="text-[20px] md:text-[30px] lg:text-[40px] font-bold font-montserrat text-black leading-[1.219]">
                  Папка &quot;Приложения&quot;
                </h2>
              </div>

              {/* Список файлов */}
              <div className="flex-1 overflow-y-auto mb-[30px] md:mb-[40px] lg:mb-[50px] flex justify-center">
                <div className="w-full max-w-[900px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-[12px] md:gap-y-[14px] lg:gap-y-[16px] gap-x-0 md:gap-x-[40px] lg:gap-x-[58px]">
                  {files.map((file) => {
                    const fileUrl = getStrapiMediaUrl(file.url);
                    const fileName = file.name || "Файл";
                    const fileSizeInBytes = file.size
                      ? file.size * 1024
                      : undefined;
                    const fileSize = fileSizeInBytes
                      ? formatFileSize(fileSizeInBytes)
                      : undefined;

                    const isImage = isImageFile(fileName, file.mime, file.ext);

                    if (!fileUrl) return null;

                    return (
                      <DownloadLink
                        key={file.id}
                        url={fileUrl}
                        fileName={fileName}
                        fileSize={fileSize}
                        isImage={isImage}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Кнопка скачать все - внизу */}
              <div className="flex justify-center">
                <button
                  onClick={handleDownloadAll}
                  disabled={isDownloading}
                  className="flex items-center justify-center gap-[5px] md:gap-[10px] px-[20px] md:px-[24px] lg:px-[24px] py-[12px] md:py-[16px] lg:py-[16px] bg-[#C62828] text-[#EDF3F7] text-[12px] md:text-[16px] lg:text-[20px] font-medium font-montserrat rounded-[12px] hover:bg-[#B71C1C] active:scale-95 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto lg:w-auto"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6"
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
                  <span className="whitespace-nowrap">
                    {isDownloading ? "Скачивание..." : "Скачать всю папку"}
                  </span>
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
