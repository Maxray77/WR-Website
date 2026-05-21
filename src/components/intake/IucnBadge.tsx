// Shows IUCN Red List status badge.
// Per project rules, ONLY renders for CR / EN / VU / NT.
// LC (Least Concern) and unknown return null.

type IucnStatus = "CR" | "EN" | "VU" | "NT" | "LC" | "DD" | null;

const STYLES: Record<string, { bg: string; text: string; label: string }> = {
  CR: { bg: "bg-red-100", text: "text-red-700",     label: "Critically Endangered" },
  EN: { bg: "bg-orange-100", text: "text-orange-700", label: "Endangered" },
  VU: { bg: "bg-amber-100", text: "text-amber-800",  label: "Vulnerable" },
  NT: { bg: "bg-yellow-100", text: "text-yellow-800",label: "Near Threatened" },
};

export default function IucnBadge({
  status,
  size = "sm",
}: {
  status: IucnStatus;
  size?: "sm" | "md";
}) {
  if (!status || !(status in STYLES)) return null;
  const style = STYLES[status];
  const dims =
    size === "md"
      ? "px-2.5 py-1 text-xs"
      : "px-2 py-0.5 text-[10px]";
  return (
    <span
      className={`inline-flex items-center font-bold uppercase tracking-wide rounded ${style.bg} ${style.text} ${dims}`}
      title={`${status} — ${style.label} (IUCN Red List)`}
    >
      {status}
    </span>
  );
}
