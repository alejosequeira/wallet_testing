'use client';
import React from 'react';
import Web3 from 'web3';
import style from './connect.module.css'

function ConnectWalletButton() {
  const connectToWallet = async () => {
    try {
      let provider;
      if (typeof window.ethereum !== 'undefined') {
        
        provider = window.ethereum;
      } else if (typeof window.web3 !== 'undefined') {
        
        provider = window.web3.currentProvider;
      } else {
      
        console.log('No Ethereum wallet found');
        return;
      }

      const web3 = new Web3(provider);
      
      await provider.enable();
      
      const accounts = await web3.eth.getAccounts();
      const userAccount = accounts[0];
      console.log('User account:', userAccount);
      
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  return (
    <>
      <button
        className={style.boton}
        onClick={connectToWallet}>
        Connect Wallet
      </button>
    </>
  );
}

export default ConnectWalletButton;

