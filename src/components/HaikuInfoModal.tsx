import { navigate } from "astro:transitions/client";
import { useHaikuStore } from "../hooks/useHaikuStore";
import type { THaiku } from "../types";
import styles from "./HaikuInfoModal.module.scss";
import { ShareButton } from "./ShareButton";

export const HaikuInfoModal = ({ haiku }: { haiku: THaiku }) => {
  const { collections } = useHaikuStore();
  return (
    <div className={styles.wrapper}>
      <div>
        <h2 className={styles.title}>#{haiku.id}</h2>
        <span className={styles.date}>{haiku.date}</span>
      </div>
      {haiku.description?.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <div className={styles.tags}>
        {haiku.tags
          .filter((tag) => collections.includes(tag))
          .sort()
          .map((tag) => {
            return (
              <button
                key={tag}
                className="rounded"
                onClick={() => {
                  navigate(`/collection/${tag}`);
                }}
              >
                {tag}
              </button>
            );
          })}
      </div>
      <div className={styles.shareButton}>
        <ShareButton id={haiku.id} />
      </div>
    </div>
  );
};
