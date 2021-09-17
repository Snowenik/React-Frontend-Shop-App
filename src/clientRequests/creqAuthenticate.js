import axios from "axios";
import { endpoints } from "../server/server";

export default function creqAuthenticate(login, password) {
  return axios.post(endpoints.creqAuthenticateURL, {
    login: login,
    password: password,
  });
}
