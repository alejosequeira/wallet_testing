'use client'
import React, { useState } from 'react';
import Web3 from 'web3';
import style from './signEth.module.css';
import { Alert, AlertTitle } from '@mui/material';

const SignInWithEthereum = () => {
    const [message, setMessage] = useState('');


    const [from, setFrom] = useState('');
    const [domain, setDomain] = useState('');
    const [statement, setStatement] = useState('Welcome to OpenSea!');
    const [description, setDescription] = useState('Click to sign in and accept the OpenSea Terms of Service (https://opensea.io/tos) and Privacy Policy (https://opensea.io/privacy).');
    const [description2, setDescription2] = useState('This request will not trigger a blockchain transaction or cost any gas fees.');
    const [uri, setUri] = useState('');
    const [nonce, setNonce] = useState('');



    const [toggleHashZero, setToggleHashZero] = useState(false);

    const signInWithEthereum = async () => {
        if (!window.ethereum) {
            alert('Please install MetaMask to use this feature.');
            return;
        }
        try {
            const web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setFrom(accounts[0])
            const domain = window.location.host;
            setDomain(domain)
            const uri = window.location.origin;
            setUri(uri)
            const version = "1";
            const nonce = Math.floor(Math.random() * 1000000).toString(); 
            setNonce(nonce)
            const issuedAt = new Date().toISOString();

            const message = `${statement}\n\n${description}\n\n ${description2}\n\nWallet address= \n${from}\n\nNonce= \n${nonce}`;

            const signature = await web3.eth.personal.sign(message, accounts[0]);

            const r = "0x" + signature.slice(2, 66);
            const s = "0x" + signature.slice(66, 130);
            const v = parseInt(signature.slice(130, 132), 16);
            console.log({ message, signature });
            setMessage(`${signature}\nr:\n${r}\ns:\n${s}\nv:${v}`);
            setToggleHashZero(true)
        } catch (error) {
            setMessage('Error signing in');
            console.error('Error signing in with Ethereum:', error);
            setToggleHashZero(false)
        }
    };

    return (
        <div className={style.formu}>
            <button className={style.bouton} onClick={signInWithEthereum}>EIP-4361</button>
            {message && (
                <>
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
                <label htmlFor="toInput">Domain: </label>
                <textarea
                    type="text"
                    className={style.formulario_input}
                    id="toInput"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    rows="1"
                />

                <label htmlFor="valueInput">Uri: </label>
                <textarea
                    type="text"
                    className={style.formulario_input}
                    id="valueInput"
                    value={uri}
                    onChange={(e) => setUri(e.target.value)}
                    rows="1"
                />
                <label htmlFor="statement">statement: </label>
                <textarea
                    type="text"
                    className={style.formulario_input}
                    id="statement"
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                    rows="1"
                />
                <label htmlFor="description">Description:</label>
                <textarea
                    type="text"
                    className={style.formulario_input}
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                />
                <label htmlFor="description">Description:</label>
                <textarea
                    type="text"
                    className={style.formulario_input}
                    id="description"
                    value={description2}
                    onChange={(e) => setDescription2(e.target.value)}
                    rows="2"
                />

                <label htmlFor="chainId">Nonce: </label>
                <textarea
                    type="text"
                    className={style.formulario_input}
                    id="chainId"
                    value={nonce}
                    onChange={(e) => setNonce(e.target.value)}
                    rows="1"
                />
            </div>
        </div>
    );
};

export default SignInWithEthereum;
