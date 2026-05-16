import { Link } from "react-router-dom";
import { ArrowRight, Receipt } from "lucide-react";
import type { Expense } from "./types";

type Props = { expenses: Expense[] };

const categoryColors: Record<string, string> = {
  Food: "bg-accent/40 text-primary-deep",
  Travel: "bg-primary/10 text-primary",
  Marketing: "bg-primary-glow/30 text-primary-deep",
  Utilities: "bg-destructive/10 text-destructive",
  Other: "bg-muted text-muted-foreground",
};

export function TrackerRecentExpenses({ expenses }: Props) {
  const recent = expenses.slice(0, 4);

  return (
    <div className="rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between border-b border-border p-6 md:p-7">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Activity
          </p>
          <h3 className="mt-1 font-display text-2xl text-foreground">Recent expenses</h3>
        </div>
        <Link
          to="/tracker/expenses"
          className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary-deep"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="p-10 text-center">
          <Receipt className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-3 font-display text-lg text-foreground">No expenses yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add your first expense to see activity here.
          </p>
          <Link
            to="/tracker/expenses"
            className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:bg-primary-deep"
          >
            Add expense
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {recent.map((e) => (
            <li
              key={e.id}
              className="flex items-center gap-3 px-6 py-4 transition-colors hover:bg-muted/40 md:px-7 md:py-5"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-semibold ${
                  categoryColors[e.category] ?? categoryColors.Other
                }`}
              >
                {e.category.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{e.title}</p>
                <p className="text-xs text-muted-foreground">
                  {e.category} · {new Date(e.date).toLocaleDateString()}
                </p>
              </div>
              <p className="font-display text-lg text-foreground">${e.amount.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
