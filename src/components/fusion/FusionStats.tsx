import React from "react";
import { Progress } from "@/components/ui/progress";
import { maxStats } from "@/config";

// Define the type for Pokémon stats
interface PokemonStats {
  HP: number;
  Attack: number;
  Defense: number;
  "Sp. Atk": number;
  "Sp. Def": number;
  Speed: number;
  Total: number;
}

// Helper function to determine the color based on stat difference
const getDiffColor = (diff: number) => {
  if (diff === 0) return "text-blue-500"; // Blue for no difference
  if (diff > 0) return "text-green-500"; // Green for positive difference
  return "text-red-500"; // Red for negative difference
};

// Create the FusionStats component
const FusionStats = ({
  stats,
  comparisonStats,
}: {
  stats: PokemonStats;
  comparisonStats: PokemonStats;
}) => {
  // Calculate the stat progress for the Pokémon stats
  const statProgress = {
    HP: (stats.HP / maxStats.MaxHP) * 100,
    Attack: (stats.Attack / maxStats.MaxAttack) * 100,
    Defense: (stats.Defense / maxStats.MaxDefense) * 100,
    "Sp. Atk": (stats["Sp. Atk"] / maxStats.MaxSpAtk) * 100,
    "Sp. Def": (stats["Sp. Def"] / maxStats.MaxSpDef) * 100,
    Speed: (stats.Speed / maxStats.MaxSpeed) * 100,
    Total: (stats.Total / maxStats.MaxTotal) * 100,
  };

  // Calculate stat differences
  const statDifferences = {
    HP: stats.HP - comparisonStats.HP,
    Attack: stats.Attack - comparisonStats.Attack,
    Defense: stats.Defense - comparisonStats.Defense,
    "Sp. Atk": stats["Sp. Atk"] - comparisonStats["Sp. Atk"],
    "Sp. Def": stats["Sp. Def"] - comparisonStats["Sp. Def"],
    Speed: stats.Speed - comparisonStats.Speed,
    Total: stats.Total - comparisonStats.Total,
  };

  return (
    <div className="md:space-y-2 grid">
      {(Object.keys(stats) as (keyof PokemonStats)[]).map((statKey) => (
        <div
          key={statKey}
          className={`w-full px-2 md:px-0 ${statKey === "Total" ? "col-span-full" : ""}`}
        >
          <div className="md:flex justify-between items-center grid grid-cols-2 mb-1 text-sm">
            <span className="min-w-fit">
              {statKey}
              <span className="md:hidden">&nbsp;:&nbsp;</span>
            </span>
            <span className={getDiffColor(statDifferences[statKey])}>
              {stats[statKey]}{" "}
              <span>
                ({statDifferences[statKey] > 0 ? "+" : ""}
                {statDifferences[statKey]})
              </span>
            </span>
          </div>
          <Progress
            value={statProgress[statKey]} // Access statProgress safely
            className="md:block hidden bg-gray-200 dark:bg-slate-800 rounded w-full h-2"
          />
        </div>
      ))}
    </div>
  );
};

export { FusionStats };
