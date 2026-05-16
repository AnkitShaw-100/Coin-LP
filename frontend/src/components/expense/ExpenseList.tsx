import { useEffect, useState } from "react";
import { Trash2, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Expense } from "./types";

const PAGE_SIZE = 4;

type Props = { expenses: Expense[]; onDelete: (id: string) => void };

const categoryColors: Record<string, string> = {
  Food: "bg-accent/40 text-primary-deep",
  Travel: "bg-primary/10 text-primary",
  Marketing: "bg-primary-glow/30 text-primary-deep",
  Utilities: "bg-destructive/10 text-destructive",
  Other: "bg-muted text-muted-foreground",
};

export function ExpenseList({ expenses, onDelete }: Props) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(expenses.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = expenses.slice(start, start + PAGE_SIZE);
  const visibleStart = expenses.length === 0 ? 0 : start + 1;
  const visibleEnd = start + pageItems.length;

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  if (expenses.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-card/50 p-10 text-center">
        <Receipt className="mx-auto h-10 w-10 text-muted-foreground" />
        <p className="mt-3 font-display text-xl text-foreground">No expenses yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your first expense to start tracking.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-(--shadow-soft)">
      <div className="border-b border-border bg-linear-to-r from-primary/5 via-transparent to-primary-glow/10 p-6 md:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-border bg-background/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              History
            </span>
            <h3 className="mt-3 font-display text-2xl text-foreground md:text-3xl">
              Expense history
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Review your latest entries in a paginated dashboard view. Each page shows four
              records.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="rounded-full border border-border bg-background/80 px-3 py-1.5">
              {expenses.length} {expenses.length === 1 ? "entry" : "entries"}
            </span>
            <span className="rounded-full border border-border bg-background/80 px-3 py-1.5">
              Showing {visibleStart}-{visibleEnd} of {expenses.length}
            </span>
            {totalPages > 1 ? (
              <span className="rounded-full border border-border bg-background/80 px-3 py-1.5">
                Page {page} of {totalPages}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <ul className="grid gap-4 p-4 sm:grid-cols-2 md:p-6">
        {pageItems.map((e) => (
          <li
            key={e.id}
            className="group flex flex-col gap-4 rounded-2xl border border-border/80 bg-muted/20 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:bg-muted/40 md:flex-row md:items-center"
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xs font-semibold ${
                categoryColors[e.category] ?? categoryColors.Other
              }`}
            >
              {e.category.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate font-medium text-foreground">{e.title}</p>
                <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {e.category}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Added on {new Date(e.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4 md:text-right">
              <p className="font-display text-lg text-foreground">${e.amount.toFixed(2)}</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(e.id)}
                className="text-muted-foreground hover:text-destructive"
                aria-label="Delete expense"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {totalPages > 1 ? (
        <div className="flex flex-col gap-3 border-t border-border bg-background/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {visibleStart}-{visibleEnd} of {expenses.length} records
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setPage((p) => Math.max(1, p - 1));
                  }}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      isActive={page === pageNumber}
                      onClick={(event) => {
                        event.preventDefault();
                        setPage(pageNumber);
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setPage((p) => Math.min(totalPages, p + 1));
                  }}
                  className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      ) : null}
    </div>
  );
}
