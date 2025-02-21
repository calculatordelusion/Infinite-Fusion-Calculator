import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FusionImage } from "./FusionImage";
import { FusionStats } from "./FusionStats";
import { FusionAbilities } from "./FusionAbilities";
import { FusionWeaknesses } from "./FusionWeaknesses";
import { Skeleton } from "../ui/skeleton";
import { Pokemon } from "@/types";
import { MovesTable } from "@/components/fusion/MovesTable";

const generateStats = (pokemon: Pokemon) => ({
  HP: pokemon.stats.base_hp,
  Attack: pokemon.stats.base_atk,
  Defense: pokemon.stats.base_def,
  "Sp. Atk": pokemon.stats.base_sp_atk,
  "Sp. Def": pokemon.stats.base_sp_def,
  Speed: pokemon.stats.base_spd,
  Total:
    pokemon.stats.base_hp +
    pokemon.stats.base_atk +
    pokemon.stats.base_def +
    pokemon.stats.base_sp_atk +
    pokemon.stats.base_sp_def +
    pokemon.stats.base_spd,
});

interface FusionResultProps {
  fusionStatus: "idle" | "loading" | "success" | "error";
  headData: Pokemon | null;
  bodyData: Pokemon | null;
}

export function FusionResult({
  fusionStatus,
  headData,
  bodyData,
}: FusionResultProps) {
  if (fusionStatus === "loading") {
    return <FusionLoading />;
  }

  if (fusionStatus === "error") {
    return (
      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load fusion data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (fusionStatus === "idle") {
    return (
      <div className="p-4 text-center">
        <p>Select Pokémon to fuse or click random fusion!</p>
      </div>
    );
  }

  if (fusionStatus === "success" && headData && bodyData) {
    return (
      <article>
        <section className="space-y-6 mx-auto sm:p-4 max-w-4xl">
          <div className="gap-1 sm:gap-4 grid grid-cols-2">
            <FusionImage
              pokemon={headData}
              fusionIds={{
                headId: headData.id.split(".")[0],
                bodyId: headData.id.split(".")[1],
              }}
            />
            <FusionImage
              pokemon={bodyData}
              fusionIds={{
                headId: bodyData.id.split(".")[0],
                bodyId: bodyData.id.split(".")[1],
              }}
            />
          </div>
          <div className="justify-between gap-2 md:gap-8 grid grid-cols-2 md:px-4">
            <FusionStats
              stats={generateStats(headData)}
              comparisonStats={generateStats(bodyData)}
            />
            <FusionStats
              stats={generateStats(bodyData)}
              comparisonStats={generateStats(headData)}
            />
          </div>
          <div className="gap-2 md:gap-8 grid grid-cols-2 md:px-4">
            <FusionAbilities
              abilities={headData.abilities}
              hidden_abilities={headData.hidden_abilities}
            />
            <FusionAbilities
              abilities={bodyData.abilities}
              hidden_abilities={bodyData.hidden_abilities}
            />
          </div>
        </section>
        <section className="space-y-6 mx-auto mt-4 sm:p-4 sm:pt-0 max-w-screen-lg">
          <div>
            <FusionWeaknesses
              types={{
                headTypes: headData.types,
                bodyTypes: bodyData.types,
              }}
            />
          </div>
          <div>
            <MovesTable
              levelUpMoves={headData.moves}
              eggMoves={headData.egg_moves}
              tutorMoves={headData.tutor_moves}
            />
          </div>
        </section>
      </article>
    );
  }

  return null;
}

function FusionLoading() {
  return (
    <article className="space-y-6 mx-auto sm:p-4 max-w-4xl">
      <div className="gap-4 sm:gap-8 grid grid-cols-2">
        {[0, 1].map((index) => (
          <Card key={index} className="mx-auto p-1 md:p-4 w-full max-w-xs">
            <CardContent className="p-0">
              <Skeleton className="mb-3 md:h-64 min-h-40" />
              {[0, 1].map((statIndex) => (
                <div key={statIndex} className="flex items-center mb-2">
                  <Skeleton className="mr-2 w-20 h-4" />
                  <Skeleton className="flex-grow h-4" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="gap-4 md:gap-8 grid grid-cols-2">
        {[0, 1].map((index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <Skeleton className="mb-3 w-1/2 h-5" />
              {[0, 1, 2, 3, 4, 5].map((statIndex) => (
                <div key={statIndex} className="flex items-center mb-2">
                  <Skeleton className="mr-2 w-20 h-4" />
                  <Skeleton className="flex-grow h-4" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="gap-4 md:gap-8 grid grid-cols-2">
        {[0, 1].map((index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <Skeleton className="mb-3 w-1/3 h-5" />
              <Skeleton className="mb-2 w-2/3 h-4" />
              <Skeleton className="w-1/2 h-4" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-4">
          <Skeleton className="mb-3 w-1/4 h-5" />
          <div className="flex flex-col gap-2">
            {[0, 1, 2, 3, 4].map((index) => (
              <Skeleton key={index} className="mb-2 h-10" />
            ))}
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
