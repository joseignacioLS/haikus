import { navigate } from "astro:transitions/client";
import { type ReactNode } from "react";

import styles from "./Title.module.scss";

export const Title = ({
  children,
  showBackButton = false,
}: {
  children?: ReactNode;
  showBackButton?: boolean;
}) => {
  return (
    <nav className={styles.navbar}>
      {showBackButton && (
        <button
          className={styles.backbtn}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`${import.meta.env.BASE_URL}`);
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}back.svg`}
            alt="Icono de flecha apuntado a la izquierda"
          />
        </button>
      )}
      <h1>{children}</h1>
    </nav>
  );
};
