import { navigate } from "astro:transitions/client";
import type { THaiku } from "../types";
import styles from "./DetailModal.module.scss";

export const DetailModal = ({ haiku }: { haiku: THaiku }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>#{haiku.id}</h2>
      <span className={styles.date}>{haiku.date}</span>
      {haiku.description?.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <div className={styles.tags}>
        {haiku.tags.sort().map((tag) => {
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
    </div>
  );
};
