import { navigate } from "astro:transitions/client";
import { useEffect, useState } from "react";
import { Haiku } from "../components/Haiku";
import { Spinner } from "../components/Spinner";
import { useHaikuStore } from "../hooks/useHaikuStore";
import { ERequestStatus, fallbackHaiku } from "../store/Haikus";
import type { THaiku } from "../types";

export default function DetailedHaiku({ id }: { id: Number }) {
  const { haikus, status } = useHaikuStore();
  const [haiku, setHaiku] = useState(fallbackHaiku);

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
    setHaiku(haiku);
  }, [id, haikus, status]);

  return (
    <div className="card">
      {status === ERequestStatus.SUCCESS && (
        <Haiku haiku={haiku} size="xl" detailed />
      )}
      {status === ERequestStatus.LOADING && <Spinner />}
    </div>
  );
}
