import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Carousel.module.scss";

type Props = {
  slides: ReactNode[];
  onScroll?: (scrollPosition: number) => void;
  scrollPosition?: number;
};

export const Carousel = ({ slides, onScroll, scrollPosition }: Props) => {
  const ref = useRef(null);

  const scrollTo = (top: number = 0) => {
    const scrollElement = ref?.current as any;
    if (!scrollElement) return;
    scrollElement.scrollTo({ top });
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollTop } = e.currentTarget;
    onScroll?.(scrollTop);
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
      {slides.map((s: any) => {
        return (
          <div key={s.key} className={styles.wrapper}>
            {s}
          </div>
        );
      })}
    </div>
  );
};
