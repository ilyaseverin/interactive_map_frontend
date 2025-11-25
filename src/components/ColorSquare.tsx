"use client";

interface ColorSquareProps {
  hexValue: string;
  rgbValue?: string | null;
  cmykValue?: string | null;
}

export default function ColorSquare({
  hexValue,
  rgbValue,
  cmykValue,
}: ColorSquareProps) {
  return (
    <div className="space-y-[7px] md:space-y-[15px] lg:space-y-[19px] flex flex-col items-center">
      {/* Цветной квадрат */}
      <div
        className="w-full max-w-[242px] md:max-w-[300px] lg:max-w-[250px] aspect-[242/180] md:aspect-square rounded-[8px] md:rounded-[12px] mx-auto"
        style={{ backgroundColor: hexValue }}
      />

      {/* Информация о цвете */}
      <div className="space-y-0 text-[12px] md:text-[16px] lg:text-[20px] font-montserrat font-normal text-[#474747] leading-[1.219] text-center">
        <div className="mb-[4px]">{hexValue}</div>
        {rgbValue && <div className="mb-[4px]">{rgbValue}</div>}
        {cmykValue && <div>{cmykValue}</div>}
      </div>
    </div>
  );
}
