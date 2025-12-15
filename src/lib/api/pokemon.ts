import type { PokemonListT } from "@/types";

const BASE_URL = "https://pokeapi.co/api/v2/";

export const getAllPokemon = async ({ offset, limit }: { offset: number; limit: number }): Promise<PokemonListT> => {
  const url = new URL("pokemon", BASE_URL);
  url.searchParams.append("offset", offset.toString());
  url.searchParams.append("limit", limit.toString());
  const response = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.json();
};

export const getPokemon = async ({ id }: { id: number }) => {
  const url = new URL(`/pokemon/${id}`, BASE_URL);
  const response = await fetch(url.toString());
  return response;
};
