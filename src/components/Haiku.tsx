import { navigate } from "astro:transitions/client";
import type { THaiku } from "../types";
import styles from "./Haiku.module.scss";
import { cleanHaiku, formatDate } from "../utils/text";

const sizeToFontSize: Record<string, string> = {
  xl: "2rem",
  default: "1rem",
  s: ".75rem",
};

const ShareButton = ({ id }: { id: number }) => {
  const copyShareLinkToClipboard = () => {
    navigator.clipboard
      .writeText(`${window.location.host}${import.meta.env.BASE_URL}${id}`)
      .then(
        () =>
          !(navigator as any).userAgentData?.mobile &&
          alert(`Se ha copiado la url del haiku #${id}`)
      );
  };
  return (
    <button
      className={styles.shareBtn}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        copyShareLinkToClipboard();
      }}
    >
      <img
        src={`${import.meta.env.BASE_URL}share.svg`}
        alt="Icono de compartir"
      />
    </button>
  );
};

type Props = {
  haiku: THaiku | undefined;
  style?: Record<string, string>;
  size?: string;
  showDate?: boolean;
  detailed?: boolean;
};

export const Haiku = ({ haiku, style, size = "default", detailed }: Props) => {
  if (!haiku) {
    navigate(import.meta.env.BASE_URL);
    return <></>;
  }
  return (
    <div
      style={{
        ...style,
        fontSize: sizeToFontSize[size] ?? sizeToFontSize.default,
      }}
      className={styles.haiku}
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
          </div>
        </>
      ) : (
        <button className={styles.content}>
          {cleanHaiku(haiku.text)
            .split("\n")
            .map((l) => {
              return <p key={l}>{l}</p>;
            })}
        </button>
      )}
      <ShareButton id={haiku.id} />
    </div>
  );
};
