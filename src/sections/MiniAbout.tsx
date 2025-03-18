import { TitledBlock } from "../components/TitledBlock";
import styles from "./MiniAbout.module.scss";

export const MiniAbout = () => {
  return (
    <div className={styles.miniAbout}>
      <div className={styles.profilePicWrapper}>
        <img
          style={{
            viewTransitionName: "jose-img",
          }}
          src="/haikus/me.webp"
          alt="Fotografía de Jose, el autor de la página"
        />
      </div>
      <div className={styles.profileTextWrapper}>
        <TitledBlock
          title={
            <a href={`${import.meta.env.BASE_URL}about`}>
              <h2 style={{ viewTransitionName: "about-title" }}>Sobre mi</h2>
            </a>
          }
        >
          <p
            style={{
              viewTransitionName: "about-text",
            }}
          >
            ¡Hola! Soy Jose. Escribir haikus es una forma de expresarme y de
            llevar alguna forma de diario. ¡Espero que los disfrutes!
          </p>
        </TitledBlock>
      </div>
    </div>
  );
};
