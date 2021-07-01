import { observer } from "mobx-react-lite";
import React, { FC, useState, useContext } from "react";
import { Context } from "../index";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
      ></input>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Пароль"
      ></input>
      <button onClick={() => store.login(email, password)}>Логин</button>
      <button onClick={() => store.registration(email, password)}>
        Регистрация
      </button>
    </div>
  );
};

export default observer(LoginForm);
