"use client"
import React, { useState } from 'react';
import { Alert, Button } from '@mui/material';
import style from './sign.module.css';
import Web3 from 'web3';



const Sign = ({ address, challenge }) => {
  const [SignResult, setSignResult] = useState('');

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
    } catch (err) {
      console.error(err);
      setSignResult(`Error: ${err.message}`);
    }
  };
  

  return (
    <div className={style.formu}>
      <button
        className={style.bouton}
        onClick={handleSign}
      >  SIGN
      </button>
      {SignResult && (
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
            justifyContent: 'center',           
            alignItems: 'center',
          overflow:'hidden'

          }}>{SignResult}</Alert>
        </div>
      )}
    </div>
  );
};

export default Sign;
