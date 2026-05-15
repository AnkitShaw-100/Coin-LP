import { Trash2, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Expense } from "./types";

type Props = { expenses: Expense[]; onDelete: (id: string) => void };

const categoryColors: Record<string, string> = {
  Food: "bg-accent/40 text-primary-deep",
  Travel: "bg-primary/10 text-primary",
  Marketing: "bg-primary-glow/30 text-primary-deep",
  Utilities: "bg-destructive/10 text-destructive",
  Other: "bg-muted text-muted-foreground",
};

export function ExpenseList({ expenses, onDelete }: Props) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-card/50 p-10 text-center">
        <Receipt className="mx-auto h-10 w-10 text-muted-foreground" />
        <p className="mt-3 font-display text-xl text-foreground">No expenses yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your first expense to start tracking.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
      <div className="border-b border-border p-6">
        <h3 className="font-display text-2xl text-foreground">Recent expenses</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {expenses.length} {expenses.length === 1 ? "entry" : "entries"} logged
        </p>
      </div>
      <ul className="divide-y divide-border">
        {expenses.map((e) => (
          <li
            key={e.id}
            className="flex items-center gap-3 p-4 transition-colors hover:bg-muted/50 md:p-5"
          >
            <div
              className={`hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xs font-semibold sm:flex ${
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
            <div className="text-right">
              <p className="font-display text-lg text-foreground">${e.amount.toFixed(2)}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(e.id)}
              className="text-muted-foreground hover:text-destructive"
              aria-label="Delete expense"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
