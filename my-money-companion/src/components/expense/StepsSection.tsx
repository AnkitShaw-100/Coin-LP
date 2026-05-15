import { UserPlus, Wallet, ArrowRightLeft } from "lucide-react";

export function StepsSection() {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up for Free",
      desc: "Create your account in less than a minute and unlock the full toolkit.",
      tone: "rose",
    },
    {
      icon: Wallet,
      title: "Customize Your Workspace",
      desc: "Add your accounts, currencies, and goals so the dashboard reflects your life.",
      tone: "green",
    },
    {
      icon: ArrowRightLeft,
      title: "Start Tracking with Clarity",
      desc: "Every transaction lands in one beautiful, searchable place — ready for action.",
      tone: "mint",
    },
  ];
  const toneClass: Record<string, string> = {
    rose: "bg-[oklch(0.96_0.03_25)]",
    green: "bg-accent/30",
    mint: "bg-[oklch(0.95_0.04_160)]",
  };
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-8">
      <div className="text-center">
        <h2 className="font-display text-3xl text-foreground md:text-5xl">
          Get Started in 3 Simple Steps
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Start managing your finances effortlessly — in minutes, not hours.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className="space-y-4">
            <div
              className={`flex h-44 items-center justify-center rounded-3xl ${toneClass[s.tone]}`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-card text-primary shadow-[var(--shadow-soft)]">
                <s.icon className="h-6 w-6" />
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Step {i + 1}
              </p>
              <h3 className="mt-1 font-display text-xl text-foreground">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
