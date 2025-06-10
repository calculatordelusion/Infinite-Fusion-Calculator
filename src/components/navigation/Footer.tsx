import { Separator } from "@/components/ui/separator";
import { config } from "@/config";

export default function Footer() {
  return (
    <footer className="bg-card mt-8 px-4 md:px-6 py-12 border-t-2">
      <div className="mx-auto max-w-6xl container">
        <Separator className="mb-8" />

        <div className="space-y-4 text-muted-foreground text-sm">
          <p>
            {config.site.name} is a fan-made website and is not affiliated with,
            endorsed, sponsored, or specifically approved by Nintendo, Game
            Freak, or The Pokémon Company. All Pokémon images, names, and
            related media are intellectual property of their respective owners.
          </p>
          <p>
            Pokémon Infinite Fusion is a fan-made game. This website serves as a
            resource for the game&apos;s community and artists.
          </p>
          <div className="flex sm:flex-row flex-col justify-between items-center gap-4">
            <p className="text-xs">
              © {new Date().getFullYear()} {config.site.name}. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}