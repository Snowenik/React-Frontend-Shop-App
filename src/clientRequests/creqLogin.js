import axios from "axios";
import { endpoints } from "../server/server";

export default function creqLogin(login, password) {
  return axios.post(endpoints.creqLoginURL, {
    login: login,
    password: password,
  });
}
