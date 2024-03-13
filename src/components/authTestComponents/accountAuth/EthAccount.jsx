'use client';
import React from 'react'
import { Alert} from '@mui/material';
import { useState } from 'react';
import Web3 from 'web3';
import style from './ethaccount.module.css'

export default function EthAccount() {

    const [accountsResult, setAccountsResult] = useState('');
    const [isCopied, setIsCopied] = useState(false);

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


    const handleGetEthAccounts = async () => {
        try {
            const provider = window.ethereum;
            const _accounts = await provider.request({
                method: 'eth_accounts',
            });

            if (_accounts && _accounts.length > 0) {
                setAccountsResult(_accounts.join(', '))
            } else {
                setAccountsResult('No Ethereum accounts found')
            }
        } catch (err) {
            console.error("Error executing eth_accounts FAILED" + err);
            setAccountsResult(`Error: ${err.message}`)
        }
        console.log("pressing the button eth_accounts");

    };
    return (
        <div className={style.formu}>

                <button
                    className={style.bouton}
                    onClick={handleGetEthAccounts}
                >
                    GET ETH ACCOUNTS
                    {accountsResult && (
                        <div className={style.container}>

                            <svg onClick={handleCopyAccountClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                                <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                                <span className={style.tooltiptext} id="myTooltip">Copy to clipboard</span>
                            </svg>
                            {isCopied ? (<p className={style.text_copied}>copied</p>) : ''}
                        </div>
                    )}
                </button>

            {accountsResult && (
                <div>
                    <Alert severity="" sx={{
                       width: "14.5rem",
                       maxWidth: "14.5rem",
                        fontSize: '13px',
                        color: 'black',
                        backgroundColor: 'lightgray',
                        border: '3px solid gray',
                        borderRadius: '5px',
                        padding: '0 10px 0px 0px',
                        textAlign: 'center',
                        margin: '0 5px',
                        marginTop: '5px',
                        boxShadow: 'white 3px 3px 3px 0px inset, white -3px -3px 3px 0px inset',
                        display: 'flex',
                        justifyContent: 'center'

                    }}>{accountsResult}</Alert>
                </div>
            )}

        </div>
    )
}
