import { DexEntryTable } from "./database.types";
import { Pokemon, SpriteType } from "./species.types";

// Evolution Interface
export interface Evolution {
  target: string;
  method: string;
  param: string;
}

// PokemonEvolution Interface (extends Evolution)
export interface PokemonEvolution extends Evolution {
  from: string;
  to: string;
  name: string;
}

export interface Abilities {
  id: string;
  id_number: number;
  real_name: string;
  real_description: string;
}

export interface PokemonCardData {
  id: string;
  name?: string;
  types?: string[];
  base_pokemons?: { [key: string]: string };
  total_sprites?: number;
  TotalFusionsAsHead?: number;
  TotalFusionsAsBody?: number;
  image: {
    sprite_id: string;
    sprite_type: SpriteType;
    base_id: string;
    artists: string[];
    comments: string | null;
    url?: string;
    total_sprites?: number;
  };
  spriteType: "base" | "fusion" | "autogen" | "triple";
  hasCustomSprite?: boolean;
}

export interface SpriteApiResponse {
  success: true;
  statusCode: number;
  message: string;
  data: Pokemon;
  timestamp: string;
}

export interface MultiSpriteApiResponse {
  success: true;
  statusCode: number;
  message: string;
  data: {
    sprites: Pokemon[];
  };
  timestamp: string;
}

export interface FusionsOfBaseSprite {
  success: true;
  statusCode: number;
  message: string;
  data: PokemonCardData[];
  timestamp: string;
}
export interface ModulesAPIResponse {
  success: true;
  statusCode: number;
  message: string;
  data: PokemonCardData[];
  timestamp: string;
}
export interface ArtistAPIResponse {
  success: true;
  statusCode: number;
  message: string;
  data: {
    total_sprites: number;
    images: PokemonCardData[];
  };
  timestamp: string;
}
export interface DexAuthorAPIResponse {
  success: true;
  statusCode: number;
  message: string;
  data: DexEntryTable[];
  timestamp: string;
}
