import { CATEGORIES, type Expense } from "./types";

type Props = { expenses: Expense[] };

export function ExpenseSummaryPanel({ expenses }: Props) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const byCategory = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + e.amount;
    return acc;
  }, {});

  const breakdownParts = CATEGORIES.map((category) => {
    const value = byCategory[category] ?? 0;
    return `${category}: $${value.toFixed(2)}`;
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="overflow-hidden rounded-3xl border border-primary-deep/20 bg-[var(--gradient-hero)] p-6 text-primary-foreground shadow-[var(--shadow-elegant)] md:p-8">
        <p className="text-xs font-medium uppercase tracking-widest text-primary-foreground/70">
          Running total
        </p>
        <p className="mt-2 font-display text-5xl font-medium md:text-6xl">${total.toFixed(2)}</p>
        <p className="mt-2 text-sm text-primary-foreground/75">
          {expenses.length === 0
            ? "Add expenses to see your total update automatically."
            : `Across ${expenses.length} ${expenses.length === 1 ? "entry" : "entries"} · updates as you add or remove`}
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Spending by category
        </p>
        <h3 className="mt-2 font-display text-2xl text-foreground">Category breakdown</h3>
        {expenses.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            Your breakdown will appear here once you log expenses.
          </p>
        ) : (
          <p className="mt-4 text-sm leading-7 text-foreground md:text-base">
            {breakdownParts.join(" — ")}
          </p>
        )}
      </div>
    </div>
  );
}
