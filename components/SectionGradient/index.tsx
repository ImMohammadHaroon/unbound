import type { ReactNode } from "react";
import "./section-gradient.css";

type SectionGradientProps = {
  children: ReactNode;
};

export default function SectionGradient({ children }: SectionGradientProps) {
  return (
    <div className="section-gradient section-sticky JS-sticky-section">{children}</div>
  );
}
