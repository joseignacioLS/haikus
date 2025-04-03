import { useMemo } from "react";
import { Carousel } from "../components/Carousel";
import { Haiku } from "../components/Haiku";
import { Spinner } from "../components/Spinner.tsx";
import { useHaikuStore } from "../hooks/useHaikuStore.tsx";
import { ERequestStatus } from "../types";
import styles from "./HaikuCollection.module.scss";

export const HaikuCollection = ({ tag }: { tag: string }) => {
  const { haikus, status } = useHaikuStore();

  const carousel = useMemo(() => {
    const slides = haikus
      .filter((h) => h.tags.includes(tag))
      .sort(({ id: aId }, { id: bId }) => (aId < bId ? 1 : -1))
      .map((haiku) => {
        return <Haiku key={haiku.id} haiku={haiku} />;
      });
    return <Carousel slides={slides}></Carousel>;
  }, [haikus, tag]);

  return (
    <>
      {status === ERequestStatus.SUCCESS && (
        <div className={styles.carouselWrapper}>{carousel}</div>
      )}
      {status === ERequestStatus.LOADING && (
        <div className={`${styles.carouselWrapper}`}>
          <Spinner />
        </div>
      )}
      {status === ERequestStatus.ERROR && (
        <div className={`${styles.carouselWrapper}`}>Ha habido un error</div>
      )}
    </>
  );
};
