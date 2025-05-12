"use client";

import { selectedStore } from "@/store/Haikus";
import { TitledBlock } from "@components/structure/TitledBlock";
import { navigate } from "astro:transitions/client";
import { useHaikuStore } from "../hooks/useHaikuStore";
import styles from "./CollectionsCard.module.scss";
import { Spinner } from "./notifications/Spinner";

export const CollectionsCard = () => {
  const { collections, haikus, selected } = useHaikuStore();
  const currentCollection = new URL(window.location.href).searchParams.get(
    "collection"
  );

  const handleChangeCollection = (newCollection: string) => {
    if (currentCollection === newCollection) return;
    const updatedHaikuId =
      haikus.filter((h) => h.tags.includes(newCollection))[0]?.id ?? 1;
    selectedStore.set(updatedHaikuId);
    navigate(`/?collection=${newCollection}`);
  };

  const selectedHaiku = haikus.find((h) => h.id === selected);

  return (
    <TitledBlock title={<h2>Colecciones</h2>}>
      {collections.length > 0 ? (
        <div className={styles.tagList}>
          {collections.map((tag) => {
            return (
              <button
                key={tag}
                className={`rounded ${
                  selectedHaiku?.tags.includes(tag) ? styles.selected : ""
                }`}
                onClick={() => {
                  handleChangeCollection(tag);
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      ) : (
        <Spinner />
      )}
    </TitledBlock>
  );
};
