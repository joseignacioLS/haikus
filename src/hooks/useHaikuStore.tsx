import { ERequestStatus, type THaiku } from "@/types";
import { collections, error, haikus, status } from "@store/Haikus";
import { useEffect, useState } from "react";

export const useHaikuStore = () => {
  const [data, setData] = useState<{
    haikus: THaiku[];
    status: ERequestStatus;
    error: any;
    collections: THaiku["tags"];
  }>({
    haikus: [],
    status: ERequestStatus.LOADING,
    error: null,
    collections: [],
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
      collections.subscribe((collections: any) => {
        setData((oldState) => {
          return { ...oldState, collections };
        });
      }),
    ];
    return () => {
      subscriptions.forEach((u) => u());
    };
  }, []);

  return data;
};
