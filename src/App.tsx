import style from "./App.module.scss";
import github from "./assets/images/github.png";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { User } from "./types/types";
import CircularProgress from "@mui/material/CircularProgress";

export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const getUser = async (username: string): Promise<User | null> => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("Usuário não encontrado");
      }
      const data = await response.json();
      console.log(data);
      return data as User;
    } catch (error) {
      console.error("Erro ao buscar o usuário:", error);
      return null;
    }
  };

  const debouncedSearch = useCallback(
    debounce(async (username: string) => {
      if (username.trim() === "") {
        setUser(null);
        setHasSearched(false);
        return;
      }

      setLoading(true);
      setHasSearched(true);

      const userData = await getUser(username);
      setUser(userData);
      setLoading(false);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(usernameInput);
    return debouncedSearch.cancel;
  }, [usernameInput, debouncedSearch]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    debouncedSearch.cancel(); // Cancelar a pesquisa anterior

    if (usernameInput.trim() === "") {
      setUser(null);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    const userData = await getUser(usernameInput);
    setUser(userData);
    setLoading(false);
  };

  return (
    <>
      <main className={style.app}>
        <div className={style.display}>
          <div className={style.header}>
            <img src={github} className={style.github_logo} />
            <h1>
              Perfil <span>GitHub</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.inputWrapper}>
              <input
                type="text"
                name="username"
                placeholder="Digite um usuário do GitHub"
                value={usernameInput}
                onChange={(event) => setUsernameInput(event.target.value)}
              />
              <button type="submit">
                <SearchIcon sx={{ color: "var(--white-100)" }} />
              </button>
            </div>
          </form>

          {loading && (
            <div className={style.containerUserGithubDisplay}>
              <div className={style.userGithubDisplay}>
                <CircularProgress sx={{ color: "var(--blue-600)" }} />
              </div>
            </div>
          )}

          {user && !loading ? (
            <div className={style.containerUserGithubDisplay}>
              <div className={style.userGithubDisplay}>
                <img src={user.avatar_url} alt={user.login} />

                <div className={style.containerUserInfo}>
                  <h2>{user.login}</h2>
                  <p>{user.bio}</p>
                </div>
              </div>
            </div>
          ) : (
            !loading &&
            hasSearched &&
            !user &&
            usernameInput.trim() !== "" && (
              <div className={style.containerUserGithubDisplay}>
                <div className={style.userGithubDisplay}>
                  <p className={style.notFound}>
                    Nenhum perfil foi encontrado com esse nome de usuário. Tente
                    novamente
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </main>
    </>
  );
}
