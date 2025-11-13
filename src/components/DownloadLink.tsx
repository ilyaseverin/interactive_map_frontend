"use client";

import Image from "next/image";
import React from "react";

interface DownloadLinkProps {
  url: string;
  fileName: string;
  fileSize?: string;
}

export default function DownloadLink({
  url,
  fileName,
  fileSize,
}: DownloadLinkProps) {
  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(url);
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
      window.open(url, "_blank");
    }
  };

  return (
    <a
      href={url}
      onClick={handleDownload}
      className="flex items-start gap-[11px] lg:gap-[8px] hover:opacity-80 transition-opacity group cursor-pointer"
    >
      {/* Иконка файла */}
      <div className="w-[30px] h-[30px] md:w-[41px] md:h-[41px] lg:w-[68px] lg:h-[68px] flex-shrink-0 relative">
        <Image
          src="/images/document-icon.png"
          alt="Документ"
          width={68}
          height={68}
          className="object-contain"
        />
      </div>
      {/* Название и размер */}
      <div className="flex flex-col gap-[3px] lg:gap-[10px] min-w-0 flex-1 lg:pt-[5px]">
        <p className="text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat text-black leading-[1.219] break-words group-hover:underline">
          {fileName}
        </p>
        {fileSize && (
          <p className="text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat text-[#737373] leading-[1.219]">
            {fileSize}
          </p>
        )}
      </div>
    </a>
  );
}
