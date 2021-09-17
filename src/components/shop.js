import React, { useState, useEffect } from "react";
import styles from "../css/Shop.module.css";
import { Link } from "react-router-dom";
import shopImg from "../imgs/shopHeader.jpg";
import Select from "react-dropdown-select";
import PersonIcon from "@material-ui/icons/Person";
import Dropdown from "react-dropdown";
import { slide as SideMenu } from "react-burger-menu";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuLink,
} from "@reach/menu-button";
import { Loader } from "../components/modal";

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

export function HeaderImage(props) {
  return (
    <div className={styles.imgContainer}>
      <img src={shopImg} alt="" />
    </div>
  );
}

export function Category(props) {
  const options = [
    { value: 0, label: "Laptopy" },
    { value: 1, label: "Słuchawki" },
    { value: 2, label: "Myszki" },
    { value: 3, label: "Klawiatury" },
  ];

  return (
    <Dropdown
      options={options}
      value={options[0].value}
      placeholder="Kategoria"
      className={styles.dropDown}
      menuClassName={styles.dropDownMenu}
      onChange={(option) => {
        props.setSelectedOption(option.value);
      }}
    />
  );
}

export function Item(props) {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemImageContainer}>
        <img src={props.image} alt="" />
      </div>
      <div className={styles.itemInfoContainer}>
        <p>{props.description}</p>
        <p>{props.value}zl</p>
      </div>
    </div>
  );
}

export function List(props) {
  return (
    <>
      <div className={styles.itemList}>
        <Loader color="#000000" loading={props.loading} size={15} />
        {props.data.map((item, i) => {
          if (item.inStock) {
            return (
              <Link
                to={{ pathname: "/product", state: item }}
                key={i}
                className={styles.itemLink}
              >
                <Item
                  image={item.image}
                  description={item.description}
                  value={item.value}
                />
              </Link>
            );
          }
        })}
      </div>
      <div className={styles.bottomDiv}></div>
    </>
  );
}
