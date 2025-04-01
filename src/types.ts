export type THaiku = {
  text: string[];
  date: string;
  selected: boolean;
  id: number;
  tags: string[];
  show: boolean;
  description?: string[];
};

export enum ERequestStatus {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
