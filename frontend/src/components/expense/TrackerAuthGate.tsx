import { RedirectToSignUp, useUser } from "@clerk/react";

type TrackerAuthGateProps = {
  children: React.ReactNode;
};

export function TrackerAuthGate({ children }: TrackerAuthGateProps) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <main className="-mt-14 md:-mt-16">
        <div className="rounded-3xl border border-border bg-card p-8 text-center text-sm text-muted-foreground shadow-(--shadow-elegant)">
          Loading secure workspace...
        </div>
      </main>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignUp redirectUrl="/tracker" />;
  }

  return children;
}
