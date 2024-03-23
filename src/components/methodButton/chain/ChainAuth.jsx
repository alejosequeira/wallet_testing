"use client"
import React, { useState } from 'react';
import AlertComponent from '@/components/mainLayout/Alert';

function Chain() {
  const [chainId, setChainId] = useState('0x89');
  const [chainName, setChainName] = useState('Polygon Mainnet');
  const [nativeCurrencyName, setNativeCurrencyName] = useState('MATIC');
  const [decimals, setDecimals] = useState(18);
  const [symbol, setSymbol] = useState('MATIC');
  const [rpcUrl, setRpcUrl] = useState('https://polygon-rpc.com/');
  const [blockExplorerUrl, setBlockExplorerUrl] = useState('https://polygonscan.com/');
  const [executionMessageChain, setExecutionMessageChain] = useState('');
  const [executionMessageChainS, setExecutionMessageChainS] = useState('');

  const [isCopied, setIsCopied] = useState(false)
  const [toggleHash, setToggleHash] = useState(false);

  const [isCopiedS, setIsCopiedS] = useState(false)
  const [toggleHashS, setToggleHashS] = useState(false);


  const handleAddChain = async () => {
    try {
      const provider = window.ethereum;
      if (!provider) {
        setExecutionMessageChain('No Ethereum provider found');
        setToggleHash(false)
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${parseInt(chainId).toString(16)}`,
            chainName: chainName,
            nativeCurrency: {
              name: nativeCurrencyName,
              decimals: parseInt(decimals),
              symbol: symbol,
            },
            rpcUrls: [rpcUrl],
            blockExplorerUrls: [blockExplorerUrl],
          },
        ],
      });
      setToggleHash(true)
      setExecutionMessageChain('addEthereumChain executed correctly');
    } catch (error) {
      setExecutionMessageChain(`Error: ${error.message}`);
      setToggleHash(false)
      console.error('Error addEthereumChain FAILED:', error);
    }
  };

  const handleSwitchChain = async () => {
    try {
      const provider = window.ethereum;

      if (!provider) {
        setExecutionMessageChainS('No Ethereum provider found')
        setToggleHashS(false)
        console.error('No Ethereum provider found');
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${parseInt(chainId).toString(16)}`,
          },
        ],
      });

      setExecutionMessageChainS('switchEthereumChain executed correctly')
      setToggleHashS(true)
    } catch (error) {
      console.error('Error switchEthereumChain FAILED:', error);
      setExecutionMessageChainS(`Error: ${error.message}`)
      setToggleHashS(false)
    }
  }
  return (
    <div className="formu">
      <div className="formulario1">
        <div className="formulario_one">
          <button
            className="button"
            onClick={handleAddChain}
          >
            ADD CHAIN
          </button>
          {executionMessageChain && (
            <div className="formu">
              <AlertComponent
                        toggle={toggleHash}
                        message={executionMessageChain}
                        isCopied={isCopied}
                        setIsCopied={setIsCopied}                    
                    />
            </div>
          )}
        </div>
        <div className="formulario_one">
          <button
            className="button"
            onClick={handleSwitchChain}
          >
            SWITCH CHAIN
          </button>
          {executionMessageChainS && (
            <div className="formu">
              <AlertComponent
                        toggle={toggleHashS}
                        message={executionMessageChainS}
                        isCopied={isCopiedS}
                        setIsCopied={setIsCopiedS}                    
                    />
            </div>
          )}
        </div>
      </div>

      <div className="formulario">


        <label htmlFor="chainIdInput">Chain ID:</label>
        <input
          type="text"
          id="chainIdInput"
          value={chainId}
          onChange={(e) => setChainId(e.target.value)}
        />

        <label htmlFor="chainNameInput">Chain Name:</label>
        <input
          type="text"
          id="chainNameInput"
          value={chainName}
          onChange={(e) => setChainName(e.target.value)}
        />

        <label htmlFor="nativeCurrencyNameInput">Native Currency Name:</label>
        <input
          type="text"
          id="nativeCurrencyNameInput"
          value={nativeCurrencyName}
          onChange={(e) => setNativeCurrencyName(e.target.value)}
        />

        <label htmlFor="decimalsInput">Decimals:</label>
        <input
          type="number"
          id="decimalsInput"
          value={decimals}
          onChange={(e) => setDecimals(parseInt(e.target.value))}
        />

        <label htmlFor="symbolInput">Symbol:</label>
        <input
          type="text"
          id="symbolInput"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />

        <label htmlFor="rpcUrlInput">Rpc Url:</label>
        <input
          type="text"
          id="rpcUrlInput"
          value={rpcUrl}
          onChange={(e) => setRpcUrl(e.target.value)}
        />

        <label htmlFor="blockExplorerUrlInput">ExplorerUrl:</label>
        <input
          type="text"
          id="blockExplorerUrlInput"
          value={blockExplorerUrl}
          onChange={(e) => setBlockExplorerUrl(e.target.value)}
        />
      </div>

    </div>
  );
}

export default Chain;
