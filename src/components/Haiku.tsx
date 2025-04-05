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

  return (
    <button className={`naked ${styles.wrapper}`}>
      <div className={`${styles.haiku}`} onClick={openDescription}>
        {haiku.text.map((l) => {
          return <p key={l}>{l}</p>;
        })}
      </div>
      {!fullpage && <span className={styles.id}>{`#${haiku.id}`}</span>}
    </button>
  );
};
