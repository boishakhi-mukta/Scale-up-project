import { forwardRef, type ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-md shadow-brand-200 hover:bg-brand-700 dark:shadow-none",
  secondary:
    "border border-slate-300 bg-white text-slate-700 shadow-sm hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800",
  ghost:
    "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
  danger:
    "bg-red-600 text-white shadow-md shadow-red-200 hover:bg-red-700 dark:shadow-none",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs gap-1.5",
  md: "px-6 py-3 text-sm gap-2",
  lg: "px-8 py-3.5 text-sm gap-2",
};

export function buttonVariants(
  options: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}
) {
  const { variant = "primary", size = "md", className = "" } = options;
  return [
    "inline-flex items-center justify-center rounded-full font-bold transition duration-300 hover:-translate-y-0.5",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 dark:focus-visible:ring-brand-900/40",
    "disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon: Icon,
      iconPosition = "right",
      className = "",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70" />
        )}
        {!loading && Icon && iconPosition === "left" && <Icon className="h-4 w-4" />}
        {children}
        {!loading && Icon && iconPosition === "right" && <Icon className="h-4 w-4" />}
      </button>
    );
  }
);
Button.displayName = "Button";
