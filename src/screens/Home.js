import React, { useState } from "react";
import { Image } from "../components/home";
import { HeaderGuest, HeaderUser } from "../components/menu";

export default function Home(props) {
  return (
    <>
      {localStorage.getItem("jwt") ? <HeaderUser /> : <HeaderGuest />}
      <Image />
    </>
  );
}
