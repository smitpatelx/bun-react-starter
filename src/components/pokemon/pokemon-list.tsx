import React from "react";
import type { PokemonListT } from "@/types";
import { PokemonDialog } from "./dialog";
import { PokemonCard } from "./pokemon-card";

export const PokemonList = ({ promise }: { promise: Promise<PokemonListT> }) => {
  const [selectedPokemon, setSelectedPokemon] = React.useState<string | null>(null);

  const data = React.use(promise);

  const hanldeCardClick = (url: string) => {
    setSelectedPokemon(url);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Pokemon List</h3>

        <div className="grid grid-cols-4 gap-3">
          {data.results &&
            data.results?.length > 0 &&
            data.results.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                onClick={() => hanldeCardClick(pokemon.url)}
              />
            ))}
        </div>
      </div>

      <PokemonDialog
        onClose={() => {
          setSelectedPokemon(null);
        }}
        url={selectedPokemon}
      />
    </>
  );
};
