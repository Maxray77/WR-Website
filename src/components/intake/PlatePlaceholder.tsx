import { Feather } from "lucide-react";

// Placeholder for a vintage public-domain bird plate that will eventually
// live at /public/plates/{slug}.jpg. Until we source them from Wikimedia
// (John Gould, Audubon, Daniel Giraud Elliot, Joseph Smit, Henrik Grönvold),
// shows a styled empty-state aged-paper card.

export default function PlatePlaceholder({ name }: { name: string }) {
  return (
    <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-gradient-to-br from-[#f5efe1] to-[#e8dcc0] border border-[#c9b88a] flex flex-col items-center justify-center p-4 text-center">
      <Feather size={32} className="text-[#8a7344] mb-2 opacity-60" />
      <p className="text-[10px] uppercase tracking-widest text-[#8a7344] font-semibold">
        Plate forthcoming
      </p>
      <p className="text-xs italic text-[#5a4a2a] mt-1 line-clamp-2 font-[family-name:var(--font-poppins)]">
        {name}
      </p>
    </div>
  );
}
