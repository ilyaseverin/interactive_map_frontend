"use client";

interface DownloadLinkProps {
  url: string;
  fileName: string;
  displayName: string;
  isLast: boolean;
}

export default function DownloadLink({
  url,
  fileName,
  displayName,
  isLast,
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
    <span>
      <a
        href={url}
        onClick={handleDownload}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline cursor-pointer"
      >
        {displayName}
      </a>
      {!isLast && <span> / </span>}
    </span>
  );
}
