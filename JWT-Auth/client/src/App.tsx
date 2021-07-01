import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, FC, useState } from "react";
import LoginForm from "./components/LoginForm";
import { Context } from "./index";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const responce = await UserService.fetchUsers();
      setUsers(responce.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!store.isAuth) {
    return (
      <div>
        <LoginForm />
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
    );
  }

  return (
    <div>
      <h1>
        {store.isAuth
          ? `Пользователь авторизован ${store.user.email}`
          : "Авторизуйтесь"}
      </h1>
      <h1>
        {store.user.isActivated
          ? "Аккаунт подтверждён по почте"
          : "Подтвердите аккаунт"}
      </h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
      <div>
        {users.map((user) => (
          <div key={user.email}>{user.email}</div>
        ))}
      </div>
    </div>
  );
};

export default observer(App);
