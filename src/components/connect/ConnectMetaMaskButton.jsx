'use client';
import React from 'react';
import Web3 from 'web3';
import style from './connect.module.css'

function ConnectWalletButton() {
  const connectToWallet = async () => {
    try {
      let provider;
      if (typeof window.ethereum !== 'undefined') {
        // If MetaMask or another Ethereum wallet is present
        provider = window.ethereum;
      } else if (typeof window.web3 !== 'undefined') {
        //If there is a Web3 wallet (pre-MetaMask)
        provider = window.web3.currentProvider;
      } else {
        // If no Ethereum wallet is found
        console.log('No Ethereum wallet found');
        return;
      }

      const web3 = new Web3(provider);
      // Request permission from the user to connect to the wallet
      await provider.enable();
      // You can now use web3 to interact with the user's wallet
      const accounts = await web3.eth.getAccounts();
      const userAccount = accounts[0];
      console.log('User account:', userAccount);
      // Perform operations with the user's wallet
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

