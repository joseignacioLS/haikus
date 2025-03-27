import { useStore } from "@nanostores/react";
import { modalStore } from "../store/Modal";
import styles from "./Modal.module.scss";

export const Modal = () => {
  const store = useStore(modalStore);
  const handleClose = () => {
    modalStore.set(null);
  };
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
          <img
            src={`${import.meta.env.BASE_URL}close.svg`}
            alt="Círculo con un aspa dentro"
          />
        </button>
        {store}
      </div>
    </div>
  );
};
