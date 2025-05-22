import { HaikuBody } from "@/components/haiku/HaikuBody";
import { useHaikuStore } from "@/hooks/useHaikuStore";
import styles from "./HaikuList.module.scss";
import { navigate } from "astro:transitions/client";
import { Temporal } from "temporal-polyfill";
import { Spinner } from "@/components/notifications/Spinner";
import { useEffect, useRef, useState } from "react";
import { useEventListeners } from "@/hooks/useEventListeners";

export const HaikuList = ({
  collection,
  pageSize = 15,
}: {
  collection?: string;
  pageSize?: number;
}) => {
  const listRef = useRef(null);
  const [numberOfHaikusShown, setNumberOfHaikusShown] = useState(pageSize);
  const { haikus } = useHaikuStore();

  useEventListeners(
    document.querySelector("main"),
    {
      scroll: (e) => {
        const { scrollTop, scrollHeight, offsetHeight } = e.target;
        const distanceToBottom = scrollHeight - scrollTop - offsetHeight;
        if (distanceToBottom < 100 && numberOfHaikusShown < haikus.length) {
          setNumberOfHaikusShown((v) => v + pageSize);
        }
      },
    },
    []
  );

  useEffect(() => {
    setNumberOfHaikusShown(pageSize);
  }, [collection]);
  if (!haikus.length) {
    return <Spinner />;
  }
  return (
    <section ref={listRef} className={styles.haikuList}>
      <div
        className={`${styles.infoCollection} ${collection ? styles.show : ""}`}
      >
        {`Mostrando haikus de la colección '${collection}'`}
      </div>
      {haikus
        .filter(({ tags }) => {
          return !collection || tags.includes(collection);
        })
        .map(({ id, text, date, tags }, index) => {
          return (
            <article
              key={id}
              className={styles.haiku}
              style={{
                display: index < numberOfHaikusShown ? "grid" : "none",
              }}
            >
              <div className={styles.haikuData}>
                <h2>#{id}</h2>
                <p>
                  {Temporal.PlainDate.from(date).toLocaleString("es-ES", {
                    dateStyle: "medium",
                  })}
                </p>
              </div>
              <HaikuBody id={id} haiku={text} />
              <div className={styles.collections}>
                {tags.map((t) => {
                  return (
                    <button
                      key={t}
                      onClick={() => {
                        if (collection === t) {
                          return;
                        }
                        navigate(`?collection=${t}`);
                      }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </article>
          );
        })}
    </section>
  );
};
