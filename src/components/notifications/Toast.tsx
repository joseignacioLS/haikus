import { useStore } from "@nanostores/react";
import { toastStore } from "@store/Toast";
import { useEffect, useState } from "react";
import styles from "./Toast.module.scss";

export const Toast = () => {
  const DURATION = 5000;
  const $toast = useStore(toastStore);
  const [resetTimeout, setRestTimeout] = useState<NodeJS.Timeout | null>(null);

  const clearResetTimeout = () => {
    if (!resetTimeout) return;
    clearTimeout(resetTimeout);
  };

  useEffect(() => {
    if (!$toast) return;
    clearResetTimeout();
    const to = setTimeout(() => {
      toastStore.set(null);
      clearResetTimeout();
    }, DURATION);
    setRestTimeout(to);
    return () => {
      clearResetTimeout();
    };
  }, [$toast]);

  if (!$toast) return <></>;

  return (
    <div className={styles.wrapper}>
      <div
        key={$toast}
        className={styles.toast}
        style={{
          animationDuration: `${DURATION}ms`,
        }}
      >
        {$toast}
      </div>
    </div>
  );
};
