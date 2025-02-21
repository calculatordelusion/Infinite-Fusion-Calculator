import {
  Species,
  SpriteType,
  DetailedMove,
  PokemonAbility,
} from "@/types/species.types";
import { abilitiesData, movesData, species } from "@/data/hardcoded";

export const speciesManager = {
  getAllBaseSprites: (): Species[] =>
    species.filter((s) => s.sprite_type === SpriteType.Base),

  getAllTripleSprites: (): Species[] =>
    species.filter((s) => s.sprite_type === SpriteType.Triple),

  getSpeciesById: (id: string): Species => {
    const foundSpecies = species.find((s) => s.id === id);
    if (!foundSpecies) {
      throw new Error(`Species not found for id: ${id}`);
    }
    return foundSpecies;
  },

  getSpeciesByName: (name: string): Species => {
    const foundSpecies = species.find(
      (s) => s.name.toLowerCase() === name.toLowerCase(),
    );
    if (!foundSpecies) {
      throw new Error(`Species not found for name: ${name}`);
    }
    return foundSpecies;
  },

  searchSpeciesByName: (searchTerm: string): Species[] => {
    const lowercaseSearch = searchTerm.toLowerCase();
    return species.filter((s) =>
      s.name.toLowerCase().includes(lowercaseSearch),
    );
  },

  getTotalSpeciesCount: (): number => species.length,

  getSpeciesCountByType: (spriteType: SpriteType): number =>
    species.filter((s) => s.sprite_type === spriteType).length,

  getMoveById: (moveId: string): DetailedMove => {
    const move = movesData.find((move) => move.id === moveId);
    if (!move) {
      throw new Error(`Move not found for id: ${moveId}`);
    }
    return move;
  },

  getAbilityById: (abilityId: string): PokemonAbility => {
    const ability = abilitiesData.find((ability) => ability.id === abilityId);
    if (!ability) {
      throw new Error(`Ability not found for id: ${abilityId}`);
    }
    return ability;
  },
};
