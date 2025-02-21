import React from "react";
import { InfoToolTip } from "@/components/common/InfoToolTip";
import { PokemonAbility } from "@/types";

// Define the type for the abilities prop
type FusionAbilitiesProps = {
  abilities: PokemonAbility[];
  hidden_abilities: PokemonAbility[];
};

function FusionAbilities({
  abilities,
  hidden_abilities,
}: FusionAbilitiesProps) {
  return (
    <div className="gap-4 grid md:grid-cols-2 px-2 text-base">
      {/* Render normal abilities */}
      <div>
        <h3 className="font-semibold text-muted-foreground">
          Normal Abilities
        </h3>
        <div className="gap-1 grid text-sm md:text-base">
          {abilities.length > 0 ? (
            abilities.map((abl) => (
              <InfoToolTip
                key={abl.id} // Use unique ability ID instead of index
                name={abl.real_name || "Unknown Ability"}
                content={abl.real_description || "No description available"}
              />
            ))
          ) : (
            <p>No normal abilities available.</p>
          )}
        </div>
      </div>

      {/* Render hidden abilities */}
      <div>
        <h3 className="font-semibold text-muted-foreground">
          Hidden Abilities
        </h3>
        <div className="gap-1 grid text-sm md:text-base">
          {hidden_abilities.length > 0 ? (
            hidden_abilities.map((abl) => (
              <InfoToolTip
                key={abl.id} // Use unique ability ID instead of index
                name={abl.real_name || "Unknown Ability"}
                content={abl.real_description || "No description available"}
              />
            ))
          ) : (
            <p>No hidden abilities available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export { FusionAbilities };
