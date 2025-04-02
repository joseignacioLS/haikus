import { useStore } from "@nanostores/react";
import { modalStore } from "../store/Modal";
import styles from "./Modal.module.scss";
import { useEffect } from "react";

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
          <img src={`/close.svg`} alt="Círculo con un aspa dentro" />
        </button>
        {store}
      </div>
    </div>
  );
};
