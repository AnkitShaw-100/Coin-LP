import { Check } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 md:px-8">
      <div className="text-center">
        <h2 className="font-display text-3xl text-foreground md:text-5xl">
          Stay in Control of Your Finances
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Track your finances effortlessly with intuitive tools that help you manage every cent.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <FeatureCard
          eyebrow="Easy Invoicing"
          desc="Create and send professional invoices in seconds, with built-in tracking."
          tone="light"
        >
          <InvoicePreview />
        </FeatureCard>

        <FeatureCard
          eyebrow="Real-Time Financial Reports"
          desc="Get a live snapshot of your business performance with up-to-the-minute reports."
          tone="light"
        >
          <ChartPreview />
        </FeatureCard>

        <FeatureCard
          eyebrow="Smart Analytics & Reporting"
          desc="Make data-driven decisions with advanced analytics and real-time insights to track progress and uncover trends."
          tone="mint"
          wide
        >
          <DonutPreview />
        </FeatureCard>
      </div>
    </section>
  );
}

function FeatureCard({
  eyebrow,
  desc,
  children,
  tone,
  wide,
}: {
  eyebrow: string;
  desc: string;
  children: React.ReactNode;
  tone: "light" | "mint";
  wide?: boolean;
}) {
  return (
    <div
      className={`group rounded-3xl border border-border p-6 transition-shadow hover:shadow-[var(--shadow-soft)] md:p-8 ${
        tone === "mint" ? "bg-accent/30" : "bg-card"
      } ${wide ? "md:col-span-2 md:grid md:grid-cols-2 md:gap-10" : ""}`}
    >
      <div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Check className="h-4 w-4" />
        </div>
        <h3 className="mt-5 font-display text-2xl text-foreground">{eyebrow}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
        {wide && (
          <button className="mt-6 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground hover:bg-primary-deep">
            Get Started
          </button>
        )}
      </div>
      <div className={wide ? "" : "mt-6"}>{children}</div>
    </div>
  );
}

function InvoicePreview() {
  const items = [
    { label: "Sabeen Mahek's arrival", note: "5 minutes ago", ok: true },
    { label: "Hi Lena, email", note: "Today, 09:14", ok: true },
    { label: "Lunch with the Marketing team", note: "Tomorrow, 12:00", ok: false },
  ];
  return (
    <ul className="space-y-2 rounded-2xl bg-background/60 p-3">
      {items.map((i) => (
        <li
          key={i.label}
          className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-[var(--shadow-soft)]"
        >
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full ${
              i.ok ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            <Check className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{i.label}</p>
            <p className="text-xs text-muted-foreground">{i.note}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function ChartPreview() {
  return (
    <div className="rounded-2xl bg-background/60 p-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Revenue overview</span>
        <span>+24%</span>
      </div>
      <svg viewBox="0 0 300 120" className="mt-3 h-32 w-full">
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.45 0.13 145)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="oklch(0.45 0.13 145)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 95 C 40 80, 60 70, 90 75 S 150 50, 180 55 S 240 20, 300 15 L 300 120 L 0 120 Z"
          fill="url(#chartFill)"
        />
        <path
          d="M0 95 C 40 80, 60 70, 90 75 S 150 50, 180 55 S 240 20, 300 15"
          fill="none"
          stroke="oklch(0.45 0.13 145)"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
}

function DonutPreview() {
  return (
    <div className="flex items-center justify-center rounded-2xl bg-card p-6 shadow-[var(--shadow-soft)]">
      <div className="relative h-44 w-44">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="oklch(0.92 0.02 140)"
            strokeWidth="14"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="oklch(0.45 0.13 145)"
            strokeWidth="14"
            strokeDasharray="155 251"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl text-foreground">62%</span>
          <span className="text-xs text-muted-foreground">Saved</span>
        </div>
      </div>
    </div>
  );
}
