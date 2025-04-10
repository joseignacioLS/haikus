import { Spinner } from "@/components/notifications/Spinner";
import { TitledBlock } from "@components/structure/TitledBlock";
import { navigate } from "astro:transitions/client";
import { useHaikuStore } from "../hooks/useHaikuStore";
import { ERequestStatus } from "../types";
import styles from "./CollectionsCard.module.scss";

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
