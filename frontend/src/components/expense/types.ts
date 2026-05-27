export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
};

export const CATEGORIES = ["Food", "Travel", "Marketing", "Utilities", "Other"] as const;
