import { Card } from "@/components/ui/card";
import { PokedexEntryType } from "@/types";

export function PokedexEntry({
  pokedex_entry,
}: {
  pokedex_entry: string | PokedexEntryType[];
}) {
  // If it's a regular string entry
  if (typeof pokedex_entry === "string") {
    return (
      <div className="mb-6 text-foreground text-base leading-relaxed">
        {pokedex_entry}
      </div>
    );
  }

  // If it's an array of custom entries
  return (
    <div className="gap-2 grid grid-cols-1 mb-6">
      {pokedex_entry.map((entry, index) => {
        return (
          <Card key={index} className={`bg-muted/50 p-4`}>
            <p className="text-primary text-base leading-relaxed">
              {entry.entry}
            </p>
            <div className="mt-2">
              <p className="text-muted-foreground hover:text-primary text-xs transition-colors">
                by {entry.author}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
