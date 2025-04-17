import { ERequestStatus, type THaiku } from "@/types";
import { collections, haikus, status } from "@store/Haikus";
import { useEffect, useState } from "react";

export const useHaikuStore = () => {
  const [data, setData] = useState<{
    haikus: THaiku[];
    status: ERequestStatus;
    collections: THaiku["tags"];
  }>({
    haikus: [],
    status: ERequestStatus.LOADING,
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
