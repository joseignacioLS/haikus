import { navigate } from "astro:transitions/client";
import { useEffect, type ReactNode } from "react";

import styles from "./Title.module.scss";

type Props = {
  children?: ReactNode;
  showBackButton?: boolean;
  backRoute?: string;
};

export const Title = ({
  children,
  showBackButton = false,
  backRoute = "/",
}: Props) => {
  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);
  return (
    <nav className={styles.navbar}>
      {showBackButton && (
        <button
          className={`naked`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(backRoute, { history: "replace" });
          }}
          arial-label="Botón para navegar atrás"
        >
          <img
            src={`/icons/back.svg`}
            alt="Icono de flecha apuntado a la izquierda"
          />
        </button>
      )}
      <h1>{children}</h1>
    </nav>
  );
};
