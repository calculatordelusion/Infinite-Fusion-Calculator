import { DexEntryTable } from "@/types";
import { generateFusionName } from "@/utils";

export const processEntries = (entries: DexEntryTable[]) => {
  entries.forEach((entry, index) => {
    const [headId, bodyId] = entry.sprite_id.split(".");
    if (!headId || !bodyId) {
      console.warn(`Invalid sprite_id format: ${entry.sprite_id}`);
      return;
    }

    const regex = /POKENAME/g;
    entries[index].entry = entry.entry.replace(
      regex,
      generateFusionName(headId, bodyId),
    );
  });
  return entries;
};
