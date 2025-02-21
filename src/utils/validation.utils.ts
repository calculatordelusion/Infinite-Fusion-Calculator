import { z } from "zod";
import { SpriteType, ImageType, SpriteImage } from "../types/species.types";
import { getSpriteType } from "./sprites.utils";
import { generateSpriteUrl } from "@/lib/service/sprite.service";
import { config } from "@/config";

const spriteIdSchema = z.object({
  id: z.string().refine(
    (val) => {
      // Base sprite: just numbers with optional alphabetic suffix
      const basePattern = /^\d+[a-zA-Z]*$/;
      // Fusion sprite: numbers with dot and numbers, optional alphabetic suffix
      const fusionPattern = /^\d+\.\d+[a-zA-Z]*$/;
      // Triple sprite: numbers with two dots and numbers, optional alphabetic suffix
      const triplePattern = /^\d+\.\d+\.\d+[a-zA-Z]*$/;

      return (
        basePattern.test(val) ||
        fusionPattern.test(val) ||
        triplePattern.test(val)
      );
    },
    { message: "Invalid sprite ID format" },
  ),
});

export function validateSpriteId(id: string) {
  // First, validate the basic structure
  const validationResult = spriteIdSchema.safeParse({ id });

  if (!validationResult.success) {
    return {
      success: false as const,
      error: validationResult.error.errors[0].message,
      spriteId: id,
      baseId: null,
    };
  }

  let imageType = /[a-zA-Z]/.test(id) ? ImageType.Alt : ImageType.Main;
  let spriteType = getSpriteType(id) as SpriteType;
  if (!spriteType) {
    return {
      success: false as const,
      error: "Invalid sprite ID format",
      spriteId: id,
      baseId: null,
    };
  }

  // now get base id
  let baseId;
  const match = id.match(/^\d+(\.\d+){0,2}/);
  if (match && match[0]) {
    baseId = match[0];
  } else {
    return {
      success: false as const,
      error: "Invalid sprite ID format",
      spriteId: id,
      baseId: null,
    };
  }

  return {
    success: true as const,
    spriteId: id,
    baseId,
    spriteType,
    imageType,
  };
}

export const parseImage = (image: any, isAutogen = false): SpriteImage => {
  const ArtistArraySchema = z.array(z.string());
  const ImageSchema = z.object({
    base_id: z.string(),
    sprite_id: z.string(),
    comments: z.string().nullable(),
    artists: z
      .string()
      .default(config.placeholders.artistName)
      .transform((val) => (val ? ArtistArraySchema.parse(val.split(",")) : [])),
    total_sprites: z.number().optional().default(0),
  });

  const parsedImage = ImageSchema.parse(image);
  const spriteType = getSpriteType(parsedImage.base_id);

  return {
    ...parsedImage,
    sprite_type: spriteType,
    url: generateSpriteUrl(parsedImage.sprite_id, spriteType),
    artists: parsedImage.artists || [], // Ensure artists is always a string[]
  };
};
