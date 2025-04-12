import type { THaiku } from "@/types";
import { HaikuInfoModal } from "@components/HaikuInfoModal";
import { useHaikuStore } from "@hooks/useHaikuStore";
import { modalStore } from "@store/Modal";
import { navigate } from "astro:transitions/client";
import styles from "./Haiku.module.scss";

const HaikuBody = ({ haiku }: { haiku: string[] }) => {
  const cleanLine = (line: string) => {
    return line.replace(/-/g, "").replace(/_/g, " ");
  };
  return (
    <div className={`${styles.haiku}`}>
      {haiku.map((l) => {
        return <p key={l}>{cleanLine(l)}</p>;
      })}
    </div>
  );
};

type Props = {
  haiku: THaiku;
  fullpage?: boolean;
};

export const Haiku = ({ haiku, fullpage }: Props) => {
  const { collections } = useHaikuStore();
  const openDescription = () => {
    modalStore.set(<HaikuInfoModal haiku={haiku} />);
  };

  if (fullpage) {
    return (
      <div className={`${styles.wrapper} ${styles.fullpage}`}>
        <HaikuBody haiku={haiku.text} />
        <div className={styles.data}>
          <p className={styles.dataTitle}>{haiku.date}</p>
          <div>
            {haiku.description?.map((l) => {
              return <p key={l}>{l}</p>;
            })}
          </div>
          <div className={styles.tags}>
            {haiku.tags
              .filter((tag) => {
                return collections.includes(tag);
              })
              .map((tag) => {
                return (
                  <button
                    key={tag}
                    onClick={() => {
                      navigate(`/collection/${tag}`);
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <button className={`naked ${styles.wrapper}`} onClick={openDescription}>
      <HaikuBody haiku={haiku.text} />
      <span className={styles.id}>{`#${haiku.id}`}</span>
    </button>
  );
};
