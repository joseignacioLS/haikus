import { type THaiku } from "@/types";
import { useHaikuStore } from "@hooks/useHaikuStore";
import { fallbackHaiku } from "@store/Haikus";
import { navigate } from "astro:transitions/client";
import { useEffect } from "react";

export const useHaikuGuard = (id: THaiku["id"]) => {
  const { haikus } = useHaikuStore();
  useEffect(() => {
    const haiku: THaiku = haikus.find((h) => h.id === id) ?? fallbackHaiku;
    if (haikus.length > 0 && haiku.id === -1) {
      navigate("/");
      return;
    }
  }, [id, haikus]);
};
