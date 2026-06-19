import type { ReactNode } from "react";
import clsx from "clsx";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  tone?: "muted" | "primary" | "accent";
};

export function Eyebrow({ children, className, tone = "muted" }: EyebrowProps) {
  const toneClass =
    tone === "primary"
      ? "text-[color:var(--color-primary)]"
      : tone === "accent"
        ? "text-[color:var(--color-accent)]"
        : "text-[color:var(--color-muted)]";
  return (
    <span
      className={clsx(
        "inline-block text-xs font-semibold uppercase tracking-[0.18em]",
        toneClass,
        className,
      )}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {children}
    </span>
  );
}
