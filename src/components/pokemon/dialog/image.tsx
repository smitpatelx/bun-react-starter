import { use } from "react";

export const PokemonImage = ({ promise }: { promise: Promise<[string, string]> }) => {
  const [key, src] = use(promise);
  return (
    <div className="w-24 h-24 shrink-0 bg-zinc-900/40 hover:bg-zinc-200/30 border border-amber-300/30 rounded-3xl backdrop-blur-sm">
      <img
        alt={key ?? "Animated"}
        className="w-23 h-23 object-fill"
        height={200}
        loading="lazy"
        src={src}
        width={200}
      />
    </div>
  );
};
