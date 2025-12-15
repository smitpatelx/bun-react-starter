import React, { Suspense } from "react";
import { API } from "@/lib";
import type { PokemonListT } from "@/types";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { PokemonList } from "./pokemon-list";

export const PokemonView = () => {
  const [promise] = React.useState<Promise<PokemonListT>>(() => API.getAllPokemon({ offset: 0, limit: 10 }));

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Suspense fallback={<Skeleton className="h-35 w-full" />}>
            <PokemonList promise={promise} />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
};
