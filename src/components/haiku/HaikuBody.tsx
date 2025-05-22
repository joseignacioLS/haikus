import { useHaikuStore } from "@/hooks/useHaikuStore";
import { useEffect, useRef, useState } from "react";
import styles from "./HaikuBody.module.scss";

const cleanLine = (line: string) => {
  return line.replace(/-/g, "").replace(/_/g, " ");
};

export const HaikuBody = ({ id, haiku }: { id?: number; haiku: string[] }) => {
  const { maxHaikuLineLength } = useHaikuStore();
  const bodyRef = useRef<HTMLParagraphElement>(null);

  return (
    <p ref={bodyRef} className={`${styles.haiku}`} id={String(id)}>
      {haiku.map((l) => {
        return <span key={l}>{cleanLine(l)}</span>;
      })}
    </p>
  );
};
