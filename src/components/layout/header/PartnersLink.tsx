import Image from "next/image";
import Link from "next/link";

type PartnersLinkProps = {
  size: { width: number | string; height: number | string };
};

export default function PartnersLink({ size }: PartnersLinkProps) {
  const imageWidth = typeof size.width === 'number' ? size.width : undefined;
  const imageHeight = typeof size.height === 'number' ? size.height : undefined;
  const imageStyle = typeof size.width === 'string' || typeof size.height === 'string'
    ? { width: size.width, height: size.height }
    : undefined;

  return (
    <Link href="/about/partners" className="flex-shrink-0">
      <Image
        src="/images/partners.svg"
        alt="Партнеры"
        width={imageWidth || 240}
        height={imageHeight || 105}
        className="object-contain"
        style={imageStyle}
      />
    </Link>
  );
}
