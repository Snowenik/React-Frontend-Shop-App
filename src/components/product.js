import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Product.module.css";
import shopImg from "../imgs/shopHeader.jpg";

import PersonIcon from "@material-ui/icons/Person";
import { slide as SideMenu } from "react-burger-menu";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuLink,
} from "@reach/menu-button";
import creqLib from "../clientRequests/creqLib";
import { ModalSuccess, ModalError, Loader } from "../components/modal";
import { useHistory } from "react-router-dom";

export function Header(props) {
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
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export function InfoHeader(props) {
  return (
    <div className={styles.infoHeader}>
      <p>Produkt</p>
    </div>
  );
}

export function Item(props) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const isMounted = useRef(true);

  const history = useHistory();

  function addToBasket() {
    if (isMounted.current) {
      setLoading(true);
      if (!localStorage.getItem("jwt")) {
        setLoading(false);
        setMessage("Zaloguj się, aby przejść do koszyka");
        setShowError(true);
        return;
      }
    }
    const user = JSON.parse(localStorage.getItem("user"));
    creqLib
      .creqAddToBasket(
        user.id,
        props.data.id,
        props.data.name,
        localStorage.getItem("jwt")
      )
      .then((response) => {
        if (isMounted.current) {
          setMessage(response.data);
          setLoading(false);
          setShowSuccess(true);
          setTimeout(() => {
            history.push("/shop");
          }, 3000);
        }
      })
      .catch((error) => {
        if (isMounted.current) {
          setLoading(false);
          setMessage(error.response.data.message);
          setShowError(true);
        }
      });
  }

  return (
    <div className={styles.itemContainer}>
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
      <div className={styles.imageContainer}>
        <img src={props.data.image} alt="" />
      </div>
      <div className={styles.secondDiv}>
        <div className={styles.infoContainer}>
          <p>Producent: {props.data.brand}</p>
          <p>Nazwa: {props.data.name}</p>
          <p>Opis: {props.data.description}</p>
          <p>Cena: {props.data.value}zl</p>
        </div>
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className={styles.basketLink}
            onClick={addToBasket}
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>
    </div>
  );
}
