import { Bento } from "../components/Bento";
import { Carousel } from "../components/Carousel";
import { Haiku } from "../components/Haiku";
import { TitledBlock } from "../components/TitledBlock";
import { WrapCenterer } from "../components/WrapCenterer";
import haikus from "../const/haikus.json";

export const Hero = () => {
  const specialHaiku = haikus.filter((h) => h.selected) ?? {
    text: "",
    id: 0,
    date: "",
    selected: true,
    tags: [],
    hide: false,
  };

  return (
    <main>
      <Bento
        colors={{
          main: "#FFFFFF10",
          sideUp: "#FFFFFF10",
          sideDown: "#FFFFFF10",
          bottom: "#FFFFFF10",
        }}
        main={
          <TitledBlock title={<h2>Destacados</h2>}>
            <Carousel
              vertical
              slides={haikus
                .filter((h) => !h.hide && h.selected)
                .sort(({ id: aId }, { id: bId }) => (aId < bId ? 1 : -1))
                .map((haiku) => {
                  return (
                    <WrapCenterer key={haiku.id}>
                      <Haiku haiku={haiku} showDate size="xl" />
                    </WrapCenterer>
                  );
                })}
            ></Carousel>
          </TitledBlock>
        }
        sideUp={
          <img
            style={{
              minWidth: "calc(100% + 2rem)",
              minHeight: "calc(100% + 2rem)",
              objectFit: "cover",
              overflow: "hidden",
              viewTransitionName: "jose-img",
            }}
            src="/haikus/me.webp"
            alt="Fotografía de Jose, el autor de la página"
          />
        }
        sideDown={
          <TitledBlock title={<h2>Todos</h2>} bottomRighted>
            <Carousel
              vertical
              slides={haikus
                .filter((h) => !h.hide)
                .sort(({ id: aId }, { id: bId }) => (aId < bId ? 1 : -1))
                .map((haiku) => {
                  return (
                    <WrapCenterer key={haiku.id}>
                      <Haiku haiku={haiku} showDate size="s" />
                    </WrapCenterer>
                  );
                })}
            ></Carousel>
          </TitledBlock>
        }
        bottom={
          <TitledBlock
            title={
              <a href={`${import.meta.env.BASE_URL}about`}>
                <h2 style={{ viewTransitionName: "title-about" }}>Sobre mi</h2>
              </a>
            }
          >
            <p
              style={{
                viewTransitionName: "about-text",
              }}
            >
              ¡Hola! Soy Jose. Escribir haikus es una forma de expresarme y de
              llevar alguna forma de diario. ¡Espero que los disfrutes!
            </p>
          </TitledBlock>
        }
      />
    </main>
  );
};

export default Hero;
