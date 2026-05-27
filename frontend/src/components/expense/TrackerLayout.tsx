import { Link, useLocation } from "react-router-dom";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TrackerLayoutProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
};

const navLinks = [
  { to: "/", label: "Home", match: (path: string) => path === "/" },
  { to: "/tracker", label: "Dashboard", match: (path: string) => path === "/tracker" },
  {
    to: "/tracker/expenses",
    label: "Expenses",
    match: (path: string) => path.startsWith("/tracker/expenses"),
  },
];

export function TrackerLayout({
  children,
  title = "Expense Tracker",
  subtitle,
}: TrackerLayoutProps) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background font-sans">
      <header
        className="relative overflow-hidden rounded-b-[2.5rem] px-6 pb-24 pt-6 text-primary-foreground shadow-[0_30px_80px_-40px_rgba(16,52,40,0.7)] md:px-12 md:pb-28 md:pt-8"
        style={{
          backgroundImage:
            "linear-gradient(135deg, oklch(0.24 0.06 150) 0%, oklch(0.34 0.10 147) 45%, oklch(0.45 0.13 142) 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-primary-glow/15 blur-3xl"
        />

        <nav className="relative mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md md:px-5">
          <Link to="/" className="flex items-center gap-2 font-display text-xl text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-glow text-primary-deep shadow-sm">
              ◆
            </span>
            CoinLP
          </Link>
          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/10 p-1 md:flex">
            {navLinks.map((link) => {
              const active = link.match(pathname);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-white text-primary-deep shadow-sm"
                      : "text-primary-foreground/85 hover:bg-white/10 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="rounded-full bg-primary-glow px-4 py-2 text-sm text-primary-deep shadow-lg hover:bg-primary-glow/90">
                  Sign up
                </Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </nav>

        <div className="relative mx-auto mt-10 max-w-6xl md:mt-12">
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/70 md:text-left">
            Your financial workspace
          </p>
          <h1 className="mt-3 text-center font-display text-3xl text-white md:text-left md:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-primary-foreground/85 md:mx-0 md:text-left md:text-base">
              {subtitle}
            </p>
          ) : null}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-1 md:hidden">
            {navLinks.map((link) => {
              const active = link.match(pathname);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-white text-primary-deep shadow-sm"
                      : "border border-white/20 bg-white/10 text-white",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      <div className="relative mx-auto max-w-6xl px-4 pb-20 md:px-8">{children}</div>
    </div>
  );
}
