'use client';
import React, { useState } from 'react';
import AlertComponent from '@/components/mainLayout/Alert';

const Encryption = ({ address, chipherText }) => {
  const [encryptionKey, setEncryptionKey] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [isCopiedE, setIsCopiedE] = useState(false);
  const [isCopiedD, setIsCopiedD] = useState(false);
  const [toggleHashE, setToggleHashE] = useState(false);
  const [toggleHashD, setToggleHashD] = useState(false);
  const getEncryptionKey = async () => {
    try {
      console.log('address', address);
      setEncryptionKey(await window.ethereum.request({
        method: 'eth_getEncryptionPublicKey',
        params: [address]
      }));
      setToggleHashE(true)
    } catch (error) {
      setEncryptionKey(`${error.message}`);
      console.error(`Error: ${error.message}`);
      setToggleHashE(false)
    }
  };

  const handleDecrypt = async () => {

    try {
      console.log('address', address);
      // const provider = window.ethereum;

      const decryptedMessage = await window.ethereum.request({
        method: 'eth_decrypt',
        params: [chipherText, address]
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
              isCopied={isCopiedD}
              setIsCopied={setIsCopiedD}
            />
          </div>
        )}
    </div>
  );
};

export default Encryption;
