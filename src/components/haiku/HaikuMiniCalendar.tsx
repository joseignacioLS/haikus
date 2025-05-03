import { useHaikuStore } from "@/hooks/useHaikuStore";
import { useEffect, useState } from "react";
import { Temporal } from "temporal-polyfill";
import { Spinner } from "../notifications/Spinner";
import { TitledBlock } from "../structure/TitledBlock";
import styles from "./HaikuMiniCalendar.module.scss";
import { showcaseStore } from "@/store/Showcase";

type TDateData = {
  date: Temporal.PlainDate;
  haikuCount: number;
};
type TData = {
  max: number;
  data: TDateData[];
};
const today = Temporal.Now.plainDateISO();

export const HaikuMiniCalendar = () => {
  const { date: storeDate, haikus } = useHaikuStore();
  const [data, setData] = useState<TData>({
    max: 0,
    data: [],
  });

  const handleDayClick = (d: Temporal.PlainDate) => {
    const firstHaikuOfDate = haikus.find((h) => h.date === d.toString());
    if (firstHaikuOfDate === undefined) {
      return;
    }

    showcaseStore.set(firstHaikuOfDate.id);

    // document
    //   .getElementById(String(firstHaikuOfDate.id))
    //   ?.scrollIntoView({ behavior: "smooth" });
  };

  const generateDisplayDatesArray = (
    storeDate: Temporal.PlainDate
  ): Temporal.PlainDate[] => {
    const daysToNextSunday =
      today.weekOfYear !== storeDate.weekOfYear
        ? 14 - storeDate.dayOfWeek
        : 7 - storeDate.dayOfWeek;
    const nextSunday = storeDate.add({ days: daysToNextSunday });
    const WEEKS = 3;
    const weekDiff = Array.from(new Array(WEEKS).keys()).map((k) => k);
    const daysDiff = weekDiff
      .map((w) => {
        return Array.from(new Array(7).keys())
          .reverse()
          .map((d) => d + w * 7);
      })
      .flat();

    return daysDiff.map((diff) => {
      return nextSunday.subtract({ days: diff });
    });
  };

  useEffect(() => {
    const dates = generateDisplayDatesArray(storeDate);
    setData(() => {
      return dates.reduce(
        (acc: TData, date) => {
          const haikuCount = haikus.filter(
            (h) => h.date === date.toString()
          ).length;
          return {
            max: Math.max(acc.max, haikuCount),
            data: [
              ...acc.data,
              {
                date,
                haikuCount,
              },
            ],
          };
        },
        {
          max: 0,
          data: [],
        }
      );
    });
  }, [storeDate]);

  return (
    <TitledBlock title={<h2>{storeDate.toString()}</h2>}>
      {data.data.length === 0 ? (
        <Spinner />
      ) : (
        <div className={styles.calendar}>
          {["L", "M", "X", "J", "V", "S", "D"].map((weekday) => {
            return <span key={weekday}>{weekday}</span>;
          })}
          {data.data.map(({ date: d, haikuCount }) => {
            if (haikuCount === 0) {
              return (
                <div
                  key={d.toString()}
                  className={`${styles.day}  ${
                    today.toString() === d.toString() ? styles.today : ""
                  }`}
                >
                  <div>{haikuCount}</div>
                </div>
              );
            }
            const opacity = Math.max(
              haikuCount > 0 ? 0.25 : 0,
              data.max ? haikuCount / data.max : 0
            );
            return (
              <button
                className={`naked ${styles.day} ${
                  today.toString() === d.toString() ? styles.today : ""
                } ${
                  storeDate.toString() === d.toString() ? styles.selected : ""
                }`}
                key={d.toString()}
                onClick={() => haikuCount > 0 && handleDayClick(d)}
              >
                <div
                  style={{
                    opacity,
                  }}
                >
                  {haikuCount}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </TitledBlock>
  );
};
