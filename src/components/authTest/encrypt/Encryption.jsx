'use client';

import React, { useState } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import style from './encrypt.module.css';

const Encryption = ({ decryptionAddress, chipherText }) => {
  const [encryptionKey, setEncryptionKey] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [isCopiedE, setIsCopiedE] = useState(false);
  const [isCopiedD, setIsCopiedD] = useState(false);
  const [toggleHashE, setToggleHashE] = useState(false);
  const [toggleHashD, setToggleHashD] = useState(false);

  const handleCopyEncryptClick = async () => {
    if (!navigator.clipboard) {
      console.error('Clipboard API not available.');
      return;
    }
    try {
      await navigator.clipboard.writeText(encryptionKey);
      setIsCopiedE(true);
      setTimeout(() => setIsCopiedE(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };
  const handleCopyDecryptClick = async () => {
    if (!navigator.clipboard) {
      console.error('Clipboard API not available.');
      return;
    }
    try {
      await navigator.clipboard.writeText(encryptionKey);
      setIsCopiedD(true);
      setTimeout(() => setIsCopiedD(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };



  const getEncryptionKey = async () => {
    try {
      const provider = window.ethereum;
      setEncryptionKey(await provider.request({
        method: 'eth_getEncryptionPublicKey',
        params: [decryptionAddress]
      }));
      setToggleHashE(true)
    } catch (error) {
      setEncryptionKey(`Error: ${error.message}`);
      console.error(`Error: ${error.message}`);
      setToggleHashE(false)
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
      setToggleHashD(true)
    } catch (error) {
      setDecryptedText(`Error: ${error.message}`);
      console.error(`Error: ${error.message}`);
      setToggleHashD(false)
    }
  };

  return (
    <div className={style.formu}>

      <div className={style.form}>
        <button
          className={style.bouton}
          onClick={getEncryptionKey}
        > GET ENCRYPTION KEY
        </button>

        {encryptionKey && (
          <div>
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
              {toggleHashE ? (
                <AlertTitle sx={{
                  fontSize: '13px',
                  fontWeight: '600',
                  margin: '0px 10px 0px 0px',
                  color: 'green',
                  textAlign: 'center',
                  padding: '0',
                }}>
                  Success
                  {!isCopiedE &&
                    <svg onClick={() => handleCopyEncryptClick()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                      <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                    </svg>
                  }
                  {isCopiedE && <span
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
                  {!isCopiedE &&
                    <svg onClick={() => handleCopyEncryptClick()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                      <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                    </svg>
                  }
                  {isCopiedE && <span
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
              }}>{encryptionKey}</pre>
            </Alert>
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
              {toggleHashD ? (
                <AlertTitle sx={{
                  fontSize: '13px',
                  fontWeight: '600',
                  margin: '0px 10px 0px 0px',
                  color: 'green',
                  textAlign: 'center',
                  padding: '0',
                }}>
                  Success
                  {!isCopiedD &&
                    <svg onClick={() => handleCopyDecryptClick()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                      <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                    </svg>
                  }
                  {isCopiedD && <span
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
                  {!isCopiedD &&
                    <svg onClick={() => handleCopyDecryptClick()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                      <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                    </svg>
                  }
                  {isCopiedD && <span
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
              }}>{decryptedText}</pre>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default Encryption;
