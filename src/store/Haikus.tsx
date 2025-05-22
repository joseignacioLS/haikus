import { haikus as rawHaikus } from "@/const/haikus";
import { type THaiku } from "@/types";
import {
  cleanHaikuTags,
  getCollections,
  getVisibleHaikus,
  sortHaikusById,
} from "@/utils/haiku";
import { atom } from "nanostores";
import { Temporal } from "temporal-polyfill";

const initHaikuData = async () => {
  const $haikus = sortHaikusById(cleanHaikuTags(getVisibleHaikus(rawHaikus)));
  haikusStore.set($haikus);

  const $collections = getCollections($haikus);
  collectionsStore.set($collections);

  const $date = Temporal.PlainDate.from($haikus[0].date);
  dateStore.set($date);

  selectedStore.set($haikus[0].id);
};

export const haikusStore = atom<THaiku[]>([]);
export const dateStore = atom<Temporal.PlainDate>(Temporal.Now.plainDateISO());
export const selectedStore = atom<THaiku["id"]>(1);
export const collectionsStore = atom<THaiku["tags"]>([]);

initHaikuData();
