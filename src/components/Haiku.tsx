import type { Haiku as THaiku } from "../const/haikus";
import styles from "./Haiku.module.scss";

const sizeToFontSize: Record<string, string> = {
  default: "1rem",
  xl: "2rem",
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
      id={String(haiku.order)}
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
        {showDate && (
          <span className={styles.date}>
            <i>{haiku.date}</i>
          </span>
        )}
      </div>
    </div>
  );
};
