import type { ReactNode } from "react";
import styles from "./TitledBlock.module.scss";

type Props = {
  title?: ReactNode;
  children?: ReactNode;
  bottomTitle?: boolean;
  isCard?: boolean;
};

export const TitledBlock = ({
  title,
  bottomTitle,
  children,
  isCard,
}: Props) => {
  return (
    <div
      className={`${styles.titledBlock} ${
        bottomTitle ? styles.bottomTitled : ""
      } ${isCard ? styles.carded : ""}`}
    >
      {title}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
