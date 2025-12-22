import Breadcrumbs from "@/components/Breadcrumbs";
import { BackButton } from "@/components/buttons";

interface ActivityComplexEmptyStateProps {
  categoryLabel: string;
}

export default function ActivityComplexEmptyState({
  categoryLabel,
}: ActivityComplexEmptyStateProps) {
  return (
    <div className="min-h-screen bg-[#F1F2F3]">
      <main className="w-full max-w-[1920px] mx-auto px-[19px] md:px-[36px] lg:px-[63px] pt-[15px] md:pt-[20px] lg:pt-[40px]">
        <Breadcrumbs
          className="mb-[30px] lg:mb-[30px] lg:pl-[17px]"
          items={[
            { label: "Главная", href: "/home" },
            { label: "Деятельность центра", href: "/activity" },
            { label: categoryLabel },
          ]}
        />

        <div className="bg-white/90 rounded-[10px] md:rounded-[15px] p-[19px] md:p-[36px] lg:px-[80px] lg:py-[60px] mb-[83px]">
          <div className="lg:hidden">
            <div className="flex items-center justify-between mb-[28px]">
              <h1 className="text-[20px] md:text-[30px] font-bold font-montserrat text-black leading-[1.219]">
                {categoryLabel}
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

          <div className="hidden lg:block">
            <div className="flex items-start justify-between mb-[23px]">
              <h1 className="text-[40px] font-bold font-montserrat text-black leading-[1.219]">
                {categoryLabel}
              </h1>
              <div className="flex-shrink-0">
                <BackButton href="/activity" />
              </div>
            </div>
          </div>

          <div className="xl:px-[40px] 2xl:px-[96px] pt-[25px] md:pt-[40px] lg:pt-[64px]">
            <div className="text-center py-[40px] md:py-[60px] lg:py-[80px]">
              <p className="text-[16px] md:text-[20px] lg:text-[24px] font-normal md:font-medium font-montserrat text-[#666666] leading-[1.5]">
                В стадии наполнения
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-6 pt-[25px] md:pt-[40px] lg:pt-[64px]">
            <BackButton href="/activity" />
          </div>
        </div>
      </main>
    </div>
  );
}

