import { navigate } from "astro:transitions/client";
import { useEffect } from "react";
import { fallbackHaiku } from "../store/Haikus";
import { ERequestStatus, type THaiku } from "../types";
import { useHaikuStore } from "./useHaikuStore";

export const useHaikuGuard = (id: THaiku["id"]) => {
  const { status, haikus } = useHaikuStore();
  useEffect(() => {
    if (status === ERequestStatus.LOADING) return;
    if (status === ERequestStatus.ERROR) {
      navigate("/");
      return;
    }
    const haiku: THaiku =
      haikus.find((h) => h.id === id && h.show) ?? fallbackHaiku;
    if (
      status === ERequestStatus.SUCCESS &&
      haikus.length > 0 &&
      haiku.id === -1
    ) {
      navigate("/");
      return;
    }
  }, [id, haikus, status]);
};
