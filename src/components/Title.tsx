import { navigate } from "astro:transitions/client";
import { useEffect, type ReactNode } from "react";

import styles from "./Title.module.scss";

type Props = {
  children?: ReactNode;
  showBackButton?: boolean;
};

export const Title = ({ children, showBackButton = false }: Props) => {
  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);
  return (
    <nav className={styles.navbar}>
      {showBackButton && (
        <button
          className={`naked ${styles.backbtn}`}
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
