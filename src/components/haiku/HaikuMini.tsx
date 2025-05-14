import type { THaiku } from "@/types";
import { HaikuBody } from "./HaikuBody";
import styles from "./HaikuMini.module.scss";

export const HaikuMini = ({ haiku }: { haiku: THaiku }) => {
  return (
    <article id={String(haiku.id)} className={`${styles.wrapper}`}>
      <HaikuBody haiku={haiku.text} />
    </article>
  );
};
