import { useHaikuStore } from "@/hooks/useHaikuStore";
import { showcaseStore } from "@/store/Showcase";
import type { THaiku } from "@/types";
import { navigate } from "astro:transitions/client";
import { useEffect } from "react";
import { Swipeable } from "../structure/Swipeable";
import { HaikuBody } from "./HaikuBody";
import styles from "./HaikuFullPage.module.scss";
import { selectedStore } from "@/store/Haikus";

export const HaikuFullPage = ({ haiku }: { haiku: THaiku }) => {
  const { collections, haikus } = useHaikuStore();

  const handleSwipe = (direction: string) => {
    const currentIndex = haikus.findIndex((h) => h.id === haiku.id);
    if (currentIndex === -1) return;
    if (direction === "Right") {
      if (currentIndex === haikus.length - 1) return;
      navigate(`/${haikus[currentIndex + 1].id}`, { history: "replace" });
    } else if (direction === "Left") {
      if (currentIndex === 0) return;
      navigate(`/${haikus[currentIndex - 1].id}`, { history: "replace" });
    }
  };
  useEffect(() => {
    showcaseStore.set(haiku.id);
  }, []);
  return (
    <Swipeable
      handleSwipe={handleSwipe}
      className={`${styles.wrapper} ${styles.fullpage}`}
    >
      <>
        <HaikuBody haiku={haiku.text} />
        <div className={styles.data}>
          <div>
            <h2 className={styles.dataTitle}>
              {haiku.date}{" "}
              <button
                onClick={() => {
                  navigator.share({ url: window.location.href });
                }}
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
      </>
    </Swipeable>
  );
};
