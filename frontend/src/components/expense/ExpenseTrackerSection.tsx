import { useEffect, useState } from "react";
import { useUser } from "@clerk/react";
import { ExpenseForm } from "@/components/expense/ExpenseForm";
import { ExpenseList } from "@/components/expense/ExpenseList";
import { SummaryPanel } from "@/components/expense/SummaryPanel";
import { CurrencyConverter } from "@/components/expense/CurrencyConverter";
import type { Expense } from "@/components/expense/types";
import { createExpense, deleteExpense, fetchExpenses } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShieldCheck, Sparkles } from "lucide-react";

type ExpenseTrackerSectionProps = {
  heading?: string;
  description?: string;
  className?: string;
};

const STORAGE_KEY = "coinledger.expenses.v2";

function readCache(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Expense[]) : [];
  } catch {
    return [];
  }
}

function writeCache(expenses: Expense[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch {
    // ignore storage errors (private mode, quota)
  }
}

export function ExpenseTrackerSection({
  heading = "Try the Tracker",
  description = "A live preview of your finances — add an expense and watch the numbers come to life.",
  className,
}: ExpenseTrackerSectionProps) {
  const { isLoaded, user } = useUser();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

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
      setNotice("");

      try {
        const items = await fetchExpenses(user.id);
        if (!cancelled) {
          setExpenses(items);
          writeCache(items);
        }
      } catch (loadError) {
        if (!cancelled) {
          const cached = readCache();
          setExpenses(cached);
          if (cached.length > 0) {
            setNotice("Backend temporarily unavailable. Showing your saved local copy.");
          } else {
            setError(loadError instanceof Error ? loadError.message : "Failed to load expenses.");
          }
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
      setNotice("");
      const created = await createExpense({
        userId: user.id,
        id: expense.id,
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
      });
      setExpenses((prev) => [created, ...prev]);
      writeCache([created, ...expenses]);
    } catch (addError) {
      const nextExpense = expense;
      const updated = [nextExpense, ...expenses];
      setExpenses(updated);
      writeCache(updated);
      setNotice("Saved locally because the backend could not be reached.");
      setError("");
    }
  };

  const handleDelete = async (id: string) => {
    if (!user?.id) {
      setError("Sign in to remove expenses.");
      return;
    }

    try {
      setError("");
      setNotice("");
      await deleteExpense(user.id, id);
      setExpenses((prev) => {
        const updated = prev.filter((expense) => expense.id !== id);
        writeCache(updated);
        return updated;
      });
    } catch (deleteError) {
      setExpenses((prev) => {
        const updated = prev.filter((expense) => expense.id !== id);
        writeCache(updated);
        return updated;
      });
      setNotice("Removed locally because the backend could not be reached.");
      setError("");
    }
  };

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <section
      id="tracker"
      className={`mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20 ${className ?? ""}`}
    >
      <div className="rounded-[2rem] border border-border/70 bg-card/90 p-5 shadow-[var(--shadow-soft)] backdrop-blur md:p-8">
        <div className="flex flex-col gap-6 border-b border-border/70 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-full bg-primary/10 px-3 py-1 text-primary hover:bg-primary/10">
                <Sparkles className="mr-1 h-3.5 w-3.5" /> Live dashboard
              </Badge>
              <Badge variant="outline" className="rounded-full border-primary/20 px-3 py-1">
                <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Protected workspace
              </Badge>
            </div>
            <h2 className="mt-4 font-display text-3xl text-foreground md:text-5xl">{heading}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              {description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:w-[28rem]">
            <MiniMetric label="Total" value={`$${total.toFixed(2)}`} />
            <MiniMetric label="Entries" value={String(expenses.length)} />
            <MiniMetric label="Mode" value={isLoading ? "Syncing" : "Ready"} />
          </div>
        </div>

        {isLoading ? (
          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading your saved expenses...
          </div>
        ) : null}

        {notice ? (
          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-200">
            {notice}
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
          <div className="space-y-6">
            <ExpenseForm onAdd={handleAdd} />
            <ExpenseList expenses={expenses} onDelete={handleDelete} />
          </div>

          <div className="space-y-6 xl:sticky xl:top-6">
            <SummaryPanel expenses={expenses} />
            <CurrencyConverter amount={Math.max(total, 0)} />
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/35 p-4">
      <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-xl text-foreground">{value}</p>
    </div>
  );
}
