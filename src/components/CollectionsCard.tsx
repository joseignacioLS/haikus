import { navigate } from "astro:transitions/client";
import { useHaikuStore } from "../hooks/useHaikuStore";
import { ERequestStatus } from "../types";
import styles from "./CollectionsCard.module.scss";
import { Spinner } from "./Spinner";
import { TitledBlock } from "./TitledBlock";

export const CollectionsCard = () => {
  const { status, collections } = useHaikuStore();

  return (
    <TitledBlock title={<h2>Colecciones</h2>}>
      {status === ERequestStatus.LOADING && <Spinner />}
      {status === ERequestStatus.SUCCESS && (
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
      )}
    </TitledBlock>
  );
};
