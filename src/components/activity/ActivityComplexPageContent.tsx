import { ActivityComplex } from "@/types/strapi";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BackButton } from "@/components/buttons";
import { getStrapiMediaUrl } from "@/utils/strapiUrl";
import DownloadLink from "@/components/DownloadLink";
import { formatFileSize } from "@/utils/fileSize";
import { parseContentParagraphsHtml } from "@/utils/textUtils";

interface ActivityComplexPageContentProps {
  complex: ActivityComplex;
}

export default function ActivityComplexPageContent({
  complex,
}: ActivityComplexPageContentProps) {
  // Разбиваем контент на параграфы
  const contentParagraphs = parseContentParagraphsHtml(complex.content?.body);

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
          {contentParagraphs.length > 0 && (
            <div className="xl:px-[40px] 2xl:px-[96px] pt-[25px] md:pt-[40px] lg:pt-[64px]">
              <div className="mb-[25px] md:mb-[40px] lg:mb-[46px] space-y-[36px] [&_a]:underline [&_a]:text-[#1d4e89] [&_a:hover]:opacity-70">
                {contentParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-[12px] md:text-[16px] lg:text-[24px] font-normal md:font-medium font-montserrat text-black leading-[1.666] md:leading-[1.5625] lg:leading-[1.458] whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  >
                  </p>
                ))}
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

