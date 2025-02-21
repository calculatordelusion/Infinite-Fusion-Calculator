import { gameInfo } from "@/config";
import { splitted_names } from "@/data/hardcoded";
import {
  CalculateShinyProps,
  DetailedMove,
  GenderRatio,
  GrowthRate,
  Habitat,
  LevelUpMove,
  Species,
} from "@/types";

// Constants
const GROWTH_RATE_PRIORITY: GrowthRate[] = [
  "Slow",
  "Erratic",
  "Fluctuating",
  "Parabolic",
  "Medium",
  "Fast",
] as GrowthRate[];

const HABITATS: Habitat[] = [
  "Grassland",
  "Mountain",
  "WatersEdge",
  "Forest",
  "RoughTerrain",
  "Cave",
  "Urban",
  "Sea",
  "Rare",
  "None",
] as Habitat[];

// Helper functions
export const calcStat = (dominant: number, recessive: number): number =>
  Math.max(1, Math.floor((dominant + dominant + recessive) / 3));

export const calcEv = (a: number, b: number): number =>
  Math.max(0, Math.floor((a + b) / 2));

export const avg = (a: number, b: number): number => Math.floor((a + b) / 2);

export const splitAndCombineText = (
  start: string,
  end: string,
  separator: string,
): string => {
  const startPart = start.split(separator, 2)[0];
  const endPart = end.split(separator, 2).at(-1) || "";
  return `${startPart}${separator}${endPart}`;
};

export const determineGrowthRate = (
  headRate: string,
  bodyRate: string,
): GrowthRate => {
  return (
    GROWTH_RATE_PRIORITY.find(
      (rate) => rate === headRate || rate === bodyRate,
    ) ?? ("Medium" as GrowthRate)
  );
};

export const GENDER_RATIOS: Record<
  Species["gender_ratio"],
  { id: string; name: string; female_chance: number }
> = {
  AlwaysMale: { id: "AlwaysMale", name: "Always Male", female_chance: 0 },
  AlwaysFemale: {
    id: "AlwaysFemale",
    name: "Always Female",
    female_chance: 255,
  },
  Genderless: { id: "Genderless", name: "Genderless", female_chance: -1 },
  FemaleOneEighth: {
    id: "FemaleOneEighth",
    name: "Female One Eighth",
    female_chance: 32,
  },
  Female25Percent: {
    id: "Female25Percent",
    name: "Female 25 Percent",
    female_chance: 64,
  },
  Female50Percent: {
    id: "Female50Percent",
    name: "Female 50 Percent",
    female_chance: 128,
  },
  Female75Percent: {
    id: "Female75Percent",
    name: "Female 75 Percent",
    female_chance: 192,
  },
  FemaleSevenEighths: {
    id: "FemaleSevenEighths",
    name: "Female Seven Eighths",
    female_chance: 224,
  },
};

export const determineGenderRatio = (
  headGenderRatio: GenderRatio,
  bodyGenderRatio: GenderRatio,
): GenderRatio => {
  const headRatio =
    GENDER_RATIOS[headGenderRatio] || GENDER_RATIOS.Female50Percent;
  const bodyRatio =
    GENDER_RATIOS[bodyGenderRatio] || GENDER_RATIOS.Female50Percent;

  if (headRatio.id === "Genderless" || bodyRatio.id === "Genderless") {
    return GenderRatio.Genderless;
  }

  if (headRatio.id === "AlwaysMale" || bodyRatio.id === "AlwaysMale") {
    return GenderRatio.AlwaysMale;
  }

  if (headRatio.id === "AlwaysFemale" || bodyRatio.id === "AlwaysFemale") {
    return GenderRatio.AlwaysFemale;
  }

  // Average the female chances
  const avgFemaleChance = Math.floor(
    (headRatio.female_chance + bodyRatio.female_chance) / 2,
  );

  // Find the closest matching ratio and return its id
  return Object.values(GENDER_RATIOS).reduce((prev, curr) => {
    return Math.abs(curr.female_chance - avgFemaleChance) <
      Math.abs(prev.female_chance - avgFemaleChance)
      ? curr
      : prev;
  }).id as GenderRatio; // Cast to GenderRatio
};

