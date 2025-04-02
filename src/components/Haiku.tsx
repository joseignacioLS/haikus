import { navigate } from "astro:transitions/client";
import { modalStore } from "../store/Modal";
import type { THaiku } from "../types";
import { cleanHaiku, formatDate } from "../utils/text";
import { DetailModal } from "./DetailModal";
import styles from "./Haiku.module.scss";
import { ShareButton } from "./ShareButton";

type Props = {
  haiku: THaiku;
  detailed?: boolean;
};

export const Haiku = ({ haiku, detailed }: Props) => {
  const openDescription = () => {
    modalStore.set(<DetailModal haiku={haiku} />);
  };

  return (
    <div
      className={`${styles.haiku} ${detailed ? styles.detailed : ""}`}
      onClick={() => {
        !detailed && navigate(`/${haiku.id}`);
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
              <img src="/info.svg" />
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
