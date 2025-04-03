import { modalStore } from "../store/Modal";
import type { THaiku } from "../types";
import { cleanHaiku } from "../utils/text";
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

  return (
    <div className={`${styles.wrapper} `}>
      <div className={styles.haiku}>
        {haiku.text.map((l) => {
          return <p key={l}>{cleanHaiku(l)}</p>;
        })}
      </div>
      {!fullpage && <span className={styles.id}>{`#${haiku.id}`}</span>}
      <button
        className={`round ${styles.shareButton}`}
        onClick={openDescription}
      >
        <img src="/info.svg" />
      </button>
    </div>
  );
};
