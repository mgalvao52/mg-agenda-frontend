import Tarefa from "../../model/Tarefa";
import styles from "./Task.module.css";
import { VscCheck, VscTrash } from "react-icons/vsc";

type ButtonProps = {
  confirm: (id: Number) => void;
  cancel: (id: Number) => void;
  task: Tarefa;
  canConfirm: Boolean;
  canCancel: Boolean;
};

export default function Task({
  confirm,
  cancel,
  task,
  canConfirm,
  canCancel,
}: ButtonProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>{task.titulo}</h4>
        <ul className={styles.list_button}>
          {canConfirm ? (
            <li className={styles.button}>
              <VscCheck
                color="#dfdfdf"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  confirm(task.id);
                }}
              />
            </li>
          ) : (
            ""
          )}
          {canCancel ? (
            <li
              className={styles.button}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                cancel(task.id);
              }}
            >
              <VscTrash color="#dfdfdf" />
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div className={styles.body}>
        <h5>
          {new Date(task.data).toLocaleString("default", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })}
        </h5>
        <label className={styles.description}>{task.descricao}</label>
      </div>
    </div>
  );
}
