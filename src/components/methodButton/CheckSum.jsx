
"use client";
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { TextField } from '@mui/material';
import SendTransaction from './SendTransaction';
import { handleGetEthAccounts } from '@/utils/web3';
import AlertComponent from '../mainLayout/Alert';

export default function CheckSum() {
    const [address, setAddress] = useState('');
    const [isValidChecksum, setIsValidChecksum] = useState(false);
    const [checksumMessage, setChecksumMessage] = useState('');

    useEffect(() => {
        handleGetEthAccounts(setAddress);
    }, []);

    const validateAddressChecksum = () => {
        try {
          const isValid = Web3.utils.isAddress(address);
          if (!isValid) {
            setIsValidChecksum(false);
            setChecksumMessage('Invalid Ethereum address.');
            return;
          }
      
          const isValidChecksum = Web3.utils.checkAddressChecksum(address);
          setIsValidChecksum(isValidChecksum);
          setChecksumMessage(
            isValidChecksum
              ? 'Address has a valid EIP-55 checksum.'
              : 'Address has an invalid EIP-55 checksum.'
          );
        } catch (error) {
          console.error('Error validating address checksum:', error);
          setIsValidChecksum(false);
          setChecksumMessage('Error validating address checksum.');
        }
      };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        setChecksumMessage('');
    };

    return (
        <div className="formulario_one">
            <button
                className="button"
                onClick={validateAddressChecksum}
            > VALIDATE CHECKSUM
            </button>
            {checksumMessage && (
                <AlertComponent
                    toggle={isValidChecksum}
                    message={checksumMessage}
                />
            )}
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
                        margin: '15px 0',
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
            <SendTransaction viewForm={true} viewCheckSum={true} address={address} />
        </div>
    );
}