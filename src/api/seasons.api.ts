import type { SeasonEntry, SeasonResponse } from "@/types";
import { Temporal } from "temporal-polyfill";
import { getRequest } from "./api";

const checkCache = (): Promise<SeasonEntry[]> => {
  return new Promise((resolve, reject) => {
    const cache = localStorage.getItem("haiku-seasons-cache");
    if (cache === null) {
      reject()
      return
    }
    try {
      const { date, data }: { date: string, data: SeasonEntry[] } = JSON.parse(cache)
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

export const getSeasonsEvents = async (year: number): Promise<SeasonEntry[]> => {
  return checkCache()
    .then(data => data)
    .catch(async () => {
      const newSeasonData = (await Promise.all([
        getRequest<SeasonResponse>(`https://aa.usno.navy.mil/api/seasons?year=${year - 1}`),
        getRequest<SeasonResponse>(`https://aa.usno.navy.mil/api/seasons?year=${year}`),
        getRequest<SeasonResponse>(`https://aa.usno.navy.mil/api/seasons?year=${year + 1}`),
      ]))
        .map((d) => {
          if (!d) return []
          return d.data.filter((e) => ["Equinox", "Solstice"].includes(e.phenom))
        })
        .flat();
      localStorage.setItem("haiku-seasons-cache", JSON.stringify({
        date: Temporal.Now.plainDateISO().toString(),
        data: newSeasonData
      }))
      return newSeasonData
    })
}
