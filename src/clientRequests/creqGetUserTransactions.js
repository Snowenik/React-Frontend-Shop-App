import axios from "axios";
import { endpoints } from "../server/server";

export default function creqGetUserTransactions(userId, token) {
  return axios.post(
    endpoints.creqGetUserTransactionsURL,
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
