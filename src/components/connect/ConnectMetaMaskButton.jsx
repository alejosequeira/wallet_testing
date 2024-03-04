'use client';
import React from 'react';
import Web3 from 'web3';
import style from './connect.module.css'
import { useEffect, useState } from 'react';

function ConnectWalletButton() {

  const [accountsResult, setAccountsResult] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [accountsError, setAccountsError] = useState('');

  const handleCopyAccountClick = () => {
    const textArea = document.createElement('textarea');
    textArea.value = accountsResult;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setIsCopied(true);
    } catch (err) {
      console.error('Unable to copy text:', err);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  useEffect(() => {
    const handleGetEthAccounts = async () => {
      try {
        const provider = window.ethereum;
        if (!provider) {
          setAccountsResult('Ethereum provider (e.g., MetaMask) not found');
          return;
        }
        const _accounts = await provider.request({
          method: 'eth_accounts',
        });
        if (_accounts && _accounts.length > 0) {
          const checksumAddress = Web3.utils.toChecksumAddress(_accounts[0]);
          setAccountsResult(checksumAddress);
        }
      } catch (err) {
        console.error("Error executing eth_accounts FAILED: " + err);        
      }
    };
    
    handleGetEthAccounts();
  }, []);

  const connectToWallet = async () => {
    try {
      let provider;
      if (typeof window.ethereum !== 'undefined') {
        provider = window.ethereum;
      } else if (window.web3 && typeof window.web3.currentProvider !== 'undefined') {
        provider = window.web3.currentProvider;
      } else {
        console.log('No Ethereum wallet found');
        return;
      }
  
      const web3 = new Web3(provider);
  
      // New method to request account access
      await provider.request({ method: 'eth_requestAccounts' });
  
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        const userAccount = accounts[0];
        console.log('User account:', userAccount);
        setAccountsResult(userAccount)
      } else {
        console.log('No accounts found.');
      }
  
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      setAccountsError('Error connecting to wallet');
    }
  };  

  return (
    <>
      {accountsResult ? (
        <div className={style.container_connected}>
          <h5>Connected
            <svg onClick={handleCopyAccountClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
              <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
              <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
              <span className={style.tooltiptext} id="myTooltip">Copy to clipboard</span>
            </svg>
            {isCopied ? (<p className={style.text_copied}>copied</p>) : ''}

          </h5>
          <h6>{accountsResult}</h6>
        </div>
      )
        :
        (
        <div className={style.container_connected}>
          <button
            className={style.boton}
            onClick={connectToWallet}>
            Connect Wallet
          </button>
          <h6>{accountsError}</h6>
          </div>
          )
      }
    </>
  );
}

export default ConnectWalletButton;

