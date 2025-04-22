import { ESeason, type Season } from "@/types";


export const SEASONS: Season[] = [
  {
    name: ESeason.VERANO,
    color: "#ffc3cd",
    initialMonth: 6,
    nextSeason: ESeason.OTOÑO,
  },
  {
    name: ESeason.OTOÑO,
    color: "#e84d2e",
    initialMonth: 9,
    nextSeason: ESeason.INVIERNO,
  },
  {
    name: ESeason.INVIERNO,
    color: "#134665",
    initialMonth: 12,
    nextSeason: ESeason.PRIMAVERA,
  },
  {
    name: ESeason.PRIMAVERA,
    color: "#fede87",
    initialMonth: 3,
    nextSeason: ESeason.VERANO,
  },
];