import { ActivityComplex } from "@/types/strapi";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BackButton } from "@/components/buttons";
import { getStrapiMediaUrl } from "@/utils/strapiUrl";
import DownloadLink from "@/components/DownloadLink";
import { formatFileSize } from "@/utils/fileSize";

interface ActivityComplexPageContentProps {
  complex: ActivityComplex;
}

export default function ActivityComplexPageContent({
  complex,
}: ActivityComplexPageContentProps) {
  // Функция для рендеринга HTML контента
  const renderContent = (html: string | undefined) => {
    if (!html) return null;
    return (
      <div
        className="prose prose-lg max-w-none [&_p]:text-[12px] md:[&_p]:text-[16px] lg:[&_p]:text-[24px] [&_p]:font-normal md:[&_p]:font-medium [&_p]:font-montserrat [&_p]:text-black [&_p]:leading-[1.666] md:[&_p]:leading-[1.5625] lg:[&_p]:leading-[1.458] [&_p]:mb-[20px] md:[&_p]:mb-[25px] lg:[&_p]:mb-[30px] [&_h1]:text-[20px] md:[&_h1]:text-[28px] lg:[&_h1]:text-[36px] [&_h1]:font-bold [&_h1]:font-montserrat [&_h1]:text-black [&_h1]:mb-[15px] md:[&_h1]:mb-[20px] lg:[&_h1]:mb-[25px] [&_h2]:text-[18px] md:[&_h2]:text-[24px] lg:[&_h2]:text-[30px] [&_h2]:font-semibold [&_h2]:font-montserrat [&_h2]:text-black [&_h2]:mb-[12px] md:[&_h2]:mb-[16px] lg:[&_h2]:mb-[20px] [&_ul]:list-disc [&_ul]:pl-[20px] md:[&_ul]:pl-[30px] [&_ol]:list-decimal [&_ol]:pl-[20px] md:[&_ol]:pl-[30px] [&_li]:text-[12px] md:[&_li]:text-[16px] lg:[&_li]:text-[24px] [&_li]:mb-[10px] [&_a]:text-[#1d4e89] [&_a]:underline [&_a]:hover:opacity-70"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      <main className="w-full max-w-[1920px] mx-auto px-[19px] md:px-[36px] lg:px-[63px] pt-[15px] md:pt-[20px] lg:pt-[40px]">
        <Breadcrumbs
          className="mb-[30px] lg:mb-[30px] lg:pl-[17px]"
          items={[
            { label: "Главная", href: "/home" },
            { label: "Деятельность центра", href: "/activity" },
            { label: complex.title },
          ]}
        />

        <div className="bg-white/90 rounded-[10px] md:rounded-[15px] p-[19px] md:p-[36px] lg:px-[80px] lg:py-[60px] mb-[83px]">
          {/* Мобилка/планшет: заголовок и кнопка */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between mb-[28px]">
              <h1 className="text-[20px] md:text-[30px] font-bold font-montserrat text-black leading-[1.219]">
                {complex.title}
              </h1>
              <div className="flex-shrink-0">
                <div className="md:hidden">
                  <BackButton
                    href="/activity"
                    variant="icon"
                    ariaLabel="Назад к комплексам"
                  />
                </div>
                <div className="hidden md:block">
                  <BackButton href="/activity" />
                </div>
              </div>
            </div>
          </div>

          {/* Десктоп: заголовок слева, кнопка справа */}
          <div className="hidden lg:block">
            <div className="flex items-start justify-between mb-[23px]">
              <h1 className="text-[40px] font-bold font-montserrat text-black leading-[1.219]">
                {complex.title}
              </h1>
              <div className="flex-shrink-0">
                <BackButton href="/activity" />
              </div>
            </div>
          </div>

          {/* Content Body */}
          {complex.content?.body && (
            <div className="xl:px-[40px] 2xl:px-[96px] pt-[25px] md:pt-[40px] lg:pt-[64px]">
              <div className="mb-[25px] md:mb-[40px] lg:mb-[46px]">
                {renderContent(complex.content.body)}
              </div>
            </div>
          )}

          {/* Attachments */}
          {complex.content?.attachments &&
            complex.content.attachments.length > 0 && (
              <div className="xl:px-[40px] 2xl:px-[96px]">
                <div className="flex flex-col gap-[10px] mb-[25px] md:mb-[40px] lg:mb-[64px]">
                  {complex.content.attachments.map((attachment) => {
                    const fileUrl = attachment.file?.url
                      ? getStrapiMediaUrl(attachment.file.url)
                      : null;
                    const fileSize = attachment.file?.size
                      ? formatFileSize(attachment.file.size)
                      : undefined;
                    const fileName =
                      attachment.title || attachment.file?.name || "Документ";
                    const isImage = attachment.file?.mime?.startsWith("image/");

                    if (!fileUrl) {
                      console.warn("Attachment without file URL:", attachment);
                      return null;
                    }

                    return (
                      <DownloadLink
                        key={attachment.id}
                        url={fileUrl}
                        fileName={fileName}
                        fileSize={fileSize}
                        isImage={isImage}
                      />
                    );
                  })}
                </div>
              </div>
            )}

          {/* Links */}
          {complex.content?.links && complex.content.links.length > 0 && (
            <div className="xl:px-[40px] 2xl:px-[96px]">
              <div className="flex flex-col gap-[10px] mb-[25px] md:mb-[40px] lg:mb-[64px]">
                {complex.content.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat text-[#1d4e89] hover:opacity-70 transition-opacity underline"
                  >
                    {link.label || link.url}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Нижняя часть: кнопка назад */}
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-6 pt-[25px] md:pt-[40px] lg:pt-[64px]">
            <BackButton href="/activity" />
          </div>
        </div>
      </main>
    </div>
  );
}

