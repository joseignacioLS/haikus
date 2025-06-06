import { type TSeason } from "@/types";

export enum ESeason {
  OTOÑO = "Otoño",
  INVIERNO = "Invierno",
  PRIMAVERA = "Primavera",
  VERANO = "Verano",
}

export const SEASONS: TSeason[] = [
  {
    name: ESeason.VERANO,
    color: "#ff99aa",
    initialMonth: 6,
    nextSeason: ESeason.OTOÑO,
  },
  {
    name: ESeason.OTOÑO,
    color: "#E95335",
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
