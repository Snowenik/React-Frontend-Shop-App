import React, { useState, useEffect, useRef } from "react";
import {
  Content,
  ActionBar,
  ShopImg,
  ShopContent,
  SideBar,
  SideBarItem,
  List,
  Item,
  Category,
  HeaderImage,
} from "../components/shop";
import images from "../components/images";
import creqLib from "../clientRequests/creqLib";
import { HeaderGuest, HeaderUser } from "../components/menu";

export default function Shop(props) {
  const [selectedOption, setSelectedOption] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    creqLib.creqGetProductsByCategory(selectedOption).then((response) => {
      setData(
        response.data.map((product) => {
          return { ...product, image: images[product.image] };
        })
      );
      setLoading(false);
    });
  }, [selectedOption]);

  return (
    <>
      {localStorage.getItem("jwt") ? <HeaderUser /> : <HeaderGuest />}
      <HeaderImage />
      <Category setSelectedOption={setSelectedOption} />
      <List data={data} loading={loading} />
    </>
  );
}
