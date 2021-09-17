import React, { useState, useEffect } from "react";
import { Image, TransactionList } from "../components/history";
import { HeaderUser } from "../components/menu";
import creqLib from "../clientRequests/creqLib";
import { Loader } from "../components/modal";

export default function History(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    creqLib
      .creqGetUserTransactions(user.id, localStorage.getItem("jwt"))
      .then((response) => {
        setData(response.data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <HeaderUser />
      {loading ? (
        <Loader color="#000000" loading={loading} size={15} />
      ) : (
        <>
          {" "}
          <Image />
          <TransactionList data={data} setData={setData} />
        </>
      )}
    </>
  );
}
