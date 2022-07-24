import styles from "./NavBar.module.css";

type ButtonProps = {
  logOut: () => void;
  userName: string;
};

export default function NavBar({ logOut, userName }: ButtonProps) {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <ul className={styles.navItens}>
          <li className={styles.navItem}>Tarefas</li>
        </ul>
        {userName ? (
          <>
            <label className={styles.user}>{userName}</label>
            <button
              className={styles.logout}
              onClick={(e) => {
                logOut();
              }}
            >
              Sair
            </button>
          </>
        ) : (
          <></>
        )}
      </nav>
    </div>
  );
}
