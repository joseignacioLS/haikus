import { showcaseStore } from "@/store/Showcase";
import type { THaiku } from "@/types";
import { useHaikuStore } from "@hooks/useHaikuStore";
import { navigate } from "astro:transitions/client";
import { useEffect } from "react";
import styles from "./Haiku.module.scss";
import { Swipeable } from "./structure/Swipeable";

const HaikuBody = ({ haiku }: { haiku: string[] }) => {
  const cleanLine = (line: string) => {
    return line.replace(/-/g, "").replace(/_/g, " ");
  };
  return (
    <div className={`${styles.haiku}`}>
      {haiku.map((l) => {
        return <p key={l}>{cleanLine(l)}</p>;
      })}
    </div>
  );
};

type Props = {
  haiku: THaiku;
  fullpage?: boolean;
};

export const Haiku = ({ haiku, fullpage }: Props) => {
  const { collections, haikus } = useHaikuStore();

  const openDescription = () => {
    navigate(`/${haiku.id}`);
  };

  const handleSwipe = (direction: "Right" | "Left") => {
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
    if (!fullpage) return;
    showcaseStore.set(haiku.id);
  }, [fullpage]);

  if (fullpage) {
    return (
      <Swipeable
        handleSwipe={handleSwipe}
        className={`${styles.wrapper} ${styles.fullpage}`}
      >
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
                      navigate(`/collection/${tag}`);
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
          </div>
        </div>
      </Swipeable>
    );
  }

  return (
    <div id={String(haiku.id)} className={`${styles.wrapper}`}>
      <button className={`naked`} onClick={openDescription}>
        <HaikuBody haiku={haiku.text} />
      </button>
      <h2 className={styles.id}>{`Haiku #${haiku.id}`}</h2>
    </div>
  );
};
