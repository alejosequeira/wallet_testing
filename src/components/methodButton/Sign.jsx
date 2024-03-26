"use client"
import React, { useState } from 'react';
import Web3 from 'web3';
import AlertComponent from '@/components/mainLayout/Alert';

const Sign = ({ address, challenge }) => {
  const [SignResult, setSignResult] = useState('');
  const [toggleHashZero, setToggleHashZero] = useState(false);
  const [isCopied, setIsCopied] = useState(false)
 
  const handleSign = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const provider = window.ethereum;
      const hash = web3.utils.sha3(challenge);

      const sign = await provider.request({
        method: 'eth_sign',
        params: [address, hash],
      });
      setSignResult(sign);
      setToggleHashZero(true)
    } catch (err) {
      console.error(err);
      setSignResult(`Error: ${err.message}`);
      setToggleHashZero(false)
    }
  };

  return (
    <div className="formu">
      <button
        className="button"
        onClick={handleSign}
      >  SIGN
      </button>
      {SignResult && (
        <div>
          <AlertComponent
                        toggle={toggleHashZero}
                        message={SignResult}
                        isCopied={isCopied}
                        setIsCopied={setIsCopied}                    
                    />
        </div>
      )}
    </div>
  );
};

export default Sign;
