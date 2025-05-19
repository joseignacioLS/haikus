import { useEffect, useRef, type ReactElement } from "react";
import styles from "./Carousel.module.scss";

type Props = {
  slides: ReactElement[];
  onScroll?: (scrollPosition: number, key: number) => void;
  scrollPosition?: number;
};

export const Carousel = ({ slides, onScroll, scrollPosition }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollTo = (top: number = 0) => {
    const scrollElement = ref?.current;
    if (!scrollElement) return;
    scrollElement.scrollTo({ top });
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollTop, scrollHeight } = e.currentTarget;
    const slideIndex = Math.round(scrollTop / (scrollHeight / slides.length));
    onScroll?.(scrollTop, Number(slides[slideIndex].key));
  };

  useEffect(() => {
    scrollTo(scrollPosition ?? 0);
  }, [slides, scrollPosition]);

  return (
    <div
      key={slides.length}
      ref={ref}
      className={styles.carousel}
      onScroll={handleScroll}
    >
      {slides.map((s) => {
        return (
          <div key={s.key} className={styles.wrapper}>
            {s}
          </div>
        );
      })}
    </div>
  );
};
