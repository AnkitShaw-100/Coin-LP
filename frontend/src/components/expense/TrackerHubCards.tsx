import { Link } from "react-router-dom";
import { ArrowRight, Receipt, Sparkles } from "lucide-react";

export function TrackerHubCards() {
  return (
    <Link
      to="/tracker/expenses"
      className="group relative block overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] md:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition-opacity group-hover:opacity-100"
      />
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        <Sparkles className="h-3 w-3 text-primary" />
        Expense manager
      </span>
      <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Receipt className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-display text-2xl text-foreground">Add & track expenses</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        Log spending by name, category, and price. Browse paginated history anytime.
      </p>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-primary-deep">
        Open workspace
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
