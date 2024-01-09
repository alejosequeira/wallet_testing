"use client"
import React, { useState } from 'react';
import { Alert, Button } from '@mui/material';
import style from './personalsign.module.css';

const PersonalSign = ({ address }) => {
  const [personalSignResult, setPersonalSignResult] = useState('');

  const handlePersonalSign = async () => {
    const exampleMessage = 'Example `personal_sign` message';

    try {
      const provider = window.ethereum;
      const msg = `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`;
      const sign = await provider.request({
        method: 'personal_sign',
        params: [msg, address, 'Example password'],
      });
      setPersonalSignResult(sign);
    } catch (err) {
      console.error(err);
      setPersonalSignResult(`Error: ${err.message}`);
    }
  };

  return (
    <div className={style.formu}>
      <button
        className={style.bouton}
        onClick={handlePersonalSign}
      > PERSONAL SIGN
      </button>
      {personalSignResult && (
        <div>
          <Alert severity="" sx={{
            width: "10rem",
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
            justifyContent: 'center'

          }}>{personalSignResult}</Alert>
        </div>
      )}
    </div>
  );
};

export default PersonalSign;
