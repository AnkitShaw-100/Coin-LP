import { useEffect, useState } from "react";
import { ArrowRight, ArrowRightLeft, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchExchangeRate } from "@/lib/api";

const BASE_CURRENCY = "USD";
const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "KWD", "AUD", "CAD"];

type Props = {
  totalUsd: number;
};

export function TotalCurrencyPreview({ totalUsd }: Props) {
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadRate = async () => {
      if (targetCurrency === BASE_CURRENCY) {
        setRate(1);
        setError("");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const data = await fetchExchangeRate(BASE_CURRENCY, targetCurrency);
        if (!cancelled) {
          setRate(data.rate);
        }
      } catch {
        if (!cancelled) {
          setError("Could not fetch live rates. Please try again.");
          setRate(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadRate();

    return () => {
      cancelled = true;
    };
  }, [targetCurrency]);

  const converted = rate !== null ? totalUsd * rate : null;

  return (
    <section className="overflow-hidden rounded-3xl border border-primary-deep/15 shadow-[var(--shadow-elegant)]">
      <header className="relative px-6 py-5 md:px-8" style={{ background: "var(--gradient-hero)" }}>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-glow/25 text-primary-glow">
              <ArrowRightLeft className="h-5 w-5" />
            </span>
            <span>
              <p className="text-xs font-medium uppercase tracking-widest text-primary-foreground/70">
                Live conversion
              </p>
              <h3 className="font-display text-xl text-white md:text-2xl">
                Total in another currency
              </h3>
            </span>
          </div>
          <Label htmlFor="target-currency" className="sr-only">
            Convert to
          </Label>
          <Select value={targetCurrency} onValueChange={setTargetCurrency}>
            <SelectTrigger
              id="target-currency"
              className="h-10 min-w-[7rem] rounded-full border-white/20 bg-white/10 text-white backdrop-blur-sm [&>svg]:text-white/80"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((code) => (
                <SelectItem key={code} value={code}>
                  {code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="bg-card p-6 md:p-8">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
          <article className="rounded-2xl border border-border bg-muted/30 p-5 text-center md:text-left">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Your total
            </p>
            <p className="mt-2 font-display text-3xl text-foreground md:text-4xl">
              ${totalUsd.toFixed(2)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{BASE_CURRENCY}</p>
          </article>

          <span className="flex justify-center" aria-hidden>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ArrowRight className="h-5 w-5" />
            </span>
          </span>

          <article className="rounded-2xl border border-primary/20 bg-accent/25 p-5 text-center md:text-left">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Converted total
            </p>
            {loading ? (
              <p className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground md:justify-start">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                Updating rate…
              </p>
            ) : error ? (
              <p className="mt-3 text-sm text-destructive">{error}</p>
            ) : converted !== null ? (
              <>
                <p className="mt-2 font-display text-3xl text-primary-deep md:text-4xl">
                  {converted.toFixed(2)}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">{targetCurrency}</p>
                {targetCurrency !== BASE_CURRENCY && rate ? (
                  <p className="mt-2 text-xs text-muted-foreground">
                    1 {BASE_CURRENCY} = {rate.toFixed(4)} {targetCurrency}
                  </p>
                ) : null}
              </>
            ) : null}
          </article>
        </div>
        <p className="mt-5 text-center text-xs text-muted-foreground md:text-left">
          Rates powered by Frankfurter · updates when you change currency
        </p>
      </div>
    </section>
  );
}
