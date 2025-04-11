export type THaiku = {
  text: string[];
  date: string;
  selected: boolean;
  id: number;
  tags: string[];
  description?: string[];
};

export enum ERequestStatus {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export type SeasonResponse = {
  apiversion: string;
  data: {
    day: number;
    month: number;
    phenom: "Perihelion" | "Equinox" | "Solstice" | "Aphelion";
    time: string;
    year: number;
  }[];
  tz: number;
  year: number;
};
