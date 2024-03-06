"use client";
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import style from './checkSum.module.css';
import { Alert, TextField, AlertTitle } from '@mui/material';

export default function CheckSum() {
    const [address, setAddress] = useState('');
    const [isValid, setIsValid] = useState(false);


    useEffect(() => {
        const handleGetEthAccounts = async () => {
            try {
                const provider = window.ethereum;
                if (!provider) {
                    setAddress('Wallet not Found');
                    return;
                }
                const _accounts = await provider.request({
                    method: 'eth_accounts',
                });
                if (_accounts && _accounts.length > 0) {
                    let checksumAddress = Web3.utils.toChecksumAddress(_accounts[0]);
                    // let checksumAddress = "0xsccb539558C6465968ccfDe3A731bF63d6d4D8B85D";
                    let firstChar = checksumAddress.charAt(2); // Getting the first actual character of the address

                    // If the first character is a letter and uppercase, convert to lowercase
                    // Otherwise, if it's a number, change it to 'A'
                    if (isNaN(firstChar)) { // If it's not a number
                        if (firstChar === firstChar.toUpperCase()) { // And if it's uppercase
                            firstChar = firstChar.toLowerCase(); // Convert to lowercase
                        }
                        else {
                            firstChar = firstChar.toUpperCase(); // Capitalize
                        }
                    } else { // If it's a number
                        firstChar = 'A'; // Change it to 'A'
                    }

                    // Construct the modified address
                    checksumAddress = `0x${firstChar}${checksumAddress.slice(3)}`;

                    setAddress(checksumAddress);
                }
            } catch (err) {
                console.error("Error executing eth_accounts FAILED: " + err);
                setAddress("Error executing eth_accounts FAILED");
            }
        };

        handleGetEthAccounts();
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
            <div className={style.formu_ADDRESS}>
                <label htmlFor="addressInput_eht" className={style.label_address}>Enter an Address with invalid checksum</label>

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
                /></div>
            <div className={style.formu}>
                <button
                    className={style.boutonSUM}
                    onClick={validateAddressChecksum}
                > Validate CheckSum
                </button>
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
                            marginTop: '5px',
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
