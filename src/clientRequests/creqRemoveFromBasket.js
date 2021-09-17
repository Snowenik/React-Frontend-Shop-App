import axios from "axios";
import { endpoints } from "../server/server";

export default function creqRemoveFromBasket(userId, name, productId, token) {
  return axios.post(
    endpoints.creqRemoveFromBasketURL,
    {
      userId: userId,
      name: name,
      productId: productId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
