type TrackerSectionHeaderProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function TrackerSectionHeader({
  title,
  description,
  align = "left",
}: TrackerSectionHeaderProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "text-center" : ""}>
      <h2 className="font-display text-3xl text-foreground md:text-4xl">{title}</h2>
      {description ? (
        <p
          className={`mt-3 text-sm text-muted-foreground md:text-base ${
            centered ? "mx-auto max-w-xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
