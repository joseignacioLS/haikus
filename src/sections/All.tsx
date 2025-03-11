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
          .filter((h) => !h.hide)
          .sort((a, b) => (a.order < b.order ? 1 : -1))
          .map((h) => {
            return (
              <WrapCenterer key={h.order}>
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
