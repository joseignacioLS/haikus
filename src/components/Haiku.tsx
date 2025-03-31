import { useStore } from "@nanostores/react";
import { navigate } from "astro:transitions/client";
import { useEffect } from "react";
import { ERequestStatus, status } from "../store/Haikus";
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
  haiku: THaiku;
  style?: Record<string, string>;
  size?: string;
  showDate?: boolean;
  detailed?: boolean;
};

export const Haiku = ({ haiku, style, size = "default", detailed }: Props) => {
  const $status = useStore(status);

  const navigateToHome = () => {
    detailed && navigate("/");
  };

  useEffect(() => {
    if ($status === ERequestStatus.LOADING) return;
    if ($status === ERequestStatus.ERROR) {
      return navigateToHome();
    }
    if ($status === ERequestStatus.SUCCESS && haiku.id === -1) {
      return navigateToHome();
    }
  }, [haiku, $status]);

  const openDescription = () => {
    if (!haiku) return;
    modalStore.set(<DetailModal haiku={haiku} />);
  };

  if ($status === ERequestStatus.LOADING) return <Spinner />;

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
            <button
              className={`round`}
              onClick={openDescription}
              disabled={!haiku.description}
            >
              <img src="./info.svg" />
            </button>
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
