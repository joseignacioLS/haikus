import { atom } from "nanostores";
import { ERequestStatus, type THaiku } from "../types";
import { toastStore } from "./Toast";

export const fallbackHaiku: THaiku = {
  id: -1,
  date: "",
  selected: false,
  show: true,
  tags: [],
  text: [],
  description: [],
};

const retrieveChunk = async (id: number) => {
  return fetch(import.meta.env.PUBLIC_HAIKU_DATA_URL + `/chunk_${id}.json`)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(($haikus: THaiku[]) => {
      haikus.set([...haikus.get(), ...$haikus]);
    })
    .catch(() => {
      toastStore.set(`Ha habido un error cargando algunos haikus`);
    });
};

const initHaikuData = async () => {
  status.set(ERequestStatus.LOADING);

  return fetch(import.meta.env.PUBLIC_HAIKU_DATA_URL + "/director.json")
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(
      (data: {
        totalChunks: number;
        chunkSize: number;
        collections: THaiku["tags"];
      }) => {
        const { totalChunks, collections: $collections } = data;
        collections.set($collections);
        const promises = [];
        for (let i = 0; i < totalChunks; i++) {
          promises.push(retrieveChunk(i));
        }
        Promise.allSettled(promises).then(() => {
          haikus.set(
            haikus
              .get()
              .filter((h) => h.show)
              .sort((a, b) => b.id - a.id)
          );
          status.set(ERequestStatus.SUCCESS);
        });
      }
    )
    .catch(() => {
      status.set(ERequestStatus.ERROR);
    });
};

export const haikus = atom<THaiku[]>([]);
export const collections = atom<THaiku["tags"]>([]);
export const status = atom<ERequestStatus>(ERequestStatus.LOADING);
export const error = atom<any>(null);

initHaikuData();
