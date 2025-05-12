import { HaikuBody } from "@/components/haiku/HaikuBody";
import { Spinner } from "@/components/notifications/Spinner";
import { Swipeable } from "@/components/structure/Swipeable";
import { showcaseStore } from "@/store/Showcase";
import { type THaiku } from "@/types";
import { Carousel } from "@components/structure/Carousel";
import { Title } from "@components/structure/Title.tsx";
import { useHaikuStore } from "@hooks/useHaikuStore.tsx";
import { useStore } from "@nanostores/react";
import { dateStore, selectedStore } from "@store/Haikus";
import { useEffect, useMemo, useState } from "react";
import { Temporal } from "temporal-polyfill";
import styles from "./HaikuShowcase.module.scss";

type Props<T extends string> = {
  filters: T[];
  filterFns: Record<T, Record<string, any[]>>;
  defaultFilter?: T;
  collection?: string;
};

export const HaikuShowcase = <T extends string>({
  filters,
  defaultFilter,
  filterFns,
  collection,
}: Props<T>) => {
  const [filter, setFilter] = useState<T | undefined>(undefined);
  const [hideButtonUp, setHideButtonUp] = useState(true);

  const focusHaikuId = useStore(showcaseStore);

  const { haikus } = useHaikuStore();

  const initializeFilter = () => {
    setFilter(defaultFilter ?? filters[0]);
  };

  const handleSwipe = (direction: string) => {
    if (direction === "Left") {
      setFilter((oldFilter) => {
        const filterIndex = filters.findIndex((f) => f === oldFilter);
        if (filterIndex === -1) return oldFilter;
        const leftIndex = Math.max(0, filterIndex - 1);
        return filters[leftIndex];
      });
    } else if (direction === "Right") {
      setFilter((oldFilter) => {
        const filterIndex = filters.findIndex((f) => f === oldFilter);
        if (filterIndex === -1) return oldFilter;
        const rightIndex = Math.min(filters.length - 1, filterIndex + 1);
        return filters[rightIndex];
      });
    }
  };

  const handleScroll = (scrollTop: number, key: number) => {
    setHideButtonUp(scrollTop < 50);
    const onViewHaiku = haikus.find((h) => h.id === key);
    if (!onViewHaiku) return;
    dateStore.set(Temporal.PlainDate.from(onViewHaiku.date));
    selectedStore.set(onViewHaiku.id);
  };

  const handleGoUp = () => {
    document
      .getElementById(String(slides[0].id))
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const slides = useMemo(
    () =>
      haikus
        .filter((h) => {
          if (collection !== undefined && !h.tags.includes(collection))
            return false;
          if (!filter || !filterFns[filter]) return false;
          return Object.entries(filterFns[filter]).every(([key, options]) => {
            const value = h[key as keyof THaiku];
            if (Array.isArray(value)) {
              return options.filter((o) => value.includes(o)).length > 0;
            }
            return options.includes(h[key as keyof THaiku]);
          });
        })
        .sort(({ id: aId }, { id: bId }) => (aId < bId ? 1 : -1)),
    [haikus, filter, collection]
  );

  const carousel = useMemo(() => {
    return (
      <Carousel
        slides={slides.map(({ id, text }) => {
          return <HaikuBody key={id} id={id} haiku={text} />;
        })}
        onScroll={handleScroll}
      ></Carousel>
    );
  }, [slides]);

  useEffect(() => {
    initializeFilter();
  }, []);

  useEffect(() => {
    if (focusHaikuId === undefined) return;
    document.getElementById(`${focusHaikuId}`)?.scrollIntoView();
  }, [focusHaikuId, carousel]);

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
                  }}
                >
                  {k}
                </button>
              );
            })}
          </div>
        </Title>
      )}
      {slides.length > 0 ? (
        <Swipeable handleSwipe={handleSwipe} className={styles.carouselWrapper}>
          {carousel}
        </Swipeable>
      ) : (
        <Spinner />
      )}
      <button
        className={`round ${styles.btnUp} ${hideButtonUp ? styles.hidden : ""}`}
        onClick={handleGoUp}
      >
        <img src="/icons/up.svg"></img>
      </button>
    </section>
  );
};
