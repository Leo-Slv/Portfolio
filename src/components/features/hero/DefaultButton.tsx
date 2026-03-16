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
        "inline-flex items-center justify-center rounded-af-sm border border-white/10 surface-depth bg-surface px-5 py-3 text-sm font-semibold text-white transition-af focus-ring hover:brightness-110",
        paddingX === "10" ? "px-10" : "px-8",
        className
      )}
    >
      {text}
    </Link>
  );
}
