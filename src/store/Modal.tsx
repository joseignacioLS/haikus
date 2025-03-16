import { atom } from "nanostores";

export const modalStore = atom({
  isOpen: false,
  content: <></>,
});
