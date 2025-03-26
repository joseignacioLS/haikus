import { navigate } from "astro:transitions/client";
import { useEffect } from "react";

import styles from "./Page404.module.scss";

export const Page404 = () => {
  useEffect(() => {
    navigate(import.meta.env.BASE_URL);
  }, []);
  return (
    <main>
      <div className={styles.wrapper}>
        <p className={styles.title}>¡Oops!</p>
        <p>
          Esta página no está disponible, en breve te redirijo a la Home. Pero
          por si no pasa, aquí tienes un enlace para volver
        </p>
        <a href={import.meta.env.BASE_URL}>Volver a la home</a>
      </div>
    </main>
  );
};
