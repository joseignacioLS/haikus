import { Title } from "../components/Title";
import styles from "./About.module.scss";

export const About = () => {
  return (
    <>
      <Title showBackButton>
        <span
          style={{
            viewTransitionName: "about-title",
          }}
        >
          Sobre mí
        </span>
      </Title>
      <div className={styles.body}>
        <img
          src={`${import.meta.env.BASE_URL}me.webp`}
          alt="Fotografía de Jose, el autor de la página"
          style={{
            viewTransitionName: "jose-img",
          }}
        />
        <div style={{ viewTransitionName: "about-text" }}>
          <p>
            ¡Hola! Me llamo Jose, y has entrado en mi diario de haikus,
            ¡bienvenido/a!
          </p>
          <p>
            Para mi los haikus son una manera de plasmar lo que siento. Coger
            sensaciones y sentimientos concretos y convertirlos en algo pequeño
            y sencillo que los contenga y transmita.
          </p>
          <p>
            Además, me sirven de forma de diario. Muchos de los haikus que
            escribo reflejan el momento de mi vida por el que estoy pasando.
          </p>
          <p>
            Es fácil ver que lo que más me inspira es la melancolía, aunque
            trato de escribir también cuando estoy contento.
          </p>
          <p>
            No soy un experto ni tengo unos fuertes refentes, aunque me gusta
            mucho{" "}
            <a
              href="https://es.wikipedia.org/wiki/Matsuo_Bash%C5%8D"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bashō
            </a>{" "}
            y{" "}
            <a
              href="https://es.wikipedia.org/wiki/Masaoka_Shiki"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shiki
            </a>
            .
          </p>
          <p>
            Ahora mismo el haiku del que estoy más orgulloso es{" "}
            <a href={`${import.meta.env.BASE_URL}130`}>Sonríe el Maigmo</a>
          </p>
          <p>¡Espero que los disfrutes!</p>
        </div>
      </div>
    </>
  );
};

export default About;
