type InfoCardProps = {
  title: string;
  description: string;
  color: string;
};

export default function InfoCard({
  title,
  description,
  color,
}: InfoCardProps) {
  return (
    <div className="bg-white box-border flex flex-col gap-[7px] items-start p-[21px] md:p-[30px] rounded-[7.108px] md:rounded-[10px] w-full lg:w-[calc((100%-30px)/3)] overflow-hidden">
      <div className="flex gap-[7.108px] md:gap-[10px] items-center w-full">
        <div
          className="w-[10.661px] h-[10.661px] md:w-[15px] md:h-[15px] shrink-0 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
        <p className="font-montserrat font-bold leading-normal text-[12px] md:text-[14px] lg:text-[16px] text-black">
          {title}
        </p>
      </div>
      <p className="font-montserrat font-normal leading-normal text-[12px] md:text-[14px] lg:text-[16px] text-black whitespace-pre-wrap">
        {description}
      </p>
    </div>
  );
}

