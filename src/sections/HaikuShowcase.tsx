import { useEffect, useState } from "react";
import { Carousel } from "../components/Carousel";
import { Haiku } from "../components/Haiku";
import { TitledBlock } from "../components/TitledBlock";
import haikus from "../const/haikus.json";
import type { THaiku } from "../types";
import styles from "./HaikuShowcase.module.scss";

enum EFilters {
  TODOS = "Todos",
  DESTACADOS = "Destacados",
}

const filterFns: Record<EFilters, (h: THaiku) => boolean> = {
  [EFilters.TODOS]: (h: THaiku) => !h.hide,
  [EFilters.DESTACADOS]: (h: THaiku) => !h.hide && h.selected,
};

export const HaikuShowcase = () => {
  const [filter, setFilter] = useState<EFilters | undefined>(
    EFilters.DESTACADOS
  );
  const [scrollPosition, setScrollPosition] = useState<number | undefined>(
    undefined
  );

  const storePosition = (scrollPosition: number) => {
    window.localStorage.setItem(
      "haikuScroll",
      JSON.stringify({
        filter,
        scrollPosition,
      })
    );
  };

  const storeFilter = (filter: EFilters) => {
    window.localStorage.setItem(
      "haikuScroll",
      JSON.stringify({
        filter,
        scrollPosition,
      })
    );
  };

  useEffect(() => {
    const retrieved = window.localStorage.getItem("haikuScroll");
    if (!retrieved) return;
    const { filter, scrollPosition } = JSON.parse(retrieved);
    if ([EFilters.TODOS, EFilters.DESTACADOS].includes(filter))
      setFilter(filter);
    if (typeof scrollPosition === "number") setScrollPosition(scrollPosition);
  }, []);

  return (
    <TitledBlock
      title={
        <h2 className={styles.title}>
          {Object.values(EFilters).map((k) => {
            return (
              <button
                key={k}
                className={filter === k ? styles.selectedTitle : ""}
                onClick={() => {
                  setFilter(k);
                  storeFilter(k);
                  setScrollPosition(undefined);
                }}
              >
                {k}
              </button>
            );
          })}
        </h2>
      }
    >
      <Carousel
        vertical
        slides={haikus
          .filter(
            filterFns[filter || EFilters.TODOS] ?? filterFns[EFilters.TODOS]
          )
          .sort(({ id: aId }, { id: bId }) => (aId < bId ? 1 : -1))
          .map((haiku) => {
            return <Haiku key={haiku.id} haiku={haiku} showDate size="xl" />;
          })}
        onScroll={storePosition}
        scrollPosition={scrollPosition}
      ></Carousel>
    </TitledBlock>
  );
};
