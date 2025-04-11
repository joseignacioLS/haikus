import type { SeasonResponse } from "@/types";
import { getSeasons } from "@/utils/seasons.api";
import React, { useEffect, useState } from "react";
import { Temporal } from "temporal-polyfill";
import styles from "./SeasonsClock.module.scss";
import { Spinner } from "./notifications/Spinner";

const MONTH_TO_COLOR: Record<number, string> = {
  6: "#ffc3cd",
  9: "#e84d2e",
  12: "#134665",
  3: "#fede87",
};

const MONTH_TO_SEASON: Record<number, string> = {
  6: "Verano",
  9: "Otoño",
  12: "Invierno",
  3: "Primavera",
};

const today = Temporal.Now.plainDateISO();

const eventToPlainDate = (e: { year: number; month: number; day: number }) => {
  return Temporal.PlainDate.from(
    `${e.year}-${String(e.month).padStart(2, "0")}-${String(e.day).padStart(
      2,
      "0"
    )}`
  );
};

const getRelevantSeasonEvents = (
  seasonsEvents: SeasonResponse["data"]
): SeasonResponse["data"] => {
  const previousEventIndex = seasonsEvents.findIndex((currentEvent, i) => {
    const nextEvent = seasonsEvents[i + 1];
    const currentDate = eventToPlainDate(currentEvent);
    const nextDate = eventToPlainDate(nextEvent);
    return (
      today.since(currentDate).sign === 1 && today.since(nextDate).sign === -1
    );
  });

  return seasonsEvents.slice(previousEventIndex, previousEventIndex + 4);
};

export const SeasonsClock = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [clockRotation, setClockRotation] = useState(0);
  const [seasons, setSeasons] = useState([
    {
      color: MONTH_TO_COLOR[6],
      range: 0,
    },
    {
      color: MONTH_TO_COLOR[9],
      range: 25,
    },
    {
      color: MONTH_TO_COLOR[12],
      range: 5,
    },
    {
      color: MONTH_TO_COLOR[3],
      range: 75,
    },
  ]);

  const adjustClockRotation = (
    relevantSeasonEvents: SeasonResponse["data"]
  ) => {
    const daysSinceLastEvent = today.since(
      eventToPlainDate(relevantSeasonEvents[0])
    ).days;
    setClockRotation(-(360 * daysSinceLastEvent) / 365);
  };

  const adjustSeasonColorAndPositions = (
    relevantSeasonEvents: SeasonResponse["data"]
  ) => {
    relevantSeasonEvents.reduce((acc, e, i) => {
      if (i === 3) {
        setSeasons((oldState) => {
          const newState = structuredClone(oldState);
          newState[i] = { color: MONTH_TO_COLOR[e.month], range: acc };
          return newState;
        });
        return acc;
      }
      const nextEvent = relevantSeasonEvents[i + 1];
      const currentDate = eventToPlainDate(e);
      const nextDate = eventToPlainDate(nextEvent);
      const diff = (nextDate.since(currentDate).days / 365) * 100;

      setSeasons((oldState) => {
        const newState = structuredClone(oldState);
        newState[i] = { color: MONTH_TO_COLOR[e.month], range: acc };
        return newState;
      });
      return acc + diff;
    }, 0);
  };
  const initClock = async () => {
    setIsLoading(true);
    const todayYear = today.year;
    const seasonsEvents = (
      await Promise.all([getSeasons(todayYear), getSeasons(todayYear + 1)])
    ).flat();

    setIsLoading(false);

    const relevantSeasonEvents = getRelevantSeasonEvents(seasonsEvents);

    setMessage(
      `Hoy es el día ${
        today.since(eventToPlainDate(relevantSeasonEvents[0])).days
      } de ${MONTH_TO_SEASON[relevantSeasonEvents[0].month]}`
    );

    adjustClockRotation(relevantSeasonEvents);
    adjustSeasonColorAndPositions(relevantSeasonEvents);
  };

  useEffect(() => {
    initClock();
  }, []);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.clock}>
        <div
          className={styles.orbit}
          style={
            {
              "--rotation": `${clockRotation}deg`,
              "--c1": seasons[0].color,
              "--c2": seasons[1].color,
              "--c3": seasons[2].color,
              "--c4": seasons[3].color,
              "--c1-pos": seasons[0].range + "%",
              "--c2-pos": seasons[1].range + "%",
              "--c3-pos": seasons[2].range + "%",
              "--c4-pos": seasons[3].range + "%",
            } as React.CSSProperties
          }
        ></div>
        <div className={styles.earth}></div>
        <div className={styles.sun}></div>
      </div>
      <p
        className={styles.message}
        style={{
          textDecorationColor: seasons[0].color,
        }}
      >
        {message}
      </p>
    </div>
  );
};
