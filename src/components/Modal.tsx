import { useStore } from "@nanostores/react";
import { modalStore } from "../store/Modal";
import styles from "./Modal.module.scss";

export const Modal = () => {
  const store = useStore(modalStore);
  const handleClose = () => {
    modalStore.set({
      ...store,
      isOpen: false,
    });
  };
  if (!store.isOpen) return <></>;
  return (
    <div className={styles.wrapper} onClick={handleClose}>
      <div
        className={styles.modal}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <button className={styles.closeBtn} onClick={handleClose}>
          X
        </button>
        {store.content}
      </div>
    </div>
  );
};
