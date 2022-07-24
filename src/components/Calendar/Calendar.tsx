import React, { useEffect, useState } from "react";
import { dateCompare, generateDateList, WeekDays } from "../../types/calendar";
import Tarefa from "../../model/Tarefa";
import styles from "./Calendar.module.css";

type ButtonProps = {
  setDateString: (date: Date) => void;
  tasks: Tarefa[];
};

export default function Calendar({ setDateString, tasks }: ButtonProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateList, setDateList] = useState(generateDateList(currentDate));

  function setMonth(next: boolean) {
    if (next) {
      setCurrentDate(
        new Date(currentDate.setMonth(currentDate.getMonth() + 1))
      );
    } else {
      setCurrentDate(
        new Date(currentDate.setMonth(currentDate.getMonth() - 1))
      );
    }
  }
  useEffect(() => {
    setDateList(generateDateList(currentDate));
  }, [currentDate]);

  function now() {
    return new Date();
  }

  function checkStatus(date: Date): string {
    if (tasks.length > 0) {
      const tempDate = tasks.filter(
        (s) =>
          new Date(s.data).getDate() === date.getDate() &&
          new Date(s.data).getMonth() === date.getMonth() &&
          new Date(s.data).getFullYear() === date.getFullYear()
      );

      if (tempDate.length > 0) {
        const compare = dateCompare(tempDate[0].data, now());
        switch (compare) {
          case -1:
            return styles.late;
          case 0:
            return styles.now;
          default:
            return styles.scheduled;
        }
      }
    }
    return "";
  }
  return (
    <div className={styles.container}>
      <div className={styles.month}>
        <button className={styles.previous} onClick={() => setMonth(false)}>
          {"<"}
        </button>
        <label className={styles.actual}>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </label>
        <button className={styles.next} onClick={() => setMonth(true)}>
          {">"}
        </button>
      </div>
      <table className={styles.calendar}>
        <thead className={styles.header}>
          <tr className={styles.weekname} key={"thead"}>
            {WeekDays().map((week, index) => {
              return <th key={`thead${index}`}>{week}</th>;
            })}
          </tr>
        </thead>
        <tbody className={styles.body}>
          {dateList.map((item, index) => {
            return (
              <tr key={`tbody${index}`} className={styles.weekDays}>
                {item.map((day, i) => {
                  return (
                    <td key={i}>
                      {" "}
                      <button
                        className={`${styles.day} ${
                          dateCompare(now(), day.date) === 0
                            ? `${styles.today}`
                            : ""
                        } ${day.enabled ? "" : styles.disable}
                         ${checkStatus(day.date)}`}
                        value={`${day.date.getDate()}`}
                        onClick={(e) =>
                          setDateString(
                            new Date(
                              day.date.getFullYear(),
                              day.date.getMonth(),
                              parseInt(e.currentTarget.value),
                              now().getHours(),
                              now().getMinutes(),
                              now().getSeconds()
                            )
                          )
                        }
                      >
                        {day.date.getDate()}
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
