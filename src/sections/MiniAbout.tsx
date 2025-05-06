import { useHaikuStore } from "@/hooks/useHaikuStore";
import { CollectionsCard } from "@components/CollectionsCard";
import { navigate } from "astro:transitions/client";
import styles from "./MiniAbout.module.scss";
import { Spinner } from "@/components/notifications/Spinner";

export const MiniAbout = () => {
  const { haikus, selected } = useHaikuStore();
  const haiku = haikus.find((h) => h.id === selected);
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
      <div className={styles.dataWrapper}>
        {haiku ? (
          <>
            <h2>
              <a href={`/${haiku?.id}`}>#{haiku?.id}</a>
            </h2>
            <p>{haiku?.date}</p>
            <p className={styles.description}>
              {(haiku?.description ?? ["//Sin descripción//"])?.join(" ")}
            </p>
          </>
        ) : (
          <Spinner />
        )}
      </div>
      <div className={styles.collectionsWrapper}>
        <CollectionsCard />
      </div>
    </section>
  );
};
