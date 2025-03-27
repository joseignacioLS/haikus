import { useEffect, useState } from "react";
import { Carousel } from "../components/Carousel";
import { Haiku } from "../components/Haiku";
import { Title } from "../components/Title.tsx";
import haikus from "../const/haikus.json";
import type { THaiku } from "../types";
import styles from "./HaikuShowcase.module.scss";
import { retrieveData, storeData } from "../utils/storage.ts";

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
  const [touchStart, setTouchStart] = useState(undefined);
  const [touchEnd, setTouchEnd] = useState(undefined);

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

  const handleTouchEnd = (e: any) => {
    if (!touchStart || !touchEnd) return;
    const delta = touchEnd - touchStart;
    setTouchStart(undefined);
    setTouchEnd(undefined);
    if (Math.abs(delta) < 100) return;
    if (delta > 0) {
      setFilter(EFilters.TODOS);
      return;
    }
    if (delta < 0) {
      setFilter(EFilters.DESTACADOS);
      return;
    }
  };
  const handleTouchStart = (e: any) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: any) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  useEffect(initializeFilter, []);

  return (
    <>
      <Title>
        <span className={styles.title}>
          {Object.values(EFilters).map((k) => {
            return (
              <button
                key={k}
                className={filter === k ? styles.selectedTitle : ""}
                onClick={() => {
                  setFilter(k);
                  storeData(
                    JSON.stringify({
                      scrollPosition: scrollPosition ?? 0,
                      filter: k,
                    })
                  );
                  setScrollPosition(undefined);
                }}
              >
                {k}
              </button>
            );
          })}
        </span>
      </Title>
      <div
        className={styles.carouselWrapper}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Carousel
          slides={haikus
            .filter(
              filter
                ? filterFns[filter] ?? filterFns[EFilters.TODOS]
                : filterFns.None
            )
            .sort(({ id: aId }, { id: bId }) => (aId < bId ? 1 : -1))
            .map((haiku) => {
              return <Haiku key={haiku.id} haiku={haiku} showDate size="xl" />;
            })}
          onScroll={(scrollPosition) =>
            storeData(JSON.stringify({ scrollPosition, filter }))
          }
          scrollPosition={scrollPosition}
        ></Carousel>
        {filter && (
          <p key={filter} className={styles.description}>
            {descriptions[filter]}
          </p>
        )}
      </div>
    </>
  );
};
