export interface Database {
  images: ImagesTable;
  image_artists: ImageArtistsTable;
  dex_entry: DexEntryTable;
}

export interface ImagesTable {
  sprite_id: string;
  base_id: string;
  type: string;
  comments: string;
}

export interface ImageArtistsTable {
  sprite_id: string;
  artist_name: string;
}

export interface DexEntryTable {
  id: number;
  sprite_id: string;
  entry: string;
  author: string;
}

export interface ImageResult {
  sprite_id: string;
  artists: string;
  total_sprites: number;
  comments?: string;
}
