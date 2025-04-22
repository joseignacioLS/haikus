import { type THaiku } from "@/types";
import { collections, haikus } from "@store/Haikus";
import { useEffect, useState } from "react";

export const useHaikuStore = () => {
  const [data, setData] = useState<{
    haikus: THaiku[];
    collections: THaiku["tags"];
  }>({
    haikus: [],
    collections: [],
  });

  useEffect(() => {
    const subscriptions = [
      haikus.subscribe((haikus) => {
        setData((oldState) => {
          return { ...oldState, haikus: [...haikus] };
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

  useEffect(() => {}, []);

  return data;
};
