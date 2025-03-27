import { atom } from "nanostores";
import type { ReactElement } from "react";

export const modalStore = atom<ReactElement | null>(null);
