"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/utils/theme.utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useVirtualizer } from "@tanstack/react-virtual";

interface SelectPokemonProps {
  selectedPokemon: { id: string; name: string } | null;
  onSelect: (id: string, name: string) => void;
  pokemons: { [key: string]: string };
}

export function SelectPokemon({
  selectedPokemon,
  onSelect,
  pokemons,
}: SelectPokemonProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [parentNode, setParentNode] = React.useState<HTMLDivElement | null>(
    null,
  );

  // Simplified filtering logic that updates immediately
  const filteredPokemons = React.useMemo(() => {
    const query = searchQuery.toLowerCase();
    return Object.entries(pokemons).filter(([id, name]) => {
      const searchString = `${id.padStart(3, "0")} ${name}`.toLowerCase();
      return searchString.includes(query);
    });
  }, [searchQuery, pokemons]);

  const virtualizer = useVirtualizer({
    count: filteredPokemons.length,
    getScrollElement: () => parentNode,
    estimateSize: () => 35,
    overscan: 5,
  });

  const refCallback = React.useCallback((node: HTMLDivElement) => {
    setParentNode(node);
  }, []);

  // Reset scroll position when search changes
  React.useEffect(() => {
    if (parentNode) {
      parentNode.scrollTop = 0;
      virtualizer.scrollToIndex(0);
    }
  }, [searchQuery, parentNode, virtualizer]);

  const handleSelectPokemon = (id: string, name: string) => {
    onSelect(id, name);
    setSearchQuery("");
    setOpen(false);
  };

  // Immediate search update
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const formatPokemonDisplay = (id: string, name: string) =>
    `#${id.padStart(3, "0")} ${name}`;

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setSearchQuery("");
        }
        setOpen(isOpen);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between border-r-0 rounded-r-none w-full"
        >
          {selectedPokemon
            ? formatPokemonDisplay(selectedPokemon.id, selectedPokemon.name)
            : "Select Pokémon..."}
          <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search Pokémon..."
            value={searchQuery}
            onValueChange={handleSearchChange}
          />
          <CommandList>
            {filteredPokemons.length === 0 ? (
              <CommandEmpty>No Pokémon found.</CommandEmpty>
            ) : (
              <CommandGroup>
                <div
                  ref={refCallback}
                  style={{ height: `200px`, overflow: "auto" }}
                >
                  <div
                    style={{
                      height: `${virtualizer.getTotalSize()}px`,
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    {virtualizer.getVirtualItems().map((virtualItem) => {
                      const [id, name] = filteredPokemons[virtualItem.index];
                      return (
                        <CommandItem
                          key={id}
                          value={formatPokemonDisplay(id, name)}
                          onSelect={() => handleSelectPokemon(id, name)}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: `${virtualItem.size}px`,
                            transform: `translateY(${virtualItem.start}px)`,
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedPokemon?.id === id
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {formatPokemonDisplay(id, name)}
                        </CommandItem>
                      );
                    })}
                  </div>
                </div>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default SelectPokemon;
