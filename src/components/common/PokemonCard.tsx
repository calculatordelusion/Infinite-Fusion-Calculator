"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { generateSlug } from "@/utils";
import { getMainSpriteId } from "@/utils";
import { getSpriteImageURL } from "@/utils";
import { Separator } from "../ui/separator";
// import { PokemonCardData } from "@/lib/types/SpriteResponse";
import SpoilerContext from "@/context/spoiler";
import { useContext } from "react";
import { cn } from "@/utils/theme.utils";
import { config } from "@/config";
import { gameInfo } from "@/config/game.config";
import { SpriteImage, SpriteType } from "@/types";
import { PokemonCardData } from "@/types/sprite.types";

export interface PokemonCardProps {
  pokemon: PokemonCardData;
  structure?: "default" | "self-fusion" | "autogen-image";
  show_all_artists?: boolean;
  className?: string;
}

function PokemonCard({
  pokemon,
  structure,
  show_all_artists = false,
  className,
}: PokemonCardProps) {
  const { spoilerMode } = useContext(SpoilerContext);

  const primaryImage = pokemon.image;

  const ids: string[] = pokemon.id.split(".").map((id) => getMainSpriteId(id));

  const spriteType = pokemon.spriteType;
  const types = pokemon.types || [];
  const spriteTypeClass = spriteType !== "autogen" ? "sprite-highlight" : "";
  const imageURL = (image: SpriteImage) => {
    if (spoilerMode && image.sprite_type === SpriteType.Fusion) {
      return config.placeholders.spoilerImage;
    }
    return image.url || getSpriteImageURL(image.sprite_id, image.sprite_type);
  };

  const cardURL =
    primaryImage.sprite_type === SpriteType.Autogen
      ? `/${config.paths.sprites}/${primaryImage.sprite_id}?sprite=autogen`
      : `/${config.paths.sprites}/${primaryImage.sprite_id}`;

  return (
    <div className={cn(`pokemon-card ${className || ""}`)}>
      <div>
        {pokemon.name && (
          <h3>
            <Link rel="nofollow" prefetch={false} href={cardURL}>
              {pokemon.name}
            </Link>
          </h3>
        )}
        {types.length > 0 && (
          <div>
            {types.map((type) => (
              <Image
                key={type}
                src={`/images/type/${type.toLowerCase()}.png`}
                alt={type}
                width={96}
                height={32}
              />
            ))}
          </div>
        )}
      </div>
      <div>
        <Link rel="nofollow" prefetch={false} href={cardURL}>
          <Image
            src={imageURL(pokemon.image)}
            onError={(e: any) => {
              e.target.src = config.placeholders.imageURL;
            }}
            alt={`${pokemon.name || "Pokemon"} Sprite Image`}
            width={288}
            height={288}
            className={`${spriteTypeClass}`}
          />
        </Link>
        <div>
          <span>#{primaryImage.sprite_id.padStart(3, "0")}</span>
          <span className={`${show_all_artists ? "show_all_artists" : ""}`}>
            {primaryImage.artists && primaryImage.artists.length > 0
              ? primaryImage.artists.map((artist, index) => (
                  <React.Fragment key={`${artist}-${index}`}>
                    {artist === "autogen" ? (
                      <span>{artist}</span>
                    ) : (
                      <Link
                        rel="nofollow"
                        prefetch={false}
                        href={generateSlug(artist, "artists")}
                      >
                        {artist}
                      </Link>
                    )}
                    {primaryImage.artists.length - 1 > index && " & "}
                  </React.Fragment>
                ))
              : config.placeholders.artistName}
          </span>
        </div>
      </div>
      {(pokemon.TotalFusionsAsHead || pokemon.base_pokemons) &&
        pokemon.name && <Separator className="dark:bg-muted-foreground/20" />}
      <div>
        {pokemon.TotalFusionsAsHead && pokemon.base_pokemons && (
          <>
            <p>
              <span>Fusions:</span>
              <span>
                {Number(pokemon.TotalFusionsAsHead) +
                  Number(pokemon.TotalFusionsAsBody)}
              </span>
            </p>
            <p className="text-muted-foreground">
              <span>As Head:</span>
              <span>
                {pokemon.TotalFusionsAsHead} / {gameInfo.totalPokemons}
              </span>
            </p>
            <p className="text-muted-foreground">
              <span>As Body:</span>
              <span>
                {pokemon.TotalFusionsAsBody} / {gameInfo.totalPokemons}
              </span>
            </p>
          </>
        )}
        {(spriteType === "fusion" || spriteType === "autogen") &&
          pokemon.base_pokemons && (
            <>
              <p>
                <span>Fusion of</span>
                <span className="text-muted-foreground">
                  {structure === "self-fusion" ? (
                    <>
                      <Link
                        rel="nofollow"
                        prefetch={false}
                        href={`/${config.paths.sprites}/${ids[0]}`}
                      >
                        {pokemon?.base_pokemons?.[ids[0]]}
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        rel="nofollow"
                        prefetch={false}
                        href={`/${config.paths.sprites}/${ids[0]}`}
                      >
                        {pokemon?.base_pokemons?.[ids[0]]}
                      </Link>
                      /
                      <Link
                        rel="nofollow"
                        prefetch={false}
                        href={`/${config.paths.sprites}/${ids[1]}`}
                      >
                        {pokemon?.base_pokemons?.[ids[1]]}
                      </Link>
                    </>
                  )}
                </span>
              </p>
            </>
          )}
        {spriteType === "triple" && pokemon.base_pokemons && (
          <p>
            <span>Fusion of</span>
            <span className="text-muted-foreground">
              {ids.map((id, index) => (
                <React.Fragment key={id}>
                  <Link
                    rel="nofollow"
                    prefetch={false}
                    className="border-b"
                    href={`/${config.paths.sprites}/${id}`}
                  >
                    {pokemon?.base_pokemons?.[id]}
                  </Link>
                  {ids.length - 1 > index && " / "}
                </React.Fragment>
              ))}
            </span>
          </p>
        )}
        {pokemon.spriteType !== SpriteType.Autogen &&
          pokemon.total_sprites && (
            <p>
              <span>Variants:</span>
              <span>{pokemon.total_sprites}</span>
            </p>
          )}
      </div>
    </div>
  );
}

export default PokemonCard;
