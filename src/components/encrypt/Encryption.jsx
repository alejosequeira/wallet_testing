'use client';

import React, { useState } from 'react';
import { Alert, Button, TextField } from '@mui/material';
import style from './encrypt.module.css';

const Encryption = ({ decryptionAddress, chipherText }) => {
  const [encryptionKey, setEncryptionKey] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEncryptionKeyClick = () => {
    const textArea = document.createElement('textarea');
    textArea.value = encryptionKey;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setIsCopied(true);
    } catch (err) {
      console.error('Unable to copy text:', err);
    } finally {
      document.body.removeChild(textArea);
    }
  };



  const getEncryptionKey = async () => {
    try {
      const provider = window.ethereum;
      setEncryptionKey(await provider.request({
        method: 'eth_getEncryptionPublicKey',
        params: [decryptionAddress]
      }));
    } catch (error) {
      setEncryptionKey(`Error: ${error.message}`);
      console.error(`Error: ${error.message}`);
    }
  };

  const handleDecrypt = async () => {
    try {
      const provider = window.ethereum;

      const decryptedMessage = await provider.request({
        method: 'eth_decrypt',
        params: [chipherText, decryptionAddress]
      });

      setDecryptedText(decryptedMessage);
    } catch (error) {
      setDecryptedText(`Error: ${error.message}`);
      console.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className={style.formu}>

      <div className={style.form}>
        <button
          className={style.bouton}
          onClick={getEncryptionKey}
        > GET ENCRYPTION KEY
          {encryptionKey && (
            <div className={style.container}>

              <svg onClick={handleCopyEncryptionKeyClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                <span className={style.tooltiptext} id="myTooltip">Copy to clipboard</span>
              </svg>
              {isCopied ? (<p className={style.text_copied}>copied</p>) : ''}
            </div>
          )}
        </button>

      {encryptionKey && (
        <div>
          <Alert severity="" sx={{
                width:"10rem",
                maxWidth: "10rem",
                fontSize: '13px',
                color: 'black',
                backgroundColor: 'lightgray',
                border: '3px solid gray',
                borderRadius: '10px',
                padding: '0 10px 0px 0px',
                textAlign: 'center',
                margin: '0 5px',
                boxShadow: 'white 3px 3px 3px 0px inset, white -3px -3px 3px 0px inset',
                display: 'flex',
                justifyContent:'center'

              }}>{encryptionKey}</Alert>
        </div>
      )}
      </div>
      <div className={style.form}>
      
          <button
            className={style.bouton}
            onClick={handleDecrypt}
          >            
            DECRYPT
          </button>       

      {decryptedText && (
        <div className={style.form}>
          <Alert severity="" sx={{
                width:"10rem",
                maxWidth: "10rem",
                fontSize: '13px',
                color: 'black',
                backgroundColor: 'lightgray',
                border: '3px solid gray',
                borderRadius: '10px',
                padding: '0 10px 0px 0px',
                textAlign: 'center',
                margin: '0 5px',
                boxShadow: 'white 3px 3px 3px 0px inset, white -3px -3px 3px 0px inset',
                display: 'flex',
                justifyContent:'center'

              }}>{decryptedText}</Alert>
        </div>
      )}
      </div>
    </div>
  );
};

export default Encryption;
