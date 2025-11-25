"use client";

import { useState } from "react";
import Image from "next/image";
import type {
  DocumentListResponse,
  DocumentItem,
  StrapiImage,
} from "@/types/strapi";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import DownloadLink, { isImageFile } from "@/components/DownloadLink";
import AttachmentsModal from "@/components/modals/AttachmentsModal";
import { BackButton, CategoryButton } from "@/components/buttons";
import { useGetDocumentsQuery } from "@/services/strapiApi";
import { getStrapiMediaUrl } from "@/utils/strapiUrl";
import { formatFileSize } from "@/utils/fileSize";

// Утилита для форматирования даты в формате dd.mm.yyyy
function formatDocumentDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

// Компонент для отображения файла документа
interface DocumentFileProps {
  file: StrapiImage;
  hideIcon?: boolean;
}

function DocumentFile({ file, hideIcon = false }: DocumentFileProps) {
  const fileUrl = getStrapiMediaUrl(file.url);
  const fileName = file.name || "Файл";
  // file.size в Strapi приходит в KB, конвертируем в байты
  const fileSizeInBytes = file.size ? file.size * 1024 : undefined;
  const fileSize = fileSizeInBytes
    ? formatFileSize(fileSizeInBytes)
    : undefined;

  // Проверяем, является ли файл изображением
  const isImage = isImageFile(fileName, file.mime, file.ext);

  if (!fileUrl) return null;

  return (
    <DownloadLink
      url={fileUrl}
      fileName={fileName}
      fileSize={fileSize}
      hideIcon={hideIcon}
      isImage={isImage}
    />
  );
}

// Компонент одного документа
interface DocumentItemProps {
  document: DocumentItem;
}

function DocumentItem({ document }: DocumentItemProps) {
  const [isAttachmentsModalOpen, setIsAttachmentsModalOpen] = useState(false);
  const date = formatDocumentDate(document.publishedAt);

  return (
    <div className="relative">
      {/* Дата с иконкой календаря */}
      <div className="flex items-center gap-[8px]">
        <div className="relative w-[15px] h-[15px] md:w-[21px] md:h-[21px] lg:w-[26px] lg:h-[26px]">
          <Image
            src="/images/calendar/calendar-icon-publish.png"
            alt="Дата"
            width={26}
            height={26}
            className="object-contain"
          />
        </div>
        <span className="text-[12px] md:text-[16px] lg:text-[20px] xl:text-[24px] font-normal font-montserrat text-black leading-[1.219]">
          {date}
        </span>
      </div>

      {/* Список файлов - отступ от даты */}
      <div className="mt-[15px] md:mt-[20px] lg:mt-[30px] pl-[13px] md:pl-[13px] lg:pl-[13px]">
        {/* Основные файлы документа */}
        {document.files && document.files.length > 0 && (
          <div className="flex flex-col gap-[12px] md:gap-[14px] lg:gap-[16px]">
            {document.files.map((file: StrapiImage) => (
              <DocumentFile key={file.id} file={file} />
            ))}
          </div>
        )}

        {/* Приложения (если есть) */}
        {document.attachments?.files &&
          document.attachments.files.length > 0 && (
            <>
              <button
                onClick={() => setIsAttachmentsModalOpen(true)}
                className={`w-full flex items-center gap-[14px] md:gap-[16px] lg:gap-[18px] hover:opacity-80 transition-opacity cursor-pointer text-left ${
                  document.files && document.files.length > 0
                    ? "mt-[12px] md:mt-[14px] lg:mt-[16px]"
                    : ""
                }`}
                aria-label="Открыть приложения"
              >
                {/* Иконка папки */}
                <div className="flex-shrink-0 relative flex items-center justify-center w-[30px] h-[30px] md:w-[40px] md:h-[40px]">
                  <Image
                    src="/images/documents/folder-icon.png"
                    alt="Приложения"
                    width={40}
                    height={40}
                    className="object-contain w-full h-full"
                  />
                </div>
                {/* Название и количество файлов */}
                <div className="flex flex-col gap-[3px] min-w-0 flex-1 text-left">
                  <p className="text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat text-black leading-[1.219] break-words">
                    Приложения
                  </p>
                  <p className="text-[12px] md:text-[14px] lg:text-[15px] font-normal font-montserrat text-[#737373] leading-[1.219]">
                    {document.attachments.files.length}{" "}
                    {getFilesWord(document.attachments.files.length)}
                  </p>
                </div>
              </button>
              <AttachmentsModal
                isOpen={isAttachmentsModalOpen}
                onClose={() => setIsAttachmentsModalOpen(false)}
                files={document.attachments.files}
              />
            </>
          )}
      </div>
    </div>
  );
}

// Склонение слова "файл"
function getFilesWord(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "файлов";
  }
  if (lastDigit === 1) {
    return "файл";
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return "файла";
  }
  return "файлов";
}

// Типы категорий
type CategoryFilter = "all" | "Реестр" | "Метод. Рекомендации";

