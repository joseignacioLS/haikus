import { useEffect } from "react";
import { Carousel } from "../components/Carousel";
import { Haiku } from "../components/Haiku";
import { WrapCenterer } from "../components/WrapCenterer";
import haikus from "../const/haikus.json";
import styles from "./All.module.scss";
import { TitledBlock } from "../components/TitledBlock";

export const All = ({ id }: { id: string }) => {
  useEffect(() => {
    document.getElementById(id)?.scrollIntoView();
  }, [id]);
  return (
    <main>
      <TitledBlock
        title={<h2 style={{ viewTransitionName: "title-all" }}>Cronología</h2>}
      >
        <div className={styles.wrapper}>
          <Carousel
            style={{ viewTransitionName: "carousel" }}
            slides={haikus
              .filter(({ hide }) => !hide)
              .sort(({ id: aId }, { id: bId }) => (aId < bId ? 1 : -1))
              .map((h) => {
                return (
                  <WrapCenterer key={h.id}>
                    <Haiku haiku={h} size="xl" showDate />
                  </WrapCenterer>
                );
              })}
            vertical
          />
        </div>
      </TitledBlock>
    </main>
  );
};

export default All;
