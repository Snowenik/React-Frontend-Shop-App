import React from "react";
import { Avatar, Settings } from "../components/userinfo";
import { HeaderUser } from "../components/menu";

export default function UserInfo(props) {
  return (
    <>
      <HeaderUser />
      <Avatar />
      <Settings />
    </>
  );
}
