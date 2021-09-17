import axios from "axios";
import { endpoints } from "../server/server";

export default function creqAddToBasket(userId, productId, name, token) {
  return axios.post(
    endpoints.creqAddToBasketURL,
    {
      userId: userId,
      productId: productId,
      name: name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
