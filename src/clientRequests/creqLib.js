import creqCreateNewAccount from "../clientRequests/creqCreateNewAccount";
import creqGetProductsByCategory from "../clientRequests/creqGetProductsByCategory";
import creqLogin from "../clientRequests/creqLogin";
import creqAuthenticate from "../clientRequests/creqAuthenticate";
import creqAddToBasket from "../clientRequests/creqAddToBasket";
import creqGetUserBasketProductList from "../clientRequests/creqGetUserBasketProductList";
import creqRemoveFromBasket from "../clientRequests/creqRemoveFromBasket";
import creqAccountDeposit from "../clientRequests/creqAccountDeposit";
import creqAccountWithdraw from "../clientRequests/creqAccountWithdraw";
import creqAccountBalance from "../clientRequests/creqAccountBalance";
import creqUserBuy from "../clientRequests/creqUserBuy";
import creqGetUserTransactions from "../clientRequests/creqGetUserTransactions";
import creqChangePassword from "../clientRequests/creqChangePassword";
import creqChangeEmail from "../clientRequests/creqChangeEmail";
import creqGetUser from "../clientRequests/creqGetUser";

const creqLib = {
  creqCreateNewAccount: creqCreateNewAccount,
  creqGetProductsByCategory: creqGetProductsByCategory,
  creqLogin: creqLogin,
  creqAuthenticate: creqAuthenticate,
  creqAddToBasket: creqAddToBasket,
  creqGetUserBasketProductList: creqGetUserBasketProductList,
  creqRemoveFromBasket: creqRemoveFromBasket,
  creqAccountDeposit: creqAccountDeposit,
  creqAccountWithdraw: creqAccountWithdraw,
  creqAccountBalance: creqAccountBalance,
  creqUserBuy: creqUserBuy,
  creqGetUserTransactions: creqGetUserTransactions,
  creqChangePassword: creqChangePassword,
  creqChangeEmail: creqChangeEmail,
  creqGetUser: creqGetUser,
};

export default creqLib;
