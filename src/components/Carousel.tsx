import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Carousel.module.scss";

export const Carousel = ({
  slides,
  vertical,
  style,
  randomize,
}: {
  slides: ReactNode[];
  vertical?: boolean;
  style?: Record<string, string>;
  randomize?: boolean;
}) => {
  const ref = useRef(null);
  const randomizeScrollPosition = () => {
    const scrollElement = ref?.current as any;
    if (!scrollElement) return;
    scrollElement.scrollTo({ top: scrollElement.scrollHeight * Math.random() });
  };
  useEffect(() => {
    if (!randomize) return;
    randomizeScrollPosition();
  }, [randomize]);
  return (
    <div
      ref={ref}
      style={style}
      className={`${styles.carousel} ${vertical ? styles.vertical : ""}`}
    >
      {slides}
    </div>
  );
};
