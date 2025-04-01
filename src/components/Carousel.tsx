import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Carousel.module.scss";

type Props = {
  slides: ReactNode[];
  randomize?: boolean;
  onScroll?: (scrollPosition: number) => void;
  onReachEnd?: () => void;
  scrollPosition?: number;
};

export const Carousel = ({
  slides,
  randomize,
  onScroll,
  onReachEnd,
  scrollPosition,
}: Props) => {
  const ref = useRef(null);
  const randomizeScrollPosition = () => {
    const scrollElement = ref?.current as any;
    if (!scrollElement) return;
    scrollTo(scrollElement.scrollHeight * Math.random());
  };

  const scrollTo = (top: number = 0) => {
    const scrollElement = ref?.current as any;
    if (!scrollElement) return;
    scrollElement.scrollTo({ top });
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollTop, scrollHeight, offsetHeight } = e.currentTarget;
    onScroll?.(scrollTop);
    if (scrollTop + offsetHeight === scrollHeight) {
      onReachEnd?.();
    }
  };
  useEffect(() => {
    if (!randomize) return;
    randomizeScrollPosition();
  }, [randomize]);

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
