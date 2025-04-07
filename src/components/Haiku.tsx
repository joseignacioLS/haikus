import { modalStore } from "../store/Modal";
import type { THaiku } from "../types";
import styles from "./Haiku.module.scss";
import { HaikuInfoModal } from "./HaikuInfoModal";

type Props = {
  haiku: THaiku;
  fullpage?: boolean;
};

export const Haiku = ({ haiku, fullpage }: Props) => {
  const openDescription = () => {
    modalStore.set(<HaikuInfoModal haiku={haiku} />);
  };

  if (fullpage) {
    return (
      <div className={`${styles.wrapper} ${styles.fullpage}`}>
        <div className={`${styles.haiku}`}>
          {haiku.text.map((l) => {
            return <p key={l}>{l}</p>;
          })}
        </div>
        <div className={styles.data}>
          <p className={styles.dataTitle}>{haiku.date}</p>
          <div>
            {haiku.description?.map((l) => {
              return <p key={l}>{l}</p>;
            })}
          </div>
          <div className={styles.tags}>
            {haiku.tags.map((tag) => {
              return <button key={tag}>{tag}</button>;
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <button className={`naked ${styles.wrapper}`}>
      <div className={`${styles.haiku}`} onClick={openDescription}>
        {haiku.text.map((l) => {
          return <p key={l}>{l}</p>;
        })}
      </div>
      <span className={styles.id}>{`#${haiku.id}`}</span>
    </button>
  );
};
