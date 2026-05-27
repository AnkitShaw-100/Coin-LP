import type { Expense } from "@/components/expense/types";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000").replace(
  /\/$/,
  "",
);

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/api${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const raw = await response.text();
  const data = raw ? JSON.parse(raw) : null;

  if (!response.ok) {
    throw new Error(data?.message ?? `Request failed with status ${response.status}`);
  }

  return data as T;
}

export async function fetchExpenses(userId: string): Promise<Expense[]> {
  const data = await request<{ items: Expense[] }>(
    `/expenses?userId=${encodeURIComponent(userId)}`,
  );
  return data.items;
}

export async function createExpense(payload: {
  userId: string;
  title: string;
  amount: number;
  category: string;
  id?: string;
  date?: string;
}): Promise<Expense> {
  const data = await request<{ item: Expense }>("/expenses", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data.item;
}

export async function deleteExpense(userId: string, id: string): Promise<Expense> {
  const data = await request<{ item: Expense }>(
    `/expenses/${encodeURIComponent(id)}?userId=${encodeURIComponent(userId)}`,
    { method: "DELETE" },
  );
  return data.item;
}

export async function fetchExchangeRate(from: string, to: string): Promise<{ rate: number }> {
  const data = await request<{ rate: number }>(
    `/exchange-rate?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
  );
  return data;
}
