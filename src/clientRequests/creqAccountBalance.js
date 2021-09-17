import axios from "axios";
import { endpoints } from "../server/server";

export default function creqAccountBalance(userId, token) {
  return axios.post(
    endpoints.creqAccountBalanceURL,
    {
      userId: userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
