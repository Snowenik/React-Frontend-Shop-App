export const port = "8080";

export const baseURL = `http://localhost:${port}/api`;

export const endpoints = {
  creqCreateNewAccountURL: baseURL + "/user/create",
  creqLoginURL: baseURL + "/user/login",
  creqAuthenticateURL: baseURL + "/authenticate",
  creqGetProductsByCategoryURL: baseURL + "/products",
  creqAddToBasketURL: baseURL + "/user/addToBasket",
  creqGetUserBasketProductListURL: baseURL + "/user/basket",
  creqRemoveFromBasketURL: baseURL + "/user/removeFromBasket",
  creqAccountDepositURL: baseURL + "/user/account/deposit",
  creqAccountWithdrawURL: baseURL + "/user/account/withdraw",
  creqAccountBalanceURL: baseURL + "/user/account/balance",
  creqUserBuyURL: baseURL + "/user/buy",
  creqGetUserTransactionsURL: baseURL + "/user/transactions",
  creqChangePasswordURL: baseURL + "/user/change/password",
  creqChangeEmailURL: baseURL + "/user/change/email",
  creqGetUserURL: baseURL + "/user/get",
};
