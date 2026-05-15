import { useState } from "react";
import empowerImg from "@/assets/empower.jpg";

export function EmpowerSection() {
  const tabs = [
    {
      key: "Growth",
      desc: "Whether you're a startup or an established player, we craft tools that help you stay ahead with confidence.",
    },
    {
      key: "Workflow",
      desc: "Whether you're a startup or an established player, our tools fit into your daily flow.",
    },
    {
      key: "Smart",
      desc: "Whether you're a startup or an established player, our tools are made to help you grow smarter.",
    },
  ];
  const [active, setActive] = useState(0);
  return (
    <section id="solutions" className="mx-auto max-w-6xl px-4 py-20 md:px-8">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl">
          <img
            src={empowerImg}
            alt="Person using the app"
            loading="lazy"
            width={800}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-display text-3xl text-foreground md:text-5xl">
            Empowering People to Make Smarter Financial Decisions
          </h2>
          <div className="mt-8 space-y-px rounded-2xl border border-border bg-card">
            {tabs.map((t, i) => (
              <button
                key={t.key}
                onClick={() => setActive(i)}
                className={`flex w-full items-start gap-6 rounded-2xl p-5 text-left transition-colors ${
                  active === i ? "bg-accent/30" : "hover:bg-muted/50"
                }`}
              >
                <span className="w-24 shrink-0 font-display text-base text-foreground">
                  {t.key}
                </span>
                <span className="text-sm text-muted-foreground">{t.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
