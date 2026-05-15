import { Link } from "react-router-dom";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { ExpenseTrackerSection } from "@/components/expense/ExpenseTrackerSection";
import { Button } from "@/components/ui/button";

export function TrackerPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
          <h1 className="font-display text-2xl text-foreground">Expense Tracker</h1>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            >
              Back to home
            </Link>
            <Show when="signed-out">
              <div className="flex items-center gap-2">
                <SignInButton mode="modal">
                  <button className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted">
                    Log in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="rounded-full px-4 py-2 text-sm">Sign up</Button>
                </SignUpButton>
              </div>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </div>
      </header>

      <Show
        when="signed-in"
        fallback={
          <main className="mx-auto flex max-w-3xl flex-1 flex-col items-center px-4 py-20 text-center md:px-8">
            <div className="max-w-2xl rounded-3xl border border-border bg-card p-8 shadow-sm md:p-12">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Authentication required
              </p>
              <h2 className="mt-4 font-display text-4xl text-foreground md:text-5xl">
                Sign in to access your tracker
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground md:text-base">
                Your expense data stays tied to your Clerk account, so you can keep sessions and
                totals consistent across devices.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <SignInButton mode="modal">
                  <button className="rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                    Log in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="rounded-full px-5 py-3 text-sm font-medium">
                    Create account
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </main>
        }
      >
        <ExpenseTrackerSection
          heading="Track Every Expense"
          description="Use this dedicated tracker page to monitor spending and convert your totals in real time."
        />
      </Show>
    </div>
  );
}
