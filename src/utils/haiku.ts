import { HIDDEN_COLLECTIONS, HIDDEN_HAIKU_TAG } from "@/const/variables";
import type { THaiku } from "@/types";

export const getVisibleHaikus = (haikus: THaiku[]): THaiku[] => {
  return haikus.filter((h) => !h.tags.includes(HIDDEN_HAIKU_TAG));
};

export const sortHaikusById = (haikus: THaiku[]): THaiku[] => {
  return haikus.sort((a, b) => b.id - a.id);
};

export const getCollections = (haikus: THaiku[]): string[] => {
  return Array.from(
    new Set(
      haikus.reduce(
        (tags: string[], { tags: newTags }) => [...tags, ...newTags],
        []
      )
    )
  ).sort();
};

export const cleanHaikuTags = (haikus: THaiku[]): THaiku[] => {
  return haikus.map((haiku) => {
    return {
      ...haiku,
      tags: haiku.tags.filter((t) => !HIDDEN_COLLECTIONS.includes(t)),
    };
  });
};
