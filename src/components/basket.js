import React, { useState, useEffect, useRef } from "react";
import styles from "../css/Basket.module.css";
import { Link } from "react-router-dom";
import basket from "../imgs/basket.png";
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
import { useHistory } from "react-router-dom";
import creqLib from "../clientRequests/creqLib";
import { ModalSuccess, ModalError, Loader } from "../components/modal";
import images from "../components/images";

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

export function BasketImage(props) {
  return (
    <div className={styles.basketImageContainer}>
      <img src={basket} alt="basket" />
    </div>
  );
}

export function BasketSummary(props) {
  return (
    <div className={styles.basketSummary}>
      <p>Liczba produktów w koszyku: {props.data.length}</p>
      <p>
        Łączna wartość koszyka:{" "}
        {props.data
          .map((item) => item.value)
          .reduce((prev, cur) => prev + cur, 0)}
        zl
      </p>
    </div>
  );
}

export function List(props) {
  return (
    <div className={styles.list}>
      {props.data.map((item, i) => {
        return (
          <BasketItem
            image={item.image}
            brand={item.brand}
            name={item.name}
            amount={item.amount}
            value={item.value}
            key={i}
            setData={props.setData}
            productId={item.id}
          />
        );
      })}
    </div>
  );
}

export function BasketItem(props) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function removeFromBasket() {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    creqLib
      .creqRemoveFromBasket(
        user.id,
        props.name,
        props.productId,
        localStorage.getItem("jwt")
      )
      .then((response) => {
        setMessage(response.data);
        setShowSuccess(true);
        setTimeout(() => {
          creqLib
            .creqGetUserBasketProductList(user.id, localStorage.getItem("jwt"))
            .then((response) => {
              props.setData(
                response.data.map((product) => {
                  return { ...product, image: images[product.image] };
                })
              );
              setLoading(false);
            });
        }, 3000);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        setLoading(false);
        setShowError(true);
      });
  }

  return (
    <div className={styles.basketItemContainer}>
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
      <div className={styles.itemImageContainer}>
        <img src={props.image} alt="" />
      </div>
      <div>
        <p>{props.brand}</p>
        <p>{props.name}</p>
        <p>1x {props.value}zl</p>
      </div>
      <div>
        <p>{props.value}zl</p>
        <button type="button" onClick={removeFromBasket}>
          Usuń
        </button>
      </div>
    </div>
  );
}

export function Buy(props) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function buyProducts() {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const products = props.data.map((product) => product.id);
    creqLib
      .creqUserBuy(
        user.id,
        JSON.stringify(products),
        localStorage.getItem("jwt")
      )
      .then((response) => {
        setMessage(response.data);
        setLoading(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          props.setData([]);
        }, 4000);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        setLoading(false);
        setShowError(true);
      });
  }

  return (
    <>
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
      <div className={styles.buyButton}>
        <button type="button" onClick={buyProducts}>
          Kup
        </button>
      </div>
      <div className={styles.bottomDiv}></div>
    </>
  );
}
