import { useHaikuStore } from "@/hooks/useHaikuStore";
import { selectedStore } from "@/store/Haikus";
import type { THaiku } from "@/types";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import styles from "./HaikuData.module.scss";

export const HaikuData = ({ haiku }: { haiku: THaiku }) => {
  const { collections, haikus } = useHaikuStore();

  const handleClickTag = (tag: string) => {
    const updatedHaikuId =
      haikus.filter((h) => h.tags.includes(tag))[0]?.id ?? 1;
    selectedStore.set(updatedHaikuId);
    navigate(`/?collection=${tag}`);
  };

  return (
    <div className={styles.data}>
      <div>
        <h2 className={styles.dataTitle}>
          {haiku.date}{" "}
          <button
            onClick={() => {
              navigator.share({ url: window.location.href });
            }}
            arial-label="Botón para compartir el haiku"
          >
            <img src="/icons/share.svg" />
          </button>
        </h2>
        <div>
          {haiku.description?.map((l) => {
            return <p key={l}>{l}</p>;
          })}
        </div>
      </div>
      <div className={styles.tags}>
        {haiku.tags
          .filter((tag) => {
            return collections.includes(tag);
          })
          .map((tag) => {
            return (
              <button
                key={tag}
                onClick={() => {
                  handleClickTag(tag);
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
