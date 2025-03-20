import { useEffect, useState } from "react";
import { Carousel } from "../components/Carousel";
import { Haiku } from "../components/Haiku";
import { Title } from "../components/Title.tsx";
import haikus from "../const/haikus.json";
import type { THaiku } from "../types";
import styles from "./HaikuShowcase.module.scss";

enum EFilters {
  TODOS = "Todos",
  DESTACADOS = "Destacados",
}

const filterFns: Record<EFilters | "None", (h: THaiku) => boolean> = {
  [EFilters.TODOS]: (h: THaiku) => !h.hide,
  [EFilters.DESTACADOS]: (h: THaiku) => !h.hide && h.selected,
  None: () => false,
};

export const HaikuShowcase = () => {
  const [filter, setFilter] = useState<EFilters | undefined>(undefined);
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

  const initializeFilter = () => {
    try {
      const retrieved = window.localStorage.getItem("haikuScroll");

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
                  storeFilter(k);
                  setScrollPosition(undefined);
                }}
              >
                {k}
              </button>
            );
          })}
        </span>
      </Title>
      <Carousel
        vertical
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
        onScroll={storePosition}
        scrollPosition={scrollPosition}
      ></Carousel>
    </>
  );
};
