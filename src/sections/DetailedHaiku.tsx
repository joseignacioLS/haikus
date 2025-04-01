import { useEffect, useState } from "react";
import { Haiku } from "../components/Haiku";
import { Spinner } from "../components/Spinner";
import { ERequestStatus, fallbackHaiku, haikus, status } from "../store/Haikus";
import type { THaiku } from "../types";

export default function DetailedHaiku({ id }: { id: Number }) {
  const [haikusState, setHaikusState] = useState<THaiku[]>([]);
  const [statusState, setStatusState] = useState(ERequestStatus.LOADING);

  useEffect(() => {
    const subscriptions = [
      status.subscribe((receivedStatus) => {
        setStatusState(receivedStatus);
      }),
      haikus.subscribe((receivedHaikus) => {
        setHaikusState([...receivedHaikus]);
      }),
    ];
    return () => {
      subscriptions.forEach((u) => u());
    };
  }, []);

  return (
    <div className="card">
      {statusState === ERequestStatus.SUCCESS && (
        <Haiku
          haiku={
            haikusState.find((h) => h.id === id && h.show) ?? fallbackHaiku
          }
          size="xl"
          detailed
        />
      )}
      {statusState === ERequestStatus.LOADING && <Spinner />}
    </div>
  );
}
