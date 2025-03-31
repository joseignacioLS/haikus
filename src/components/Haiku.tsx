import { useStore } from "@nanostores/react";
import { navigate } from "astro:transitions/client";
import { useEffect, useState } from "react";
import { data } from "../store/Data";
import { modalStore } from "../store/Modal";
import type { THaiku } from "../types";
import { cleanHaiku, formatDate } from "../utils/text";
import { DetailModal } from "./DetailModal";
import styles from "./Haiku.module.scss";
import { ShareButton } from "./ShareButton";
import { Spinner } from "./Spinner";

const sizeToFontSize: Record<string, string> = {
  xl: "2rem",
  default: "1rem",
  s: ".75rem",
};

type Props = {
  id: THaiku["id"] | undefined;
  style?: Record<string, string>;
  size?: string;
  showDate?: boolean;
  detailed?: boolean;
};

export const Haiku = ({ id, style, size = "default", detailed }: Props) => {
  const haikus = useStore(data);
  const [haiku, setHaiku] = useState<THaiku | null>(null);

  useEffect(() => {
    if (haikus.length === 0) return;
    const selectedHaiku = haikus.find((h) => h.id === id && h.show) ?? null;
    if (!selectedHaiku) {
      detailed && navigate("/");
      return;
    }
    setHaiku(selectedHaiku);
  }, [id, haikus]);

  const openDescription = () => {
    if (!haiku) return;
    modalStore.set(<DetailModal haiku={haiku} />);
  };

  if (!haiku)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner />
      </div>
    );

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
          <div
            className={styles.content}
            style={{
              viewTransitionName: `haiku-content-${haiku.id}`,
            }}
          >
            {haiku.text.map((l, i) => {
              return <p key={l}>{cleanHaiku(l)}</p>;
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
        <>
          <span
            className={styles.id}
            style={{
              viewTransitionName: `haiku-id-${haiku.id}`,
            }}
          >{`#${haiku.id}`}</span>
          <button className={`naked ${styles.content}`}>
            <div>
              {haiku.text.map((l, i) => {
                return <p key={l}>{cleanHaiku(l)}</p>;
              })}
            </div>
          </button>
        </>
      )}
    </div>
  );
};
