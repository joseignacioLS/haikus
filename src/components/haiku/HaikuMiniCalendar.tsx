import { haikus } from "@/const/haikus";
import { useEffect, useState } from "react";
import { Temporal } from "temporal-polyfill";
import { Spinner } from "../notifications/Spinner";
import { TitledBlock } from "../structure/TitledBlock";
import styles from "./HaikuMiniCalendar.module.scss";

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
  const [data, setData] = useState<TData>({
    max: 0,
    data: [],
  });
  useEffect(() => {
    const daysToNextSunday = 7 - today.dayOfWeek;
    const nextSunday = today.add({ days: daysToNextSunday });
    const weeks = 4;
    const weekDiff = Array.from(new Array(weeks).keys()).map((k) => k);
    const daysDiff = weekDiff
      .map((w) => {
        return Array.from(new Array(7).keys())
          .reverse()
          .map((d) => d + w * 7);
      })
      .flat();

    const dates = daysDiff.map((diff) => {
      return nextSunday.subtract({ days: diff });
    });
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
    console.log(today.toString());
  }, [today]);

  return (
    <TitledBlock title={<h2>Calendario</h2>}>
      {data.data.length === 0 ? (
        <Spinner />
      ) : (
        <div className={styles.calendar}>
          {["L", "M", "X", "J", "V", "S", "D"].map((weekday) => {
            return <span key={weekday}>{weekday}</span>;
          })}
          {data.data.map(({ date, haikuCount }) => {
            return (
              <div
                className={`${styles.day} ${
                  today.toString() === date.toString() ? styles.today : ""
                }`}
                key={date.toString()}
              >
                <div
                  style={{
                    opacity: haikuCount / data.max,
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      )}
    </TitledBlock>
  );
};
