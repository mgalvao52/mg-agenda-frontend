import { useState } from "react";
import Service from "../../services/service";
import styles from "./Login.module.css";
import Usuario from "../../model/Usuario";
import usuarioService from "../../services/usuarioService";

type ButtonProps = {
  setAuth: (user: Usuario) => void;
  auth: Usuario;
};

export default function Login({ auth, setAuth }: ButtonProps) {
  const [user, setUser] = useState<Usuario>(new Usuario());
  const [registerUser, setRegisterUser] = useState<Usuario>(new Usuario());

  function Login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    usuarioService
      .login(user.email, user.senha)
      .then((response) => {
        if (!response.error) {
          clearForm();
          setAuth(Service.isAuthenticated());
        } else {
          alert(response.message);
        }
      })
      .catch(() => {
        setAuth(Service.isAuthenticated());
      });
  }
  function clearForm() {
    setUser({ email: "", id: 0, nome: "", senha: "" });
  }
  function clearFormRegister() {
    setRegisterUser({ email: "", id: 0, nome: "", senha: "" });
  }
  function Register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    usuarioService.register(registerUser).then((response) => {
      if (!response.error) {
        clearFormRegister();
        setAuth(Service.isAuthenticated());
      } else {
        alert(response.message);
      }
    });
  }

  return (
    <div
      className={`${styles.container} ${auth.nome ? styles.closeLogin : ""}`}
    >
      <form
        action="post"
        className={styles.form_login}
        onSubmit={(e) => {
          Login(e);
        }}
      >
        <div className={styles.login}>
          <h3 className={styles.title}>Login</h3>
          <input
            id="login_email"
            type="email"
            name="email"
            placeholder="email..."
            className={styles.input}
            required
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            value={user.email}
          />
          <input
            type="password"
            name="password"
            id="login_password"
            placeholder="senha..."
            className={styles.input}
            required
            onChange={(e) => {
              setUser({ ...user, senha: e.target.value });
            }}
            value={user.senha}
          />
          <input type="submit" value={"Entrar"} className={styles.button} />
        </div>
      </form>
      <form
        action="post"
        className={styles.form_register}
        onSubmit={(e) => {
          Register(e);
        }}
      >
        <div className={styles.login}>
          <h3 className={styles.title}>Registrar</h3>
          <input
            type="text"
            name="nome"
            id="register_nome"
            placeholder="nome..."
            className={styles.input}
            required
            value={registerUser.nome}
            onChange={(e) => {
              setRegisterUser({ ...registerUser, nome: e.target.value });
            }}
          />
          <input
            type="email"
            name="email"
            id="register_email"
            placeholder="email..."
            className={styles.input}
            required
            value={registerUser.email}
            onChange={(e) => {
              setRegisterUser({ ...registerUser, email: e.target.value });
            }}
          />
          <input
            type="password"
            name="password"
            id="register_password"
            placeholder="senha..."
            className={styles.input}
            required
            value={registerUser.senha}
            onChange={(e) => {
              setRegisterUser({ ...registerUser, senha: e.target.value });
            }}
          />
          <input type="submit" value={"Confirmar"} className={styles.button} />
        </div>
      </form>
    </div>
  );
}
