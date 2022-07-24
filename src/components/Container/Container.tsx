import MenuLeft from "../MenuLeft/MenuLeft";
import NavBar from "../NavBar/NavBar";
import styles from "./Container.module.css";
import TaskList from "../TaskList/TaskList";
import TarefaService from "../../services/tarefaService";
import { useEffect, useState } from "react";
import Tarefa from "../../model/Tarefa";
import Login from "../Login/Login";
import Service from "../../services/service";

export default function Container() {
  const [list, setList] = useState<Tarefa[]>([]);
  const [date, setDate] = useState(new Date());
  const [auth, setAuth] = useState(Service.isAuthenticated());
  function addNew(add: Tarefa) {
    setList([...list, { ...add }]);
  }
  function logOut() {
    console.log("logout");
    Service.removeToken();
    setAuth(Service.isAuthenticated());
  }
  const confirm = (id: Number) => {
    TarefaService.confirm(id).then((response) => {
      if (response.status === 204) {
        updateList(id);
      }
    });
  };
  const cancel = (id: Number) => {
    TarefaService.cancel(id).then((response) => {
      if (response.status === 200) {
        updateList(id);
      }
    });
  };
  function updateList(id: Number) {
    if (list.length > 0) {
      let index = list.findIndex((s) => s.id === id);
      list.splice(index, 1);
      setList([...list]);
    }
  }
  useEffect(() => {
    if (auth.nome) {
      TarefaService.getAll()
        .then((response) => {
          setList([...response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [auth.nome]);

  return (
    <div className={styles.container}>
      {auth.nome ? "" : <Login auth={auth} setAuth={setAuth} />}
      <div className={`${styles.header}`}>
        <MenuLeft addNewTask={addNew} setCurrentDate={setDate} tasks={list} />
      </div>
      <div className={`${styles.body}`}>
        <NavBar logOut={logOut} userName={auth.nome} />
        <TaskList confirm={confirm} cancel={cancel} tasks={list} date={date} />
      </div>
    </div>
  );
}
