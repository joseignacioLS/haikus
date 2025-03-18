import type { ReactNode } from "react";
import styles from "./TitledBlock.module.scss";
import { navigate } from "astro:transitions/client";

type Props = {
  title?: ReactNode;
  children?: ReactNode;
  bottomTitle?: boolean;
  onClick?: (...args: any) => void;
  route?: string;
};

export const TitledBlock = ({
  title,
  bottomTitle,
  onClick,
  route,
  children,
}: Props) => {
  return (
    <div
      className={`${styles.titledBlock} ${
        bottomTitle ? styles.bottomTitled : ""
      }`}
      onClick={() =>
        route ? navigate(`${import.meta.env.BASE_URL}${route}`) : onClick?.()
      }
    >
      {title}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
