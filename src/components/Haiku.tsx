import { modalStore } from "../store/Modal";
import type { Haiku as THaiku } from "../types";
import styles from "./Haiku.module.scss";

const sizeToFontSize: Record<string, string> = {
  xl: "1.5rem",
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
        modalStore.set({
          isOpen: true,
          content: <Haiku haiku={haiku} size="xl" detailed />,
        });
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
          <p>
            <b>Fecha del haiku:</b>
            <p>{haiku.date}</p>
          </p>
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
