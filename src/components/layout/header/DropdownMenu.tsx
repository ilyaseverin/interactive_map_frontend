import Link from "next/link";

export type SubMenuItem = {
  label: string;
  href: string;
};

type DropdownMenuProps = {
  subMenu: SubMenuItem[];
  twoColumns?: boolean;
};

export default function DropdownMenu({
  subMenu,
  twoColumns,
}: DropdownMenuProps) {
  return (
    <div
      className={`absolute top-full left-0 z-50 rounded-b-[5px] rounded-tr-[5px] ${
        twoColumns ? "grid grid-cols-2" : ""
      }`}
      style={{
        backgroundColor: "#1D4E89",
        minWidth: twoColumns
          ? "clamp(300px, 23.385vw, 449px)"
          : "clamp(150px, 11.302vw, 217px)",
        padding: "clamp(12px, 0.99vw, 19px) clamp(10px, 0.781vw, 15px)",
        columnGap: twoColumns ? "clamp(20px, 1.563vw, 30px)" : "0",
      }}
    >
      {twoColumns ? (
        <>
          <ul style={{ gap: "clamp(10px, 1.25vw, 16px)" }} className="flex flex-col">
            {subMenu.slice(0, 6).map((subItem) => (
              <li key={subItem.href}>
                <Link
                  href={subItem.href}
                  className="block font-montserrat font-normal text-white hover:underline"
                  style={{
                    fontSize: "clamp(12px, 0.833vw, 16px)",
                    lineHeight: "clamp(15px, 1.042vw, 20px)",
                  }}
                >
                  {subItem.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul style={{ gap: "clamp(10px, 1.25vw, 16px)" }} className="flex flex-col">
            {subMenu.slice(6).map((subItem) => (
              <li key={subItem.href}>
                <Link
                  href={subItem.href}
                  className="block font-montserrat font-normal text-white hover:underline"
                  style={{
                    fontSize: "clamp(12px, 0.833vw, 16px)",
                    lineHeight: "clamp(15px, 1.042vw, 20px)",
                  }}
                >
                  {subItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ul style={{ gap: "clamp(10px, 1.25vw, 16px)" }} className="flex flex-col">
          {subMenu.map((subItem) => (
            <li key={subItem.href}>
              <Link
                href={subItem.href}
                className="block font-montserrat font-normal text-white hover:underline"
                style={{
                  fontSize: "clamp(13px, 0.938vw, 18px)",
                  lineHeight: "clamp(16px, 1.146vw, 22px)",
                }}
              >
                {subItem.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
