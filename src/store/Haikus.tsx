import { haikus as rawHaikus } from "@/const/haikus";
import { type THaiku } from "@/types";
import { atom } from "nanostores";

export const fallbackHaiku: THaiku = {
  id: -1,
  date: "",
  tags: [],
  text: [],
  description: [],
};
const HIDDEN_COLLECTIONS: string[] = ["Oculto", "Chuck", "5-7-5", "3-5-3"];

const initHaikuData = async () => {
  const $haikus = rawHaikus
    .filter((h) => !h.tags.includes("Oculto"))
    .sort((a, b) => b.id - a.id);

  const $collections = Array.from(
    new Set(
      $haikus.reduce(
        (tags: string[], { tags: newTags }) => [...tags, ...newTags],
        []
      )
    )
  )
    .filter((tag: string) => !HIDDEN_COLLECTIONS.includes(tag))
    .sort();

  collections.set($collections);
  haikus.set($haikus);
};

export const haikus = atom<THaiku[]>([]);
export const collections = atom<THaiku["tags"]>([]);

initHaikuData();