export const calculateFusionMoves = (
  headPokemon: {
    moves: LevelUpMove[];
    tutor_moves: DetailedMove[];
    egg_moves: DetailedMove[];
  },
  bodyPokemon: {
    moves: LevelUpMove[];
    tutor_moves: DetailedMove[];
    egg_moves: DetailedMove[];
  },
): {
  level_up_moves: (LevelUpMove & { level: number })[];
  tutor_moves: DetailedMove[];
  egg_moves: DetailedMove[];
} => {
  // Helper to deduplicate moves based on IDs
  const deduplicateMoves = <T extends { id: string }>(moves: T[]): T[] => {
    const moveMap = new Map<string, T>();
    moves.forEach((move) => moveMap.set(move.id, move));
    return Array.from(moveMap.values());
  };

  // Process level-up moves
  const processLevelUpMoves = (
    moves1: LevelUpMove[],
    moves2: LevelUpMove[],
  ): (LevelUpMove & { level: number })[] => {
    const moveMap = new Map<string, LevelUpMove & { level: number }>();

    const process = (moves: LevelUpMove[]) => {
      moves.forEach((move) => {
        const existingMove = moveMap.get(move.id);
        if (
          !existingMove ||
          (move.level !== undefined && move.level < existingMove.level)
        ) {
          moveMap.set(move.id, { ...move, level: move.level! });
        }
      });
    };

    process(moves1);
    process(moves2);

    return Array.from(moveMap.values()).sort((a, b) => a.level - b.level);
  };

  // Combine tutor and egg moves, then deduplicate
  const combineAndDeduplicateMoves = (
    moves1: DetailedMove[],
    moves2: DetailedMove[],
  ): DetailedMove[] => {
    return deduplicateMoves([...moves1, ...moves2]);
  };

  // Calculate level-up moves
  const levelUpMoves = processLevelUpMoves(
    headPokemon.moves,
    bodyPokemon.moves,
  );

  // Calculate tutor moves
  const tutorMoves = combineAndDeduplicateMoves(
    headPokemon.tutor_moves,
    bodyPokemon.tutor_moves,
  );

  // Calculate egg moves
  const eggMoves = combineAndDeduplicateMoves(
    headPokemon.egg_moves,
    bodyPokemon.egg_moves,
  );

  return {
    level_up_moves: levelUpMoves,
    tutor_moves: tutorMoves,
    egg_moves: eggMoves,
  };
};

export const determineHabitat = (
  headHabitat: string,
  bodyHabitat: string,
): Habitat => {
  const head = HABITATS.includes(headHabitat as any) ? headHabitat : "None";
  const body = HABITATS.includes(bodyHabitat as any) ? bodyHabitat : "None";

  if (head === body) return head as Habitat;
  if (head === "None") return body as Habitat;
  if (body === "None") return head as Habitat;

  const rareHabitats = ["Rare", "Sea", "Cave"];
  for (const habitat of rareHabitats) {
    if (head === habitat || body === habitat) return habitat as Habitat;
  }

  return head as Habitat;
};

export const generateFusionName = (headId: string, bodyId: string) => {
  const [prefix, brain] = splitted_names[parseInt(headId)];
  const [rot, suffix] = splitted_names[parseInt(bodyId)];
  return prefix + suffix.toLowerCase();
};

export const baseFusionPokemons = (headId: string, bodyId: string) => {
  return {
    [headId]: splitted_names[parseInt(headId)].join(""),
    [bodyId]: splitted_names[parseInt(bodyId)].join(""),
  };
};

const shinyColorOffsetsDict: { [key: number]: number } = {
  1: -30,
  2: -85,
  3: -50,
  4: 40,
  5: 60,
  6: 130,
  7: 25,
  8: 15,
  9: 50,
  10: -50,
  11: -80,
  12: 95,
  129: 36,
  130: 150,
  332: 140,
  342: 50,
  388: 160,
  389: 136,
};

export function calculateShinyOffset(props: CalculateShinyProps): number {
  const { bodyPokeId, headPokeId, shinyType } = props;
  let offset = 0;

  // Define boolean flags
  const hasShinyHead = shinyType === "both" || shinyType === "head";
  const hasShinyBody = shinyType === "both" || shinyType === "body";

  // Safe lookup for offsets
  const headOffset = shinyColorOffsetsDict.hasOwnProperty(headPokeId)
    ? shinyColorOffsetsDict[headPokeId]
    : null;
  const bodyOffset = shinyColorOffsetsDict.hasOwnProperty(bodyPokeId)
    ? shinyColorOffsetsDict[bodyPokeId]
    : null;

  if (shinyType === "both" && headOffset !== null && bodyOffset !== null) {
    offset = headOffset + bodyOffset;
  } else if (shinyType === "head" && headOffset !== null) {
    offset = headOffset;
  } else if (shinyType === "body" && bodyOffset !== null) {
    offset = bodyOffset;
  } else {
    offset = calculateDefaultShinyOffset(
      headPokeId,
      bodyPokeId,
      hasShinyHead,
      hasShinyBody,
    );
  }

  return Math.round(offset);
}

function calculateDefaultShinyOffset(
  num1: number,
  num2: number,
  hasShinyHead: boolean,
  hasShinyBody: boolean,
): number {
  let dexOffset = num1 + num2 * gameInfo.totalPokemons;
  let dexDiff = Math.abs(num2 - num1);

  if (hasShinyHead && !hasShinyBody) {
    dexOffset = num1;
  } else if (!hasShinyHead && hasShinyBody) {
    dexOffset = dexDiff > 20 ? num2 : num2 + 40;
  }

  let offset = dexOffset + 75;
  if (offset > gameInfo.totalPokemons) offset %= 360;
  if (offset < 40) offset = 40;
  if (Math.abs(360 - offset) < 40) offset = 40;

  return offset;
}
