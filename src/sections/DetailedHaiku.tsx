import { Haiku } from "../components/Haiku";
import { Spinner } from "../components/Spinner";
import { useHaikuStore } from "../hooks/useHaikuStore";
import { ERequestStatus, fallbackHaiku } from "../store/Haikus";

export default function DetailedHaiku({ id }: { id: Number }) {
  const { haikus, status } = useHaikuStore();

  return (
    <div className="card">
      {status === ERequestStatus.SUCCESS && (
        <Haiku
          haiku={haikus.find((h) => h.id === id && h.show) ?? fallbackHaiku}
          size="xl"
          detailed
        />
      )}
      {status === ERequestStatus.LOADING && <Spinner />}
    </div>
  );
}
