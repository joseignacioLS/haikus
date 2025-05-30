import { atom } from "nanostores";
import type { ReactElement } from "react";

export const modalStore = atom<{
  title: ReactElement;
  body: ReactElement;
} | null>(null);
