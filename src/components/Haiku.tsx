import { navigate } from "astro:transitions/client";
import type { Haiku as THaiku } from "../types";
import styles from "./Haiku.module.scss";

const sizeToFontSize: Record<string, string> = {
  xl: "2rem",
  default: "1rem",
  s: ".75rem",
};

const cleanHaiku = (haiku: string): string => {
  return haiku.replace(/\-/g, "").replace(/_/g, " ");
};

export const Haiku = ({
  haiku,
  style,
  size = "default",
  detailed,
}: {
  haiku: THaiku;
  style?: Record<string, string>;
  size?: string;
  showDate?: boolean;
  detailed?: boolean;
}) => {
  return (
    <div
      id={String(haiku.id)}
      style={{
        ...style,
        fontSize: sizeToFontSize[size] ?? sizeToFontSize.default,
      }}
      className={styles.haiku}
      onClick={() => {
        !detailed && navigate(`${import.meta.env.BASE_URL}${haiku.id}`);
      }}
    >
      <div></div>
      <div className={styles.content}>
        {cleanHaiku(haiku.text)
          .split("\n")
          .map((l, i) => {
            return <p key={l}>{l}</p>;
          })}
      </div>
      <div className={styles.data}>
        <span className={styles.id}>
          <i>#{haiku.id}</i>
        </span>
      </div>
      {detailed && (
        <div style={{ gridColumn: "1 / 4" }}>
          <div>
            <b>Fecha del haiku:</b>
            <p>{haiku.date}</p>
          </div>
          <div>
            <p>
              <b>Tags del haiku:</b>
            </p>
            <p>{haiku.tags.join(", ")}</p>
          </div>
        </div>
      )}
    </div>
  );
};
