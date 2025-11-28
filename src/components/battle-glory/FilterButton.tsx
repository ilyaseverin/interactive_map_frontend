import Image from "next/image";
import {
  BATTLE_GLORY_TYPE_ICONS,
  BATTLE_GLORY_FILTER_ICON_SIZES,
} from "@/components/maps/constants/battleGlory";

type FilterType =
  | null
  | "памятник/мемориал"
  | "мемориальная доска"
  | "воинское захоронение";

type FilterButtonProps = {
  filter: FilterType;
  label: string;
  activeFilter: FilterType;
  onClick: (filter: FilterType) => void;
};

export default function FilterButton({
  filter,
  label,
  activeFilter,
  onClick,
}: FilterButtonProps) {
  const isActive = activeFilter === filter;
  const hasIcon = filter !== null;
  const iconPath = filter ? BATTLE_GLORY_TYPE_ICONS[filter] : null;
  const iconSize = filter ? BATTLE_GLORY_FILTER_ICON_SIZES[filter] : null;

  return (
    <button
      onClick={() => onClick(filter)}
      className={`cursor-pointer box-border flex items-center justify-center ${
        hasIcon ? "gap-[6px]" : "gap-[10px]"
      } h-[50px] p-[10px] md:p-[15px] rounded-[10px] transition-colors w-full md:w-auto ${
        isActive ? "bg-[#1d4e89]" : "bg-white hover:bg-gray-50"
      }`}
    >
      {hasIcon && iconPath && iconSize && (
        <div
          className="relative shrink-0"
          style={{ width: iconSize.width, height: iconSize.height }}
        >
          <Image
            src={iconPath}
            alt={label}
            width={iconSize.width}
            height={iconSize.height}
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <p
        className={`font-montserrat font-normal leading-normal text-[14px] md:text-[16px] shrink-0 ${
          isActive ? "text-white" : "text-black"
        }`}
      >
        {label}
      </p>
    </button>
  );
}
