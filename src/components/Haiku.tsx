import { modalStore } from "../store/Modal";
import type { THaiku } from "../types";
import { cleanHaiku } from "../utils/text";
import { DetailModal } from "./DetailModal";
import styles from "./Haiku.module.scss";

type Props = {
  haiku: THaiku;
  fullpage?: boolean;
};

export const Haiku = ({ haiku, fullpage }: Props) => {
  const openDescription = () => {
    modalStore.set(<DetailModal haiku={haiku} />);
  };

  return (
    <div className={`${styles.haiku} `}>
      <div className={styles.content}>
        {haiku.text.map((l) => {
          return <p key={l}>{cleanHaiku(l)}</p>;
        })}
      </div>
      <div className={styles.detail}>
        {!fullpage && <span className={styles.id}>{`#${haiku.id}`}</span>}
        <button
          className={`round`}
          onClick={openDescription}
        >
          <img src="/info.svg" />
        </button>
      </div>
    </div>
  );
};
