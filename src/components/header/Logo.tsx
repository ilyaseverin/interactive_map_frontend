import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  logoSize: { width: number; height: number };
  fontSize: string;
  gap: string;
  lineHeight?: string;
};

export default function Logo({
  logoSize,
  fontSize,
  gap,
  lineHeight,
}: LogoProps) {
  return (
    <div className="flex items-center" style={{ gap }}>
      <Link href="/" className="flex-shrink-0">
        <Image
          src="/images/logo-392dd2.png"
          alt="Патриот Центр 48"
          width={logoSize.width}
          height={logoSize.height}
          className="object-contain"
        />
      </Link>
      <Link
        href="/"
        className="font-normal font-montserrat text-black whitespace-nowrap"
        style={{ fontSize, lineHeight: lineHeight || "1.2" }}
      >
        Патриот Центр 48
      </Link>
    </div>
  );
}
