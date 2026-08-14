import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Table({ className = "", ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
      <table className={cx("w-full text-left text-sm", className)} {...props} />
    </div>
  );
}

export function Thead({ className = "", ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cx("bg-slate-50 dark:bg-slate-800/60", className)} {...props} />;
}

export function Tbody({ className = "", ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cx("divide-y divide-slate-100 dark:divide-slate-800", className)} {...props} />
  );
}

export function Tr({ className = "", ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cx("transition hover:bg-slate-50 dark:hover:bg-slate-800/40", className)} {...props} />
  );
}

export function Th({ className = "", ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cx(
        "px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400",
        className
      )}
      {...props}
    />
  );
}

export function Td({ className = "", ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cx("px-4 py-3 text-slate-700 dark:text-slate-300", className)} {...props} />;
}
