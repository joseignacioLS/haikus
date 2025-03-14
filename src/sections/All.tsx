import { useEffect } from "react";
import { Carousel } from "../components/Carousel";
import { Haiku } from "../components/Haiku";
import { WrapCenterer } from "../components/WrapCenterer";
import { haikus } from "../const/haikus";

export const All = ({ id }: { id: string }) => {
  useEffect(() => {
    document.getElementById(id)?.scrollIntoView();
  }, [id]);
  return (
    <main>
      <h2 style={{ viewTransitionName: "title-all" }}>Cronología</h2>
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
    </main>
  );
};

export default All;
