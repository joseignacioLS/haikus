import styles from "./Toggle.module.scss";

export const Toggle = ({
  id,
  value,
  onChange,
}: {
  id?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) => {
  return (
    <label className={styles.toggle}>
      <input
        id={id}
        type="checkbox"
        checked={value}
        className={styles.input}
        onChange={(e) => {
          onChange(e.currentTarget.checked);
        }}
      />
      <span className={styles.slider}></span>
    </label>
  );
};
