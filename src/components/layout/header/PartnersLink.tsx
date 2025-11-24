import Image from "next/image";
import Link from "next/link";

type PartnersLinkProps = {
  size: { width: number; height: number };
};

export default function PartnersLink({ size }: PartnersLinkProps) {
  return (
    <Link href="/about/partners" className="flex-shrink-0">
      <Image
        src="/images/partners.svg"
        alt="Партнеры"
        width={size.width}
        height={size.height}
        className="object-contain"
      />
    </Link>
  );
}
