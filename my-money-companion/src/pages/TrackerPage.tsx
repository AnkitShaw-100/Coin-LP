import { Link } from "react-router-dom";
import { ExpenseTrackerSection } from "@/components/expense/ExpenseTrackerSection";

export function TrackerPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
          <h1 className="font-display text-2xl text-foreground">Expense Tracker</h1>
          <Link
            to="/"
            className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
          >
            Back to home
          </Link>
        </div>
      </header>

      <ExpenseTrackerSection
        heading="Track Every Expense"
        description="Use this dedicated tracker page to monitor spending and convert your totals in real time."
      />
    </div>
  );
}
