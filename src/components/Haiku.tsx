import type { Haiku as THaiku } from "../types";
import styles from "./Haiku.module.scss";

const sizeToFontSize: Record<string, string> = {
  default: "1rem",
  xl: "1.5rem",
  s: ".75rem",
};

const cleanHaiku = (haiku: string): string => {
  return haiku.replace(/\-/g, "").replace(/_/g, " ");
};

export const Haiku = ({
  haiku,
  style,
  size = "default",
  onClick,
  showDate,
}: {
  haiku: THaiku;
  style?: Record<string, string>;
  size?: string;
  onClick?: () => void;
  showDate?: boolean;
}) => {
  return (
    <div
      id={String(haiku.id)}
      style={{
        ...style,
        fontSize: sizeToFontSize[size] ?? sizeToFontSize.default,
      }}
      className={styles.haiku}
      onClick={onClick}
    >
      <div className={styles.content}>
        {cleanHaiku(haiku.text)
          .split("\n")
          .map((l) => {
            return <p key={l}>{l}</p>;
          })}

        <span className={styles.date}>
          {showDate && <i>{haiku.date}</i>} <i>(#{haiku.id})</i>
        </span>
      </div>
    </div>
  );
};
