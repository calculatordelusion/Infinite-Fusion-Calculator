import React from "react";

import { SelectedPokemon } from "@/types";
import { Shuffle } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { SelectPokemon } from "./SelectPokemon";
import { basePokemonIdName } from "@/data/hardcoded";

interface FusionSelectorProps {
  headPokemon: SelectedPokemon | null;
  bodyPokemon: SelectedPokemon | null;
  handleSelectPokemon: (
    type: "head" | "body",
  ) => (id: string, name: string) => void;
  randomHead: () => void; // Assuming it doesn't take any arguments and returns void
  randomBody: () => void; // Same assumption here
}

export const FusionSelector: React.FC<FusionSelectorProps> = ({
  headPokemon,
  bodyPokemon,
  handleSelectPokemon,
  randomHead,
  randomBody,
}) => {
  return (
    <div className="gap-4 lg:gap-8 grid grid-cols-1 md:grid-cols-2 mx-auto max-w-80 md:max-w-screen-md">
      <div>
        <Label className="ml-2 w-full">Head Pokemon</Label>
        <div className="flex w-full">
          <SelectPokemon
            selectedPokemon={headPokemon}
            onSelect={handleSelectPokemon("head")}
            pokemons={basePokemonIdName}
          />
          <Button
            onClick={randomHead}
            size={"icon"}
            variant={"outline"}
            className="rounded-l-none"
          >
            <Shuffle />
          </Button>
        </div>
      </div>
      <div>
        <Label className="ml-2 w-full">Body Pokemon</Label>
        <div className="flex w-full">
          <SelectPokemon
            selectedPokemon={bodyPokemon}
            onSelect={handleSelectPokemon("body")}
            pokemons={basePokemonIdName}
          />

          <Button
            onClick={randomBody}
            size={"icon"}
            variant={"outline"}
            className="rounded-l-none"
          >
            <Shuffle />
          </Button>
        </div>
      </div>
    </div>
  );
};
