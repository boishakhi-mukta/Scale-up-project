import { forwardRef, useId, type InputHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: LucideIcon;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon: Icon, id, className = "", ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    return (
      <div>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={[
              "w-full rounded-xl border bg-slate-50 py-3 text-sm text-slate-800 placeholder-slate-400 shadow-sm outline-none transition",
              "focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100",
              "dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900 dark:focus:ring-brand-900/40",
              Icon ? "pl-11 pr-4" : "px-4",
              error
                ? "border-red-400 focus:border-red-500 focus:ring-red-100 dark:border-red-500/70 dark:focus:ring-red-900/30"
                : "border-slate-300 dark:border-slate-700",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          />
        </div>
        {error ? (
          <p id={errorId} className="mt-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";
