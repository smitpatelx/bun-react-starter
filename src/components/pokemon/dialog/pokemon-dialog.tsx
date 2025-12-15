import React, { Suspense, useEffect } from "react";
import type { PokemonDetailsT } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Details } from "./details";

export const PokemonDialog = ({ url, onClose }: { url: string | null; onClose: () => void }) => {
  const [promise, setPromise] = React.useState<Promise<PokemonDetailsT> | null>(null);

  useEffect(() => {
    if (url) {
      setPromise(fetch(url).then((res) => res.json()));
    } else {
      setPromise(null);
    }

    return () => {
      setPromise(null);
    };
  }, [url]);

  return (
    <Dialog
      onOpenChange={(value) => !value && onClose()}
      open={!!url}
    >
      <DialogContent className="max-w-lg flex flex-col">
        <DialogHeader>
          <DialogTitle>Pokemon Details</DialogTitle>
          <DialogDescription>
            {url ? (
              <>Details for Pokemon ID: {url.split("/")?.[url.split("/").length - 2]}</>
            ) : (
              <>No Pokemon selected.</>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex flex-col gap-2">
          <Suspense fallback={<Details promise={null} />}>
            <Details promise={promise} />
          </Suspense>
        </div>
      </DialogContent>
    </Dialog>
  );
};
