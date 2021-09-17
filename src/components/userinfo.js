import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Userinfo.module.css";
import avatar from "../imgs/avatar.png";

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
import {
  ModalSuccess,
  ModalError,
  Loader,
  ModalChangePassword,
  ModalChangeEmail,
} from "../components/modal";
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

export function Avatar(props) {
  return (
    <div className={styles.avatarContainer}>
      <img src={avatar} alt="" />
    </div>
  );
}

export function Settings(props) {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");

  // dodac handle errora
  useEffect(() => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    creqLib
      .creqGetUser(user.id, localStorage.getItem("jwt"))
      .then((response) => {
        setData(response.data);
        setLoading(false);
      });
  }, []);

  function changePassword() {
    setShowChangePassword(true);
  }

  function changeEmail() {
    setShowChangeEmail(true);
  }

  return (
    <>
      <ModalChangePassword
        showModal={showChangePassword}
        setModal={setShowChangePassword}
        setData={setData}
        setMessage={setMessage}
        setShowSuccess={setShowSuccess}
        setShowError={setShowError}
      />
      <ModalChangeEmail
        showModal={showChangeEmail}
        setModal={setShowChangeEmail}
        setData={setData}
        setMessage={setMessage}
        setShowSuccess={setShowSuccess}
        setShowError={setShowError}
      />
      <Loader color="#000000" loading={loading} size={15} />
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
      <div className={styles.settingsContainer}>
        <div>
          <p>Imie</p>
          <p>{data.firstName}</p>
          <p></p>
        </div>
        <div>
          <p>Nazwisko</p>
          <p>{data.lastName}</p>
          <p></p>
        </div>
        <div>
          <p>Login</p>
          <p>{data.login}</p>
          <p></p>
        </div>
        <div>
          <p>Hasło</p>
          <p>********</p>
          <button type="button" onClick={changePassword}>
            Zmień
          </button>
        </div>
        <div>
          <p>E-mail</p>
          <p>{data.email}</p>
          <button type="button" onClick={changeEmail}>
            Zmień
          </button>
        </div>
      </div>
    </>
  );
}
