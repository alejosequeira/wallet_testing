'use client';
import React from 'react'
import { useState } from 'react';
import AlertComponent from '@/components/mainLayout/Alert';
import { handleGetEthAccounts } from '@/utils/web3';

export default function EthAccount() {

    const [accountsResult, setAccountsResult] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [toggleHash, setToggleHash] = useState(true);

    return (
        <div className="formu">

                <button
                    className="button"
                    onClick={()=>handleGetEthAccounts(setAccountsResult)}
                >
                    GET ETH ACCOUNTS
                   
                </button>

            {accountsResult && (
                <div>
                    <AlertComponent
                        toggle={toggleHash} 
                        message={accountsResult}
                        isCopied={isCopied}
                        setIsCopied={setIsCopied}                    
                    />                    
                </div>
            )}

        </div>
    )
}