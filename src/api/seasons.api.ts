import type { TSeasonEntry, TSeasonResponse } from "@/types";
import { Temporal } from "temporal-polyfill";
import { getRequest } from "./api";

const API_URL = "https://aa.usno.navy.mil/api/seasons";

const checkCache = (): Promise<TSeasonEntry[]> => {
  return new Promise((resolve, reject) => {
    try {
      const cache = localStorage.getItem("haiku-seasons-cache");
      if (cache === null) {
        throw new Error("Season cache not found");
      }
      const { date, data }: { date: string; data: TSeasonEntry[] } =
        JSON.parse(cache);
      const today = Temporal.Now.plainDateISO();
      if (
        today.since(Temporal.PlainDate.from(date)).days >=
        Number(import.meta.env.PUBLIC_SEASONS_API_CACHE ?? "0")
      ) {
        console.warn("Cache still valid");
        reject();
        return;
      }
      resolve(data);
    } catch (err) {
      console.error(err);
      reject();
    }
  });
};

export const getSeasonsEvents = async (
  year: number
): Promise<TSeasonEntry[]> => {
  return checkCache()
    .then((data) => data)
    .catch(async () => {
      const newSeasonData = (
        await Promise.all(
          [-1, 0, 1].map((deltaYear: number) => {
            return getRequest<TSeasonResponse>(
              `${API_URL}?year=${year + deltaYear}`
            );
          })
        )
      )
        .map((d) => {
          if (!d) return [];
          return d.data.filter((e) =>
            ["Equinox", "Solstice"].includes(e.phenom)
          );
        })
        .flat();
      localStorage.setItem(
        "haiku-seasons-cache",
        JSON.stringify({
          date: Temporal.Now.plainDateISO().toString(),
          data: newSeasonData,
        })
      );
      return newSeasonData;
    });
};
