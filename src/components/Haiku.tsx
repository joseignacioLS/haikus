import { navigate } from "astro:transitions/client";
import { modalStore } from "../store/Modal";
import type { THaiku } from "../types";
import { cleanHaiku, formatDate } from "../utils/text";
import { ShareButton } from "./ShareButton";
import { DetailModal } from "./DetailModal";
import styles from "./Haiku.module.scss";

const sizeToFontSize: Record<string, string> = {
  xl: "2rem",
  default: "1rem",
  s: ".75rem",
};

type Props = {
  haiku: THaiku;
  style?: Record<string, string>;
  size?: string;
  showDate?: boolean;
  detailed?: boolean;
};

export const Haiku = ({ haiku, style, size = "default", detailed }: Props) => {
  const openDescription = () => {
    modalStore.set(<DetailModal haiku={haiku} />);
  };
  return (
    <div
      style={{
        ...style,
        fontSize: sizeToFontSize[size] ?? sizeToFontSize.default,
      }}
      className={`${styles.haiku} ${detailed ? styles.detailed : ""}`}
      onClick={() => {
        !detailed && navigate(`${import.meta.env.BASE_URL}${haiku.id}`);
      }}
    >
      {detailed ? (
        <>
          <div className={styles.content}>
            {cleanHaiku(haiku.text)
              .split("\n")
              .map((l) => {
                return <p key={l}>{l}</p>;
              })}
          </div>
          <div className={styles.detail}>
            <p className={styles.date}>
              {formatDate(haiku.date).map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </p>
            {haiku.description && (
              <button
                className={`${styles.description}`}
                onClick={openDescription}
                disabled={!haiku.description}
              >
                Sobre este haiku
              </button>
            )}
            <ShareButton id={haiku.id} />
          </div>
        </>
      ) : (
        <button className={`naked ${styles.content}`}>
          {cleanHaiku(haiku.text)
            .split("\n")
            .map((l) => {
              return <p key={l}>{l}</p>;
            })}
        </button>
      )}
    </div>
  );
};
