import { useEffect, useMemo, useState } from "react";
import { Carousel } from "../components/Carousel";
import { Haiku } from "../components/Haiku";
import { Spinner } from "../components/Spinner.tsx";
import { Title } from "../components/Title.tsx";
import { useHaikuStore } from "../hooks/useHaikuStore.tsx";
import { ERequestStatus, type THaiku } from "../types";
import { retrieveData, storeData } from "../utils/storage.ts";
import styles from "./HaikuShowcase.module.scss";

enum EFilters {
  TODOS = "Todos",
  DESTACADOS = "Destacados",
}

const filterFns: Record<EFilters | "None", (h: THaiku) => boolean> = {
  [EFilters.TODOS]: (h: THaiku) => h.show,
  [EFilters.DESTACADOS]: (h: THaiku) => h.show && h.selected,
  None: () => false,
};

const descriptions: Record<EFilters, string> = {
  [EFilters.TODOS]: "Este es un listado de (casi) todos mis haikus.",
  [EFilters.DESTACADOS]:
    "Esta es una selección de mis haikus, los que más me gustan.",
};

export const HaikuShowcase = () => {
  const [filter, setFilter] = useState<EFilters | undefined>(undefined);
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
    try {
      const retrieved = retrieveData();

      if (!retrieved) throw new Error("");

      const { filter, scrollPosition } = JSON.parse(retrieved);
      setFilter(
        [EFilters.TODOS, EFilters.DESTACADOS].includes(filter)
          ? filter
          : EFilters.DESTACADOS
      );
      if (typeof scrollPosition === "number") setScrollPosition(scrollPosition);
    } catch (err) {
      setFilter(EFilters.DESTACADOS);
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
      handleFilterChange(EFilters.TODOS);
      return;
    }
    if (deltaX < 0) {
      handleFilterChange(EFilters.DESTACADOS);
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

  const handleFilterChange = (filter: EFilters) => {
    setFilter(filter);
    storeData(
      JSON.stringify({
        scrollPosition: scrollPosition ?? 0,
        filter,
      })
    );
    setScrollPosition(undefined);
  };

  useEffect(initializeFilter, []);

  const carousel = useMemo(() => {
    const slides = haikus
      .filter(
        filter ? filterFns[filter] ?? filterFns[EFilters.TODOS] : filterFns.None
      )
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
      <Title>
        <div className={styles.title}>
          {Object.values(EFilters).map((k) => {
            return (
              <button
                key={k}
                className={`naked ${filter === k ? styles.selectedTitle : ""}`}
                onClick={() => {
                  handleFilterChange(k);
                }}
              >
                {k}
              </button>
            );
          })}
        </div>
      </Title>
      {status === ERequestStatus.SUCCESS && (
        <div
          className={styles.carouselWrapper}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {carousel}
          {filter && (
            <p key={filter} className={styles.description}>
              {descriptions[filter]}
            </p>
          )}
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
