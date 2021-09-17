import React, { useState, useEffect } from "react";
import {
  Image,
  AccountBalance,
  ManageAccount,
  Deposit,
  Withdraw,
} from "../components/account";
import { HeaderUser } from "../components/menu";
import creqLib from "../clientRequests/creqLib";
import { ModalSuccess, ModalError, Loader } from "../components/modal";

export default function Account(props) {
  const [modalDeposit, setModalDeposit] = useState(false);
  const [modalWithdraw, setModalWithdraw] = useState(false);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    creqLib
      .creqAccountBalance(user.id, localStorage.getItem("jwt"))
      .then((response) => {
        setLoading(false);
        setBalance(response.data);
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
          <AccountBalance balance={balance} />
          <ManageAccount
            setModalDeposit={setModalDeposit}
            setModalWithdraw={setModalWithdraw}
          />
          <Deposit
            modal={modalDeposit}
            setModal={setModalDeposit}
            setMessage={setMessage}
            setShowSuccess={setShowSuccess}
            setShowError={setShowError}
            setBalance={setBalance}
          />
          <Withdraw
            modal={modalWithdraw}
            setModal={setModalWithdraw}
            setMessage={setMessage}
            setShowSuccess={setShowSuccess}
            setShowError={setShowError}
            setBalance={setBalance}
          />
          <ModalSuccess
            showModal={showSuccess}
            setModal={setShowSuccess}
            message={message}
          />
          <ModalError
            showModal={showError}
            setModal={setShowError}
            message={message}
          />
        </>
      )}
    </>
  );
}
