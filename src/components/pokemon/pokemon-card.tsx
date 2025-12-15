import type { PokemonListItem } from "@/types";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export const PokemonCard = ({ name, onClick }: Pick<PokemonListItem, "name"> & { onClick: () => void }) => {
  return (
    <Button
      className="flex flex-col p-0"
      onClick={onClick}
      variant="ghost"
    >
      <Card className="w-full h-24 p-0">
        <CardContent className="h-full flex items-center justify-center">
          <p className="text-secondary-foreground text-base">{name}</p>
        </CardContent>
      </Card>
    </Button>
  );
};
