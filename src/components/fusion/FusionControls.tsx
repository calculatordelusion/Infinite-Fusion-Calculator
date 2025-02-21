import React from "react";
import { Button } from "@/components/ui/button";
import { SelectedPokemon } from "@/types";
import { RotateCw, Shuffle, Zap } from "lucide-react";
import { cn } from "@/utils/theme.utils";

interface FusionControlsProps {
  loading: boolean;
  headPokemon: SelectedPokemon | null;
  bodyPokemon: SelectedPokemon | null;
  fusedHeadPokemon: SelectedPokemon | null;
  fusedBodyPokemon: SelectedPokemon | null;
  fusionStatus: "idle" | "loading" | "success" | "error";
  onFuse: () => void;
  onRandom: () => void;
  onReset: () => void;
}

export const FusionControls: React.FC<FusionControlsProps> = ({
  loading,
  headPokemon,
  bodyPokemon,
  fusedHeadPokemon,
  fusedBodyPokemon,
  fusionStatus,
  onFuse,
  onRandom,
  onReset,
}) => {
  const areSamePokemon =
    fusionStatus === "success" &&
    fusedHeadPokemon?.id === headPokemon?.id &&
    fusedBodyPokemon?.id === bodyPokemon?.id;
  const isFuseDisabled =
    loading || !headPokemon || !bodyPokemon || areSamePokemon;

  const getFuseButtonText = () => {
    if (loading) return "Loading...";
    if (areSamePokemon) return "Fused";
    return "Fuse";
  };

  const getFuseButtonStyle = () => {
    if (isFuseDisabled) {
      return "bg-muted text-muted-foreground cursor-not-allowed disabled:opacity-100";
    } else if (areSamePokemon) {
      return "bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white";
    } else {
      return "bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 dark:from-violet-600 dark:to-indigo-600 dark:hover:from-violet-700 dark:hover:to-indigo-700 text-white";
    }
  };

  return (
    <div className="flex-wrap gap-2 md:gap-4 grid grid-cols-1 md:grid-cols-3 mx-auto max-w-xs md:max-w-sm lg:max-w-lg">
      <div className="gap-2 md:gap-4 grid grid-cols-2 md:col-span-2">
        <Button
          disabled={loading}
          variant="outline"
          onClick={onReset}
          className="flex justify-center items-center gap-2 bg-background hover:bg-muted/80 hover:bg-red-100 dark:hover:bg-red-900/50 border dark:border border-border w-full font-medium text-foreground hover:text-accent-foreground transition-colors duration-300"
        >
          <RotateCw className="w-4 h-4" />
          {loading ? "Loading..." : "Reset"}
        </Button>

        <Button
          variant="outline"
          disabled={loading}
          onClick={onRandom}
          className="flex justify-center items-center gap-2 bg-background hover:bg-muted/80 hover:bg-green-100 dark:hover:bg-green-900/50 border dark:border border-border w-full font-medium text-foreground hover:text-accent-foreground transition-colors duration-300"
        >
          <Shuffle className="w-4 h-4" />
          {loading ? "Loading..." : "Random"}
        </Button>
      </div>

      <Button
        disabled={isFuseDisabled}
        onClick={onFuse}
        className={cn(
          `transition-all duration-200 font-medium flex items-center justify-center gap-2 ${getFuseButtonStyle()}`,
        )}
      >
        <Zap className="w-4 h-4" />
        {getFuseButtonText()}
      </Button>
    </div>
  );
};
