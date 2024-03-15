'use client';
import React from 'react'
import { Alert, AlertTitle} from '@mui/material';
import { useState } from 'react';
import Web3 from 'web3';
import style from './ethaccount.module.css'

export default function EthAccount() {

    const [accountsResult, setAccountsResult] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [toggleHash, setToggleHash] = useState(false);
    const handleCopyAccountClick = async () => {
        if (!navigator.clipboard) {
            console.error('Clipboard API not available.');
            return;
        }
        try {
            await navigator.clipboard.writeText(accountsResult);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy text:', err);
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
                setToggleHash(true)
            } else {
                setAccountsResult('No Ethereum accounts found')
            }
        } catch (err) {
            console.error("Error executing eth_accounts FAILED" + err);
            setAccountsResult(`Error: ${err.message}`)
            setToggleHash(false)
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
                   
                </button>

            {accountsResult && (
                <div>
                    <Alert severity="" sx={{
                            width: "17.5rem",
                            font: 'var(--default-font)',
                            fontSize: '13px',
                            color: 'black',
                            backgroundColor: 'lightgray',
                            border: '3px solid gray',
                            borderRadius: '5px',
                            margin: '0 5px',
                            marginTop: '5px',
                            boxShadow: 'white 3px 3px 3px 0px inset, white -3px -3px 3px 0px inset',
                            padding: '0',
                            textAlign: 'center',
                            justifyContent: 'center'
                        }}>
                            {toggleHash ? (
                                <AlertTitle sx={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    margin: '0px 10px 0px 0px',
                                    color: 'green',
                                    textAlign: 'center',
                                    padding: '0',
                                }}>
                                    Success
                                    {!isCopied &&
                                        <svg onClick={() => handleCopyAccountClick()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                                            <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                                        </svg>
                                    }
                                    {isCopied && <span
                                        className={style.text_copied}
                                        id="myTooltip">Copied !</span>}
                                </AlertTitle>
                            ) : (
                                <AlertTitle sx={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    margin: '0px 10px 0px 0px',
                                    color: '#ad0424',
                                    textAlign: 'center',
                                    padding: '0',
                                }}>
                                    Error
                                    {!isCopied &&
                                        <svg onClick={() => handleCopyAccountClick()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                                            <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                                        </svg>
                                    }
                                    {isCopied && <span
                                        className={style.text_copied}
                                        id="myTooltip">Copied !</span>}
                                </AlertTitle>
                            )}
                            <pre style={{
                                whiteSpace: 'pre-wrap',
                                wordWrap: 'break-word',
                                textAlign: 'center',
                                margin: '0px 10px 0px 0px',
                                overflowX: 'hidden',
                                padding: '0',
                            }}>{accountsResult}</pre>
                        </Alert>
                </div>
            )}

        </div>
    )
}
