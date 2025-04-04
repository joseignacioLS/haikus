import { Haiku } from "../components/Haiku";
import { Spinner } from "../components/Spinner";
import { useHaikuGuard } from "../hooks/useHaikuGuard";
import { useHaikuStore } from "../hooks/useHaikuStore";
import { fallbackHaiku } from "../store/Haikus";
import { ERequestStatus, type THaiku } from "../types";

export default function DetailedHaiku({ id }: { id: THaiku["id"] }) {
  const { status, haikus } = useHaikuStore();
  useHaikuGuard(id);

  const haiku = haikus.find((h) => h.id === id) ?? fallbackHaiku;

  return (
    <div className="card">
      {status === ERequestStatus.SUCCESS && <Haiku haiku={haiku} fullpage />}
      {status === ERequestStatus.LOADING && <Spinner />}
    </div>
  );
}
