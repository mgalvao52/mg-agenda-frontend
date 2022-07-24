import { useEffect, useState } from "react";
import Tarefa from "../../model/Tarefa";
import Task from "../Task/Task";
import styles from "./TaskList.module.css";
import { dateCompare } from "../../types/calendar";

type ButtonProps = {
  confirm: (id: Number) => void;
  cancel: (id: Number) => void;
  tasks: Tarefa[];
  date: Date;
};

export default function TaskList({
  confirm,
  cancel,
  tasks,
  date,
}: ButtonProps) {
  const [list, setList] = useState<Tarefa[]>([]);

  useEffect(() => {
    setList([...tasks]);
  }, [tasks]);

  return (
    <div>
      {/* <div className={styles.date}>
        <h2>
          {date.toLocaleString("default", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
        </h2>
      </div> */}
      <div className={styles.container}>
        {list.map((item, i) => {
          if (dateCompare(item.data, date) === 0) {
            return (
              <Task
                task={item}
                confirm={confirm}
                cancel={cancel}
                key={i}
                canCancel={dateCompare(new Date(), date) <= 0}
                canConfirm={dateCompare(new Date(), date) >= 0}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
