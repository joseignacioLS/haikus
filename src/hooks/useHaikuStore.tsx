import { type THaiku } from "@/types";
import { collectionsStore, dateStore, haikusStore } from "@store/Haikus";
import { useEffect, useState } from "react";

import { Temporal } from "temporal-polyfill";

export const useHaikuStore = () => {
  const [data, setData] = useState<{
    haikus: THaiku[];
    collections: THaiku["tags"];
    date: Temporal.PlainDate;
  }>({
    haikus: [],
    collections: [],
    date: Temporal.Now.plainDateISO(),
  });

  useEffect(() => {
    const subscriptions = [
      haikusStore.subscribe((haikus) => {
        setData((oldState) => {
          return { ...oldState, haikus: [...haikus] };
        });
      }),
      collectionsStore.subscribe((collections) => {
        setData((oldState) => {
          return { ...oldState, collections: [...collections] };
        });
      }),
      dateStore.subscribe((date) => {
        setData((oldState) => {
          return { ...oldState, date };
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
