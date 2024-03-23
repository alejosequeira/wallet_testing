'use client'
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import style from './signEth.module.css';
import { Alert, AlertTitle } from '@mui/material';
import { handleCopyAccountClick } from '@/utils/buttons';
import { handleGetEthAccounts } from '@/utils/web3';

export default function SignInWithEthereum (){
    
    
    const [from, setFrom] = useState('');
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState();
    const [signatureCopy, setSignatureCopy] = useState('');
    const [toggleHashZero, setToggleHashZero] = useState(false);
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const fromResult = await handleGetEthAccounts(setFrom);         
            setMessages(`https://opensea.io wants you to sign in with your Ethereum account:\n${fromResult}\n\nSign in with Ethereum to the app.\n\nURI: https://opensea.ioVersion: 1\nChain ID: 137\nNonce: 12345678\nIssued At: 2024-03-10T01:08:50.113Z`)
    
        };
        fetchData();
    }, []);
    const signInWithEthereum = async () => {
        if (!window.ethereum) {
            console.error('Please install MetaMask to use this feature.');
            return;
        }
        try {
            const web3 = new Web3(window.ethereum);
            if (from.length === 0) {
                console.error('No Ethereum accounts found.');
                return;
            }

            const signature = await web3.eth.personal.sign(messages, from);
            setSignatureCopy(signature);
            const { r, s, v } = extractSignatureParts(signature);

            setMessage(`\n${signature}\n\nr:\n${r}\ns:\n${s}\nv:${v}`);
            setToggleHashZero(true);
        } catch (error) {
            console.error('Error signing in with Ethereum:', error);
            setMessage('Error signing in');
            setToggleHashZero(false);
        }
    };


    function extractSignatureParts(signature) {
        const r = "0x" + signature.slice(2, 66);
        const s = "0x" + signature.slice(66, 130);
        const v = parseInt(signature.slice(130, 132), 16);
        return { r, s, v };
    }


    return (
        <div className={style.formu}>
            <button className={style.bouton} onClick={signInWithEthereum}>EIP-4361</button>
            {message && (
                <>
                    <Alert severity="" sx={{
                        width: "20.5rem",
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
                        {toggleHashZero ? (
                            <AlertTitle sx={{
                                fontSize: '13px',
                                fontWeight: '600',
                                margin: '0px 10px 0px 0px',
                                color: 'blue',
                                textAlign: 'center',
                                padding: '0',
                            }}>
                                Signature
                                {!isCopied &&
                                    <svg onClick={() => handleCopyAccountClick(signatureCopy, setIsCopied)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
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
                            </AlertTitle>
                        )}
                        <pre style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            textAlign: 'left',
                            margin: '0px 10px 0px 0px',
                            overflowX: 'hidden',
                            padding: '0',
                        }}>{message}</pre>
                    </Alert>

                </>
            )}
            <div className={style.formulario}>
                <label htmlFor="fromInput">From:</label>
                <textarea
                    type="text"
                    className={style.formulario_input}
                    id="fromInput"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    rows="1"
                />
                
                <label htmlFor="description">Message:</label>
                <textarea
                    type="text"
                    className={style.formulario_input}
                    id="description"
                    value={messages}
                    onChange={(e) => setMessages(e.target.value)}
                    rows="10"
                />
                
            </div>
        </div>
    );
};

