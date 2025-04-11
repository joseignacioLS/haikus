import type { SeasonResponse } from "@/types";

export const getSeasons = async (
  year: number
): Promise<SeasonResponse["data"]> => {
  return fetch(`https://aa.usno.navy.mil/api/seasons?year=${year}`)
    .then((r) => {
      if (!r.ok || r.status !== 200) throw new Error();
      return r.json();
    })
    .then((d: SeasonResponse) =>
      d.data.filter((e) => ["Equinox", "Solstice"].includes(e.phenom))
    )
    .catch((error) => {
      console.log(error);
      return [];
    });
};
