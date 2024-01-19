"use client"
import { Alert, Button } from '@mui/material';
import React, { useState } from 'react';
import style from './sendtransaction.module.css';

const SendTransaction = ({ address }) => {
    const [sendTransactionResult, setSendTransactionResult] = useState('');

    const handleSendTransaction = async () => {
        try {
            const provider = window.ethereum;
            const result = await provider.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: address,
                        to: '0x0c54FcCd2e384b4BB6f2E405Bf5Cbc15a017AaFb',
                        value: '0x0',
                        gasLimit: '0x5208',
                        gasPrice: '0x2540be400',
                        type: '0x0',
                        data: '0x',
                        nonce: '0x0',
                        accessList: [
                            {
                                address: '0x0c54FcCd2e384b4BB6f2E405Bf5Cbc15a017AaFb',
                                storageKeys: [],
                            },
                        ],
                        chainId: '0x89',                
                    },
                ],
            });
            setSendTransactionResult(result);
            console.log(result);
        } catch (error) {
            setSendTransactionResult(`Error: ${error.message}`);
            console.error(error);
        }
    };

    return (
        <div className={style.formu}>
            <button
                className={style.bouton}
                onClick={handleSendTransaction}
            >SEND TRANSACTION
            </button>
            {sendTransactionResult && (
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

                    }}>{sendTransactionResult}</Alert>
                </div>
            )}
        </div>
    );
};

export default SendTransaction;
