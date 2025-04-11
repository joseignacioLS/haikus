import styles from "./Spinner.module.scss";

export const Spinner = ({ isOpen }: { isOpen?: boolean }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
};
