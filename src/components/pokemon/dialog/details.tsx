/** biome-ignore-all lint/suspicious/noArrayIndexKey: Required for skeleton */
import React, { Suspense, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { PokemonDetailsT } from "@/types";
import { PokemonImage } from "./image";

const removeDashes = (s: string) => s.replace(/-/g, " ");

const capitalize = (s: string) => {
  if (s.length === 0) return s;

  const whiteSpacePart = s.split(" ");

  const capitalizePart = (part: string | undefined) => {
    if (!part || part.length === 0) return part;
    return part?.[0]?.toUpperCase() + (part?.slice(1) ?? "").toLowerCase();
  };

  if (whiteSpacePart.length === 0) return capitalizePart(s);

  return whiteSpacePart.map((part) => capitalizePart(part)).join(" ");
};

const generateImagePromise = (src: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
};

export const Details = ({ promise }: { promise: Promise<PokemonDetailsT> | null }) => {
  const data = promise ? React.use(promise) : null;

  const dataWithImages = useMemo(() => {
    if (!data) return data;

    const spriteEntries = Object.entries(data.sprites).filter(([, src]) => !!src && typeof src === "string") as [
      string,
      string,
    ][];

    const imagePromises = spriteEntries.map(([key, src]) =>
      generateImagePromise(src).then((img) => [key, img.src] as [string, string]),
    );

    return {
      ...data,
      sprites: imagePromises,
    };
  }, [data]);

  if (!dataWithImages) {
    return (
      <div className="flex flex-col gap-2 relative">
        <div className="flex flex-nowrap overflow-x-auto gap-2">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <Skeleton
                className="w-24 h-24 shrink-0 rounded-3xl"
                key={i}
              />
            ))}
        </div>

        <p className="text-lg font-medium">Stats</p>
        <div className="flex flex-col gap-1.5">
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <div
                className="flex justify-between text-zinc-400"
                key={i}
              >
                <Skeleton className="w-20 h-4 inline-block" />
                <Skeleton className="w-10 h-4 inline-block" />
              </div>
            ))}
        </div>

        <hr />

        <p className="text-lg font-medium">Type</p>
        <div className="flex flex-wrap gap-2">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <Skeleton
                className="h-6 w-26 rounded-full inline-block"
                key={i}
              />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 relative">
      <div className="flex flex-nowrap overflow-x-auto gap-2">
        {dataWithImages.sprites.map((promise, index) => (
          <Suspense
            fallback={<Skeleton className="w-24 h-24 shrink-0 rounded-3xl" />}
            key={index}
          >
            <PokemonImage promise={promise} />
          </Suspense>
        ))}
      </div>

      <p className="text-lg font-medium">Stats</p>
      <div className="flex flex-col gap-1">
        {data?.stats.map((stat) => (
          <div
            className="flex justify-between text-zinc-400"
            key={stat.stat.name}
          >
            <span className="font-medium text-sm">{capitalize(removeDashes(stat.stat.name))}</span>
            <span className="text-sm">{stat.base_stat}</span>
          </div>
        ))}
      </div>

      <hr />

      <p className="text-lg font-medium">Type</p>
      <div className="flex flex-wrap gap-2">
        {data?.types.map((type) => (
          <Badge
            className="cursor-default"
            key={type.type.name}
            variant="default"
          >
            <span className="font-medium text-sm">{type.type.name}</span>
          </Badge>
        ))}
      </div>

      <img
        alt={data?.name ?? "Pokemon"}
        className="w-auto h-full absolute -z-10 object-contain self-center opacity-40 blur-sm"
        loading="eager"
        src={data?.sprites.other?.["official-artwork"]?.front_shiny ?? ""}
      />
    </div>
  );
};
