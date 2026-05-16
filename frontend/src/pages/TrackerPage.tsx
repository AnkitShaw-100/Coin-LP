import { Link } from "react-router-dom";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { ExpenseTrackerSection } from "@/components/expense/ExpenseTrackerSection";
import { Button } from "@/components/ui/button";

export function TrackerPage() {
  return (
    <div className="min-h-screen bg-background font-sans">

      <main className="pb-8">
       
          <ExpenseTrackerSection
            heading="Track Every Expense"
            description="Monitor spending, manage categories, and convert your live total in real time."
            className="relative z-10 -mt-12 pt-0 md:-mt-20"
          />

      </main>
    </div>
  );
}
