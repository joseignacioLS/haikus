import { HaikuMini } from "@/components/haiku/HaikuMini";
import { Spinner } from "@/components/notifications/Spinner";
import { useEventListeners } from "@/hooks/useEventListeners";
import { selectedStore } from "@/store/Haikus";
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
    const newHaiku = haikuList[nextHaikuIndex];
    setSelectedHaiku({ ...newHaiku });
    selectedStore.set(newHaiku.id);
  };

  const handleKeyboardInput = ({ key }: KeyboardEvent) => {
    if (key === "ArrowRight") {
      handleChangeHaiku(1);
      return;
    }
    if (key === "ArrowLeft") {
      handleChangeHaiku(-1);
      return;
    }
  };

  useEffect(() => {
    const displayHaiku = haikuList.find((h) => h.id === selected);
    if (displayHaiku) {
      setSelectedHaiku({ ...displayHaiku });
      return;
    }
    setSelectedHaiku({ ...haikuList[0] });
  }, [haikuList, selected]);

  useEventListeners(
    {
      keydown: handleKeyboardInput,
    },
    [haikuList, selectedHaiku]
  );

  return (
    <section className={styles.wrapper}>
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
      {selectedHaiku ? <HaikuMini haiku={selectedHaiku} /> : <Spinner />}
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
