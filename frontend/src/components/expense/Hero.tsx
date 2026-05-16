import { ArrowRight, Headphones, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <header
      className="relative overflow-hidden rounded-b-[2.5rem] px-6 pb-32 pt-6 text-primary-foreground shadow-[0_30px_80px_-40px_rgba(16,52,40,0.7)] md:px-12 md:pb-40 md:pt-8"
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
        <div className="flex items-center gap-2 md:gap-3">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="rounded-full bg-primary-glow px-4 py-2 text-sm text-primary-deep shadow-lg shadow-black/20 hover:bg-primary-glow/90">
                Sign up
              </Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </nav>

      <div className="relative mx-auto mt-10 grid w-full max-w-7xl items-center gap-10 lg:mt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="max-w-2xl text-center lg:text-left">
          {/* <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-primary-foreground/90 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" /> New release
          </span> */}
          <h1 className="mt-5 font-display text-4xl leading-[1.1] text-white drop-shadow-sm md:text-6xl">
            Achieve More with Intelligent Financial Tools
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/85 md:text-base lg:mx-0">
            Manage your investments and make confident decisions. From everyday expenses to
            long-term goals — we make it easy.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <Button
              asChild
              className="h-11 rounded-full bg-primary-glow px-7 text-primary-deep hover:bg-primary-glow/90"
            >
              <Link to="/tracker">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-white/20 bg-white/10 px-7 text-white hover:bg-white/20 hover:text-white"
            >
              <a href="#features">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-primary-foreground/75 lg:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" /> Secure by default
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Headphones className="h-3.5 w-3.5" /> 24/7 Support
            </span>
          </div>
        </div>

        <div className="group/hero relative w-full">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/20 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-primary-glow/20 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-primary-glow/10 blur-3xl"
            />

            {/* <div className="relative grid gap-4 p-4 md:grid-cols-[0.9fr_1.35fr] md:items-center md:p-6">
            </div> */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-transform duration-300 md:group-hover/hero:-translate-y-1">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-primary-foreground/85">
                <Sparkles className="h-3.5 w-3.5 text-primary-glow" /> Financial command center
              </p>
              <h3 className="mt-3 font-display text-2xl text-white md:text-3xl">
                Momentum at a glance
              </h3>
              <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">
                Monitor spending, watch portfolio movement, and rebalance quickly from one live
                board.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <StatPill label="Monthly spend" value="$6,942" trend="-8.2%" />
                <StatPill label="Savings rate" value="31.4%" trend="+2.1%" />
                <StatPill label="Cash runway" value="9.6 mo" trend="stable" />
              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-black/25 p-3">
                <div className="flex items-center justify-between text-[11px] text-primary-foreground/70">
                  <span>Budget capacity</span>
                  <span>76% utilized</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[76%] rounded-full bg-primary-glow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function StatPill({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
      <p className="text-[10px] uppercase tracking-[0.14em] text-primary-foreground/70">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
      <p className="mt-1 text-[11px] text-primary-glow">{trend}</p>
    </div>
  );
}
