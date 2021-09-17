import React, { useState, useEffect } from "react";
import styles from "../css/Login.module.css";
import avatar from "../imgs/avatar.png";
import { Link } from "react-router-dom";
import creqLib from "../clientRequests/creqLib";
import { useHistory } from "react-router-dom";
import { ModalSuccess, ModalError, Loader } from "../components/modal";

export function Login(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");

  const history = useHistory();

  function handleLoginChange(e) {
    setLogin(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    creqLib
      .creqLogin(login, password)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        setLoading(false);
        creqLib.creqAuthenticate(login, password).then((response) => {
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("loggedIn", true);
          setMessage("Zalogowano pomyślnie, zostaniesz przekierowany");
          setShowSuccess(true);
          setTimeout(() => {
            history.push("/");
          }, 2000);
        });
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        setLoading(false);
        setShowError(true);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <ModalSuccess
        showModal={showSuccess}
        setModal={setShowSuccess}
        message={message}
      />
      <ModalError
        showModal={showError}
        setModal={setShowError}
        message={message}
      />
      <Loader color="#000000" loading={loading} size={15} />
      <div className={styles.avatarContainer}>
        <img src={avatar} alt="avatar" className={styles.avatar} />
      </div>
      <div className={styles.formContainer}>
        <div>
          <label>Login</label>
          <input
            type="text"
            autoFocus
            required
            minLength="3"
            maxLength="20"
            value={login}
            onChange={handleLoginChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            required
            minLength="8"
            maxLength="20"
            placeholder="min. 8 znakow"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className={styles.newAccount}>
          <Link to="/create" className={styles.link}>
            Nie posiadam konta
          </Link>
        </div>
        <div>
          <input type="submit" value="Zaloguj" />
        </div>
      </div>
    </form>
  );
}
