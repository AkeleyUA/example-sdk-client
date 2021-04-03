import React, { ChangeEvent, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AuthSDK, { TLoginBody, TUser } from "expample-sdk";

function App() {
  const [user, setUser] = useState<TUser | null>(null);
  const [err, setError] = useState<string | null>(null);
  const [form, setForm] = useState<TLoginBody>({
    email: "",
    password: "",
  });
  const onLogin = () => {
    AuthSDK.login(form);
  };

  const onChage = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    AuthSDK.user((data) => {
      setError(null);
      setUser(data);
    });
    AuthSDK.error((err) => {
      setUser(null);
      setError(err);
    });
  }, []);

  return (
    <div className="App">
      <input
        onChange={onChage}
        id="email"
        type="email"
        placeholder="Email"
        value={form.email}
      />
      <input
        onChange={onChage}
        id="password"
        type="password"
        placeholder="Password"
        value={form.password}
      />
      <button onClick={onLogin}>Login</button>
      {user && <p style={{ color: "green" }}>{JSON.stringify(user)}</p>}
      {err && <p style={{ color: "red" }}>{JSON.stringify(err)}</p>}
    </div>
  );
}

export default App;
