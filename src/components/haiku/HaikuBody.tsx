import styles from "./HaikuBody.module.scss";

export const HaikuBody = ({
  haiku,
  interactive,
}: {
  haiku: string[];
  interactive?: boolean;
}) => {
  const cleanLine = (line: string) => {
    return line.replace(/-/g, "").replace(/_/g, " ");
  };
  return (
    <div className={`${styles.haiku} ${interactive ? styles.interactive : ""}`}>
      {haiku.map((l) => {
        return <p key={l}>{cleanLine(l)}</p>;
      })}
    </div>
  );
};
