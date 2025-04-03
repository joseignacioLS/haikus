import { useEffect, useMemo, useState } from "react";
import { Carousel } from "../components/Carousel";
import { Haiku } from "../components/Haiku";
import { Spinner } from "../components/Spinner.tsx";
import { Title } from "../components/Title.tsx";
import { useHaikuStore } from "../hooks/useHaikuStore.tsx";
import { ERequestStatus, type THaiku } from "../types";
import { retrieveData, storeData } from "../utils/storage.ts";
import styles from "./HaikuShowcase.module.scss";

type Props<T extends string> = {
  filters: T[];
  filterFns: Record<T, Record<string, any[]>>;
  defaultFilter?: T;
  storeState?: boolean;
};

export const HaikuShowcase = <T extends string>({
  filters,
  defaultFilter,
  filterFns,
  storeState,
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
    if (!storeState) {
      setFilter(defaultFilter);
      return;
    }
    try {
      const retrieved = retrieveData();

      if (!retrieved) throw new Error("");

      const { filter, scrollPosition } = JSON.parse(retrieved);

      setFilter([filters].includes(filter) ? filter : defaultFilter);

      if (typeof scrollPosition === "number") {
        setScrollPosition(scrollPosition);
      }
    } catch (err) {
      setFilter(defaultFilter ?? filters[0]);
    }
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

  const handleScroll = (scrollPosition: number) => {
    storeData(JSON.stringify({ scrollPosition, filter }));
  };

  useEffect(initializeFilter, []);

  useEffect(() => {
    if (!storeState) return;
    storeData(
      JSON.stringify({
        scrollPosition: scrollPosition ?? 0,
        filter,
      })
    );
  }, [filter, scrollPosition, storeState]);

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
      <Carousel
        slides={slides}
        scrollPosition={scrollPosition}
        onScroll={handleScroll}
      ></Carousel>
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
