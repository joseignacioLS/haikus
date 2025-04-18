import haikusContent from "@/const/haikus.json";
import { ERequestStatus, type THaiku } from "@/types";
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
  status.set(ERequestStatus.LOADING);
  const $haikus: THaiku[] = haikusContent
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
  status.set(ERequestStatus.SUCCESS);
};

export const haikus = atom<THaiku[]>([]);
export const collections = atom<THaiku["tags"]>([]);
export const status = atom<ERequestStatus>(ERequestStatus.LOADING);

initHaikuData();
