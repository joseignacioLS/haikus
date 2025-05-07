import { useHaikuStore } from "@/hooks/useHaikuStore";
import { useEffect, useRef, useState } from "react";
import styles from "./HaikuBody.module.scss";

export const HaikuBody = ({ id, haiku }: { id?: number; haiku: string[] }) => {
  const [fontSize, setFontSize] = useState(0);
  const { maxHaikuLineLength } = useHaikuStore();
  const bodyRef = useRef(null);

  const cleanLine = (line: string) => {
    return line.replace(/-/g, "").replace(/_/g, " ");
  };

  useEffect(() => {
    if (!maxHaikuLineLength) return;
    const { offsetWidth } = bodyRef.current as any;
    setFontSize((2.5 * offsetWidth) / maxHaikuLineLength);
  }, [maxHaikuLineLength]);

  return (
    <div ref={bodyRef} className={`${styles.haiku}`} id={String(id)}>
      {fontSize > 0 &&
        haiku.map((l) => {
          return (
            <p key={l} style={{ fontSize }}>
              {cleanLine(l)}
            </p>
          );
        })}
    </div>
  );
};
