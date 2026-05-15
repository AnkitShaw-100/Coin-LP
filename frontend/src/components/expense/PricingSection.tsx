import { useState } from "react";
import { Check } from "lucide-react";

export function PricingSection() {
  const [period, setPeriod] = useState<"Monthly" | "Yearly">("Monthly");
  const plans = [
    {
      name: "Starter Plan",
      price: "$0",
      desc: "Perfect for individuals getting started",
      features: [
        "1 user account",
        "Basic dashboard",
        "5 invoices / month",
        "100MB storage",
        "Email support",
      ],
      cta: "Pick Free Plan",
      highlight: false,
    },
    {
      name: "Enterprise",
      price: period === "Monthly" ? "$15" : "$144",
      desc: "Best for growing teams and businesses",
      features: [
        "10 user accounts",
        "Advanced analytics",
        "Unlimited invoices",
        "10GB storage",
        "Priority email support",
      ],
      cta: "Create Account",
      highlight: true,
    },
    {
      name: "Business Pack",
      price: period === "Monthly" ? "$9" : "$84",
      desc: "Tailored tools for serious business operators",
      features: [
        "5 user accounts",
        "Custom reports",
        "200 invoices / month",
        "5GB storage",
        "24/7 chat support",
      ],
      cta: "Create Account",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 md:px-8">
      <div className="text-center">
        <h2 className="font-display text-3xl text-foreground md:text-5xl">Choose your plan</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Pricing built for teams of any size. No surprises, just value.
        </p>

        <div className="mx-auto mt-6 inline-flex rounded-full border border-border bg-card p-1">
          {(["Monthly", "Yearly"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-full px-5 py-1.5 text-xs transition-colors ${
                period === p ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-3xl border p-7 ${
              p.highlight
                ? "border-primary-deep bg-primary-deep text-primary-foreground shadow-[var(--shadow-elegant)]"
                : "border-border bg-card text-foreground"
            }`}
          >
            <p className="text-xs uppercase tracking-widest opacity-70">{p.name}</p>
            <p className="mt-1 text-xs opacity-60">{p.desc}</p>
            <p className="mt-5 font-display text-5xl">{p.price}</p>
            <button
              className={`mt-5 w-full rounded-full px-5 py-2.5 text-sm transition-colors ${
                p.highlight
                  ? "bg-primary-glow text-primary-deep hover:bg-primary-glow/90"
                  : "bg-primary text-primary-foreground hover:bg-primary-deep"
              }`}
            >
              {p.cta}
            </button>
            <ul className="mt-6 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check
                    className={`h-4 w-4 ${p.highlight ? "text-primary-glow" : "text-primary"}`}
                  />
                  <span className={p.highlight ? "opacity-90" : ""}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
