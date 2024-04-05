"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { handleGetEthAccounts } from "@/utils/web3";

const AddressContext = createContext();

const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState("");

  return <AddressContext.Provider value={{ address, setAddress }}>{children}</AddressContext.Provider>;
};

const useAddress = () => {
  const { setAddress } = useContext(AddressContext);

  useEffect(() => {
    const fetchData = async () => {
      await handleGetEthAccounts(setAddress);
    };
    fetchData();
  }, [setAddress]);

  return useContext(AddressContext);
};

export { AddressProvider, useAddress };
