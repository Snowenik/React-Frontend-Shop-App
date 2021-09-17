import axios from "axios";
import { endpoints } from "../server/server";

export default function creqChangeEmail(userId, newEmail, token) {
  return axios.post(
    endpoints.creqChangeEmailURL,
    {
      userId: userId,
      newEmail: newEmail,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
