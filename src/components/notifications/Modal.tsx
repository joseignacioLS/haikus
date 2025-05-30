import { useStore } from "@nanostores/react";
import { modalStore } from "@store/Modal";
import { useEffect } from "react";
import styles from "./Modal.module.scss";

export const Modal = () => {
  const store = useStore(modalStore);
  const handleClose = () => {
    modalStore.set(null);
  };

  useEffect(() => {
    handleClose();
  }, [window.location.pathname]);

  if (!store) return <></>;
  return (
    <div className={styles.wrapper} onClick={handleClose}>
      <div
        className={styles.modal}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <button className={`naked ${styles.closeBtn}`} onClick={handleClose}>
          <img src={`/icons/close.svg`} alt="Círculo con un aspa dentro" />
        </button>
        <section className={styles.title}>{store.title}</section>
        <section>{store.body}</section>
      </div>
    </div>
  );
};
