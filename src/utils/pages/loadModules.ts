import { config } from "@/config";
import { PokemonCardData } from "@/types/sprite.types";

interface Module {
  [key: string]: string;
}

interface ModuleArg {
  moduleName:
    | "home"
    | "types"
    | "abilities"
    | "moves"
    | "self-fusions"
    | "triple-fusions"
    | "base-pokemons";
}

const baseURL = config.api.baseURL;
const routes: Module = {
  home: `${baseURL}/module/home`,
  types: `${baseURL}/module/types`,
  abilities: `${baseURL}/module/abilities`,
  moves: `${baseURL}/module/moves`,
  "self-fusions": `${baseURL}/module/self-fusions`,
  "triple-fusions": `${baseURL}/module/triple-fusions`,
  "base-pokemons": `${baseURL}/module/base-pokemons`,
};

const loadModules = async (moduleName: ModuleArg["moduleName"]) => {
  const reqURL = routes[moduleName];

  if (!reqURL) {
    throw new Error(`Module ${moduleName} not found`);
  }

  try {
    const res = await fetch(reqURL);

    if (!res.ok) {
      throw new Error(`Failed to load data for module ${moduleName}`);
    }

    const data: PokemonCardData[] = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data for ${moduleName}:`, error);
    throw error;
  }
};

export default loadModules;
