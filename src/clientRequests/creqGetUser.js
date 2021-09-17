import axios from "axios";
import { endpoints } from "../server/server";

export default function creqGetUser(userId, token) {
  return axios.post(
    endpoints.creqGetUserURL,
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
