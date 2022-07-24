import Tarefa from "../model/Tarefa";
import api from "./index";
import Service from "./service";
export default class TarefaService {
  static getAll() {
    const token = Service.getToken();
    return api.get<Tarefa[]>("/tarefa/usuario/lista", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  static insert(tarefa: Tarefa) {
    const token = Service.getToken();
    return api.post<Tarefa>("/tarefa", tarefa, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  static update(tarefa: Tarefa) {
    const token = Service.getToken();
    return api.put("/tarefa", tarefa, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  static confirm(id: Number) {
    const token = Service.getToken();
    return api.put(
      `/tarefa/finaliza/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  static cancel(id: Number) {
    const token = Service.getToken();
    return api.delete(`/tarefa/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
