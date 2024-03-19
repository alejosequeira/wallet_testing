'use client'
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import style from './signEth.module.css';
import { Alert, AlertTitle } from '@mui/material';

export default function SignInWithEthereum (){
    const [message, setMessage] = useState('');
    const [from, setFrom] = useState('');
    const [domain, setDomain] = useState('');
    const [statement, setStatement] = useState('Welcome to OpenSea!');
    const [description, setDescription] = useState('Click to sign in and accept the OpenSea Terms of Service (https://opensea.io/tos) and Privacy Policy (https://opensea.io/privacy).');
    const [description2, setDescription2] = useState('This request will not trigger a blockchain transaction or cost any gas fees.');
    const [uri, setUri] = useState('');
    const [nonce, setNonce] = useState('');
    const [issued, setIssued] = useState('');
    const [signatureCopy, setSignatureCopy] = useState('');
    const [toggleHashZero, setToggleHashZero] = useState(false);
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
        const handleGetEthAccounts = async () => {
            try {
                const provider = window.ethereum;
                if (!provider) {
                    setFrom('Wallet not Found');
                    return;
                }
                const _accounts = await provider.request({
                    method: 'eth_accounts',
                });
                if (_accounts && _accounts.length > 0) {
                    const checksumAddress = Web3.utils.toChecksumAddress(_accounts[0]);
                    setFrom(checksumAddress);
                    await getNounce(checksumAddress);
                }
            } catch (err) {
                console.error("Error executing eth_accounts FAILED: " + err);
                setFrom("Error eth_accounts FAILED")
            }
        };

        const getNounce = async (address) => {

            try {
                const provider = window.ethereum;
                const web3 = new Web3(provider);
                const nonce = await web3.eth.getTransactionCount(address, 'latest');
                setNonce(`${nonce.toString()}`);
            } catch (error) {
                setNonce("Provided Address invalid");
                console.error('Error fetching nonce:', error);
            }
        };

        handleGetEthAccounts();
        const domain = window.location.host;
        setDomain(domain)
        const uri = window.location.origin;
        setUri(uri)
    }, []);



    const handleCopyAccountClick = async () => {
        if (!navigator.clipboard) {
            console.error('Clipboard API not available.');
            return;
        }
        try {
            await navigator.clipboard.writeText(signatureCopy);
            setIsCopied(true);
            console.log(navigator.clipboard.writeText(signatureCopy))
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

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
            const issuedAt = new Date().toISOString();
            console.log(issuedAt)
            setIssued(issuedAt)
            const message = constructMessage(statement, description, description2, from, nonce);

            const signature = await web3.eth.personal.sign(message, from);
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

    function constructMessage(statement, description, description2, from, nonce) {
        return `${statement}\n\n${description}\n\n${description2}\n\nWallet address= \n${from}\n\nNonce= \n${nonce}`;
    }

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
                <label htmlFor="statement">Statement: </label>
                <textarea
                    type="text"
                    className={style.formulario_input}
                    id="statement"
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                    rows="1"
                />
                <label htmlFor="description">Message:</label>
                <textarea
                    type="text"
                    className={style.formulario_input}
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                />
                <label htmlFor="description">Gas Cost:</label>
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
                <label htmlFor="issued">Issued: </label>
                <textarea
                    type="text"
                    className={style.formulario_input}
                    id="issued"
                    value={issued}
                    onChange={(e) => setIssued(e.target.value)}
                    rows="1"
                />
            </div>
        </div>
    );
};

