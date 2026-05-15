import { useEffect, useState } from "react";
import { ArrowRightLeft, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "KWD", "AUD", "CAD"];

type Props = { defaultAmount?: number };

export function CurrencyConverter({ defaultAmount = 100 }: Props) {
  const [amount, setAmount] = useState(String(defaultAmount));
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (from === to) {
        setRate(1);
        return;
      }
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        const r = data?.rates?.[to];
        if (typeof r !== "number") throw new Error("Invalid rate");
        if (!cancelled) setRate(r);
      } catch (err) {
        if (!cancelled) {
          setError("Could not fetch live rates. Please try again.");
          setRate(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [from, to]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const numeric = parseFloat(amount) || 0;
  const converted = rate !== null ? numeric * rate : null;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-2xl text-foreground">Currency converter</h3>
          <p className="mt-1 text-sm text-muted-foreground">Live rates from Frankfurter API</p>
        </div>
        <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-accent/40 text-primary-deep sm:flex">
          <ArrowRightLeft className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="conv-amount">Amount</Label>
          <Input
            id="conv-amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-11 rounded-xl"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <div className="space-y-2">
            <Label>From</Label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={swap}
            className="h-11 w-11 self-end rounded-xl"
            aria-label="Swap currencies"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
          <div className="space-y-2">
            <Label>To</Label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-[var(--gradient-card)] p-5">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Fetching live rate…
          </div>
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : converted !== null ? (
          <>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {numeric.toFixed(2)} {from} equals
            </p>
            <p className="mt-1 font-display text-3xl text-primary-deep">
              {converted.toFixed(2)} {to}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              1 {from} = {rate?.toFixed(4)} {to}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
