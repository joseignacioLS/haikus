import { navigate } from "astro:transitions/client";
import styles from "./About.module.scss";

export const About = () => {
  return (
    <div className={styles.body}>
      <img
        src={`/favicon.jpg`}
        alt="Avatar del autor de la página"
        style={{
          viewTransitionName: "avatar-img",
        }}
        onClick={() => {
          navigate("/seasonsclock");
        }}
      />
      <div style={{ viewTransitionName: "about-text" }}>
        <p>
          ¡Hola! Me llamo Jose, y has entrado en mi diario de haikus,
          ¡bienvenido/a!
        </p>
        <p>
          Para mi los haikus son una manera de plasmar lo que siento. Coger
          sensaciones y sentimientos concretos y convertirlos en algo pequeño y
          sencillo que los contenga y transmita.
        </p>
        <p>
          Además, me sirven de forma de diario. Muchos de los haikus que escribo
          reflejan el momento de mi vida por el que estoy pasando.
        </p>
        <p>
          Es fácil ver que lo que más me inspira es la melancolía, aunque trato
          de escribir también cuando estoy contento.
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
        <p>¡Espero que los disfrutes!</p>
      </div>
    </div>
  );
};

export default About;
