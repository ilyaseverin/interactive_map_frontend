import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumbs({
  items,
  className = "",
}: BreadcrumbsProps) {
  return (
    <nav
      className={
        "flex flex-wrap items-center gap-x-[5px] md:gap-x-[7px] lg:gap-x-[12px] gap-y-2 text-[12px] md:text-[16px] lg:text-[20px] font-normal font-montserrat leading-[1.219] " +
        className
      }
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div
            key={`${item.label}-${index}`}
            className="inline-flex items-center whitespace-normal md:whitespace-nowrap md:shrink-0"
          >
            {isLast || !item.href ? (
              <span className="text-black break-words">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-black hover:underline break-words md:break-normal"
              >
                {item.label}
              </Link>
            )}
            {!isLast && (
              <span className="text-black ml-[5px] md:ml-[7px] lg:ml-[12px]">
                &gt;
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
