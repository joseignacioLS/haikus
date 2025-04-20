import type { SeasonResponse } from "@/types";
import { Temporal } from "temporal-polyfill";

const checkCache = (): Promise<SeasonResponse["data"]> => {
  return new Promise((resolve, reject) => {
    const cache = localStorage.getItem("haiku-seasons-cache");
    if (cache === null) {
      reject()
      return
    }
    try {
      const { date, data }: { date: string, data: SeasonResponse["data"] } = JSON.parse(cache)
      const today = Temporal.Now.plainDateISO()
      if (today.since(Temporal.PlainDate.from(date)).days >= Number(import.meta.env.PUBLIC_SEASONS_API_CACHE ?? "0")) {
        reject()
        return
      }
      resolve(data)
    }
    catch (err) {
      reject()
    }
  })
}

export const getSeasonsEvents = async (year: number) => {
  return checkCache()
    .then(data => data)
    .catch(async () => {
      const newSeasonData = (await Promise.all([getSeasons(year - 1), getSeasons(year), getSeasons(year + 1)])
      ).flat();
      localStorage.setItem("haiku-seasons-cache", JSON.stringify({
        date: Temporal.Now.plainDateISO().toString(),
        data: newSeasonData
      }))
      return newSeasonData
    })
}

export const getSeasons = async (
  year: number
): Promise<SeasonResponse["data"]> => {
  return fetch(`https://aa.usno.navy.mil/api/seasons?year=${year}`)
    .then((r) => {
      if (!r.ok || r.status !== 200) throw new Error();
      return r.json();
    })
    .then((d: SeasonResponse) => {
      const data = d.data.filter((e) => ["Equinox", "Solstice"].includes(e.phenom))
      return data
    })
    .catch(() => {
      return [];
    });
};
