import axios from "axios";
import { endpoints } from "../server/server";

export default function creqAccountWithdraw(userId, value, token) {
  return axios.post(
    endpoints.creqAccountWithdrawURL,
    {
      userId: userId,
      value: value,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
