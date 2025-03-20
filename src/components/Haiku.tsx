import { navigate } from "astro:transitions/client";
import type { THaiku } from "../types";
import styles from "./Haiku.module.scss";

const sizeToFontSize: Record<string, string> = {
  xl: "2rem",
  default: "1rem",
  s: ".75rem",
};

const cleanHaiku = (haiku: string): string => {
  return haiku.replace(/\-/g, "").replace(/_/g, " ");
};

const formatDate = (date: string) => {
  return date.slice(2).split("-");
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
  const copyShareLinkToClipboard = () => {
    navigator.clipboard
      .writeText(`${window.location.host}/haikus/${haiku.id}`)
      .then(
        () =>
          !(navigator as any).userAgentData?.mobile &&
          alert(`Se ha copiado la url del haiku #${haiku.id}`)
      );
  };
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
      <div className={styles.content}>
        {cleanHaiku(haiku.text)
          .split("\n")
          .map((l) => {
            return <p key={l}>{l}</p>;
          })}
      </div>
      {detailed && (
        <div className={styles.detail}>
          <p className={styles.date}>
            {formatDate(haiku.date).map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </p>
        </div>
      )}
      <button
        className={styles.shareBtn}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          copyShareLinkToClipboard();
        }}
      >
        <img src="/haikus/share.svg" alt="icono de compartir" />
      </button>
    </div>
  );
};
