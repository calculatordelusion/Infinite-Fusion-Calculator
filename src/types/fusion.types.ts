export interface SelectedPokemon {
  id: string;
  name: string;
}

export interface CalculateShinyProps {
  headPokeId: number;
  bodyPokeId: number;
  shinyType: "head" | "body" | "both";
}
