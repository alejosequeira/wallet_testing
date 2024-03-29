'use client';
import React, { useState } from 'react';
import AlertComponent from '@/components/mainLayout/Alert';

function WatchAsset({ tokenAddress }) {
  const [executionMessage, setExecutionMessage] = useState('');
  const [toggleHashZero, setToggleHashZero] = useState(false);

  const [isCopied, setIsCopied] = useState(false)

 
  const handleWatchAsset = async () => {
    try {

      const watchAssetResult = await window.ethereum.request({
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
      setExecutionMessage(`${error.message}`);
      setToggleHashZero(false)
    }
  };

  return (
    <div className="formu">
      
      <button
        className="button"
        onClick={handleWatchAsset}
      >
        WATCH ASSET
      </button>

      {executionMessage && (
        <div>
          <AlertComponent
                        toggle={toggleHashZero}
                        message={executionMessage}
                        isCopied={isCopied}
                        setIsCopied={setIsCopied}                    
                    />
        </div>
      )}
    </div>
  );
}

export default WatchAsset;
