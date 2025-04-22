import { HaikuFullPage } from "@/components/haiku/HaikuFullPage";
import { Spinner } from "@/components/notifications/Spinner";
import { type THaiku } from "@/types";
import { Haiku } from "@/components/haiku/HaikuMini";
import { useHaikuGuard } from "@hooks/useHaikuGuard";
import { useHaikuStore } from "@hooks/useHaikuStore";

export default function DetailedHaiku({ id }: { id: THaiku["id"] }) {
  const { haikus } = useHaikuStore();
  useHaikuGuard(id);

  const haiku = haikus.find((h) => h.id === id);

  return (
    <div className="card">
      {haiku ? <HaikuFullPage haiku={haiku} /> : <Spinner />}
    </div>
  );
}
