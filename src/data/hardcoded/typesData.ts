/** Type data for Pokémon types */
export const typesData: {
  [key: string]: {
    weaknesses?: string[];
    resistances?: string[];
    immunities?: string[];
  };
} = {
  NORMAL: { weaknesses: ["FIGHTING"], immunities: ["GHOST"] },
  FIRE: {
    weaknesses: ["WATER", "GROUND", "ROCK"],
    resistances: ["FIRE", "GRASS", "ICE", "BUG", "STEEL", "FAIRY"],
  },
  WATER: {
    weaknesses: ["ELECTRIC", "GRASS"],
    resistances: ["FIRE", "WATER", "ICE", "STEEL"],
  },
  ELECTRIC: {
    weaknesses: ["GROUND"],
    resistances: ["ELECTRIC", "FLYING", "STEEL"],
  },
  GRASS: {
    weaknesses: ["FIRE", "ICE", "POISON", "FLYING", "BUG"],
    resistances: ["WATER", "ELECTRIC", "GRASS", "GROUND"],
  },
  ICE: {
    weaknesses: ["FIRE", "FIGHTING", "ROCK", "STEEL"],
    resistances: ["ICE"],
  },
  FIGHTING: {
    weaknesses: ["FLYING", "PSYCHIC", "FAIRY"],
    resistances: ["BUG", "ROCK", "DARK"],
  },
  POISON: {
    weaknesses: ["GROUND", "PSYCHIC"],
    resistances: ["FIGHTING", "POISON", "BUG", "GRASS", "FAIRY"],
  },
  GROUND: {
    weaknesses: ["WATER", "GRASS", "ICE"],
    resistances: ["POISON", "ROCK"],
    immunities: ["ELECTRIC"],
  },
  FLYING: {
    weaknesses: ["ELECTRIC", "ICE", "ROCK"],
    resistances: ["FIGHTING", "BUG", "GRASS"],
    immunities: ["GROUND"],
  },
  PSYCHIC: {
    weaknesses: ["BUG", "GHOST", "DARK"],
    resistances: ["FIGHTING", "PSYCHIC"],
  },
  BUG: {
    weaknesses: ["FLYING", "ROCK", "FIRE"],
    resistances: ["FIGHTING", "GROUND", "GRASS"],
  },
  ROCK: {
    weaknesses: ["WATER", "GRASS", "FIGHTING", "GROUND", "STEEL"],
    resistances: ["NORMAL", "FLYING", "POISON", "FIRE"],
  },
  GHOST: {
    weaknesses: ["GHOST", "DARK"],
    resistances: ["POISON", "BUG"],
    immunities: ["NORMAL", "FIGHTING"],
  },
  DRAGON: {
    weaknesses: ["ICE", "DRAGON", "FAIRY"],
    resistances: ["FIRE", "WATER", "GRASS", "ELECTRIC"],
  },
  DARK: {
    weaknesses: ["FIGHTING", "BUG", "FAIRY"],
    resistances: ["GHOST", "DARK"],
    immunities: ["PSYCHIC"],
  },
  STEEL: {
    weaknesses: ["FIRE", "FIGHTING", "GROUND"],
    resistances: [
      "NORMAL",
      "FLYING",
      "ROCK",
      "BUG",
      "STEEL",
      "GRASS",
      "PSYCHIC",
      "ICE",
      "DRAGON",
      "FAIRY",
    ],
    immunities: ["POISON"],
  },
  FAIRY: {
    weaknesses: ["POISON", "STEEL"],
    resistances: ["FIGHTING", "BUG", "DARK"],
    immunities: ["DRAGON"],
  },
};
