import { HaikuMini } from "@/components/haiku/HaikuMini";
import { Spinner } from "@/components/notifications/Spinner";
import { selectedStore } from "@/store/Haikus";
import { showcaseStore } from "@/store/Showcase";
import { type THaiku } from "@/types";
import { useHaikuStore } from "@hooks/useHaikuStore.tsx";
import { useEffect, useMemo, useState } from "react";
import styles from "./HaikuShowcase.module.scss";

type Props = {
  collection?: string;
};

export const HaikuShowcase = ({ collection }: Props) => {
  const { haikus, selected } = useHaikuStore();
  const [selectedHaiku, setSelectedHaiku] = useState<THaiku | undefined>(
    undefined
  );

  const haikuList = useMemo(
    () => haikus.filter((h) => !collection || h.tags.includes(collection)),
    [haikus, collection]
  );

  const handleChangeHaiku = (delta: number = 0) => {
    const currentHaikuIndex = haikuList.findIndex(
      (h) => h.id === selectedHaiku?.id
    );
    if (currentHaikuIndex === -1) return;
    const nextHaikuIndex = currentHaikuIndex + delta;
    if (nextHaikuIndex < 0 || nextHaikuIndex >= haikuList.length) return;
    setSelectedHaiku(haikuList[nextHaikuIndex]);
    selectedStore.set(haikuList[nextHaikuIndex].id);
  };

  useEffect(() => {
    const displayHaiku = haikuList.find((h) => h.id === selected);
    if (displayHaiku) {
      setSelectedHaiku(displayHaiku);
      return;
    }
    showcaseStore.set(undefined);
    setSelectedHaiku(haikuList[0]);
  }, [haikuList, selected]);

  return (
    <section className={styles.wrapper}>
      {selectedHaiku ? <HaikuMini haiku={selectedHaiku} /> : <Spinner />}
      <button
        className={`round ${styles.btnPrev}`}
        onClick={() => handleChangeHaiku(-1)}
        disabled={selectedHaiku?.id === haikuList[0]?.id}
        aria-label="Botón haiku anterior"
      >
        <img
          src="/icons/up.svg"
          alt="icono flecha apuntando a la izquierda"
        ></img>
      </button>
      <button
        className={`round ${styles.btnNext}`}
        onClick={() => handleChangeHaiku(1)}
        disabled={selectedHaiku?.id === haikuList.at(-1)?.id}
        aria-label="Botón haiku siguiente"
      >
        <img
          src="/icons/up.svg"
          alt="icono flecha apuntando a la derecha"
        ></img>
      </button>
    </section>
  );
};
