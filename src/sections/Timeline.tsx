import { Temporal } from "temporal-polyfill";
import haikus from "../const/haikus.json";
import styles from "./Timeline.module.scss";
import { useEffect, useRef, useState } from "react";

export const Timeline = () => {
  const highlightedDate = "";
  const [weeks, setWeeks] = useState<{ date: string; count: number }[][]>([]);
  const ref = useRef(null);
  useEffect(() => {
    const origin = Temporal.PlainDate.from(haikus[0].date);
    const today = Temporal.Now.plainDateISO();
    const monday = today.subtract({ days: today.dayOfWeek - 1 });
    const originMonday = origin.subtract({ days: origin.dayOfWeek - 1 });
    const diff = Math.ceil(monday.since(originMonday).days / 7);
    const newWeeks: { date: string; count: number }[][] = [];
    for (let i = 0; i <= diff; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        const date = originMonday.add({ weeks: i, days: j });
        week.push({
          date: date.toString(),
          count: haikus.filter((h) => h.date === date.toString()).length,
        });
      }
      newWeeks.push(week);
    }
    setWeeks(newWeeks);
  }, []);

  return (
    <div className={styles.timeline}>
      <div className={styles.scroller} ref={ref}>
        {weeks.map((week) => {
          return (
            <div key={week[0].date} className={styles.week}>
              {week.map(({ date, count }) => {
                return (
                  <span
                    key={date}
                    className={`${styles.day} ${
                      highlightedDate === date ? styles.selected : ""
                    }`}
                    style={{
                      backgroundColor: `rgba(255,255,255, ${0.05 + count / 5})`,
                    }}
                  ></span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
