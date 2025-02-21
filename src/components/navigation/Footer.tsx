import { Separator } from "@/components/ui/separator";
import {
  Github
} from "lucide-react";
import { config } from "@/config";


const socialLinks = [
{name: "Github", href: config.site.socialLinks.githubRepo, icon: Github}
]

export default function Footer() {
  return (
    <footer className="bg-card mt-8 px-4 md:px-6 py-12 border-t-2">
      <div className="mx-auto max-w-6xl container">
        
        <Separator className="mb-8" />

        {/* Footer Disclaimer and Social Links */}
        <div className="space-y-4 text-muted-foreground text-sm">
          <p className="">
            {config.site.name} is a fan-made website and is not affiliated with,
            endorsed, sponsored, or specifically approved by Nintendo, Game
            Freak, or The Pokémon Company. All Pokémon images, names, and
            related media are intellectual property of their respective owners.
          </p>
          <p className="">
            Pokémon Infinite Fusion is a fan-made game. This website serves as a
            resource for the game&apos;s community and artists.
          </p>
          <div className="flex sm:flex-row flex-col justify-between items-center gap-4">
            <p className="text-xs">
              © {new Date().getFullYear()} {config.site.name}. All rights
              reserved.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <link.icon className="w-5 h-5" />
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
