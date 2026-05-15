import { useEffect, useState } from "react";
import { useUser } from "@clerk/react";
import { ExpenseForm } from "@/components/expense/ExpenseForm";
import { ExpenseList } from "@/components/expense/ExpenseList";
import { SummaryPanel } from "@/components/expense/SummaryPanel";
import { CurrencyConverter } from "@/components/expense/CurrencyConverter";
import type { Expense } from "@/components/expense/types";
import { createExpense, deleteExpense, fetchExpenses } from "@/lib/api";

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
  const { isLoaded, user } = useUser();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!user?.id) {
      setExpenses([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const loadExpenses = async () => {
      setIsLoading(true);
      setError("");

      try {
        const items = await fetchExpenses(user.id);
        if (!cancelled) {
          setExpenses(items);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load expenses.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadExpenses();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, user?.id]);

  const handleAdd = async (expense: Expense) => {
    if (!user?.id) {
      setError("Sign in to save expenses.");
      return;
    }

    try {
      setError("");
      const created = await createExpense({
        userId: user.id,
        id: expense.id,
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
      });
      setExpenses((prev) => [created, ...prev]);
    } catch (addError) {
      setError(addError instanceof Error ? addError.message : "Failed to add expense.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!user?.id) {
      setError("Sign in to remove expenses.");
      return;
    }

    try {
      setError("");
      await deleteExpense(user.id, id);
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete expense.");
    }
  };

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <section
      id="tracker"
      className={`mx-auto max-w-6xl space-y-8 px-4 py-20 md:px-8 ${className ?? ""}`}
    >
      <div className="text-center">
        <h2 className="font-display text-3xl text-foreground md:text-5xl">{heading}</h2>
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      </div>
      {isLoading ? (
        <div className="rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground shadow-[var(--shadow-soft)] md:p-8">
          Loading your saved expenses from the backend...
        </div>
      ) : null}
      {error ? (
        <div className="rounded-3xl border border-destructive/20 bg-destructive/10 p-5 text-sm text-destructive">
          {error}
        </div>
      ) : null}
      <SummaryPanel expenses={expenses} />
      <div className="grid gap-6 lg:grid-cols-2">
        <ExpenseForm onAdd={handleAdd} />
        <CurrencyConverter amount={Math.max(total, 0)} />
      </div>
      <ExpenseList expenses={expenses} onDelete={handleDelete} />
    </section>
  );
}
