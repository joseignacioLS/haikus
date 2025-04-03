import { useMemo } from "react";
import { useHaikuStore } from "../hooks/useHaikuStore";
import { TitledBlock } from "./TitledBlock";
import type { THaiku } from "../types";
import { navigate } from "astro:transitions/client";
import styles from "./CollectionsCard.module.scss";

export const CollectionsCard = () => {
  const { haikus } = useHaikuStore();
  const tags = useMemo(() => {
    return Array.from(
      new Set(
        haikus.reduce((tags: string[], h: THaiku) => {
          return [...tags, ...h.tags];
        }, [])
      )
    ).sort();
  }, [haikus]);
  return (
    <TitledBlock title={<h2>Colecciones</h2>} isCard>
      <div className={styles.tagList}>
        {tags.map((tag) => {
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
    </TitledBlock>
  );
};
