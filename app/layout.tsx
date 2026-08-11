import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import SalInit from "@/components/SalInit";
import "./globals.css";
import "@/styles/sal.css";
import "@/styles/section-sticky.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UnBound X | AI-Powered Social Investing & Smart Finance App",
  description:
    "Join a vibrant community where AI-powered insights, social portfolios, and a full spectrum of investment opportunities meet—all in one seamless experience.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={figtree.variable} suppressHydrationWarning>
        <SalInit />
        {children}
      </body>
    </html>
  );
}