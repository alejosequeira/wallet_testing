'use client';
import { Alert, AlertTitle } from '@mui/material';
import React, { useState } from 'react';
import style from './watchasset.module.css'

function WatchAsset({ tokenAddress }) {
  const [executionMessage, setExecutionMessage] = useState('');
  const [toggleHashZero, setToggleHashZero] = useState(false);
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
      setToggleHashZero(true)
    } catch (error) {
      console.error(error);
      setExecutionMessage(`Error: ${error.message}`);
      setToggleHashZero(false)
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
                        {toggleHashZero ? (
                            <AlertTitle sx={{
                                fontSize: '13px',
                                fontWeight: '600',
                                margin: '0px 10px 0px 0px',
                                color: 'blue',
                                textAlign: 'center',
                                padding: '0',
                            }}>
                                Signature:
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
                                Error:
                            </AlertTitle>
                        )}
                        <pre style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            textAlign: 'left',
                            margin: '0px 10px 0px 0px',
                            overflowX: 'hidden',
                            padding: '0',
                        }}>{executionMessage}</pre>
                    </Alert>
        </div>
      )}
    </div>
  );
}

export default WatchAsset;
