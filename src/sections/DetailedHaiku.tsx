import { type THaiku } from "@/types";
import { Haiku } from "@components/Haiku";
import { useHaikuGuard } from "@hooks/useHaikuGuard";
import { useHaikuStore } from "@hooks/useHaikuStore";
import { fallbackHaiku } from "@store/Haikus";

export default function DetailedHaiku({ id }: { id: THaiku["id"] }) {
  const { haikus } = useHaikuStore();
  useHaikuGuard(id);

  const haiku = haikus.find((h) => h.id === id) ?? fallbackHaiku;

  return (
    <div className="card">
      <Haiku haiku={haiku} fullpage />
    </div>
  );
}
