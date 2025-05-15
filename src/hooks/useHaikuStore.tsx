import { type THaiku } from "@/types";
import {
  collectionsStore,
  dateStore,
  haikusStore,
  selectedStore,
} from "@store/Haikus";
import { useEffect, useState } from "react";

import { Temporal } from "temporal-polyfill";

export const useHaikuStore = () => {
  const [data, setData] = useState<{
    haikus: THaiku[];
    collections: THaiku["tags"];
    date: Temporal.PlainDate;
    selected: THaiku["id"];
    maxHaikuLineLength: number;
  }>({
    haikus: [],
    collections: [],
    date: Temporal.Now.plainDateISO(),
    selected: 1,
    maxHaikuLineLength: 0,
  });

  useEffect(() => {
    const subscriptions = [
      haikusStore.subscribe((haikus) => {
        const maxHaikuLineLength = haikus.reduce((acc, curr) => {
          return Math.max(acc, ...curr.text.map((l) => l.length));
        }, 0);
        setData((oldState) => {
          return { ...oldState, haikus: [...haikus], maxHaikuLineLength };
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
      selectedStore.subscribe((selected) => {
        setData((oldState) => {
          return { ...oldState, selected };
        });
      }),
    ];
    return () => {
      subscriptions.forEach((u) => u());
    };
  }, []);

  return data;
};
