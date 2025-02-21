"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { calculateShinyOffset } from "@/utils";
import { getSpriteImageURL } from "@/utils";
import { config } from "@/config";
import { Separator } from "../ui/separator";
import "@/styles/FusionImage.css";
import { useContext } from "react";
import SpoilerContext from "@/context/spoiler";
import { Pokemon, SpriteImage, SpriteType } from "@/types";
import { Book, Sparkle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GridContent, PokemonCard, TooltipWrapper } from "../common";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function AllSpritesDialog({ pokemon }: { pokemon: Pokemon }) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!pokemon.total_sprites || pokemon.total_sprites === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipWrapper content="View All Sprites">
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="bg-green-500 hover:bg-green-600 shadow-sm p-0 rounded-md w-6 h-6 font-medium text-white transition-all"
          >
            {pokemon.total_sprites}
          </Button>
        </DialogTrigger>
      </TooltipWrapper>

      <DialogContent className="p-0 w-full max-w-[95vw]">
        <DialogHeader className="top-0 z-10 sticky bg-background px-4 pt-4 pb-2 border-b">
          <div className="flex justify-between items-center">
            <DialogTitle className="font-semibold text-lg">
              Sprites for {pokemon.name} #{pokemon.id}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 h-[calc(90vh-70px)]">
          <div className="p-4">
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
              {pokemon.images.map((image) => (
                <div
                  key={image.sprite_id}
                  className="bg-background/50 p-2 rounded-lg"
                >
                  <PokemonCard
                    pokemon={{
                      id: image.sprite_id,
                      name: pokemon.name,
                      image: image,
                      // total_sprites: image.total_sprites,
                      spriteType: image.sprite_type,
                      types: pokemon.types,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

const ShinyPreview = ({
  image,
  hueShift,
  label,
}: {
  image: SpriteImage;
  pokemon: Pokemon;
  hueShift: number;
  label: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const img = containerRef.current.querySelector(
        "div .pokemon-card > div:nth-child(2) > a > img"
      ) as HTMLImageElement;
      if (img) {
        img.style.cssText = `
          filter: hue-rotate(${hueShift}deg);
          background: transparent;
          mix-blend-mode: normal;
        `;
      }
    }
  }, [hueShift]);

  return (
    <div className="flex flex-col mx-auto w-full max-w-xs">
      <div className="flex justify-between my-2 px-4">
        <p className="font-semibold text-muted-foreground text-sm">{label}</p>
        <p className="font-semibold text-sm">Shift: {hueShift}°</p>
      </div>
      <div
        ref={containerRef}
        className="bg-background/50 backdrop-blur-sm rounded-lg"
      >
        <PokemonCard
          className="bg-transparent"
          pokemon={{
            id: image.sprite_id,
            // name: pokemon.name,
            image: image,
            // total_sprites: image.total_sprites,
            spriteType: SpriteType.Autogen,
            // types: pokemon.types,
          }}
        />
      </div>
    </div>
  );
};

export function AllShiniesDialog({
  pokemon,
  headId,
  bodyId,
}: {
  pokemon: Pokemon;
  headId: number;
  bodyId: number;
}) {
  const [shinyImage, setShinyImage] = useState<SpriteImage>(pokemon.images[0]);
  const [isOpen, setIsOpen] = React.useState(false);

  const hueShiftOffset = {
    head: calculateShinyOffset({
      headPokeId: headId,
      bodyPokeId: bodyId,
      shinyType: "head",
    }),
    body: calculateShinyOffset({
      headPokeId: headId,
      bodyPokeId: bodyId,
      shinyType: "body",
    }),
    both: calculateShinyOffset({
      headPokeId: headId,
      bodyPokeId: bodyId,
      shinyType: "both",
    }),
  };

  const handleSpriteChange = (value: string) => {
    const [spriteId, spriteType] = value.split("_");
    const newImage = pokemon.images.find(
      (img) => img.sprite_id === spriteId && img.sprite_type === spriteType
    );
    if (newImage) {
      setShinyImage(newImage);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipWrapper content="View All Shinies">
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="bg-amber-400 hover:bg-amber-500 shadow-sm rounded-md w-6 h-6 text-gray-800 transition-all"
          >
            <Sparkle className="size-4" />
          </Button>
        </DialogTrigger>
      </TooltipWrapper>

      <DialogContent className="backdrop-blur-sm mt-6 md:mt-0 p-0 w-full max-w-[95vw] md:max-w-[1000px] md:max-h-[600px]">
        <DialogHeader className="px-4 pt-4 pb-2 border-b">
          <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-4 max-w-screen-3xl">
            <DialogTitle className="font-medium text-muted-foreground text-lg">
              Shinies for {pokemon.name}
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="mx-auto px-4 w-full md:w-[280px]">
          <Select
            defaultValue={`${shinyImage.sprite_id}_${shinyImage.sprite_type}`}
            onValueChange={handleSpriteChange}
          >
            <SelectTrigger className="bg-background/50 border w-full">
              <SelectValue placeholder="Select a sprite" />
            </SelectTrigger>
            <SelectContent className="bg-background/95 border">
              {pokemon.images.map((img) => (
                <SelectItem
                  key={`${img.sprite_id}_${img.sprite_type}`}
                  value={`${img.sprite_id}_${img.sprite_type}`}
                >
                  {`${img.sprite_type} - ${img.sprite_id}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ScrollArea className="h-[calc(90vh-80px)]">
          <section className="flex justify-center items-center mx-auto mb-10">
            <GridContent className="gap-4 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-3">
              <ShinyPreview
                image={shinyImage}
                pokemon={pokemon}
                hueShift={hueShiftOffset.head}
                label="Head Shiny"
              />
              <ShinyPreview
                image={shinyImage}
                pokemon={pokemon}
                hueShift={hueShiftOffset.body}
                label="Body Shiny"
              />
              <ShinyPreview
                image={shinyImage}
                pokemon={pokemon}
                hueShift={hueShiftOffset.both}
                label="All Shiny"
              />
            </GridContent>
          </section>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function FusionImage({
  pokemon,
  fusionIds,
}: {
  pokemon: Pokemon;
  fusionIds: { headId: string; bodyId: string };
}) {
  const { spoilerMode } = useContext(SpoilerContext);

  const primaryImage = pokemon.primary_image;

  const ids: string[] = pokemon.id.split(".");

  // Updated logic to prioritize 'autogen' over the ID structure
  const spriteType =
    primaryImage.sprite_type === "autogen"
      ? "autogen"
      : ids.length === 2
        ? "fusion"
        : ids.length === 3
          ? "triples"
          : "base";
  const types = pokemon.types || [];
  const spriteTypeClass = spriteType !== "autogen" ? "sprite-highlight" : "autogen-highlight";
  const imageURL = () => {
    if (spoilerMode && spriteType === "fusion") {
      return config.placeholders.spoilerImage;
    }
    return (
      pokemon.primary_image.url ||
      getSpriteImageURL(primaryImage.sprite_id, spriteType as SpriteType)
    );
  };

  return (
    <div className="mx-auto max-w-[19rem]">
      <div className="flex justify-between mx-2 mb-1">
        <p className="flex gap-1 max-w-min text-sm truncate">
          {pokemon.has_pokedex_entry && (
            <TooltipWrapper content="Has Custom Dex Entry">
              <Book className="size-4 text-blue-500 text-xs" />
            </TooltipWrapper>
          )}
          <span className="text-primary hover:text-green-700 truncate">
            {pokemon.name}
          </span>
        </p>
        <div className="flex gap-1">
          <AllShiniesDialog
            pokemon={pokemon}
            headId={parseInt(fusionIds.headId)}
            bodyId={parseInt(fusionIds.bodyId)}
          />
          {pokemon.total_sprites !== 0 && (
            <AllSpritesDialog pokemon={pokemon} />
          )}
        </div>
      </div>
      <div className="fusion-image">

        <div></div>
        <div>
          <p>
            <Image
              src={imageURL()}
              alt={`${pokemon.name || "Pokemon"} Sprite Image`}
              width={288}
              height={288}
              className={`aspect-square ${spriteTypeClass}`}
            />
          </p>

          <div>
            <span>
              <p className="hover:text-primary">
                #{primaryImage.sprite_id.padStart(3, "0")}
              </p>
            </span>
            <span className="overflow-hidden text-ellipsis">
              {primaryImage.artists && primaryImage.artists.length > 0
                ? primaryImage.artists.map((artist, index) => (
                    <React.Fragment key={artist}>
                      {artist === "autogen" ? (
                        <span>{artist}</span>
                      ) : (
                        <p className="overflow-hidden hover:text-primary break-all text-ellipsis">
                          {artist}
                        </p>
                      )}
                      {primaryImage.artists &&
                        primaryImage.artists.length - 1 > index &&
                        " & "}
                    </React.Fragment>
                  ))
                : config.placeholders.imageName}
            </span>
          </div>
        </div>
        {(pokemon.base_pokemons !== undefined ||
          pokemon.total_sprites !== undefined) && <Separator />}
        <div></div>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-1 my-2">
        {types.map((type) => (
          <Image
            key={type}
            src={`/images/type/${type.toLowerCase()}.png`}
            alt={type}
            width={96}
            height={32}
            className="my-auto rounded-sm w-full max-w-16 h-auto"
          />
        ))}
      </div>
    </div>
  );
}

export { FusionImage };
