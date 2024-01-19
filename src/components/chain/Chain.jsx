"use client"
import React, { useState } from 'react';
import Web3 from 'web3';
import style from './chain.module.css'
import { Alert, Button } from '@mui/material';


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

  const handleAddChain = async () => {
    try {
      const provider = window.ethereum;
      if (!provider) {
        setExecutionMessageChain('No Ethereum provider found');
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

      setExecutionMessageChain('wallet_addEthereumChain executed correctly');
    } catch (error) {
      setExecutionMessageChain(`Error: ${error.message}`);
      console.error('Error executing wallet_addEthereumChain FAILED:', error);
    }
  };

  const handleSwitchChain = async () => {
    try {
      const provider = window.ethereum;

      if (!provider) {
        setExecutionMessageChainS('No Ethereum provider found')
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

      setExecutionMessageChainS('wallet_switchEthereumChain executed correctly')
    } catch (error) {
      console.error('Error executing wallet_switchEthereumChain FAILED:', error);
      setExecutionMessageChainS(`Error: ${error.message}`)
    }
  }
  return (


    <div className={style.formu}>
      <div className={style.formulario1}>
        <div className={style.formulario_one}>
          <button
            className={style.bouton}
            onClick={handleAddChain}
          >
            ADD CHAIN
          </button>
          {executionMessageChain && (
            <div className={style.formu}>
              <Alert
                severity=""
                sx={{
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
                  justifyContent: 'center'
                }}

              >{executionMessageChain}</Alert>
            </div>
          )}
        </div>
        <div className={style.formulario_one}>
          <button
            className={style.bouton}
            onClick={handleSwitchChain}
          >

            SWITCH CHAIN
          </button>
          {executionMessageChainS && (
            <div className={style.formu}>
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
                justifyContent: 'center'
              }}>{executionMessageChainS}</Alert>
            </div>
          )}
        </div>
      </div>

      <div className={style.formulario}>


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
