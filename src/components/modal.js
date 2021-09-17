import React, { useState, useEffect } from "react";
import styles from "../css/Modal.module.css";
import greenTick from "../imgs/greenTick.png";
import error from "../imgs/error.png";
import PulseLoader from "react-spinners/PulseLoader";
import avatar from "../imgs/avatar.png";
import creqLib from "../clientRequests/creqLib";

export function ModalSuccess(props) {
  return (
    <>
      {props.showModal ? (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <div className={styles.greenTick}>
              <img src={greenTick} alt="" />
            </div>
            <p>{props.message}</p>
            <div className={styles.closeButton}>
              <button type="button" onClick={() => props.setModal(false)}>
                X
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function ModalError(props) {
  return (
    <>
      {props.showModal ? (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <div className={styles.error}>
              <img src={error} alt="" />
            </div>
            <p>{props.message}</p>
            <div className={styles.closeButton}>
              <button type="button" onClick={() => props.setModal(false)}>
                X
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function Loader(props) {
  return (
    <div className={styles.loaderContainer}>
      <PulseLoader
        color={props.color}
        loading={props.loading}
        size={props.size}
      />
    </div>
  );
}

export function ModalChangePassword(props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleOldPasswordChange(e) {
    setOldPassword(e.target.value);
  }

  function handleNewPasswordChange(e) {
    setNewPassword(e.target.value);
  }

  function handleRepeatedPasswordChange(e) {
    setRepeatedPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    creqLib
      .creqChangePassword(
        user.id,
        oldPassword,
        newPassword,
        repeatedPassword,
        localStorage.getItem("jwt")
      )
      .then((response) => {
        props.setMessage(response.data);
        setLoading(false);
        props.setShowSuccess(true);
        setTimeout(() => {
          creqLib
            .creqGetUser(user.id, localStorage.getItem("jwt"))
            .then((response) => {
              props.setShowSuccess(false);
              props.setModal(false);
              props.setData(response.data);
            });
        }, 2000);
      })
      .catch((error) => {
        props.setMessage(error.response.data.message);
        setLoading(false);
        props.setShowError(true);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Loader color="#000000" loading={loading} size={15} />
      {props.showModal ? (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <div className={styles.avatar}>
              <img src={avatar} alt="" />
            </div>
            <div className={styles.changePasswordDiv}>
              <label>Stare hasło</label>
              <input
                type="password"
                autoFocus
                required
                minLength="8"
                maxLength="20"
                placeholder="min. 8 znaków"
                value={oldPassword}
                onChange={handleOldPasswordChange}
              />
            </div>
            <div className={styles.changePasswordDiv}>
              <label>Nowe hasło</label>
              <input
                type="password"
                required
                minLength="8"
                maxLength="20"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
            </div>
            <div className={styles.changePasswordBottomDiv}>
              <label>Powtórz hasło</label>
              <input
                type="password"
                required
                minLength="8"
                maxLength="20"
                value={repeatedPassword}
                onChange={handleRepeatedPasswordChange}
              />
            </div>
            <div className={styles.changePasswordCloseButton}>
              <button type="button" onClick={() => props.setModal(false)}>
                X
              </button>
            </div>
            <div className={styles.changePasswordSubmit}>
              <button type="submit">Zmień</button>
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
}

export function ModalChangeEmail(props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    creqLib
      .creqChangeEmail(user.id, email, localStorage.getItem("jwt"))
      .then((response) => {
        props.setMessage(response.data);
        setLoading(false);
        props.setShowSuccess(true);
        setTimeout(() => {
          creqLib
            .creqGetUser(user.id, localStorage.getItem("jwt"))
            .then((response) => {
              props.setShowSuccess(false);
              props.setModal(false);
              props.setData(response.data);
            });
        }, 2000);
      })
      .catch((error) => {
        props.setMessage(error.response.data.message);
        setLoading(false);
        props.setShowError(true);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Loader color="#000000" loading={loading} size={15} />
      {props.showModal ? (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <div className={styles.avatar}>
              <img src={avatar} alt="" />
            </div>
            <div className={styles.changeEmailDiv}>
              <label>Nowy email</label>
              <input
                type="email"
                required
                minLength="6"
                maxLength="40"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className={styles.changeEmailCloseButton}>
              <button type="button" onClick={() => props.setModal(false)}>
                X
              </button>
            </div>
            <div className={styles.changeEmailSubmit}>
              <button type="submit">Zmień</button>
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
}
