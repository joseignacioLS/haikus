import { haikus as rawHaikus } from "@/const/haikus";
import { type THaiku } from "@/types";
import {
  getCollections,
  getVisibleHaikus,
  sortHaikusById,
} from "@/utils/haiku";
import { atom } from "nanostores";
import { Temporal } from "temporal-polyfill";

const initHaikuData = async () => {
  const $haikus = sortHaikusById(getVisibleHaikus(rawHaikus));
  haikusStore.set($haikus);

  const $collections = getCollections($haikus);
  collectionsStore.set($collections);

  const $date = Temporal.PlainDate.from($haikus[0].date);
  dateStore.set($date);
};

export const haikusStore = atom<THaiku[]>([]);
export const dateStore = atom<Temporal.PlainDate>(Temporal.Now.plainDateISO());
export const collectionsStore = atom<THaiku["tags"]>([]);

initHaikuData();
