"use client"
import React, { useState, useEffect } from 'react';
import style from '../sign_typedData/sign_typedData.module.css'
import { Alert, TextField } from '@mui/material';

export default function Sign_typedData({ userAddress }) {
    const [signTypedDataV3, setSignTypedDataV3] = useState('');
    const [signTypedDataV4, setSignTypedDataV4] = useState('');
    const [msgParams, setMsgParams] = useState(null);
    const [editableJson, setEditableJson] = useState(''); // Initialize with an empty string

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await import('../sign_typedData/msgParams.json');
                const data = response.default;
                setMsgParams(data);
                setEditableJson(JSON.stringify(data, null, 2)); // Initialize with JSON data
            } catch (error) {
                console.error('Error loading msgParams.json:', error);
            }
        }

        fetchData();
    }, []);

    const handleEditableJsonChange = (event) => {
        setEditableJson(event.target.value);
    }

    const handleSignTypedDataV4 = async () => {
        if (!window.ethereum) return alert('MetaMask is required!');

        try {
            const provider = window.ethereum;
            const sign = await provider.request({
                method: 'eth_signTypedData_v4',
                params: [userAddress, JSON.stringify(msgParams)],
            });
            setSignTypedDataV4(sign);
        } catch (err) {
            console.error(err);
            setSignTypedDataV4(`Error: ${err.message}`);
        }
    }

    return (
        <div className={style.container}>
            <div className={style.formu}>
                <button
                    className={style.bouton}
                >SIGN TYPED DATA V3
                </button>
                {signTypedDataV3 && (
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

                        }}>{signTypedDataV3}</Alert>
                    </div>
                )}
            </div>
            <div className={style.formu}>
                <button
                    className={style.bouton}
                    onClick={handleSignTypedDataV4}
                > SIGN TYPED DATA V4
                </button>
                {signTypedDataV4 && (
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

                        }}>{signTypedDataV4}</Alert>
                    </div>
                )}
            </div>
            <div className={style.formulario}>
                <TextField
                    multiline
                    rows={10}
                    variant="outlined"
                    fullWidth
                    value={editableJson}
                    onChange={handleEditableJsonChange}
                />
            </div>

            {/* <div className={style.formulario}>

                <label htmlFor="chainId">Chain ID:</label>
                <input
                    id="chainId"
                    type="text"
                    value={chainId}
                    onChange={(e) => setChainId(e.target.value)}
                    className={style.formulario_input}
                />

                <label htmlFor="domainName">Domain Name:</label>
                <input
                    id="domainName"
                    type="text"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    className={style.formulario_input}
                />

                <label htmlFor="verifyingContract">Verifying Contract:</label>
                <input
                    id="verifyingContract"
                    type="text"
                    value={verifyingContract}
                    onChange={(e) => setVerifyingContract(e.target.value)}
                    className={style.formulario_input}
                />

                <label htmlFor="version">Version:</label>
                <input
                    id="version"
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    className={style.formulario_input}
                />

                <label htmlFor="messageContents">Message Contents:</label>
                <input
                    id="messageContents"
                    type="text"
                    value={messageContents}
                    onChange={(e) => setMessageContents(e.target.value)}
                    className={style.formulario_input}
                />

                <label htmlFor="messageFromName">Message From Name:</label>
                <input
                    id="messageFromName"
                    type="text"
                    value={messageFromName}
                    onChange={(e) => setMessageFromName(e.target.value)}
                    className={style.formulario_input}
                />

                <label htmlFor="messageToName">Message To Name:</label>
                <input
                    id="messageToName"
                    type="text"
                    value={messageToName}
                    onChange={(e) => setMessageToName(e.target.value)}
                    className={style.formulario_input}
                />

                <label htmlFor="messageFromWallet">Message From Wallet:</label>
                <input
                    id="messageFromWallet"
                    type="text"
                    value={messageFromWallet}
                    onChange={(e) => setMessageFromWallet(e.target.value)}

                    className={style.formulario_input}
                />

                <label htmlFor="messageToWallet">Message To Wallet:</label>
                <input
                    id="messageToWallet"
                    type="text"
                    value={messageToWallet}
                    onChange={(e) => setMessageToWallet(e.target.value)}
                    className={style.formulario_input}
                />

            </div> */}
        </div>
    );
}