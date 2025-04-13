import { toastStore } from "@/store/Toast";
import type { SeasonResponse } from "@/types";
import { getSeasonsEvents } from "@/utils/seasons.api";
import { navigate } from "astro:transitions/client";
import React, { useEffect, useState } from "react";
import { Temporal } from "temporal-polyfill";
import styles from "./SeasonsClock.module.scss";
import { Spinner } from "./notifications/Spinner";

const SEASONS = [
  {
    name: "Verano",
    color: "#ffc3cd",
    initialMonth: 6,
    nextSeason: "Otoño",
  },
  {
    name: "Otoño",
    color: "#e84d2e",
    initialMonth: 9,
    nextSeason: "Invierno",
  },
  {
    name: "Invierno",
    color: "#134665",
    initialMonth: 12,
    nextSeason: "Primavera",
  },
  {
    name: "Primavera",
    color: "#fede87",
    initialMonth: 3,
    nextSeason: "Verano",
  },
];

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
      color: "white",
      range: 0,
    },
    {
      color: "white",
      range: 25,
    },
    {
      color: "white",
      range: 50,
    },
    {
      color: "white",
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
          newState[i] = {
            color:
              SEASONS.find((s) => s.initialMonth === e.month)?.color ?? "white",
            range: acc,
          };
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
        newState[i] = {
          color:
            SEASONS.find((s) => s.initialMonth === e.month)?.color ?? "white",
          range: acc,
        };
        return newState;
      });
      return acc + diff;
    }, 0);
  };

  const handleRequestError = () => {
    toastStore.set(
      "Ha habido un error cargando la información de las estaciones"
    );
    navigate("/");
  };

  const initClock = async () => {
    setIsLoading(true);
    const seasonsEvents = await getSeasonsEvents(today.year);
    if (seasonsEvents.length < 8) {
      handleRequestError();
      return;
    }
    setIsLoading(false);

    const relevantSeasonEvents = getRelevantSeasonEvents(seasonsEvents);

    const currentSeason = SEASONS.find(
      (s) => s.initialMonth === relevantSeasonEvents[0].month
    );

    const daysOfCurrentSeason = today.since(
      eventToPlainDate(relevantSeasonEvents[0])
    ).days;
    const daysToNextSeason = -today.since(
      eventToPlainDate(relevantSeasonEvents[1])
    ).days;
    setMessage(
      `Hoy es el día ${daysOfCurrentSeason} de ${currentSeason?.name.toLowerCase()}. Quedan ${daysToNextSeason} días hasta ${currentSeason?.nextSeason.toLowerCase()}.`
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
