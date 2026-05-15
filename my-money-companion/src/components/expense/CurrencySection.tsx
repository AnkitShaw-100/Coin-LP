import { Check } from "lucide-react";

export function CurrencySection() {
  const wallets = [
    { code: "KWD", name: "Kuwaiti Dinar", flag: "🇰🇼", bal: "5,790 KWD" },
    { code: "EUR", name: "Euro", flag: "🇪🇺", bal: "3,452 EUR" },
    { code: "USD", name: "United States Dollar", flag: "🇺🇸", bal: "3,457 USD" },
    { code: "KYD", name: "Cayman Islands Dollar", flag: "🇰🇾", bal: "1,348 KYD" },
  ];
  const features = [
    "Send and receive funds worldwide",
    "Fix conversion rates and exchange instantly",
    "Built for versatility and speed",
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-8">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl text-foreground md:text-5xl">
            Limitless Currency Management, Powerful Account
          </h2>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Send and receive money across borders without the wait. Hold and spend in dozens of
            currencies.
          </p>
          <ul className="mt-6 space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>
          <button className="mt-7 rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground hover:bg-primary-deep">
            Get Started
          </button>
        </div>

        <div className="rounded-3xl bg-accent/30 p-5 md:p-7">
          <ul className="space-y-2">
            {wallets.map((w) => (
              <li
                key={w.code}
                className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-[var(--shadow-soft)]"
              >
                <span className="text-2xl">{w.flag}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{w.code}</p>
                  <p className="truncate text-xs text-muted-foreground">{w.name}</p>
                </div>
                <p className="font-display text-base text-foreground">{w.bal}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
