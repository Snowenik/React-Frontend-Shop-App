import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Home.module.css";
import firstImg from "../imgs/mobile.jpg";
import secondImg from "../imgs/06.png";
import thirdImg from "../imgs/07.png";
import PersonIcon from "@material-ui/icons/Person";
import { slide as SideMenu } from "react-burger-menu";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuLink,
} from "@reach/menu-button";

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
        <Link to="/shop" className={styles.link}>
          Shop
        </Link>
        <Link to="/login" className={styles.link}>
          Login
        </Link>
      </SideMenu>
      <div className={styles.userMenu}>
        <Menu>
          <MenuButton>
            <PersonIcon />
          </MenuButton>
        </Menu>
      </div>
    </div>
  );
}

export function Image(props) {
  return (
    <div className={styles.imgContainer}>
      <img src={firstImg} alt="first" />
    </div>
  );
}

export function MenuOptions(props) {
  return (
    <div className={styles.optionsContainer}>
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
    </div>
  );
}
