import type { THaiku } from "@/types";
import { navigate } from "astro:transitions/client";
import styles from "./HaikuMini.module.scss";
import { HaikuBody } from "./HaikuBody";

export const Haiku = ({ haiku }: { haiku: THaiku }) => {
  const openDescription = () => {
    navigate(`/${haiku.id}`);
  };

  return (
    <div id={String(haiku.id)} className={`${styles.wrapper}`}>
      <button className={`naked`} onClick={openDescription}>
        <HaikuBody haiku={haiku.text} interactive />
      </button>
      <h2 className={styles.id}>{`Haiku #${haiku.id}`}</h2>
    </div>
  );
};
