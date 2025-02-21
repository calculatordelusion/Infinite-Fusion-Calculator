import { config } from "@/config";
import {
  ArtistAPIResponse,
  DexAuthorAPIResponse,
  ModulesAPIResponse,
  SpriteApiResponse,
} from "@/types/sprite.types";

class dataLoader {
  static async loadSprite(spriteId: string): Promise<SpriteApiResponse> {
    const req = await fetch(
      `${config.api.baseURL}/${config.api.endpoints.sprites}/${spriteId}`,
      {
        cache: "force-cache",
        next: {
          revalidate: 604800, // 7 Days
        },
      },
    );
    const data: SpriteApiResponse = await req.json();
    return data;
  }

  static async loadArtists(loadArtistsProps: {
    artistName: string;
    limit: number;
    offset: number;
  }): Promise<ArtistAPIResponse | null> {
    const res = await fetch(
      `${config.api.baseURL}/${config.api.endpoints.artists}?name=${loadArtistsProps.artistName}&limit=${loadArtistsProps.limit}&offset=${loadArtistsProps.offset}`,
      {
        cache: "force-cache",
        next: {
          revalidate: 604800, // 7 Days
        },
      },
    );
    const data: ArtistAPIResponse = await res.json();

    if (!data.success) {
      return null;
    } else {
      return data;
    }
  }

  static async dexLoader(name: string): Promise<DexAuthorAPIResponse | null> {
    const res = await fetch(
      `${config.api.baseURL}/${config.api.endpoints.dex_author}/${name}`,
      {
        cache: "force-cache",
        next: {
          revalidate: 604800, // 7 Days
        },
      },
    );
    const data: DexAuthorAPIResponse = await res.json();

    if (!data.success) {
      return null;
    } else {
      return data;
    }
  }

  static async ModuleLoader(module: "home" | "self-fusions" | "triples") {
    if (!module) throw new Error("Module not found");
    const url = `${config.api.baseURL}/${config.api.endpoints.modules}/${module}`;
    const res = await fetch(url, {
      cache: "force-cache",
      next: {
        revalidate: 604800, // 7 Days
      },
    });
    const data: ModulesAPIResponse = await res.json();
    return data.data;
  }
}

export default dataLoader;
