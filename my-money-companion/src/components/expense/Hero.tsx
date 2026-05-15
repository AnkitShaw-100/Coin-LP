import { ArrowRight, Headphones, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <header
      className="relative overflow-hidden rounded-b-[2.5rem] px-6 pb-24 pt-6 text-primary-foreground shadow-[0_30px_80px_-40px_rgba(16,52,40,0.7)] md:px-12 md:pb-32 md:pt-8"
      style={{
        backgroundImage:
          "linear-gradient(135deg, oklch(0.24 0.06 150) 0%, oklch(0.34 0.10 147) 45%, oklch(0.45 0.13 142) 100%)",
      }}
    >
      {/* Subtle pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <nav className="relative mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md md:px-5">
        <div className="flex items-center gap-2 font-display text-xl">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-glow text-primary-deep shadow-sm">
            ◆
          </span>
          CoinLP
        </div>
        <div className="hidden items-center gap-8 text-sm font-medium text-primary-foreground/90 md:flex">
          <a href="#features" className="transition-colors hover:text-white">
            Product
          </a>
          <a href="#solutions" className="transition-colors hover:text-white">
            Solutions
          </a>
          <a href="#pricing" className="transition-colors hover:text-white">
            Pricing
          </a>
          <a href="#resources" className="transition-colors hover:text-white">
            Resources
          </a>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden text-sm font-medium text-primary-foreground/85 transition-colors hover:text-white sm:inline">
            Log in
          </button>
          <Button className="rounded-full bg-primary-glow px-5 text-primary-deep shadow-lg shadow-black/20 hover:bg-primary-glow/90">
            Sign up
          </Button>
        </div>
      </nav>

      <div className="relative mx-auto mt-10 max-w-3xl text-center md:mt-16">
        {/* <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-primary-foreground/90 shadow-sm backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" /> New release
        </span> */}
        <h1 className="mt-5 font-display text-4xl leading-[1.1] text-white drop-shadow-sm md:text-6xl">
          Achieve More with Intelligent Financial Tools
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/85 md:text-base">
          Manage your investments and make confident decisions. From everyday expenses to long-term
          goals — we make it easy.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            className="h-11 rounded-full bg-primary-glow px-7 text-primary-deep hover:bg-primary-glow/90"
          >
            <Link to="/tracker">Get Started</Link>
          </Button>
          <Button
            variant="outline"
            className="h-11 rounded-full border-white/20 bg-white/10 px-7 text-white hover:bg-white/20 hover:text-white"
          >
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-primary-foreground/75">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" /> Secure by default
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Headphones className="h-3.5 w-3.5" /> 24/7 Support
          </span>
        </div>
      </div>

      {/* Phone + floating cards */}
      {/* <div className="group/cards relative mx-auto mt-10 flex max-w-4xl items-end justify-center">
        <FloatingCard
          className="absolute -left-2 bottom-32 hidden -rotate-2 md:block md:transition md:duration-300 md:hover:-translate-y-1 md:hover:-rotate-1"
          tone="dark"
        >
          <p className="text-[10px] uppercase tracking-widest text-primary-foreground/60">
            Transfer
          </p>
          <p className="font-display text-base text-primary-foreground">$9,647.00</p>
          <p className="mt-1 text-[10px] text-primary-foreground/75">Approved · just now</p>
        </FloatingCard>
        <FloatingCard
          className="absolute left-12 top-2 hidden rotate-1 md:block md:transition md:duration-300 md:hover:-translate-y-1 md:hover:rotate-0"
          tone="light"
        >
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">SAVE 31%</p>
          <p className="mt-1 text-[10px] font-medium text-foreground">Auto-invest enabled</p>
        </FloatingCard>
        <FloatingCard
          className="absolute right-0 top-6 hidden md:block md:transition md:duration-300 md:hover:-translate-y-1 md:hover:scale-[1.02]"
          tone="light"
        >
          <div className="flex items-center gap-2">
            <div className="relative h-7 w-7 rounded-full bg-primary-glow">
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">121,468+</p>
              <p className="text-xs font-medium text-foreground">Happy users</p>
              <p className="text-[10px] text-emerald-600">+1,284 this week</p>
            </div>
          </div>
        </FloatingCard>
        <FloatingCard
          className="absolute -right-2 bottom-28 hidden md:block md:transition md:duration-300 md:hover:-translate-y-1 md:hover:scale-[1.02]"
          tone="light"
        >
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            limit balance
          </p>
          <p className="font-display text-sm text-foreground">$500</p>
          <div className="mt-1.5 h-1.5 w-24 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[76%] rounded-full bg-primary" />
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground">76% used</p>
        </FloatingCard>

        <PhoneMockup />
      </div> */}
    </header>
  );
}

function FloatingCard({
  children,
  className,
  tone,
}: {
  children: React.ReactNode;
  className?: string;
  tone: "light" | "dark";
}) {
  return (
    <div
      className={`rounded-2xl px-3 py-2 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.55)] ${
        tone === "light"
          ? "bg-white/95 text-foreground"
          : "border border-white/15 bg-primary-deep/90 text-white backdrop-blur"
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative w-[260px] rounded-[2.25rem] border-[10px] border-white/10 bg-white/95 p-3 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.45)] transition-transform duration-500 md:w-[280px] md:group-hover/cards:-translate-y-1 md:group-hover/cards:rotate-[0.35deg]">
      <div className="absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-foreground/10" />
      <div className="rounded-[1.5rem] bg-[linear-gradient(180deg,oklch(1_0_0)_0%,oklch(0.985_0.004_140)_100%)] p-4 pt-7">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>InvestStock</span>
          <span>●●●</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
            Live +2.4%
          </span>
          <div className="flex items-center gap-1 rounded-full bg-muted px-1.5 py-1 text-[10px] text-muted-foreground">
            <span className="rounded-full bg-card px-1.5 py-0.5 text-foreground">1D</span>
            <span className="px-1.5">1W</span>
            <span className="px-1.5">1M</span>
          </div>
        </div>
        <p className="mt-3 font-display text-base text-foreground">Suggested distribution</p>

        <div className="mt-4 flex items-center justify-center">
          <div className="relative h-28 w-28">
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
                strokeDasharray="170 251"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-xl text-foreground">68%</span>
              <span className="text-[10px] text-muted-foreground">on target</span>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <MiniRow label="USD" value="$2,140" ratio="72%" />
          <MiniRow label="EUR" value="€1,890" ratio="64%" />
          <MiniRow label="GBP" value="£1,205" ratio="51%" />
          <MiniRow label="JPY" value="¥48,300" ratio="59%" />
        </div>
        <button className="mt-3 w-full rounded-xl bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          Rebalance portfolio
        </button>
      </div>
    </div>
  );
}

function MiniRow({
  label,
  value,
  ratio,
}: {
  label: string;
  value: string;
  ratio: string;
}) {
  return (
    <div className="rounded-lg bg-card px-2 py-1.5 text-[10px] transition-colors hover:bg-muted/70">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{value}</span>
      </div>
      <div className="mt-1 flex items-center gap-1.5">
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary" style={{ width: ratio }} />
        </div>
        <span className="text-[9px] text-muted-foreground">{ratio}</span>
      </div>
    </div>
  );
}
