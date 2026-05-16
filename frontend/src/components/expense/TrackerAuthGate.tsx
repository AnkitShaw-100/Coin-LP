import { Show, SignInButton, SignUpButton } from "@clerk/react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type TrackerAuthGateProps = {
  children: React.ReactNode;
};

export function TrackerAuthGate({ children }: TrackerAuthGateProps) {
  return (
    <Show
      when="signed-in"
      fallback={
        <main className="-mt-14 md:-mt-16">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-elegant)]">
            <div
              className="px-8 py-10 text-center text-primary-foreground md:px-12 md:py-12"
              style={{ background: "var(--gradient-hero)" }}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-glow/30">
                <ShieldCheck className="h-6 w-6 text-primary-glow" />
              </div>
              <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/70">
                Secure access
              </p>
              <h2 className="mt-3 font-display text-3xl text-white md:text-4xl">
                Sign in to open your tracker
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-primary-foreground/80">
                Manage expenses and convert currencies once you are signed in.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 px-8 py-8 sm:flex-row">
              <SignInButton mode="modal">
                <button className="rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="rounded-full px-6 py-3 text-sm font-medium">Sign up</Button>
              </SignUpButton>
            </div>
          </div>
        </main>
      }
    >
      {children}
    </Show>
  );
}
