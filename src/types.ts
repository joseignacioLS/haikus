import type { ESeason } from "./const/seasons";

export type THaiku = {
  text: string[];
  date: string;
  id: number;
  tags: string[];
  description?: string[];
};

export type TSeasonEntry = {
  day: number;
  month: number;
  phenom: "Perihelion" | "Equinox" | "Solstice" | "Aphelion";
  time: string;
  year: number;
}

export type TSeasonResponse = {
  apiversion: string;
  data: TSeasonEntry[];
  tz: number;
  year: number;
};

export type TSeason = {
  name: ESeason,
  color: string,
  initialMonth: number,
  nextSeason: ESeason,
}
