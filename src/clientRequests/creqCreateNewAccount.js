import axios from "axios";
import { endpoints } from "../server/server";

export default function creqCreateNewAccount(
  firstName,
  lastName,
  login,
  password,
  email
) {
  return axios.post(endpoints.creqCreateNewAccountURL, {
    firstName: firstName,
    lastName: lastName,
    login: login,
    password: password,
    email: email,
  });
}
