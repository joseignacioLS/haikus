import type { THaiku } from "@/types";
import { HaikuBody } from "./HaikuBody";
import { HaikuData } from "./HaikuData";
import styles from "./HaikuFullPage.module.scss";

export const HaikuFullPage = ({ haiku }: { haiku: THaiku }) => {
  return (
    <div className={styles.wrapper}>
      <HaikuBody haiku={haiku.text} />
      <HaikuData haiku={haiku} />
    </div>
  );
};
