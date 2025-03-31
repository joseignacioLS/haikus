import { atom } from "nanostores";
import type { THaiku } from "../types";

export const fallbackHaiku: THaiku = {
  id: -1,
  date: "",
  selected: false,
  show: true,
  tags: [],
  text: [],
  description: [],
};

export enum ERequestStatus {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

const initHaikuData = async () => {
  status.set(ERequestStatus.LOADING);

  return fetch(import.meta.env.PUBLIC_HAIKU_DATA_URL)
    .then((r) => {
      if (!r.ok || r.status !== 200) {
        throw "Ha habido un error recuperando los haikus";
      }
      return r.json();
    })
    .then((retrievedData: THaiku[]) => {
      haikus.set(retrievedData.filter((h) => h.show));
      status.set(ERequestStatus.SUCCESS);
      error.set(null);
    })
    .catch((err) => {
      haikus.set([]);
      status.set(ERequestStatus.ERROR);
      error.set(err);
    });
};

export const haikus = atom<THaiku[]>([]);
export const status = atom<ERequestStatus>(ERequestStatus.LOADING);
export const error = atom<any>(null);

initHaikuData();
