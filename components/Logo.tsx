import Image from "next/image";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/brand-logo-new.svg"
      alt="UnBound X"
      width={160}
      height={41}
      className={`h-[41px] w-40 object-contain ${className ?? ""}`}
      priority
    />
  );
}