export default function DocumentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const pageSize = 10;

  const {
    data: documentsData,
    isFetching,
    isError,
  } = useGetDocumentsQuery({
    page: currentPage,
    pageSize,
    category: activeCategory === "all" ? undefined : activeCategory,
  });

  const fallbackData: DocumentListResponse = { data: [], meta: {} };
  const mergedData = documentsData ?? fallbackData;

  const documentsList = mergedData.data;
  const totalPages = mergedData.meta?.pagination?.pageCount || 1;
  const isLoading = isFetching;

  const handleCategoryChange = (category: CategoryFilter) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  // Компонент для отображения состояния
  const renderContent = () => {
    if (isError) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="text-[16px] md:text-[18px] lg:text-[20px] text-gray-600 font-montserrat">
            Не удалось загрузить документы. Попробуйте обновить страницу.
          </div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="text-[16px] md:text-[18px] lg:text-[20px] text-gray-600 font-montserrat">
            Загрузка...
          </div>
        </div>
      );
    }

    if (documentsList.length === 0) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="text-[16px] md:text-[18px] lg:text-[20px] text-gray-600 font-montserrat">
            Документов пока нет
          </div>
        </div>
      );
    }

    return (
      <div className="divide-y-2 divide-[#969696]">
        {documentsList.map((doc: DocumentItem, index: number) => (
          <div
            key={doc.id}
            className={`${
              index > 0 ? "pt-[30px] md:pt-[40px] lg:pt-[50px]" : ""
            } ${
              index < documentsList.length - 1
                ? "pb-[30px] md:pb-[40px] lg:pb-[50px]"
                : ""
            }`}
          >
            <DocumentItem document={doc} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      {/* Основной контент */}
      <main className="w-full max-w-[1920px] mx-auto pt-[15px] md:pt-[20px] lg:pt-[40px]">
        {/* Хлебные крошки */}
        <Breadcrumbs
          items={[{ label: "Главная", href: "/home" }, { label: "Документы" }]}
          className="px-[19px] md:px-[34px] lg:px-[80px] mb-[15px] md:mb-[20px] lg:mb-[27px]"
        />

        {/* Заголовок и кнопка Назад */}
        <div className="px-[19px] md:px-[34px] lg:px-[80px] flex items-center justify-between mb-[15px] md:mb-[20px] lg:mb-[42px]">
          <h1 className="text-[20px] md:text-[30px] lg:text-[40px] font-bold font-montserrat text-black leading-[1.219]">
            Документы
          </h1>

          {/* Кнопка Назад */}
          <div className="md:hidden">
            <BackButton href="/home" variant="icon" />
          </div>
          <div className="hidden md:block">
            <BackButton href="/home" />
          </div>
        </div>

        {/* Категории - мобильная версия */}
        <div className="px-[19px] md:hidden mb-[20px]">
          <div className="inline-flex flex-col gap-[5px]">
            {/* Первый ряд: Все и Реестры */}
            <div className="flex gap-[5px]">
              <CategoryButton
                label="Все"
                isActive={activeCategory === "all"}
                onClick={() => handleCategoryChange("all")}
                variant="mobile"
                className="flex-1"
              />
              <CategoryButton
                label="Реестры"
                isActive={activeCategory === "Реестр"}
                onClick={() => handleCategoryChange("Реестр")}
                variant="mobile"
                className="flex-1"
              />
            </div>
            {/* Второй ряд: Метод. рекомендации - ширина ограничена первым рядом */}
            <CategoryButton
              label="Метод. рекомендации"
              isActive={activeCategory === "Метод. Рекомендации"}
              onClick={() => handleCategoryChange("Метод. Рекомендации")}
              variant="mobile"
              className="w-full"
            />
          </div>
        </div>

        {/* Категории - планшет и десктоп */}
        <div className="hidden md:block px-[34px] lg:px-[80px] mb-[30px] lg:mb-[50px]">
          <div className="flex flex-wrap gap-[14px] lg:gap-[23px]">
            <CategoryButton
              label="Все"
              isActive={activeCategory === "all"}
              onClick={() => handleCategoryChange("all")}
            />
            <CategoryButton
              label="Реестры"
              isActive={activeCategory === "Реестр"}
              onClick={() => handleCategoryChange("Реестр")}
            />
            <CategoryButton
              label="Метод. рекомендации"
              isActive={activeCategory === "Метод. Рекомендации"}
              onClick={() => handleCategoryChange("Метод. Рекомендации")}
            />
          </div>
        </div>

        {/* Контейнер с документами */}
        <div className="px-[19px] md:px-[34px] lg:px-[80px] mb-[30px] md:mb-[40px] lg:mb-[60px]">
          <div className="bg-white/90 rounded-[15px] px-[20px] md:px-[40px] lg:px-[58px] py-[25px] md:py-[35px] lg:py-[50px]">
            {renderContent()}
          </div>
        </div>

        {/* Пагинация */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="px-[19px] md:px-[34px] lg:px-[80px]"
        />
      </main>
    </div>
  );
}
