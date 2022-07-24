import Usuario from "../model/Usuario";
import api from "../services/index";
import Service from "./service";
import Response from "../types/response";

export default class usuarioService {
  static async login(email: string, senha: string): Promise<Response<Usuario>> {
    let loggedIn = new Response<Usuario>(false);
    const data = await api.post("/usuario/login", { email, senha });

    const { message } = data.data;
    if (data.status === 200) {
      Service.setToken(message);
      loggedIn.data = Service.isAuthenticated();
    } else {
      loggedIn.error = true;
      loggedIn.message = message;
    }

    return loggedIn;
  }
  static async register(usuario: Usuario): Promise<Response<Usuario>> {
    let loggedIn = new Response<Usuario>(false);
    const data = await api.post("/usuario", usuario);
    if (data.status === 201) {
      loggedIn = await this.login(usuario.email, usuario.senha);
    } else {
      const { message } = data.data;
      loggedIn.error = true;
      loggedIn.message = message;
    }
    return loggedIn;
  }
  static async logout() {
    Service.removeToken();
  }
}
