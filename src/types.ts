export type THaiku = {
  text: string[];
  date: string;
  id: number;
  tags: string[];
  description?: string[];
};

export type SeasonEntry = {
  day: number;
  month: number;
  phenom: "Perihelion" | "Equinox" | "Solstice" | "Aphelion";
  time: string;
  year: number;
}

export type SeasonResponse = {
  apiversion: string;
  data: SeasonEntry[];
  tz: number;
  year: number;
};
