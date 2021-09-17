import React, { useState, useEffect, useRef } from "react";
import {
  Content,
  ActionBar,
  BasketImage,
  BasketSummary,
  BasketItem,
  List,
  Buy,
} from "../components/basket";
import { HeaderGuest, HeaderUser } from "../components/menu";
import creqLib from "../clientRequests/creqLib";
import images from "../components/images";
import { Loader } from "../components/modal";

export default function Basket(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      setLoading(true);
    }
    const user = JSON.parse(localStorage.getItem("user"));
    creqLib
      .creqGetUserBasketProductList(user.id, localStorage.getItem("jwt"))
      .then((response) => {
        if (isMounted.current) {
          setData(
            response.data.map((product) => {
              return { ...product, image: images[product.image] };
            })
          );
          setLoading(false);
        }
      });
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <>
      {localStorage.getItem("jwt") ? <HeaderUser /> : <HeaderGuest />}
      {loading ? (
        <Loader color="#000000" loading={loading} size={15} />
      ) : (
        <>
          {" "}
          <BasketImage />
          <BasketSummary data={data} />
          <List data={data} setData={setData} />
          <Buy setData={setData} data={data} />
        </>
      )}
    </>
  );
}
