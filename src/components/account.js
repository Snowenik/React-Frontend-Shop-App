import React, { useState } from "react";
import styles from "../css/Account.module.css";
import { Link } from "react-router-dom";
import money from "../imgs/money.jpg";

import PersonIcon from "@material-ui/icons/Person";
import { slide as SideMenu } from "react-burger-menu";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuLink,
} from "@reach/menu-button";
import { useHistory } from "react-router-dom";
import { ModalSuccess, ModalError, Loader } from "../components/modal";
import creqLib from "../clientRequests/creqLib";

export function Header(props) {
  const history = useHistory();

  function logout() {
    localStorage.clear();
    history.push("/");
  }

  var menuStyles = {
    bmBurgerButton: {
      position: "relative",
      width: "26px",
      height: "26px",
      left: "5%",
      top: "5%",
    },
    bmBurgerBars: {
      background: "#0bc7f7",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
    },
    bmMenu: {
      background: "#373a47",
      padding: "0",
      fontSize: "1.15em",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em",
    },
    bmItem: {
      display: "block",
      fontSize: "1.2rem",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  };
  return (
    <div className={styles.headerContainer}>
      <SideMenu styles={menuStyles}>
        <Link to="/" className={styles.link}>
          About
        </Link>
        <Link to="/" className={styles.link}>
          Contact
        </Link>
        <Link to="/" className={styles.link}>
          Shop
        </Link>
        <Link to="/" className={styles.link}>
          Login
        </Link>
      </SideMenu>
      <div className={styles.userMenu}>
        <Menu>
          <MenuButton>
            <PersonIcon />
          </MenuButton>
          <MenuList>
            <MenuLink as={Link} to="/">
              Account
            </MenuLink>
            <MenuLink as={Link} to="/">
              Settings
            </MenuLink>{" "}
            <MenuLink as={Link} to="/">
              History
            </MenuLink>
            <MenuItem onSelect={logout}>Wyloguj</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export function Image(props) {
  return (
    <div className={styles.imageContainer}>
      <img src={money} alt="" />
    </div>
  );
}

export function AccountBalance(props) {
  return (
    <div className={styles.accountBalance}>
      <p>Twój stan konta wynosi: {props.balance}zl</p>
    </div>
  );
}

export function ManageAccount(props) {
  return (
    <div className={styles.manageAccount}>
      <div>
        <button type="button" onClick={() => props.setModalDeposit(true)}>
          Wpłać na konto
        </button>
      </div>
      <div>
        <button type="button" onClick={() => props.setModalWithdraw(true)}>
          Wypłać z konta
        </button>
      </div>
    </div>
  );
}

export function Deposit(props) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);

  function handleValueChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    creqLib
      .creqAccountDeposit(user.id, value, localStorage.getItem("jwt"))
      .then((response) => {
        setLoading(false);
        props.setModal(false);
        props.setMessage(response.data);
        props.setShowSuccess(true);
        setTimeout(() => {
          creqLib
            .creqAccountBalance(user.id, localStorage.getItem("jwt"))
            .then((response) => {
              props.setBalance(response.data);
              props.setShowSuccess(false);
            });
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        props.setModal(false);
        props.setMessage(error.response.data.message);
        props.setShowError(true);
      });
  }

  return props.modal ? (
    <form onSubmit={handleSubmit}>
      <Loader color="#000000" loading={loading} size={15} />
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <div className={styles.imageContainer}>
            <img src={money} alt="" />
          </div>
          <div className={styles.closeButton}>
            <button type="button" onClick={() => props.setModal(false)}>
              X
            </button>
          </div>
          <label>Kwota:</label>
          <input type="number" required onChange={handleValueChange} />
          <input type="submit" value="Wpłać" />
        </div>
      </div>
    </form>
  ) : null;
}

export function Withdraw(props) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);

  function handleValueChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    creqLib
      .creqAccountWithdraw(user.id, value, localStorage.getItem("jwt"))
      .then((response) => {
        setLoading(false);
        props.setModal(false);
        props.setMessage(response.data);
        props.setShowSuccess(true);
        setTimeout(() => {
          creqLib
            .creqAccountBalance(user.id, localStorage.getItem("jwt"))
            .then((response) => {
              props.setBalance(response.data);
              props.setShowSuccess(false);
            });
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        props.setModal(false);
        props.setMessage(error.response.data.message);
        props.setShowError(true);
      });
  }

  return props.modal ? (
    <form onSubmit={handleSubmit}>
      <Loader color="#000000" loading={loading} size={15} />
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <div className={styles.imageContainer}>
            <img src={money} alt="" />
          </div>
          <div className={styles.closeButton}>
            <button type="button" onClick={() => props.setModal(false)}>
              X
            </button>
          </div>
          <label>Kwota:</label>
          <input type="number" required onChange={handleValueChange} />
          <input type="submit" value="Wypłać" />
        </div>
      </div>
    </form>
  ) : null;
}
