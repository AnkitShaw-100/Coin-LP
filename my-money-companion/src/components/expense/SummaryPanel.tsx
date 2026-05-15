import { TrendingUp, Wallet, PieChart } from "lucide-react";
import type { Expense } from "./types";

type Props = { expenses: Expense[] };

export function SummaryPanel({ expenses }: Props) {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const count = expenses.length;
  const byCategory = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + e.amount;
    return acc;
  }, {});
  const top = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
  const avg = count ? total / count : 0;

  return (
    <div className="overflow-hidden rounded-3xl border border-primary-deep/20 bg-[var(--gradient-hero)] p-8 text-primary-foreground shadow-[var(--shadow-elegant)]">
      <p className="text-xs uppercase tracking-widest text-primary-foreground/70">Total spent</p>
      <h2 className="mt-2 font-display text-5xl font-medium md:text-6xl">${total.toFixed(2)}</h2>
      <p className="mt-2 text-sm text-primary-foreground/70">
        Across {count} {count === 1 ? "transaction" : "transactions"}
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Stat icon={<Wallet className="h-4 w-4" />} label="Average" value={`$${avg.toFixed(2)}`} />
        <Stat icon={<TrendingUp className="h-4 w-4" />} label="Entries" value={String(count)} />
        <Stat
          icon={<PieChart className="h-4 w-4" />}
          label="Top category"
          value={top ? top[0] : "—"}
        />
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-primary-foreground/10 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-xs text-primary-foreground/70">
        {icon}
        {label}
      </div>
      <p className="mt-2 font-display text-xl">{value}</p>
    </div>
  );
}
