import styles from "./HaikuBody.module.scss";

export const HaikuBody = ({ id, haiku }: { id?: number; haiku: string[] }) => {
  const cleanLine = (line: string) => {
    return line.replace(/-/g, "").replace(/_/g, " ");
  };
  return (
    <div className={`${styles.haiku}`} id={String(id)}>
      {haiku.map((l) => {
        return <p key={l}>{cleanLine(l)}</p>;
      })}
    </div>
  );
};
