import { Title } from "@/components/structure/Title";
import type { ReactNode } from "react";

import styles from "./Header.module.scss";
import { navigate } from "astro:transitions/client";

export const Header = ({
  title,
  showBackButton,
}: {
  title: ReactNode;
  showBackButton?: boolean;
}) => {
  return (
    <header className={styles.header}>
      <Title showBackButton={showBackButton}>{title}</Title>
      <button
        className={"naked"}
        onClick={() => {
          navigate("/about");
        }}
      >
        <img
          className={styles.avatar}
          src="favicon.jpg"
          alt="Avatar de Verdecillo"
        />
      </button>
    </header>
  );
};
