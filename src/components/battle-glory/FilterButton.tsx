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
  color?: string;
};

export default function FilterButton({
  filter,
  label,
  activeFilter,
  onClick,
  color,
}: FilterButtonProps) {
  const isActive = activeFilter === filter;
  const gapClass = color ? "gap-[6px]" : "gap-[10px]";
  const itemsClass = color ? "items-center" : "items-start";

  return (
    <button
      onClick={() => onClick(filter)}
      className={`bg-white box-border flex ${itemsClass} ${gapClass} p-[15px] rounded-[10px] transition-colors ${
        isActive ? "bg-white" : "bg-white hover:bg-gray-50"
      }`}
    >
      {color && (
        <div
          className="w-[11px] h-[11px] shrink-0 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
      )}
      <p className="font-montserrat font-normal leading-normal text-[16px] text-black">
        {label}
      </p>
    </button>
  );
}
