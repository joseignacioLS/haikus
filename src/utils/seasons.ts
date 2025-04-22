
import { getSeasonsEvents } from "@/api/seasons.api";
import { SEASONS } from "@/const/seasons";
import type { Season, SeasonEntry } from "@/types";
import { Temporal } from "temporal-polyfill";

export const eventToPlainDate = (e: { year: number; month: number; day: number }): Temporal.PlainDate => {
  return Temporal.PlainDate.from(
    `${e.year}-${String(e.month).padStart(2, "0")}-${String(e.day).padStart(
      2,
      "0"
    )}`
  );
};

export const getRelevantSeasonEvents = (
  today: Temporal.PlainDate,
  seasonsEvents: SeasonEntry[]
): SeasonEntry[] => {
  const previousEventIndex = seasonsEvents.findIndex((currentEvent, i) => {
    const nextEvent = seasonsEvents[i + 1];
    if (!nextEvent) return false;
    const currentDate = eventToPlainDate(currentEvent);
    const nextDate = eventToPlainDate(nextEvent);
    return today.since(currentDate).days >= 0 && today.since(nextDate).days < 0;
  });

  return seasonsEvents.slice(previousEventIndex, previousEventIndex + 4);
};

export const getSeasonData = (today: Temporal.PlainDate, relevantSeasonEvents: SeasonEntry[]): {
  currentSeason: Season | undefined,
  daysOfCurrentSeason: number,
  daysToNextSeason: number
} => {
  const currentSeason = SEASONS.find(
    (s) => s.initialMonth === relevantSeasonEvents[0].month
  );
  const daysOfCurrentSeason =
    today.since(eventToPlainDate(relevantSeasonEvents[0])).days + 1;
  const daysToNextSeason = -today.since(
    eventToPlainDate(relevantSeasonEvents[1])
  ).days;
  return {
    currentSeason,
    daysOfCurrentSeason,
    daysToNextSeason
  }
}

export const generateSeasonColorAndRangeData = (
  relevantSeasonEvents: SeasonEntry[]
): { color: string, range: number }[] => {
  return relevantSeasonEvents.reduce(
    (acc: {
      diff: number; seasonData: {
        color: string,
        range: number
      }[]
    }, e, i) => {
      const currentDate = eventToPlainDate(e);

      const nextEvent = relevantSeasonEvents[(i + 1) % 4];
      const nextDate = eventToPlainDate(nextEvent);

      const diff = (nextDate.since(currentDate).days / 365) * 100;

      return {
        seasonData: [
          ...acc.seasonData,
          {
            color:
              SEASONS.find((s) => s.initialMonth === e.month)?.color ??
              "white",
            range: acc.diff,
          },
        ],
        diff: acc.diff + Math.max(0, diff),
      };
    },
    {
      diff: 0,
      seasonData: [],
    }
  ).seasonData;
};

export const requestSeasonsEvents = async (today: Temporal.PlainDate): Promise<SeasonEntry[]> => {
  const seasonsEvents = await getSeasonsEvents(today.year);
  if (seasonsEvents.length < 12) return [];
  const relevantSeasonEvents = getRelevantSeasonEvents(today, seasonsEvents);
  if (relevantSeasonEvents.length < 4) return [];
  return relevantSeasonEvents;
};

