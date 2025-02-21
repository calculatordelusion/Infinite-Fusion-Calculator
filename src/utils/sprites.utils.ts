import { config } from "@/config";
import { SpriteType } from "@/types";
import { validateSpriteId } from "./validation.utils";
import { splitted_names } from "@/data/hardcoded";
import { generateFusionName } from "./fusion.utils";
import { speciesManager } from "./species.utils";

/**
 * Extracts the base ID from a single sprite ID string.
 * This function URL-decodes the input and removes any trailing alphabetical characters, dashes, and spaces.
 *
 * @param {string} id - The sprite ID to process.
 * @returns {string} - The base or main ID without any alternative characters or trailing dashes/spaces.
 */
export const getMainSpriteId = (id: string) => {
  // URL-decode the input ID
  const decodedId = decodeURIComponent(id);

  // Match and capture the first valid numeric pattern (e.g., 13, 13.34, 13.3.4)
  const match = decodedId.match(/^\d+(\.\d+){0,2}/);

  // Safely return the match, or an empty string if no match is found
  return match ? match[0] : ""; // If match is null, return an empty string
};

/**
 * Generates an image URL based on the provided sprite ID.
 * Depending on the type of ID (base, fusion, triple), the appropriate image path is selected.
 *
 * @param {string} spriteId - The sprite ID, which can be a base sprite, fusion, or triple fusion.
 * @param {SpriteType} [spriteType] - The type of sprite (autogen, base, fusion, triple). Optional.
 * @returns {string} - The complete URL to the sprite image.
 */
export const getSpriteImageURL = (
  spriteId: string,
  spriteType: SpriteType,
): string => {
  const cdn = config.cdn.images;
  if (spriteType === SpriteType.Base) {
    return `${cdn.base}/${spriteId}.png`;
  } else if (spriteType === SpriteType.Autogen) {
    const [headId, _] = spriteId.split(".");
    return `${cdn.autogen}/${headId}/${spriteId}.png`;
  } else if (spriteType === SpriteType.Fusion) {
    return `${cdn.fusion}/${spriteId}.png`;
  } else if (spriteType === SpriteType.Triple) {
    return `${cdn.triple}/${spriteId}.png`;
  } else {
    throw new Error("Invalid Sprite Type :", spriteType);
  }
};

export const getBasePokemonsByIds = (ids: string[]) => {
  const basePokemons: { [key: string]: string } = {};
  ids.forEach(
    (id) => (basePokemons[id] = splitted_names[parseInt(id)].join("")),
  );
  return basePokemons;
};

export const getSpriteType = (id: string): SpriteType => {
  const ids = id.split(".");
  let spriteType: SpriteType | null;

  switch (ids.length) {
    case 1:
      spriteType = SpriteType.Base;
      break;
    case 2:
      if (parseInt(ids[0]) > 501 || parseInt(ids[1]) > 501) {
        spriteType = null;
        throw new Error(`Invalid sprite ID`);
      } else {
        spriteType = SpriteType.Fusion;
      }
      break;
    case 3:
      spriteType = SpriteType.Triple;
      break;
    default:
      throw new Error("Invalid sprite ID format");
  }

  return spriteType as SpriteType;
};

const getSpriteNameById = (id: string) => {
  const validateId = validateSpriteId(id);
  if (!validateId.success) {
    throw new Error(validateId.error);
  }
  const { spriteId, baseId, spriteType, imageType } = validateId;

  let name: string = "";

  switch (spriteType) {
    case "base":
      name = splitted_names[parseInt(baseId)].join("");
      break;
    case "fusion":
      const [headId, bodyId] = baseId.split(".");
      name = generateFusionName(headId, bodyId);
      break;
    case "triple":
      const specie = speciesManager.getSpeciesById(baseId);
      name = specie.name;
      break;
    default:
      throw new Error("Invalid sprite type");
  }

  return name;
};
