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

  const start = (page - 1) * PAGE_SIZE;
  const pageItems = expenses.slice(start, start + PAGE_SIZE);

  return (
    <div className="rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
      <div className="border-b border-border p-6">
        <h3 className="font-display text-2xl text-foreground">Expense history</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {expenses.length} {expenses.length === 1 ? "entry" : "entries"} logged
          {totalPages > 1 ? ` · Page ${page} of ${totalPages}` : ""}
        </p>
      </div>
      <ul className="grid gap-4 p-4 sm:grid-cols-2 md:p-6">
        {pageItems.map((e) => (
          <li
            key={e.id}
            className="flex flex-col rounded-2xl border border-border bg-muted/20 p-4 transition-colors hover:border-primary/20 hover:bg-muted/40"
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xs font-semibold ${
                categoryColors[e.category] ?? categoryColors.Other
              }`}
            >
              {e.category.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-foreground">{e.title}</p>
              <p className="text-xs text-muted-foreground">
                {e.category} · {new Date(e.date).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-display text-lg text-foreground">${e.amount.toFixed(2)}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(e.id)}
              className="text-muted-foreground hover:text-destructive"
              aria-label="Delete expense"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
      {totalPages > 1 ? (
        <div className="border-t border-border p-4">
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
