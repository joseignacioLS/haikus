import { atom } from "nanostores";
import type { THaiku } from "../types";

export enum ERequestStatus {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

const getHaikuData = async () => {
  status.set(ERequestStatus.LOADING);
  
  return fetch(import.meta.env.PUBLIC_HAIKU_DATA_URL)
    .then((r) => {
      if (!r.ok || r.status !== 200) {
        throw "Ha habido un error recuperando los haikus";
      }
      return r.json();
    })
    .then((retrievedData) => {
      data.set(retrievedData);
      status.set(ERequestStatus.SUCCESS);
      error.set(null);
    })
    .catch((err) => {
      data.set([]);
      status.set(ERequestStatus.ERROR);
      error.set(err);
    });
};

export const data = atom<THaiku[]>([]);
export const status = atom<ERequestStatus>(ERequestStatus.LOADING);
export const error = atom<any>(null);

getHaikuData();
