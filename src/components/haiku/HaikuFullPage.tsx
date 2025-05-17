import { useHaikuStore } from "@/hooks/useHaikuStore";
import { selectedStore } from "@/store/Haikus";
import type { THaiku } from "@/types";
import { navigate } from "astro:transitions/client";
import { HaikuBody } from "./HaikuBody";
import styles from "./HaikuFullPage.module.scss";

export const HaikuFullPage = ({ haiku }: { haiku: THaiku }) => {
  const { collections, haikus } = useHaikuStore();

  return (
    <div className={styles.wrapper}>
      <HaikuBody haiku={haiku.text} />
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
                    const updatedHaikuId =
                      haikus.filter((h) => h.tags.includes(tag))[0]?.id ?? 1;
                    selectedStore.set(updatedHaikuId);
                    navigate(`/?collection=${tag}`);
                  }}
                >
                  {tag}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};
