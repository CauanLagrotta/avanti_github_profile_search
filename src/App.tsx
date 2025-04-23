import style from "./App.module.scss";
import github from "./assets/images/github.png";
import SearchIcon from "@mui/icons-material/Search";
// import { useState, useEffect } from "react";
import { User } from "./types/types";

export function App() {
  const getUser = async (username: User) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      console.log([data.login, data.avatar_url, data.bio]);

      return data;
    } catch (error) {
      console.log("Erro ao buscar o usuário:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as User | null;
    if (username) {
      await getUser(username);
    }
  };

  return (
    <main className={style.app}>
      <div className={style.display}>
        <div className={style.header}>
          <img src={github} className={style.github_logo} />
          <h1>
            Perfil <span>GitHub</span>
          </h1>
        </div>

        <form action="" onSubmit={handleSubmit} className={style.form}>
          <div className={style.inputWrapper}>
            <input
              type="text"
              name="username"
              placeholder="Digite um usuário do GitHub"
            />
            <button type="submit">
              <SearchIcon sx={{ color: "var(--white-100)" }} />
            </button>
          </div>
        </form>

        <div className={style.containerUserGithubDisplay}>
          <div className={style.userGithubDisplay}>
            <img src="https://github.com/cauanlagrotta.png" alt="" />

            <div className={style.containerUserInfo}>
              <h2>Cauan Lagrotta</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Excepturi molestias commodi adipisci, debitis delectus
                perferendis animi. Quis velit accusantium, quod soluta corrupti
                sed veritatis, optio ratione doloribus reiciendis magni ad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
