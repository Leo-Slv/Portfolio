"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface DefaultButtonProps {
  text: string;
  href: string;
  paddingX?: "8" | "10";
  className?: string;
}

export function DefaultButton({
  text,
  href,
  paddingX = "8",
  className,
}: DefaultButtonProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center font-medium text-white border-b-4 border-r-4 border-black text-xs sm:text-base lg:text-xl mb-2 transition-all duration-300 hover:scale-105 hover:text-[#fffffe]",
        paddingX === "10" ? "px-10 py-4" : "px-8 py-4",
        className
      )}
      style={{ backgroundColor: "#7f5af0" }}
    >
      {text}
    </Link>
  );
}
