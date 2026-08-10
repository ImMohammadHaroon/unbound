import Image from "next/image";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/brand-logo-new.svg"
      alt="UnBound X | AI-Powered Social Investing & Smart Finance App"
      width={160}
      height={41}
      className={className}
      priority
    />
  );
}
