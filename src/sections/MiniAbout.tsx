import { CollectionsCard } from "@components/CollectionsCard";
import { TitledBlock } from "@components/structure/TitledBlock";
import styles from "./MiniAbout.module.scss";
import { navigate } from "astro:transitions/client";

export const MiniAbout = () => {
  return (
    <section className={styles.miniAbout}>
      <button
        className={`naked ${styles.profilePicWrapper}`}
        onClick={() => {
          navigate("/about");
        }}
        style={{
          viewTransitionName: "avatar-img",
        }}
      >
        <img src={`/favicon.jpg`} alt="Avatar del autor de la página" />
      </button>
      <div className={styles.profileTextWrapper}>
        <TitledBlock
          title={
            <h2 style={{ viewTransitionName: "about-title" }}>
              <a href={`/about`}>Sobre mí</a>
            </h2>
          }
        >
          <p
            style={{
              viewTransitionName: "about-text",
            }}
          >
            Bienvenido/a a mi diario de haikus ¡Espero que los disfrutes!
          </p>
        </TitledBlock>
      </div>
      <div className={styles.collectionsWrapper}>
        <CollectionsCard />
      </div>
    </section>
  );
};
