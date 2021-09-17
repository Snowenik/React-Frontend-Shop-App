import axios from "axios";
import { endpoints } from "../server/server";

export default function creqChangePassword(
  userId,
  oldPassword,
  newPassword,
  repeatedPassword,
  token
) {
  return axios.post(
    endpoints.creqChangePasswordURL,
    {
      userId: userId,
      oldPassword: oldPassword,
      newPassword: newPassword,
      repeatedPassword: repeatedPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
