import { PieChart, Receipt, TrendingUp, Wallet } from "lucide-react";
import { CATEGORIES } from "./types";
import type { Expense } from "./types";

type Props = { expenses: Expense[] };

export function TrackerDashboardStats({ expenses }: Props) {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const count = expenses.length;
  const byCategory = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + e.amount;
    return acc;
  }, {});
  const top = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
  const avg = count ? total / count : 0;
  const maxCategory = Math.max(...Object.values(byCategory), 1);

  const stats = [
    {
      label: "Total spent",
      value: `$${total.toFixed(2)}`,
      hint: count ? `Across ${count} transactions` : "No transactions yet",
      icon: Wallet,
      accent: "bg-primary text-primary-foreground",
    },
    {
      label: "Average expense",
      value: `$${avg.toFixed(2)}`,
      hint: "Per logged entry",
      icon: TrendingUp,
      accent: "bg-accent/50 text-primary-deep",
    },
    {
      label: "Entries logged",
      value: String(count),
      hint: count === 1 ? "1 expense recorded" : `${count} expenses recorded`,
      icon: Receipt,
      accent: "bg-primary/10 text-primary",
    },
    {
      label: "Top category",
      value: top ? top[0] : "—",
      hint: top ? `$${top[1].toFixed(2)} spent` : "Add expenses to see trends",
      icon: PieChart,
      accent: "bg-primary-glow/40 text-primary-deep",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-md md:p-6"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.accent}`}>
              <stat.icon className="h-4 w-4" />
            </div>
            <p className="mt-5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-1 font-display text-3xl text-foreground">{stat.value}</p>
            <p className="mt-2 text-xs text-muted-foreground">{stat.hint}</p>
          </div>
        ))}
      </div>

      {count > 0 ? (
        <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Spending breakdown
              </p>
              <h3 className="mt-1 font-display text-2xl text-foreground">By category</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Total <span className="font-medium text-foreground">${total.toFixed(2)}</span>
            </p>
          </div>
          <div className="mt-6 space-y-4">
            {CATEGORIES.map((category) => {
              const value = byCategory[category] ?? 0;
              const pct = total > 0 ? (value / total) * 100 : 0;
              const barWidth = total > 0 ? (value / maxCategory) * 100 : 0;

              return (
                <div key={category}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{category}</span>
                    <span className="text-muted-foreground">
                      ${value.toFixed(2)}
                      <span className="ml-2 text-xs">({pct.toFixed(0)}%)</span>
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
