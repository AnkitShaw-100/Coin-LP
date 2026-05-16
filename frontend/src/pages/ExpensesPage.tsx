import { ExpenseForm } from "@/components/expense/ExpenseForm";
import { ExpenseList } from "@/components/expense/ExpenseList";
import { TrackerAuthGate } from "@/components/expense/TrackerAuthGate";
import { TrackerLayout } from "@/components/expense/TrackerLayout";
import { TrackerSectionHeader } from "@/components/expense/TrackerSectionHeader";
import { useExpenses } from "@/hooks/useExpenses";

export function ExpensesPage() {
  const { expenses, isLoading, error, handleAdd, handleDelete } = useExpenses();

  return (
    <TrackerLayout
      title="Add & track expenses"
      subtitle="Record spending by name, category, and price. Review your full history below."
    >
      <TrackerAuthGate>
        <main className="-mt-14 space-y-8 md:-mt-16 md:space-y-10">
          {isLoading ? (
            <div className="rounded-3xl border border-border bg-card p-8 text-center text-sm text-muted-foreground shadow-(--shadow-soft)">
              Loading your expenses…
            </div>
          ) : null}
          {error ? (
            <div className="rounded-3xl border border-destructive/20 bg-destructive/10 p-5 text-sm text-destructive">
              {error}
            </div>
          ) : null}
          {!isLoading ? (
            <>
              <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-(--shadow-soft)">
                <div className="border-b border-border bg-linear-to-r from-primary/5 via-transparent to-primary-glow/10 p-6 md:p-7">
                  <TrackerSectionHeader
                    title="Log a new expense"
                    description="Every entry updates your dashboard totals and category breakdown."
                  />
                </div>
                <div className="p-4 md:p-6">
                  <ExpenseForm onAdd={handleAdd} />
                </div>
              </section>
              <ExpenseList expenses={expenses} onDelete={handleDelete} />
            </>
          ) : null}
        </main>
      </TrackerAuthGate>
    </TrackerLayout>
  );
}
