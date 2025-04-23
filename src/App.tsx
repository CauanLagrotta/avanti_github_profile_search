import style from "./App.module.scss";
import github from "./assets/images/github.png";
import SearchIcon from "@mui/icons-material/Search";

export function App() {
  return (
    <main className={style.app}>
      <div className={style.display}>
        <div className={style.header}>
          <img src={github} className={style.github_logo} />
          <h1>
            Perfil <span className="bold">GitHub</span>
          </h1>
        </div>

        <form action="submit" className={style.form}>
          <div className={style.inputWrapper}>
            <input type="text" placeholder="Digite um usuário do GitHub" />
            <button type="submit">
              <SearchIcon sx={{ color: "var(--white-100)" }} />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
