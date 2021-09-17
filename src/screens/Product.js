import React, { useState, useEffect } from "react";
import { InfoHeader, Item } from "../components/product";
import { useLocation } from "react-router-dom";
import { HeaderGuest, HeaderUser } from "../components/menu";
import { useHistory } from "react-router-dom";

export default function Product(props) {
  let location = useLocation();

  const history = useHistory();

  useEffect(() => {
    if (!location.state) {
      history.push("/");
    }
  }, []);

  return (
    <>
      {location.state ? (
        <>
          {localStorage.getItem("jwt") ? <HeaderUser /> : <HeaderGuest />}
          <InfoHeader />
          <Item data={location.state} />
        </>
      ) : null}
    </>
  );
}
