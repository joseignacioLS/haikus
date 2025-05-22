import { useEffect } from "react";

export const useEventListeners = (
  target: Document | HTMLElement | null,
  listeners: Record<string, (params: any) => void>,
  dependencies: React.DependencyList
) => {
  useEffect(() => {
    if (!target) return;
    Object.entries(listeners).forEach(([key, fn]) => {
      target.addEventListener(key, fn);
    });
    return () => {
      Object.entries(listeners).forEach(([key, fn]) => {
        target.removeEventListener(key, fn);
      });
    };
  }, [target, listeners, ...dependencies]);
};
