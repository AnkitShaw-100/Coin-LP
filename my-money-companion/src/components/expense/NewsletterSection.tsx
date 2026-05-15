import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section id="resources" className="mx-auto max-w-6xl px-4 pb-20 md:px-8">
      <h2 className="font-display text-4xl leading-tight text-foreground md:text-7xl">
        Save smart. Achieve more.
      </h2>

      <div className="mt-10 overflow-hidden rounded-3xl bg-primary-deep px-8 py-10 text-primary-foreground md:px-12 md:py-14">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-foreground/10">
              <span className="text-lg">✉️</span>
            </div>
            <h3 className="mt-5 font-display text-3xl md:text-4xl">Keep up with the latest</h3>
            <p className="mt-2 max-w-md text-sm text-primary-foreground/70">
              Join our newsletter for tips, product updates, and financial wisdom — straight to your
              inbox.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setSent(true);
            }}
            className="space-y-3"
          >
            <label className="block text-xs text-primary-foreground/70">Email address</label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 flex-1 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-5 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-glow"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary-glow px-6 text-sm font-medium text-primary-deep hover:bg-primary-glow/90"
              >
                {sent ? "Subscribed" : "Subscribe"} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-primary-foreground/60">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const cols = [
    { title: "Plan", links: ["Personal", "Business", "Enterprise"] },
    { title: "Product", links: ["Features", "Pricing", "Integrations"] },
    { title: "Company", links: ["About", "Careers", "Press"] },
    { title: "Developers", links: ["API", "Docs", "Status"] },
    { title: "Community", links: ["Blog", "Events", "Partners"] },
    { title: "Support", links: ["Help center", "Contact", "Security"] },
    { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
  ];
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-12 md:px-8">
      <div className="grid gap-10 border-t border-border pt-10 md:grid-cols-[1fr_3fr]">
        <div className="font-display text-2xl text-foreground">CoinLedger</div>
        <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-4 lg:grid-cols-7">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-xs uppercase tracking-widest text-foreground">{c.title}</p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                {c.links.map((l) => (
                  <li key={l} className="hover:text-foreground">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-10 text-xs text-muted-foreground">
        © {new Date().getFullYear()} CoinLedger. All rights reserved.
      </p>
    </footer>
  );
}
