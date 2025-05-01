import { HaikuMiniCalendar } from "@/components/haiku/HaikuMiniCalendar";
import { CollectionsCard } from "@components/CollectionsCard";
import { navigate } from "astro:transitions/client";
import styles from "./MiniAbout.module.scss";

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
      <HaikuMiniCalendar />
      <div className={styles.collectionsWrapper}>
        <CollectionsCard />
      </div>
    </section>
  );
};
