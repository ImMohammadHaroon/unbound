import Image from "next/image";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/brand-logo-new.svg"
      alt="UnBound X"
      width={270}
      height={67}
      className={className ?? "h-[41px] w-40 object-contain"}
      priority
    />
  );
}
