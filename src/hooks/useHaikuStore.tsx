import { useEffect, useState } from "react";
import { error, haikus, status } from "../store/Haikus";
import { ERequestStatus, type THaiku } from "../types";

export const useHaikuStore = () => {
  const [data, setData] = useState<{
    haikus: THaiku[];
    status: ERequestStatus;
    error: any;
  }>({
    haikus: [],
    status: ERequestStatus.LOADING,
    error: null,
  });

  useEffect(() => {
    const subscriptions = [
      haikus.subscribe((haikus) => {
        setData((oldState) => {
          return { ...oldState, haikus: [...haikus] };
        });
      }),
      status.subscribe((status: ERequestStatus) => {
        setData((oldState) => {
          return { ...oldState, status };
        });
      }),
      error.subscribe((error: any) => {
        setData((oldState) => {
          return { ...oldState, error };
        });
      }),
    ];
    return () => {
      subscriptions.forEach((u) => u());
    };
  }, []);

  return data;
};
