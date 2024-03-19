"use client";
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import style from './checkSum.module.css';
import { Alert, TextField, AlertTitle } from '@mui/material';
import SendTransaction from '../addressDetection/SendTransaction';
import { handleGetEthAccounts } from '@/utils/web3';

export default function CheckSum() {
    const [address, setAddress] = useState('');
    const [isValid, setIsValid] = useState(true);
    useEffect(() => {
        handleGetEthAccounts(setAddress);
    }, []);

    const validateAddressChecksum = () => {
        try {
            const isValidChecksum = Web3.utils.checkAddressChecksum(address);
            setIsValid(isValidChecksum);
        } catch (error) {
            console.error('Validation error:', error);
            setIsValid(false);
        }
    };
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    return (
        <div className={style.container}>
            <SendTransaction
                viewForm={true}
                viewCheckSum={true}
            />
            <div className={style.containerCheckSum}>
                <button
                    className={style.boutonSUM}
                    onClick={validateAddressChecksum}
                > VALIDATE CHECKSUM
                </button>
                <TextField
                    type="text"
                    id="addressInput_eht"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder='0x462A0d4fE4C2b10aadFBD4628f697d09a76Cd954...'
                    InputProps={{
                        sx: {
                            color: 'white',
                            backgroundColor: '#434343',
                            fontSize: "0.65rem",
                            border: '1px solid rgb(222, 222, 222)',
                            borderRadius: '5px',
                            height: '1rem',
                            width: '17rem',
                            boxShadow: '#666666 1px 1px 1px 0px inset, #666666 -1px -1px 1px 0px inset',
                            textDecoration: 'none',
                            padding: '0 5px',
                            marginTop: '10px',
                            '&:focus': {
                                border: '1px solid #434343',
                            },
                        },
                    }}
                    inputProps={{
                        sx: {
                            height: '20px',
                            textAlign: 'center',
                        },
                    }}
                />

                {isValid ? (
                    <div>
                        <Alert severity="success" sx={{
                            width: "17rem",
                            fontSize: '13px',
                            color: 'black',
                            backgroundColor: 'transparent',
                            border: '3px solid transparent',
                            borderRadius: '5px',
                            padding: '0 10px 0px 0px',
                            textAlign: 'center',
                            margin: '0 5px',
                            boxShadow: 'transparent 3px 3px 3px 0px inset, transparent -3px -3px 3px 0px inset',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                            <AlertTitle
                                sx={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    margin: '0',
                                    color: 'green',
                                    textAlign: 'center',
                                }}>
                                Address has a valid EIP-55 checksum. </AlertTitle>
                        </Alert>
                    </div>
                ) :
                    <div>
                        <Alert severity="error" sx={{
                            width: "17rem",
                            fontSize: '13px',
                            color: 'black',
                            backgroundColor: 'transparent',
                            border: '3px solid transparent',
                            borderRadius: '5px',
                            padding: '0 10px 0px 0px',
                            textAlign: 'center',
                            margin: '0 5px',
                            boxShadow: 'transparent 3px 3px 3px 0px inset, transparent -3px -3px 3px 0px inset',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <AlertTitle
                                sx={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    margin: '0',
                                    color: '#ad0424',
                                    textAlign: 'center',
                                }}>
                                Address CheckSum is invalid. </AlertTitle>

                        </Alert>
                    </div>
                }
            </div>
        </div>
    );
}
