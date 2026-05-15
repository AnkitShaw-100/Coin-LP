export function StatsBar() {
  const stats = [
    { value: "50+", label: "Countries supported with seamless transactions" },
    { value: "2M", label: "Active users worldwide trust our platform" },
    { value: "85%", label: "Customer satisfaction rate from real reviews" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 md:px-8">
      <div className="grid gap-8 rounded-3xl bg-primary-deep px-8 py-10 text-primary-foreground md:grid-cols-3 md:px-14 md:py-12">
        {stats.map((s) => (
          <div key={s.value} className="text-center">
            <p className="font-display text-5xl md:text-6xl">{s.value}</p>
            <p className="mx-auto mt-2 max-w-[16rem] text-xs text-primary-foreground/70">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
