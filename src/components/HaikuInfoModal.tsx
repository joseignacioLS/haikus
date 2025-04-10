import type { THaiku } from "@/types";
import { ShareButton } from "@components/ShareButton";
import { useHaikuStore } from "@hooks/useHaikuStore";
import { navigate } from "astro:transitions/client";
import styles from "./HaikuInfoModal.module.scss";

export const HaikuInfoModal = ({ haiku }: { haiku: THaiku }) => {
  const { collections } = useHaikuStore();
  const pathname = window.location.pathname;
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.shareButton}>
          <ShareButton id={haiku.id} />
        </div>
        {pathname === `/${haiku.id}` ? (
          <h2>#{haiku.id}</h2>
        ) : (
          <a
            href={`/${haiku.id}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${haiku.id}`);
            }}
          >
            <h2>#{haiku.id}</h2>
          </a>
        )}
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
    </div>
  );
};
