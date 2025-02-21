type LoadAllFusionsResponse = {
  data: Array<{
    id: string;
    name: string;
    primary_type: string;
    secondary_type: string;
    base_pokemons: {
      [key: string]: string;
    };
    total_sprites: number;
    images: Array<{
      sprite_id: string;
      sprite_type: string;
      artists: Array<string>;
    }>;
  }>;
};

export type { LoadAllFusionsResponse };
