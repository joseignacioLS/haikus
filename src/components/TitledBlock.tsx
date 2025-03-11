import type { ReactNode } from "react";
import styles from "./TitledBlock.module.scss";
import { navigate } from "astro:transitions/client";

type Props = {
  title?: ReactNode;
  children?: ReactNode;
  bottomRighted?: boolean;
  onClick?: (...args: any) => void;
  route?: string;
};

export const TitledBlock = ({
  title,
  bottomRighted,
  onClick,
  route,
  children,
}: Props) => {
  return (
    <div
      className={`${styles.titledBlock} ${
        bottomRighted ? styles.bottomRighted : ""
      }`}
      onClick={() => (route ? navigate(route) : onClick?.())}
    >
      {title}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
