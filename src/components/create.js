import React, { useState } from "react";
import avatar from "../imgs/avatar.png";
import styles from "../css/Create.module.css";
import creqLib from "../clientRequests/creqLib";
import { useHistory } from "react-router-dom";
import { ModalSuccess, ModalError, Loader } from "../components/modal";

export function Create(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");

  const history = useHistory();

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  function handleLoginChange(e) {
    setLogin(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSuccess(response) {
    setLoading(false);
    setMessage(response.data);
    setShowSuccess(true);
    setTimeout(() => {
      history.push("/shop");
    }, 3000);
  }

  function handleError(error) {
    setLoading(false);
    setMessage(error.response.data.message);
    setShowError(true);
    setTimeout(() => {
      history.push("/");
    }, 3000);
  }

  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    creqLib
      .creqCreateNewAccount(firstName, lastName, login, password, email)
      .then((response) => handleSuccess(response))
      .catch((error) => handleError(error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <ModalSuccess
        showModal={showSuccess}
        message={message}
        setModal={setShowSuccess}
      />
      <ModalError
        showModal={showError}
        message={message}
        setModal={setShowError}
      />
      <Loader color="#000000" loading={loading} size={15} />
      <div className={styles.avatarContainer}>
        <img src={avatar} alt="avatar" className={styles.avatar} />
      </div>
      <div className={styles.formContainer}>
        <div>
          <label>Imie</label>
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            autoFocus
            maxLength="20"
            minLength="3"
            required
          />
        </div>
        <div>
          <label>Nazwisko</label>
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            maxLength="20"
            minLength="3"
            required
          />
        </div>
        <div>
          <label>Login</label>
          <input
            type="text"
            value={login}
            onChange={handleLoginChange}
            maxLength="20"
            minLength="3"
            required
          />
        </div>
        <div>
          <label>Haslo</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            maxLength="20"
            minLength="8"
            required
            placeholder="min. 8 znaków"
          />
        </div>
        <div>
          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            maxLength="40"
            minLength="3"
            required
          />
        </div>
        <div>
          <input type="submit" value="Utwórz konto" />
        </div>
      </div>
    </form>
  );
}
