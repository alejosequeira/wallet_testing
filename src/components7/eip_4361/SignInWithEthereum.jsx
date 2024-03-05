'use client'
import React, { useState } from 'react';
import Web3 from 'web3';
import style from './signEth.module.css';
import { Alert, AlertTitle } from '@mui/material';

const SignInWithEthereum = () => {
    const [message, setMessage] = useState('');
    const [toggleHashZero, setToggleHashZero] = useState(false);

    const signInWithEthereum = async () => {
        if (!window.ethereum) {
            alert('Please install MetaMask to use this feature.');
            return;
        }

        try {
            const web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            const domain = window.location.host;
            const statement = "Sign in with Ethereum to the app.";
            const uri = window.location.origin;
            const version = "1";
            const nonce = Math.floor(Math.random() * 1000000).toString(); // Simple nonce; use a more secure method in production
            const issuedAt = new Date().toISOString();

            const message = `domain= ${domain}\naddress= ${account}\nstatement= ${statement}\nuri= ${uri}\nversion= ${version}\nnonce= ${nonce}\nissuedAt= ${issuedAt}`;

            const signature = await web3.eth.personal.sign(message, account);

            const r = "0x" + signature.slice(2, 66);
            const s = "0x" + signature.slice(66, 130);
            const v = parseInt(signature.slice(130, 132), 16);
            console.log({ message, signature });
            setMessage(`Signature:\n${signature}\nr:\n${r}\ns:\n${s}\nv:${v} \n\nMessage: \n${message}`);
            setToggleHashZero(true)
        } catch (error) {
            setMessage('Error signing in');
            console.error('Error signing in with Ethereum:', error);
            setToggleHashZero(false)
        }
    };

    return (
        <div>
            <button className={style.bouton} onClick={signInWithEthereum}>EIP-4361</button>
            {message && (
                <>
                    <Alert severity="" sx={{
                        width: "17rem",
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
                                Signature:
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
                                Error:
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
        </div>
    );
};

export default SignInWithEthereum;
