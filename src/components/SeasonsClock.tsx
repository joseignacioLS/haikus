import { toastStore } from "@/store/Toast";
import type { SeasonEntry } from "@/types";
import {
  eventToPlainDate,
  generateSeasonColorAndRangeData,
  getSeasonData,
  requestSeasonsEvents,
} from "@/utils/seasons";
import { navigate } from "astro:transitions/client";
import React, { useEffect, useState } from "react";
import { Temporal } from "temporal-polyfill";
import styles from "./SeasonsClock.module.scss";
import { Spinner } from "./notifications/Spinner";

const today = Temporal.Now.plainDateISO();

export const SeasonsClock = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [clockRotation, setClockRotation] = useState(0);
  const [seasons, setSeasons] = useState<{ color: string; range: number }[]>(
    []
  );

  const adjustClockRotation = (relevantSeasonEvents: SeasonEntry[]) => {
    const daysSinceLastEvent = today.since(
      eventToPlainDate(relevantSeasonEvents[0])
    ).days;
    setClockRotation(-(360 * daysSinceLastEvent) / 365);
  };

  const adjustSeasonColorAndPositions = (
    relevantSeasonEvents: SeasonEntry[]
  ) => {
    const seasonData = generateSeasonColorAndRangeData(relevantSeasonEvents);
    setSeasons(seasonData);
  };

  const handleRequestError = () => {
    toastStore.set(
      "Ha habido un error cargando la información de las estaciones"
    );
    navigate("/", { history: "replace" });
  };

  const initMessage = (relevantSeasonEvents: SeasonEntry[]) => {
    const { currentSeason, daysOfCurrentSeason, daysToNextSeason } =
      getSeasonData(today, relevantSeasonEvents);
    setMessage(
      `Hoy es el día ${daysOfCurrentSeason} de ${currentSeason?.name.toLowerCase()}. Queda${
        daysToNextSeason > 1 ? "n" : ""
      } ${daysToNextSeason} día${
        daysToNextSeason > 1 ? "s" : ""
      } hasta ${currentSeason?.nextSeason.toLowerCase()}.`
    );
  };

  const initClock = async () => {
    setIsLoading(true);
    const relevantSeasonEvents = await requestSeasonsEvents(today);
    setIsLoading(false);
    if (relevantSeasonEvents.length === 0) {
      handleRequestError();
      return;
    }
    initMessage(relevantSeasonEvents);
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
