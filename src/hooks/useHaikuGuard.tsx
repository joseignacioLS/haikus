import { type THaiku } from "@/types";
import { useHaikuStore } from "@hooks/useHaikuStore";
import { navigate } from "astro:transitions/client";
import { useEffect } from "react";

export const useHaikuGuard = (id: THaiku["id"]) => {
  const { haikus } = useHaikuStore();
  useEffect(() => {
    if (haikus.length === 0) return;
    const haiku = haikus.find((h) => h.id === id);
    if (!haiku) {
      navigate("/");
      return;
    }
  }, [id, haikus]);
};
