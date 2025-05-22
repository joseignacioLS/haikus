import { useEffect } from "react";

export const useEventListeners = (
  listeners: Record<string, (params: any) => void>,
  dependencies: React.DependencyList
) => {
  useEffect(() => {
    Object.entries(listeners).forEach(([key, fn]) => {
      document.addEventListener(key, fn);
    });
    return () => {
      Object.entries(listeners).forEach(([key, fn]) => {
        document.removeEventListener(key, fn);
      });
    };
  }, [listeners, ...dependencies]);
};
