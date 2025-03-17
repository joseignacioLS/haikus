import type { ReactNode } from "react";
import styles from "./Bento.module.scss";

type Props = {
  main?: ReactNode;
  sideUp?: ReactNode;
  sideDown?: ReactNode;
  bottom?: ReactNode;
  colors?: Record<string, string>;
};

export const Bento = ({ main, sideUp, sideDown, bottom, colors }: Props) => {
  return (
    <div className={styles.bento}>
      {main && (
        <div
          className={`${styles.box} ${styles.b0}`}
          style={{
            backgroundColor: colors?.main,
          }}
        >
          {main}
        </div>
      )}
      {sideUp && (
        <div
          className={`${styles.box} ${styles.b1}`}
          style={{
            backgroundColor: colors?.sideUp,
          }}
        >
          {sideUp}
        </div>
      )}
      {sideDown && (
        <div
          className={`${styles.box} ${styles.b2}`}
          style={{
            backgroundColor: colors?.sideDown,
          }}
        >
          {sideDown}
        </div>
      )}
      {bottom && (
        <div
          className={`${styles.box} ${styles.b3}`}
          style={{
            backgroundColor: colors?.bottom,
          }}
        >
          {bottom}
        </div>
      )}
    </div>
  );
};
