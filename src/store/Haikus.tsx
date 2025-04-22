import { haikus as rawHaikus } from "@/const/haikus";
import { type THaiku } from "@/types";
import {
  getCollections,
  getVisibleHaikus,
  sortHaikusById,
} from "@/utils/haiku";
import { atom } from "nanostores";

const initHaikuData = async () => {
  const $haikus = sortHaikusById(getVisibleHaikus(rawHaikus));
  haikus.set($haikus);

  const $collections = getCollections($haikus);
  collections.set($collections);
};

export const haikus = atom<THaiku[]>([]);
export const collections = atom<THaiku["tags"]>([]);

initHaikuData();
