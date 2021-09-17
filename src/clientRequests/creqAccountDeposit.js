import axios from "axios";
import { endpoints } from "../server/server";

export default function creqAccountDeposit(userId, value, token) {
  return axios.post(
    endpoints.creqAccountDepositURL,
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
