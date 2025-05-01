import { useHaikuStore } from "@/hooks/useHaikuStore";
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
    document
      .getElementById(String(firstHaikuOfDate.id))
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const generateDisplayDatesArray = (): Temporal.PlainDate[] => {
    const daysToNextSunday = 7 - today.dayOfWeek;
    const nextSunday = today.add({ days: daysToNextSunday });
    const WEEKS = 4;
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
    const dates = generateDisplayDatesArray();
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
    <TitledBlock title={<h2>Último Mes</h2>}>
      {data.data.length === 0 ? (
        <Spinner />
      ) : (
        <div className={styles.calendar}>
          {["L", "M", "X", "J", "V", "S", "D"].map((weekday) => {
            return <span key={weekday}>{weekday}</span>;
          })}
          {data.data.map(({ date: d, haikuCount }) => {
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
