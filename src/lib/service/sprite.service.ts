import { SpriteImage, SpriteType } from "@/types";
import { config } from "@/config";

// Utility function to generate sprite image URLs
export const generateSpriteUrl = (
  spriteId: string,
  spriteType: SpriteType,
): string => {
  switch (spriteType) {
    case SpriteType.Base:
      return `${config.cdn.images.base}/${spriteId}.png`;
    case SpriteType.Fusion:
      return `${config.cdn.images.fusion}/${spriteId}.png`;
    case SpriteType.Autogen:
      return `${config.cdn.images.autogen}/${
        spriteId.split(".")[0]
      }/${spriteId}.png`;
    case SpriteType.Triple:
      return `${config.cdn.images.triple}/${spriteId}.png`;
    default:
      throw new Error("Invalid spriteType provided");
  }
};

// Function to generate an autogen image object
export const generateAutogenImage = (id: string): SpriteImage => {
  const url = generateSpriteUrl(id, SpriteType.Autogen);
  return {
    base_id: id,
    sprite_id: id,
    comments: "",
    sprite_type: SpriteType.Autogen,
    url,
    artists: ["autogen"],
    total_sprites: 0,
  };
};
