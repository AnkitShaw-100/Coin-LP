export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
};

export const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Other",
] as const;
