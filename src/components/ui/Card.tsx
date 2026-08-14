import { forwardRef, type HTMLAttributes } from "react";

export type CardPadding = "sm" | "md" | "lg";

const paddingClasses: Record<CardPadding, string> = {
  sm: "p-5",
  md: "p-6",
  lg: "p-8",
};

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: CardPadding;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, padding = "md", className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[
          "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900",
          paddingClasses[padding],
          hover ? "card-lift" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";
