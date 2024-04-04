"use client";
import React from "react";
import { useEffect, useState } from "react";
import MainLayout from "@/components/mainLayout/MainLayout";
import Sign from "@/components/methodButton/Sign";
import Personal_custom from "@/components/methodButton/PersonalSign";
import Sign_typedData from "@/components/methodButton/SignTypedData";
import { handleGetEthAccounts } from "@/utils/web3";
import Params from "@/components/mainLayout/Params";
import { largeInput } from "@/utils/largeInput";

export default function Signing({ sidebarOpen, toggleSidebar }) {
  const [address, setAddress] = useState("");
  const [challenge, setChallenge] = useState("Example `personal_sign` message");
  useEffect(() => {
    handleGetEthAccounts(setAddress);
  }, []);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleChallenge = (event) => {
    setChallenge(event.target.value);
  };

  const handleLargeInput = () => {
    if (challenge === largeInput) {
      setChallenge("Example `personal_sign` message");
    } else {
      setChallenge(largeInput);
    }
  };

  return (
    <>
      <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
        <Params
          params={[
            { name: "Address", value: address, onChange: handleAddressChange },
            { name: "Message", value: challenge, onChange: handleChallenge, handleLargeInput: handleLargeInput },
          ]}
        />
        <div className="form_test">
          <div className="block">
            <Sign address={address} challenge={challenge} />
            <Personal_custom address={address} challenge={challenge} />
          </div>
          <div className="block">
            <Sign_typedData address={address} />
          </div>
        </div>
      </MainLayout>
    </>
  );
}
