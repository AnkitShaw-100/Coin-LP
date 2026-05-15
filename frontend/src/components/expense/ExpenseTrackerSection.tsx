import { useEffect, useState } from "react";
import { ExpenseForm } from "@/components/expense/ExpenseForm";
import { ExpenseList } from "@/components/expense/ExpenseList";
import { SummaryPanel } from "@/components/expense/SummaryPanel";
import { CurrencyConverter } from "@/components/expense/CurrencyConverter";
import type { Expense } from "@/components/expense/types";

type ExpenseTrackerSectionProps = {
  heading?: string;
  description?: string;
  className?: string;
};

const STORAGE_KEY = "coinledger.expenses.v1";

export function ExpenseTrackerSection({
  heading = "Try the Tracker",
  description = "A live preview of your finances — add an expense and watch the numbers come to life.",
  className,
}: ExpenseTrackerSectionProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setExpenses(JSON.parse(raw));
    } catch {
      // ignore malformed local data
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch {
      // ignore storage errors (private mode, quota)
    }
  }, [expenses]);

  return (
    <section
      id="tracker"
      className={`mx-auto max-w-6xl space-y-8 px-4 py-20 md:px-8 ${className ?? ""}`}
    >
      <div className="text-center">
        <h2 className="font-display text-3xl text-foreground md:text-5xl">{heading}</h2>
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      </div>
      <SummaryPanel expenses={expenses} />
      <div className="grid gap-6 lg:grid-cols-2">
        <ExpenseForm onAdd={(expense) => setExpenses((prev) => [expense, ...prev])} />
        <CurrencyConverter
          defaultAmount={Math.max(
            expenses.reduce((sum, expense) => sum + expense.amount, 0) || 100,
            100,
          )}
        />
      </div>
      <ExpenseList
        expenses={expenses}
        onDelete={(id) => setExpenses((prev) => prev.filter((expense) => expense.id !== id))}
      />
    </section>
  );
}
