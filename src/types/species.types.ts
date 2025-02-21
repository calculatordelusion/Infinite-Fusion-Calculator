import { PokemonCardData } from "./sprite.types";

export interface SpriteImage {
  sprite_id: string;
  sprite_type: SpriteType;
  base_id: string;
  artists: string[];
  comments: string | null;
  url?: string;
  total_sprites?: number;
}

export type PokedexEntryType = {
  id: number;
  sprite_id: string;
  entry: string;
  author: string;
};

export interface Pokemon
  extends Omit<
    Species,
    | "moves"
    | "pokedex_entry"
    | "tutor_moves"
    | "egg_moves"
    | "abilities"
    | "hidden_abilities"
    | "evolves_from"
    | "evolves_to"
  > {
  base_pokemons: { [key: string]: string };
  sprite_id: string;
  base_id: string;
  primary_image: SpriteImage;
  images: SpriteImage[];
  has_custom_sprite: boolean;
  has_pokedex_entry?: boolean;
  pokedex_entry: string | PokedexEntryType[];
  moves: LevelUpMove[];
  tutor_moves: DetailedMove[];
  egg_moves: DetailedMove[];
  abilities: PokemonAbility[];
  hidden_abilities: PokemonAbility[];
  evolves_from: Evolves[];
  evolves_to: Evolves[];
  total_sprites: number;
  related_pokemons: PokemonCardData[];
}

export interface LevelUpMove extends DetailedMove {
  level?: number;
  move: string;
}

export interface DetailedMove {
  id: string;
  id_number: number;
  real_name: string;
  function_code: string;
  base_damage: number;
  type: string;
  category: number;
  accuracy: number;
  total_pp: number;
  effect_chance: number;
  target: string;
  priority: number;
  flags: string;
  real_description: string;
}

export interface PokemonAbility {
  id: string;
  id_number: number;
  real_name: string;
  real_description: string;
}

export interface Species {
  id: string;
  name: string;
  sprite_type: string;
  image_type: string;
  pokedex_entry: string;
  types: string[];
  abilities: string[];
  hidden_abilities: string[];
  category: string;
  stats: Stats;
  ev_stats: { [key: string]: number };
  base_exp: number;
  growth_rate: string;
  gender_ratio: string;
  catch_rate: number;
  happiness: number;
  egg_groups: string[];
  hatch_steps: number;
  height: number;
  weight: number;
  color: string;
  shape: string;
  habitat: string;
  back_sprite_x: number;
  back_sprite_y: number;
  front_sprite_x: number;
  front_sprite_y: number;
  front_sprite_a: number;
  shadow_x: number;
  shadow_size: number;
  moves: Move[];
  tutor_moves: string[];
  egg_moves: string[];
  evolves_from: any[];
  evolves_to: any[];
}

export interface Move {
  level: number;
  move: string;
}

export enum Color {
  Black = "Black",
  Blue = "Blue",
  Brown = "Brown",
  Gray = "Gray",
  Green = "Green",
  Pink = "Pink",
  Purple = "Purple",
  Red = "Red",
  White = "White",
  Yellow = "Yellow",
}

export enum EggGroup {
  Amorphous = "Amorphous",
  Bug = "Bug",
  Ditto = "Ditto",
  Dragon = "Dragon",
  Fairy = "Fairy",
  Field = "Field",
  Flying = "Flying",
  Grass = "Grass",
  Humanlike = "Humanlike",
  Mineral = "Mineral",
  Monster = "Monster",
  Undiscovered = "Undiscovered",
  Water1 = "Water1",
  Water2 = "Water2",
  Water3 = "Water3",
}

export interface Evolves {
  target: string;
  method: Method;
  param: string;
  from: string;
  to: string;
  name: string;
}

export enum Method {
  AtkDefEqual = "AtkDefEqual",
  AttackGreater = "AttackGreater",
  DayHoldItem = "DayHoldItem",
  DefenseGreater = "DefenseGreater",
  HasMove = "HasMove",
  Item = "Item",
  Level = "Level",
  LevelDay = "LevelDay",
  LevelNight = "LevelNight",
  Necrozma = "NECROZMA",
  Ninjask = "Ninjask",
  Shedinja = "Shedinja",
}

export enum GenderRatio {
  AlwaysFemale = "AlwaysFemale",
  AlwaysMale = "AlwaysMale",
  Female25Percent = "Female25Percent",
  Female50Percent = "Female50Percent",
  Female75Percent = "Female75Percent",
  FemaleSevenEighths = "FemaleSevenEighths",
  FemaleOneEighth = "FemaleOneEighth",
  Genderless = "Genderless",
}

export enum GrowthRate {
  Erratic = "Erratic",
  Fast = "Fast",
  Fluctuating = "Fluctuating",
  Medium = "Medium",
  Parabolic = "Parabolic",
  Slow = "Slow",
}

export enum Habitat {
  Cave = "Cave",
  Forest = "Forest",
  Grassland = "Grassland",
  Mountain = "Mountain",
  None = "None",
  Rare = "Rare",
  RoughTerrain = "RoughTerrain",
  Sea = "Sea",
  Urban = "Urban",
  WatersEdge = "WatersEdge",
}

export enum Shape {
  Bipedal = "Bipedal",
  BipedalTail = "BipedalTail",
  Finned = "Finned",
  Head = "Head",
  HeadArms = "HeadArms",
  HeadBase = "HeadBase",
  HeadLegs = "HeadLegs",
  Insectoid = "Insectoid",
  MultiBody = "MultiBody",
  MultiWinged = "MultiWinged",
  Multiped = "Multiped",
  Quadruped = "Quadruped",
  Serpentine = "Serpentine",
  Winged = "Winged",
}

export enum SpriteType {
  Base = "base",
  Fusion = "fusion",
  Autogen = "autogen",
  Triple = "triple",
}

export interface Stats {
  base_hp: number;
  base_atk: number;
  base_def: number;
  base_sp_atk: number;
  base_sp_def: number;
  base_spd: number;
}

export enum Type {
  Bug = "BUG",
  Dark = "DARK",
  Dragon = "DRAGON",
  Electric = "ELECTRIC",
  Fairy = "FAIRY",
  Fighting = "FIGHTING",
  Fire = "FIRE",
  Flying = "FLYING",
  Ghost = "GHOST",
  Grass = "GRASS",
  Ground = "GROUND",
  Ice = "ICE",
  Normal = "NORMAL",
  Poison = "POISON",
  Psychic = "PSYCHIC",
  Rock = "ROCK",
  Steel = "STEEL",
  Water = "WATER",
}

export enum ImageType {
  Main = "main",
  Alt = "alt",
}
