import type { ReactNode } from "react";
import styles from "./TitledBlock.module.scss";

type Props = {
  title?: ReactNode;
  children?: ReactNode;
  bottomTitle?: boolean;
};

export const TitledBlock = ({ title, bottomTitle, children }: Props) => {
  return (
    <div
      className={`${styles.titledBlock} ${
        bottomTitle ? styles.bottomTitled : ""
      }`}
    >
      {title}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
