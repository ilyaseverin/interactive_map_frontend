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
        twoColumns
          ? "grid grid-cols-2 gap-x-[30px] px-[15px] py-[19px]"
          : "px-[15px] py-[19px]"
      }`}
      style={{
        backgroundColor: "#1D4E89",
        minWidth: twoColumns ? "449px" : "217px",
      }}
    >
      {twoColumns ? (
        <>
          <ul className="space-y-[16px]">
            {subMenu.slice(0, 6).map((subItem) => (
              <li key={subItem.href}>
                <Link
                  href={subItem.href}
                  className="block font-montserrat font-normal text-[16px] leading-[20px] text-white hover:underline"
                >
                  {subItem.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-[16px]">
            {subMenu.slice(6).map((subItem) => (
              <li key={subItem.href}>
                <Link
                  href={subItem.href}
                  className="block font-montserrat font-normal text-[16px] leading-[20px] text-white hover:underline"
                >
                  {subItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ul className="space-y-[16px]">
          {subMenu.map((subItem) => (
            <li key={subItem.href}>
              <Link
                href={subItem.href}
                className="block font-montserrat font-normal text-[18px] leading-[22px] text-white hover:underline"
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
