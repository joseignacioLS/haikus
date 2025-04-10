import { ERequestStatus, type THaiku } from "@/types";
import { Haiku } from "@components/Haiku";
import { Spinner } from "@components/notifications/Spinner.tsx";
import { Carousel } from "@components/structure/Carousel";
import { Title } from "@components/structure/Title.tsx";
import { useHaikuStore } from "@hooks/useHaikuStore.tsx";
import { useEffect, useMemo, useState } from "react";
import styles from "./HaikuShowcase.module.scss";

type Props<T extends string> = {
  filters: T[];
  filterFns: Record<T, Record<string, any[]>>;
  defaultFilter?: T;
};

export const HaikuShowcase = <T extends string>({
  filters,
  defaultFilter,
  filterFns,
}: Props<T>) => {
  const [filter, setFilter] = useState<T | undefined>(undefined);
  const [scrollPosition, setScrollPosition] = useState<number | undefined>(
    undefined
  );

  const { haikus, status } = useHaikuStore();

  const [touchStart, setTouchStart] = useState<
    { x: number; y: number } | undefined
  >(undefined);
  const [touchEnd, setTouchEnd] = useState<
    { x: number; y: number } | undefined
  >(undefined);

  const initializeFilter = () => {
    setFilter(defaultFilter ?? filters[0]);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    setTouchStart(undefined);
    setTouchEnd(undefined);
    if (Math.abs(deltaY) > 50) return;
    if (Math.abs(deltaX) < 50) return;
    if (deltaX > 0) {
      setFilter((oldFilter) => {
        const filterIndex = filters.findIndex((f) => f === oldFilter);
        if (filterIndex === -1) return oldFilter;
        const leftIndex = Math.max(0, filterIndex - 1);
        return filters[leftIndex];
      });
      setScrollPosition(undefined);
      return;
    }
    if (deltaX < 0) {
      setFilter((oldFilter) => {
        const filterIndex = filters.findIndex((f) => f === oldFilter);
        if (filterIndex === -1) return oldFilter;
        const rightIndex = Math.min(filters.length - 1, filterIndex + 1);
        return filters[rightIndex];
      });
      setScrollPosition(undefined);
      return;
    }
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  useEffect(initializeFilter, []);

  const carousel = useMemo(() => {
    const slides = haikus
      .filter((h) => {
        if (!filter || !filterFns[filter]) return false;
        return Object.entries(filterFns[filter]).every(([key, options]) => {
          const value = h[key as keyof THaiku];
          if (Array.isArray(value)) {
            return options.filter((o) => value.includes(o)).length > 0;
          }
          return options.includes(h[key as keyof THaiku]);
        });
      })
      .sort(({ id: aId }, { id: bId }) => (aId < bId ? 1 : -1))
      .map((haiku) => {
        return <Haiku key={haiku.id} haiku={haiku} />;
      });
    return (
      <Carousel slides={slides} scrollPosition={scrollPosition}></Carousel>
    );
  }, [haikus, filter, scrollPosition]);

  return (
    <section className={styles.wrapper}>
      {filters.length > 1 && (
        <Title>
          <div className={styles.title}>
            {filters.map((k) => {
              return (
                <button
                  key={k}
                  className={`naked ${
                    filter === k ? styles.selectedTitle : ""
                  }`}
                  onClick={() => {
                    setFilter(k);
                    setScrollPosition(undefined);
                  }}
                >
                  {k}
                </button>
              );
            })}
          </div>
        </Title>
      )}
      {status === ERequestStatus.SUCCESS && (
        <div
          className={styles.carouselWrapper}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {carousel}
        </div>
      )}
      {status === ERequestStatus.LOADING && (
        <div className={`${styles.carouselWrapper}`}>
          <Spinner />
        </div>
      )}
      {status === ERequestStatus.ERROR && (
        <div className={`${styles.carouselWrapper}`}>Ha habido un error</div>
      )}
    </section>
  );
};
