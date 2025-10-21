type BurgerButtonProps = {
  onClick: () => void;
  lineWidth: number;
  lineHeight: number;
  gap: number;
};

export default function BurgerButton({
  onClick,
  lineWidth,
  lineHeight,
  gap,
}: BurgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="hover:opacity-70 transition-opacity flex items-center justify-center p-1"
      aria-label="Меню"
    >
      <div className="flex flex-col" style={{ gap: `${gap}px` }}>
        <div
          className="rounded-[3px] bg-black"
          style={{ width: `${lineWidth}px`, height: `${lineHeight}px` }}
        />
        <div
          className="rounded-[3px] bg-black"
          style={{ width: `${lineWidth}px`, height: `${lineHeight}px` }}
        />
        <div
          className="rounded-[3px] bg-black"
          style={{ width: `${lineWidth}px`, height: `${lineHeight}px` }}
        />
      </div>
    </button>
  );
}
