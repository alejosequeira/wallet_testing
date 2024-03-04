"use client"
import React, { useState } from 'react';
import { Alert, Button, AlertTitle } from '@mui/material';
import style from './sign.module.css';
import Web3 from 'web3';



const Sign = ({ address, challenge }) => {
  const [SignResult, setSignResult] = useState('');
  const [toggleHashZero, setToggleHashZero] = useState(false);
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
    <div className={style.formu}>
      <button
        className={style.bouton}
        onClick={handleSign}
      >  SIGN
      </button>
      {SignResult && (
        <div>
          <Alert severity="" sx={{
            width: "17rem",
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
            {toggleHashZero ? (
              <AlertTitle
                sx={{
                  fontSize: '13px',
                  fontWeight: '600',
                  margin: '0px 10px 0px 0px',
                  color: 'blue',
                  textAlign: 'center',
                  padding: '0',
                }}>
                Tnx Hash: </AlertTitle>

            ) : (
              <AlertTitle
                sx={{
                  fontSize: '13px',
                  fontWeight: '600',
                  margin: '0px 10px 0px 0px',
                  color: '#ad0424',
                  textAlign: 'center',
                  padding: '0',
                }}>
                Error: </AlertTitle>)}
            <pre style={{
              whiteSpace: 'pre-wrap', 
              wordWrap: 'break-word', 
              textAlign: 'left', 
              margin: '0px 10px 0px 0px', 
              overflowX: 'hidden', 
              padding:'0',
            }}>{SignResult}</pre>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default Sign;
