import axios from "axios";
import { endpoints } from "../server/server";

export default function creqGetUserBasketProductList(userId, token) {
  return axios.post(
    endpoints.creqGetUserBasketProductListURL,
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
