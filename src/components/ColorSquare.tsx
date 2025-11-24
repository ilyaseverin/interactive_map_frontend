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
  // Определяем цвет текста в зависимости от яркости фона
  const getTextColor = (hex: string): string => {
    // Удаляем # если есть
    const color = hex.replace("#", "");
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    // Вычисляем яркость
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Для светлых цветов используем черный, для темных - белый
    // Также проверяем специфичные цвета из макета
    if (hexValue === "#1BAAAD" || hexValue === "#33BACC") {
      return "#000000";
    }

    return brightness > 128 ? "#000000" : "#FFFFFF";
  };

  const textColor = getTextColor(hexValue);

  return (
    <div className="space-y-[19px]">
      {/* Цветной квадрат с HEX в центре */}
      <div
        className="w-full max-w-[250px] aspect-square xl:w-[250px] xl:h-[250px] rounded-[12px] flex items-center justify-center"
        style={{ backgroundColor: hexValue }}
      >
        <span
          className="font-montserrat font-normal text-[20px] leading-[1.219] text-center"
          style={{ color: textColor }}
        >
          {hexValue}
        </span>
      </div>

      {/* Информация о цвете */}
      <div className="space-y-0 text-[20px] font-montserrat font-normal text-black leading-[1.219] text-center">
        <div className="mb-[4px]">{hexValue}</div>
        {rgbValue && <div className="mb-[4px]">{rgbValue}</div>}
        {cmykValue && <div>{cmykValue}</div>}
      </div>
    </div>
  );
}
