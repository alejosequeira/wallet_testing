'use client';
import { Alert, Button } from '@mui/material';
import React, { useState } from 'react';
import style from './watchasset.module.css'

function WatchAsset({ tokenAddress }) {
  const [executionMessage, setExecutionMessage] = useState('');

  const handleWatchAsset = async () => {
    try {
      const ethereum = window.ethereum;
      if (!ethereum) {
        setExecutionMessage('No Ethereum provider found');
        return;
      }

      const watchAssetResult = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: 'USDT',
            decimals: 6,
            image: 'https://example.com/token-image.png',
          },
        },
      });

      console.log(watchAssetResult);
      setExecutionMessage('watchAssetButton executed correctly');
    } catch (error) {
      console.error(error);
      setExecutionMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className={style.formu}>
      
      <button
        className={style.bouton}
        onClick={handleWatchAsset}
      >
        WATCH ASSET
      </button>

      {executionMessage && (
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

              }}>{executionMessage}</Alert>
        </div>
      )}
    </div>
  );
}

export default WatchAsset;
