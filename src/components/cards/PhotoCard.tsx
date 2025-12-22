import Image from "next/image";

interface PhotoCardProps {
  image: string;
  alt: string;
}

export default function PhotoCard({ image, alt }: PhotoCardProps) {
  return (
    <div className="relative w-full aspect-[552/331] rounded-[15px] overflow-hidden cursor-pointer group">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}
