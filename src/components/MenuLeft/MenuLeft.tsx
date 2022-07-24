import React, { useState } from "react";
import TarefaService from "../../services/tarefaService";
import Tarefa from "../../model/Tarefa";
import Calendar from "../Calendar/Calendar";
import styles from "./MenuLeft.module.css";
import { dateCompare } from "../../types/calendar";

type ButtonProps = {
  addNewTask: (task: Tarefa) => void;
  setCurrentDate: (date: Date) => void;
  tasks: Tarefa[];
};

export default function MenuLeft({
  addNewTask,
  setCurrentDate,
  tasks,
}: ButtonProps) {
  const [date, setDate] = useState(new Date());
  const [task, setTask] = useState<Tarefa>({
    id: 0,
    concluida: false,
    data: new Date(),
    descricao: "",
    titulo: "",
  });
  function setDateString(date: Date) {
    setDate(date);
    setTask({ ...task, data: date });
    setCurrentDate(date);
  }

  function addTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    TarefaService.insert(task).then((response) => {
      if (response.status === 201) {
        addNewTask(response.data);
        task.descricao = "";
        task.titulo = "";
      }
    });
  }

  return (
    <div className={`${styles.container}`}>
      <div className={styles.logo}>{"MG Agenda"}</div>
      <Calendar setDateString={setDateString} tasks={tasks} />
      <form
        className={styles.form}
        onSubmit={(e) => {
          addTask(e);
        }}
      >
        <div className={styles.div_date}>
          <label className={styles.date}>
            {date.toLocaleString("default", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </label>
        </div>
        <div className={styles.input}>
          <input
            name="titulo"
            maxLength={30}
            minLength={5}
            placeholder={"titulo..."}
            className={styles.description}
            onChange={(e) =>
              setTask({ ...task, titulo: e.currentTarget.value })
            }
            value={`${task.titulo}`}
            required
          ></input>
        </div>
        <div className={styles.input}>
          <input
            name="descricao"
            id=""
            maxLength={250}
            minLength={5}
            className={styles.description}
            placeholder={"descricão..."}
            onChange={(e) =>
              setTask({ ...task, descricao: e.currentTarget.value })
            }
            value={`${task.descricao}`}
            required
          ></input>
        </div>
        <div className={styles.btn_add}>
          <input
            type="submit"
            value="Adicionar Tarefa"
            className={styles.add}
          />
        </div>
      </form>
    </div>
  );
}
