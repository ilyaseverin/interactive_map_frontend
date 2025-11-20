import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  logoSize: { width: number; height: number };
  fontSize: string;
  gap: string;
  lineHeight?: string;
  hideText?: boolean;
};

export default function Logo({
  logoSize,
  fontSize,
  gap,
  lineHeight,
  hideText = false,
}: LogoProps) {
  return (
    <div className="flex items-center" style={{ gap }}>
      <Link href="/home" className="flex-shrink-0">
        <Image
          src="/images/logo-392dd2.png"
          alt="Патриот Центр 48"
          width={logoSize.width}
          height={logoSize.height}
          className="object-contain"
        />
      </Link>
      <Link
        href="/home"
        className={`font-normal font-montserrat text-black whitespace-nowrap transition-opacity duration-300 ${
          hideText ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
        }`}
        style={{
          fontSize,
          lineHeight: lineHeight || "1.2",
          marginLeft: hideText ? 0 : undefined, // Убираем отступ если текст скрыт, если gap задается стилем родителя, но тут gap в style
        }}
      >
        Патриот Центр 48
      </Link>
    </div>
  );
}
