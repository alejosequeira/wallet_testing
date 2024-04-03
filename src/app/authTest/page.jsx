"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import MainLayout from '@/components/mainLayout/MainLayout';
import EthAccount from '@/components/methodButton/EthAccount';
import WatchAsset from '@/components/methodButton/WatchAsset';
import Encryption from '@/components/methodButton/Encryption';
import SignTypeData from '@/components/methodButton/SignTypedData';
import PersonalSign from '@/components/methodButton/PersonalSign';
import SendTransaction from '@/components/methodButton/SendTransaction';
import RunBypass from '@/components/methodButton/RunBypass';
import Chain from '@/components/methodButton/ChainAuth';
import { handleGetEthAccounts } from '@/utils/web3';
import Params from '@/components/mainLayout/Params';

export default function AuthTest({ sidebarOpen, toggleSidebar }) {

  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('Example `personal_sign` message');
  const [cipher, setChiper] = useState('0x7b2276657273696f6e223a227832353531392d7873616c736132302d706f6c7931333035222c226e6f6e6365223a223458364f4d307a77763834665255437857495a6c786c3157644f4c5974577875222c22657068656d5075626c69634b6579223a22584136633541705051374e5332565a426a4950586a627a346b523057732f496f4242454f6f7673365853303d222c2263697068657274657874223a22566e4a554d6c73624e4d50767353652b6641364c6c6b514944457476227d');


  useEffect(() => {
    handleGetEthAccounts(setAddress);
  }, []);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const handleChiperTextChange = (event) => {
    setChiper(event.target.value);
  };
  return (
    <>
      <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
        <Params
          params={[
            { name: 'address', value: address, onChange: handleAddressChange },
            { name: 'message', value: message, onChange: handleMessageChange },
            { name: 'cipher', value: cipher, onChange: handleChiperTextChange }
          ]}
        />


        <div className="form_test">
          <div className="block">
            <RunBypass address={address} chipherText={cipher} />
          </div>
          <div className="block">
            <EthAccount />
            <WatchAsset tokenAddress={address} />
            <Encryption address={address} chipherText={cipher} />
            <SignTypeData address={address} />
            <PersonalSign address={address} challenge={message} />
            <SendTransaction address={address} viewForm={false} viewScamButton={false} />
          </div>
          <div className="block">
            <Chain />
          </div>
        </div>
      </MainLayout>
    </>
  )
}
