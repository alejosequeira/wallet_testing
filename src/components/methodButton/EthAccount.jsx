'use client';
import React from 'react'
import { useState } from 'react';
import AlertComponent from '@/components/mainLayout/Alert';

export default function EthAccount() {

    const [accountsResult, setAccountsResult] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [toggleHash, setToggleHash] = useState(false);


    const handleGetEthAccounts = async () => {
        try {
            // const provider = window.ethereum;
            const _accounts = await window.ethereum.request({
                method: 'eth_accounts',
            });

            if (_accounts && _accounts.length > 0) {
                setAccountsResult(_accounts.join(', '))
                setToggleHash(true)
            } else {
                setAccountsResult('No Ethereum accounts found')
            }
        } catch (err) {
            console.error("Error executing eth_accounts FAILED" + err);
            setAccountsResult(`${err.message}`)
            setToggleHash(false)
        }
        console.log("pressing the button eth_accounts");

    };
    return (
        <div className="formu">

                <button
                    className="button"
                    onClick={handleGetEthAccounts}
                >
                    GET ETH ACCOUNTS
                   
                </button>

            {accountsResult && (
                <div>
                    <AlertComponent
                        toggle={toggleHash}
                        message={accountsResult}
                        error={accountsResult}
                        isCopied={isCopied}
                        setIsCopied={setIsCopied}                    
                    />
                    
                </div>
            )}

        </div>
    )
}
