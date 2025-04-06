import { CollectionsCard } from "../components/CollectionsCard";
import { TitledBlock } from "../components/TitledBlock";
import styles from "./MiniAbout.module.scss";

export const MiniAbout = () => {
  return (
    <section className={styles.miniAbout}>
      <div className={styles.profilePicWrapper}>
        <img
          style={{
            viewTransitionName: "avatar-img",
          }}
          src={`/me.webp`}
          alt="Avatar del autor de la página"
        />
      </div>
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
            Bienvenido/a a mi diario ¡Espero que los disfrutes!
          </p>
        </TitledBlock>
      </div>
      <div className={styles.collectionsWrapper}>
        <CollectionsCard />
      </div>
    </section>
  );
};
