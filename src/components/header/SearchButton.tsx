import Image from "next/image";

type SearchButtonProps = {
  onClick: () => void;
  size: { width: number; height: number };
};

export default function SearchButton({ onClick, size }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 hover:opacity-70 transition-opacity"
      aria-label="Поиск"
    >
      <Image
        src="/images/search-icon.svg"
        alt="Поиск"
        width={size.width}
        height={size.height}
        className="object-contain"
      />
    </button>
  );
}
