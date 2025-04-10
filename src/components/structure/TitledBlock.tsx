import type { ReactNode } from "react";
import styles from "./TitledBlock.module.scss";

type Props = {
  title?: ReactNode;
  children?: ReactNode;
};

export const TitledBlock = ({ title, children }: Props) => {
  return (
    <section className={styles.titledBlock}>
      {title}
      <div className={styles.content}>{children}</div>
    </section>
  );
};
