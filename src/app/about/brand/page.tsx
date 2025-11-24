"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGetBrandQuery } from "@/services/strapiApi";
import { BackButton } from "@/components/buttons";
import DownloadLink from "@/components/DownloadLink";
import ColorSquare from "@/components/ColorSquare";
import { getStrapiMediaUrl, getResponsiveImageUrl } from "@/utils/strapiUrl";
import { formatFileSize } from "@/utils/fileSize";
import { formatDate } from "@/utils/dateUtils";

export default function BrandPage() {
  const router = useRouter();
  const { data, isFetching, isError } = useGetBrandQuery();
  const brandData = data?.data;

  if (isFetching) {
    return (
      <div className="w-full max-w-[1920px] mx-auto px-[35px] sm:px-[36px] lg:px-[64px] xl:px-[80px] pb-[30px] lg:pb-[194px]">
        <div className="flex justify-center items-center py-20">
          <div className="text-xl text-gray-600">Загрузка...</div>
        </div>
      </div>
    );
  }

  if (isError || !brandData) {
    return (
      <div className="w-full max-w-[1920px] mx-auto px-[35px] sm:px-[36px] lg:px-[64px] xl:px-[80px] pb-[30px] lg:pb-[194px]">
        <div className="flex justify-center items-center py-20">
          <div className="text-xl text-gray-600">
            Не удалось загрузить данные фирменного стиля. Попробуйте обновить
            страницу.
          </div>
        </div>
      </div>
    );
  }

  const content = brandData.content;

  // Компонент даты с иконкой
  const DateWithIcon = ({ date }: { date: string }) => (
    <div className="flex items-center gap-[10px]">
      <Image
        src="/images/calendar/calendar-icon.png"
        alt="Календарь"
        width={22}
        height={22}
        className="w-[22px] h-[22px]"
      />
      <span className="text-[24px] font-montserrat font-normal text-black leading-[1.219]">
        {formatDate(date)}
      </span>
    </div>
  );

  return (
    <div className="w-full max-w-[1920px] mx-auto px-[16px] sm:px-[32px] md:px-[36px] lg:px-[64px] xl:px-[80px] pb-[30px] sm:pb-[40px] lg:pb-[50px]">
      <div className="bg-white rounded-[10px] md:rounded-[12px] lg:rounded-[15px] px-[19px] pt-[20px] pb-[30px] md:px-[30px] md:pt-[30px] lg:px-[80px] lg:pt-[71px] lg:pb-[65px]">
        {/* Логотип с описанием */}
        {content?.logo_with_description && (
          <>
            <div>
              {/* Дата */}
              {brandData.publishedAt && (
                <div className="mb-[50px]">
                  <DateWithIcon date={brandData.publishedAt} />
                </div>
              )}

              <h2 className="mb-[28px] text-[40px] font-montserrat font-bold leading-[1.219] text-black">
                Лого с описанием
              </h2>

              {content.logo_with_description.files &&
                content.logo_with_description.files.length > 0 && (
                  <div>
                    {content.logo_with_description.files.map((file) => {
                      const fileUrl = getStrapiMediaUrl(file.url);
                      if (!fileUrl) return null;

                      const fileName = file.name || "Файл";
                      const fileSize = file.size
                        ? formatFileSize(file.size)
                        : undefined;

                      return (
                        <div key={file.id} className="mb-[15px] last:mb-0">
                          <DownloadLink
                            url={fileUrl}
                            fileName={fileName}
                            fileSize={fileSize}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
            </div>

            {/* Разделитель */}
            {(content?.logos && content.logos.length > 0) ||
            (content?.brand_colors && content.brand_colors.length > 0) ? (
              <div className="border-t border-[#969696] my-[50px] lg:my-[65px]"></div>
            ) : null}
          </>
        )}

        {/* Фирменные логотипы */}
        {content?.logos && content.logos.length > 0 && (
          <>
            <div>
              {/* Дата */}
              {brandData.publishedAt && (
                <div className="mb-[50px]">
                  <DateWithIcon date={brandData.publishedAt} />
                </div>
              )}

              <h2 className="mb-[50px] text-[40px] font-montserrat font-bold leading-[1.219] text-black">
                Фирменный логотип
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
                {content.logos.map((logo) => {
                  const imageUrl = getResponsiveImageUrl(logo, "large");
                  if (!imageUrl) return null;

                  const fileUrl = getStrapiMediaUrl(logo.url);
                  const fileName = logo.name || "Логотип";
                  const fileSize = logo.size
                    ? formatFileSize(logo.size)
                    : undefined;

                  return (
                    <div key={logo.id} className="flex flex-col items-center">
                      {/* Изображение логотипа - просто квадрат без рамок */}
                      <div className="relative w-full max-w-[369px] aspect-[369/323] rounded-[12px] overflow-hidden mb-[20px]">
                        <Image
                          src={imageUrl}
                          alt={logo.alternativeText || logo.name || "Логотип"}
                          fill
                          className="object-contain"
                        />
                      </div>

                      {/* Файл для скачивания без иконки */}
                      {fileUrl && (
                        <div className="flex justify-center w-full">
                          <DownloadLink
                            url={fileUrl}
                            fileName={fileName}
                            fileSize={fileSize}
                            hideIcon={true}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Разделитель */}
            {content?.brand_colors && content.brand_colors.length > 0 ? (
              <div className="border-t border-[#969696] my-[50px] lg:my-[65px]"></div>
            ) : null}
          </>
        )}

        {/* Ключевые цвета */}
        {content?.brand_colors && content.brand_colors.length > 0 && (
          <div>
            {/* Дата */}
            {brandData.publishedAt && (
              <div className="mb-[50px]">
                <DateWithIcon date={brandData.publishedAt} />
              </div>
            )}

            <h2 className="mb-[50px] text-[40px] font-montserrat font-bold leading-[1.219] text-black">
              Ключевые цвета
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-[30px]">
              {content.brand_colors.map((color) => {
                return (
                  <ColorSquare
                    key={color.id}
                    hexValue={color.hex_value || "#000000"}
                    rgbValue={color.rgb_value}
                    cmykValue={color.cmyk_value}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Сообщение, если нет данных */}
        {!content?.logo_with_description &&
          (!content?.logos || content.logos.length === 0) &&
          (!content?.brand_colors || content.brand_colors.length === 0) && (
            <div className="flex justify-center items-center py-20">
              <div className="text-xl text-gray-600">
                Данные фирменного стиля пока не добавлены
              </div>
            </div>
          )}

        {/* Back Button */}
        <div className="flex justify-center md:justify-start mt-[30px] sm:mt-[40px] lg:mt-[50px]">
          <BackButton
            onClick={() => router.back()}
            variant="default"
            className="w-[124px] md:w-auto"
          />
        </div>
      </div>
    </div>
  );
}
