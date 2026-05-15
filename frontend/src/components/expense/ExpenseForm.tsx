import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, type Expense } from "./types";

type Props = { onAdd: (e: Expense) => void };

export function ExpenseForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!title.trim()) return setError("Please enter a title.");
    if (!amt || amt <= 0) return setError("Enter a valid amount.");
    setError("");
    onAdd({
      id: crypto.randomUUID(),
      title: title.trim(),
      amount: amt,
      category,
      date: new Date().toISOString(),
    });
    setTitle("");
    setAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8"
    >
      <h3 className="font-display text-2xl text-foreground">Add an expense</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Track every expense. Stay in control of your finances.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Name</Label>
          <Input
            id="title"
            placeholder="Groceries, Uber..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-11 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (USD)</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-11 rounded-xl"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-11 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      <Button
        type="submit"
        className="mt-6 h-12 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary-deep md:w-auto md:px-8"
      >
        <Plus className="mr-2 h-4 w-4" /> Add expense
      </Button>
    </form>
  );
}
