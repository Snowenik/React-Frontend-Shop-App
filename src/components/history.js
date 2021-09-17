import React from "react";
import styles from "../css/History.module.css";
import { Link } from "react-router-dom";
import history from "../imgs/history01.png";
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

export function Image(props) {
  return (
    <div className={styles.imageContainer}>
      <img src={history} alt="" />
    </div>
  );
}

export function TransactionList(props) {
  if (props.data.length === 0) {
    return (
      <div className={styles.emptyList}>
        <p>Tu będą twoje transakcje</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.listContainer}>
        {props.data.map((transaction, index) => {
          return (
            <Transaction
              date={transaction.date}
              data={transaction.productList}
              key={index}
            />
          );
        })}
      </div>
      <div className={styles.bottomDiv}></div>
    </>
  );
}

export function Transaction(props) {
  return (
    <div className={styles.transactionContainer}>
      <p>Transakcja: {props.date.substr(0, 10)}</p>
      {props.data.map((product, index) => {
        return (
          <TransactionItem
            name={product.name}
            amount={1}
            value={product.value}
            image={product.image}
            key={index}
          />
        );
      })}
    </div>
  );
}

export function TransactionItem(props) {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.productImage}>
        <img src={images[props.image]} alt="" />
      </div>
      <div>
        <p>Nazwa</p>
        <p>{props.name}</p>
      </div>
      <div>
        <p>Ilość</p>
        <p>{props.amount}</p>
      </div>
      <div>
        <p>Cena</p>
        <p>{props.value}zł</p>
      </div>
    </div>
  );
}
