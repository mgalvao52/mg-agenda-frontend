import Usuario from "../model/Usuario";

export default class Service {
  static getToken(): string | null {
    return sessionStorage.getItem("task-token");
  }
  static setToken(token: string): void {
    sessionStorage.setItem("task-token", token);
  }
  static removeToken() {
    const storageToken = this.getToken();
    if (storageToken) {
      sessionStorage.removeItem("task-token");
    }
  }
  static isAuthenticated(): Usuario {
    let usuario: Usuario = { id: 0, email: "", nome: "", senha: "" };
    try {
      const storageToken = this.getToken();
      if (storageToken) {
        let token = JSON.parse(window.atob(storageToken?.split(".")[1]));
        const { exp, name, id } = token;
        if (Date.now() < exp * 1000) {
          usuario.nome = name;
          usuario.id = id;
        } else {
          sessionStorage.removeItem("task-token");
        }
      }
    } catch (error) {
      console.log(error);
    }
    return usuario;
  }
}
