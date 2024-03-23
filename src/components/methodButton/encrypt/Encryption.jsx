'use client';
import React, { useState } from 'react';
import AlertComponent from '@/components/mainLayout/Alert';

const Encryption = ({ decryptionAddress, chipherText }) => {
  const [encryptionKey, setEncryptionKey] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [isCopiedE, setIsCopiedE] = useState(false);
  const [isCopiedD, setIsCopiedD] = useState(false);
  const [toggleHashE, setToggleHashE] = useState(false);
  const [toggleHashD, setToggleHashD] = useState(false);
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
    <div className="formulario1">
        <button
          className="button"
          onClick={getEncryptionKey}
        > GET ENCRYPTION KEY
        </button>

        {encryptionKey && (
          <div>
            <AlertComponent
              toggle={toggleHashE}
              message={encryptionKey}
              error={encryptionKey}
              isCopied={isCopiedE}
              setIsCopied={setIsCopiedE}
            />
          </div>
        )}
        <button
          className="button"
          onClick={handleDecrypt}
        >
          DECRYPT
        </button>

        {decryptedText && (
          <div>
            <AlertComponent
              toggle={toggleHashD}
              message={decryptedText}
              error={decryptedText}
              isCopied={isCopiedD}
              setIsCopied={setIsCopiedD}
            />
          </div>
        )}
    </div>
  );
};

export default Encryption;
