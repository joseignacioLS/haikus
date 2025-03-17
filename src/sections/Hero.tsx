import { useEffect, useState } from "react";
import { Bento } from "../components/Bento";
import { Carousel } from "../components/Carousel";
import { Haiku } from "../components/Haiku";
import { TitledBlock } from "../components/TitledBlock";
import { WrapCenterer } from "../components/WrapCenterer";
import haikus from "../const/haikus.json";
import type { Haiku as THaiku } from "../types";

import styles from "./Hero.module.scss";

enum Filters {
  TODOS = "TODOS",
  DESTACADOS = "DESTACADOS",
}

const filterFns: Record<Filters, (h: THaiku) => boolean> = {
  [Filters.TODOS]: (h: THaiku) => !h.hide,
  [Filters.DESTACADOS]: (h: THaiku) => !h.hide && h.selected,
};

export const Hero = () => {
  const [filter, setFilter] = useState<Filters>(Filters.DESTACADOS);
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

  useEffect(() => {
    const retrieved = window.localStorage.getItem("haikuScroll");
    if (!retrieved) return;
    const { filter, scrollPosition } = JSON.parse(retrieved);
    if ([Filters.TODOS, Filters.DESTACADOS].includes(filter)) setFilter(filter);
    if (typeof scrollPosition === "number") setScrollPosition(scrollPosition);
  }, []);

  return (
    <main>
      <Bento
        colors={{
          main: "#FFFFFF10",
          sideUp: "#FFFFFF10",
          sideDown: "#FFFFFF10",
          bottom: "#FFFFFF10",
        }}
        main={
          <TitledBlock
            title={
              <h2 className={styles.title}>
                <button
                  className={
                    filter === Filters.TODOS ? styles.selectedTitle : ""
                  }
                  onClick={() => {
                    setFilter(Filters.TODOS);
                    setScrollPosition(undefined);
                  }}
                >
                  Todos
                </button>
                <button
                  className={
                    filter === Filters.DESTACADOS ? styles.selectedTitle : ""
                  }
                  onClick={() => {
                    setFilter(Filters.DESTACADOS);
                    setScrollPosition(undefined);
                  }}
                >
                  Destacados
                </button>
              </h2>
            }
          >
            <Carousel
              vertical
              slides={haikus
                .filter(filterFns[filter] ?? filterFns[Filters.TODOS])
                .sort(({ id: aId }, { id: bId }) => (aId < bId ? 1 : -1))
                .map((haiku) => {
                  return (
                    <WrapCenterer key={haiku.id}>
                      <Haiku haiku={haiku} showDate size="xl" />
                    </WrapCenterer>
                  );
                })}
              onScroll={storePosition}
              scrollPosition={scrollPosition}
            ></Carousel>
          </TitledBlock>
        }
        sideUp={
          <img
            style={{
              minWidth: "calc(100% + 2rem)",
              minHeight: "calc(100% + 2rem)",
              objectFit: "cover",
              overflow: "hidden",
              viewTransitionName: "jose-img",
            }}
            src="/haikus/me.webp"
            alt="Fotografía de Jose, el autor de la página"
          />
        }
        bottom={
          <TitledBlock
            title={
              <a href={`${import.meta.env.BASE_URL}about`}>
                <h2 style={{ viewTransitionName: "title-about" }}>Sobre mi</h2>
              </a>
            }
          >
            <p
              style={{
                viewTransitionName: "about-text",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              ¡Hola! Soy Jose. Escribir haikus es una forma de expresarme y de
              llevar alguna forma de diario. ¡Espero que los disfrutes!
            </p>
          </TitledBlock>
        }
      />
    </main>
  );
};

export default Hero;
