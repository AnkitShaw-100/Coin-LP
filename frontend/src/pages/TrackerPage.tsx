import { TrackerAuthGate } from "@/components/expense/TrackerAuthGate";
import { TrackerDashboardStats } from "@/components/expense/TrackerDashboardStats";
import { TrackerHubCards } from "@/components/expense/TrackerHubCards";
import { TrackerLayout } from "@/components/expense/TrackerLayout";
import { TrackerSectionHeader } from "@/components/expense/TrackerSectionHeader";
import { TotalCurrencyPreview } from "@/components/expense/TotalCurrencyPreview";
import { useExpenses } from "@/hooks/useExpenses";

export function TrackerPage() {
  const { expenses, isLoading, error } = useExpenses();
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <TrackerLayout
      title="Expense Tracker"
      subtitle="Monitor spending, manage entries, and preview your total in any currency."
    >
      <TrackerAuthGate>
        <main className="-mt-14 space-y-12 md:-mt-16 md:space-y-14">
          {isLoading ? (
            <div className="rounded-3xl border border-border bg-card p-8 text-center text-sm text-muted-foreground shadow-[var(--shadow-soft)]">
              <div className="mx-auto h-8 w-8 animate-pulse rounded-full bg-muted" />
              <p className="mt-4">Loading your dashboard…</p>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-3xl border border-destructive/20 bg-destructive/10 p-5 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          {!isLoading ? (
            <>
              <TrackerDashboardStats expenses={expenses} />

              <TotalCurrencyPreview totalUsd={total} />

              <section className="space-y-6">
                <TrackerSectionHeader
                  title="Your workspaces"
                  description="Manage your expenses in one dedicated workspace."
                />
                <TrackerHubCards />
              </section>
            </>
          ) : null}
        </main>
      </TrackerAuthGate>
    </TrackerLayout>
  );
}
