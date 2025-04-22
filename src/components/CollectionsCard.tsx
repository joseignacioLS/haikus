import { TitledBlock } from "@components/structure/TitledBlock";
import { navigate } from "astro:transitions/client";
import { useHaikuStore } from "../hooks/useHaikuStore";
import styles from "./CollectionsCard.module.scss";

export const CollectionsCard = () => {
  const { collections } = useHaikuStore();

  return (
    <TitledBlock title={<h2>Colecciones</h2>}>
      <div className={styles.tagList}>
        {collections.map((tag) => {
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
