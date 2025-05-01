import type { THaiku } from "@/types";
import { navigate } from "astro:transitions/client";
import styles from "./HaikuMini.module.scss";
import { HaikuBody } from "./HaikuBody";

export const Haiku = ({ haiku }: { haiku: THaiku }) => {
  const visitDetail = () => {
    navigate(`/${haiku.id}`);
  };

  return (
    <button
      id={String(haiku.id)}
      className={`naked ${styles.wrapper}`}
      onClick={visitDetail}
    >
      <HaikuBody haiku={haiku.text} />
    </button>
  );
};
