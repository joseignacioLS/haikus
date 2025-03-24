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
          src={`${import.meta.env.BASE_URL}me.webp`}
          alt="Fotografía de Jose, el autor de la página"
        />
      </div>
      <div className={styles.profileTextWrapper}>
        <TitledBlock
          title={
            <h2 style={{ viewTransitionName: "about-title" }}>
              <a href={`${import.meta.env.BASE_URL}about`}>Sobre mi</a>
            </h2>
          }
        >
          <p
            style={{
              viewTransitionName: "about-text",
            }}
          >
            ¡Hola! Soy Jose. Escribir haikus es una forma de expresarme y de
            llevar un diario. ¡Espero que los disfrutes!
          </p>
        </TitledBlock>
      </div>
    </div>
  );
};
