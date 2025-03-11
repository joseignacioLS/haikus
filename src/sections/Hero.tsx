import { navigate } from "astro:transitions/client";
import { Bento } from "../components/Bento";
import { Carousel } from "../components/Carousel";
import { Haiku } from "../components/Haiku";
import { TitledBlock } from "../components/TitledBlock";
import { haikus } from "../const/haikus";
import { WrapCenterer } from "../components/WrapCenterer";

export const Hero = () => {
  const todaysHaiku = haikus.reduce((last, h) =>
    last.order > h.order ? last : h
  );
  const specialHaiku = haikus.find((h) => h.selected) ?? {
    text: "",
    order: 0,
    date: "",
    selected: true,
    tags: [],
    hide: false,
  };

  return (
    <main>
      <Bento
        colors={{
          main: "#A6719230",
          sideUp: "#A6719230",
          sideDown: "#A6719230",
          bottom: "#A6719230",
        }}
        main={
          <TitledBlock title={<h2>Último Haiku</h2>}>
            <WrapCenterer>
              <Haiku haiku={todaysHaiku} size="xl" />
            </WrapCenterer>
          </TitledBlock>
        }
        sideUp={
          <TitledBlock
            title={
              <h2 style={{ viewTransitionName: "title-all" }}>Cronología</h2>
            }
            bottomRighted
          >
            <Carousel
              randomize
              style={{ viewTransitionName: "carousel" }}
              vertical
              slides={haikus
                .filter((h) => !h.hide)
                .sort((a, b) => (a.order < b.order ? 1 : -1))
                .map((haiku) => {
                  return (
                    <WrapCenterer key={haiku.order}>
                      <Haiku
                        haiku={haiku}
                        onClick={() => {
                          navigate(
                            `${import.meta.env.BASE_URL}all#${haiku.order}`
                          );
                        }}
                        showDate
                        size="s"
                      />
                    </WrapCenterer>
                  );
                })}
            ></Carousel>
          </TitledBlock>
        }
        sideDown={
          <TitledBlock title={<h2>Destacado</h2>} bottomRighted>
            <WrapCenterer>
              <Haiku haiku={specialHaiku} showDate size="s" />
            </WrapCenterer>
          </TitledBlock>
        }
        bottom={
          <TitledBlock
            title={<h2 style={{ viewTransitionName: "title-about" }}>About</h2>}
          >
            <p>
              ¡Hola! Soy Jose. Escribir haikus es una forma de expresarme y de
              llevar alguna forma de diario.
            </p>
            <p>¡Espero que los disfrutes!</p>
          </TitledBlock>
        }
      />
    </main>
  );
};

export default Hero;
