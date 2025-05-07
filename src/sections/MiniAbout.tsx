import { Spinner } from "@/components/notifications/Spinner";
import { TitledBlock } from "@/components/structure/TitledBlock";
import { useHaikuStore } from "@/hooks/useHaikuStore";
import { CollectionsCard } from "@components/CollectionsCard";
import { navigate } from "astro:transitions/client";
import styles from "./MiniAbout.module.scss";

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
      <TitledBlock
        title={
          haiku !== undefined && (
            <>
              <h2>
                <a href={`/${haiku?.id}`}>#{haiku?.id}</a>
              </h2>
              <p>{haiku.date}</p>
            </>
          )
        }
      >
        {haiku ? (
          <div className={styles.dataWrapper}>
            <p className={styles.description}>
              {(haiku.description ?? ["// Sin descripción //"])?.join(" ")}
            </p>
          </div>
        ) : (
          <Spinner />
        )}
      </TitledBlock>
      <div className={styles.collectionsWrapper}>
        <CollectionsCard />
      </div>
    </section>
  );
};
