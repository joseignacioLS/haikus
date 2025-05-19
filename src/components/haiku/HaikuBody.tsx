import { useHaikuStore } from "@/hooks/useHaikuStore";
import { useEffect, useRef, useState } from "react";
import styles from "./HaikuBody.module.scss";

const cleanLine = (line: string) => {
  return line.replace(/-/g, "").replace(/_/g, " ");
};

export const HaikuBody = ({ id, haiku }: { id?: number; haiku: string[] }) => {
  const [fontSize, setFontSize] = useState(0);
  const { maxHaikuLineLength } = useHaikuStore();
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!maxHaikuLineLength) return;
    if (!bodyRef.current) return;
    const { offsetWidth } = bodyRef.current;
    setFontSize((2.5 * offsetWidth) / maxHaikuLineLength);
  }, [maxHaikuLineLength]);

  return (
    <p ref={bodyRef} className={`${styles.haiku}`} id={String(id)}>
      {fontSize > 0 &&
        haiku.map((l) => {
          return (
            <span key={l} style={{ fontSize }}>
              {cleanLine(l)}
            </span>
          );
        })}
    </p>
  );
};
