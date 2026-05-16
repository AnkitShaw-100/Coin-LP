import { useEffect, useState } from "react";
import { useUser } from "@clerk/react";
import type { Expense } from "@/components/expense/types";
import { createExpense, deleteExpense, fetchExpenses } from "@/lib/api";

export function useExpenses() {
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

  return {
    expenses,
    isLoading,
    error,
    setError,
    handleAdd,
    handleDelete,
    total,
    isLoaded,
    user,
  };
}
