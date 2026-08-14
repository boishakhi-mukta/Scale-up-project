import type { HTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

export type BadgeVariant = "brand" | "neutral" | "success" | "warning" | "danger";

const variantClasses: Record<BadgeVariant, string> = {
  brand:
    "border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-800/60 dark:bg-brand-900/30 dark:text-brand-300",
  neutral:
    "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-900/30 dark:text-emerald-300",
  warning:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/60 dark:bg-amber-900/30 dark:text-amber-300",
  danger:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-800/60 dark:bg-red-900/30 dark:text-red-300",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  icon?: LucideIcon;
}

export function Badge({ variant = "neutral", icon: Icon, className = "", children, ...props }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold shadow-sm",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </span>
  );
}
