import axios from "axios";
import { endpoints } from "../server/server";

export default function creqUserBuy(userId, products, token) {
  return axios.post(
    endpoints.creqUserBuyURL,
    {
      userId: userId,
      products: products,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
