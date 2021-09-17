import axios from "axios";
import { endpoints } from "../server/server";

export default function creqGetProductsByCategory(productCategory) {
  return axios.post(endpoints.creqGetProductsByCategoryURL, {
    productCategory: productCategory,
  });
}
