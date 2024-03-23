'use client';
import React from 'react';
import style from './connect.module.css'
import { useEffect, useState } from 'react';
import { handleGetEthAccounts, connectToWallet } from '@/utils/web3';
import { handleCopyAccountClick } from '@/utils/buttons';

function ConnectWalletButton() {
  const [accountsResult, setAccountsResult] = useState('');
  const [accountsError, setAccountsError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    
    handleGetEthAccounts(setAccountsResult);
  }, [])


  return (
    <div>
      {accountsResult ? (
        <div className={style.container_connected}>
          {!isCopied &&
            <h5>Connected
              <svg onClick={() => handleCopyAccountClick(accountsResult, setIsCopied)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className="clipboard">
                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
              </svg>
            </h5>}
          {isCopied && <span
            className="text_copied"
            id="myTooltip">Copied !</span>}

          <h6>{accountsResult}</h6>
        </div>
      )
        :
        (
          <div className={style.container_connected}>
            <button
              className={style.boton}
              onClick={() => connectToWallet(setAccountsResult, setAccountsError)}>
              Connect Wallet
            </button>
            <h5>{accountsError}</h5>
          </div>
        )
      }
    </div>
  );
}

export default ConnectWalletButton;

