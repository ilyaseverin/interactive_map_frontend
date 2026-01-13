"use client";

import Image from "next/image";
import React from "react";
import { sanitizeHref } from "@/utils/safeUrl";

interface DownloadLinkProps {
  url: string;
  fileName: string;
  fileSize?: string;
  hideIcon?: boolean;
  isImage?: boolean; // Флаг для определения, является ли файл изображением
}

// Функция для определения, является ли файл изображением
export function isImageFile(
  fileName: string,
  mime?: string | null,
  ext?: string | null
): boolean {
  return (
    mime?.startsWith("image/") ||
    /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(fileName) ||
    !!ext?.match(/^(jpg|jpeg|png|gif|bmp|webp|svg)$/i)
  );
}

export default function DownloadLink({
  url,
  fileName,
  fileSize,
  hideIcon = false,
  isImage = false,
}: DownloadLinkProps) {
  const safeUrl =
    sanitizeHref(url, {
      allowRelative: true,
      allowHash: false,
      allowMailto: false,
      allowTel: false,
    }) ?? "";

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      if (!safeUrl) {
        throw new Error("Unsafe download URL");
      }

      const response = await fetch(safeUrl);
      if (!response.ok) throw new Error("Failed to download");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
      if (safeUrl) {
        window.open(safeUrl, "_blank", "noopener,noreferrer");
      }
    }
  };

  if (hideIcon) {
    return (
      <a
        href={safeUrl || "#"}
        onClick={handleDownload}
        className="flex flex-col gap-[3px] hover:opacity-80 transition-opacity group cursor-pointer"
      >
        <p
          className="text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat text-[#474747] leading-[1.219] group-hover:underline truncate"
          title={fileName}
        >
          {fileName}
        </p>
        {fileSize && (
          <p className="text-[12px] md:text-[15px] font-normal font-montserrat text-[#737373] leading-[1.219]">
            {fileSize}
          </p>
        )}
      </a>
    );
  }

  return (
    <a
      href={safeUrl || "#"}
      onClick={handleDownload}
      className="flex items-center gap-[14px] md:gap-[16px] lg:gap-[18px] hover:opacity-80 transition-opacity group cursor-pointer"
    >
      {/* Иконка файла */}
      <div className="flex-shrink-0 relative flex items-center justify-center w-[30px] h-[30px] md:w-[40px] md:h-[40px]">
        <Image
          src={
            isImage
              ? "/images/documents/image-icon.png"
              : "/images/document-icon.png"
          }
          alt={isImage ? "Изображение" : "Документ"}
          width={40}
          height={40}
          className="object-contain w-full h-full"
        />
      </div>
      {/* Название и размер */}
      <div className="flex flex-col gap-[3px] min-w-0 flex-1">
        <p
          className="text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat text-black leading-[1.219] group-hover:underline truncate"
          title={fileName}
        >
          {fileName}
        </p>
        {fileSize && (
          <p className="text-[12px] md:text-[14px] lg:text-[15px] font-normal font-montserrat text-[#737373] leading-[1.219]">
            {fileSize}
          </p>
        )}
      </div>
    </a>
  );
}
