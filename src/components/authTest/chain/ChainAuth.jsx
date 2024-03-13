"use client"
import React, { useState } from 'react';
import style from './chain.module.css'
import { Alert, AlertTitle } from '@mui/material';


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

  const handleCopyAccountClick = async () => {
    if (!navigator.clipboard) {
      console.error('Clipboard API not available.');
      return;
    }
    try {
      await navigator.clipboard.writeText(executionMessageChain);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleCopyAccountClickS = async () => {
    if (!navigator.clipboard) {
      console.error('Clipboard API not available.');
      return;
    }
    try {
      await navigator.clipboard.writeText(executionMessageChainS);
      setIsCopiedS(true);
      setTimeout(() => setIsCopiedS(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };
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
      setExecutionMessageChain('wallet_addEthereumChain executed correctly');
    } catch (error) {
      setExecutionMessageChain(`Error: ${error.message}`);
      setToggleHash(false)
      console.error('Error executing wallet_addEthereumChain FAILED:', error);
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

      setExecutionMessageChainS('wallet_switchEthereumChain executed correctly')
      setToggleHashS(true)
    } catch (error) {
      console.error('Error executing wallet_switchEthereumChain FAILED:', error);
      setExecutionMessageChainS(`Error: ${error.message}`)
      setToggleHashS(false)
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
                {toggleHash ? (
                  <AlertTitle sx={{
                    fontSize: '13px',
                    fontWeight: '600',
                    margin: '0px 10px 0px 0px',
                    color: 'green',
                    textAlign: 'center',
                    padding: '0',
                  }}>
                    Success
                    {!isCopied &&
                      <svg onClick={() => handleCopyAccountClick()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                        <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                      </svg>
                    }
                    {isCopied && <span
                      className={style.text_copied}
                      id="myTooltip">Copied !</span>}
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
                    Error
                    {!isCopied &&
                      <svg onClick={() => handleCopyAccountClick()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                        <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                      </svg>
                    }
                    {isCopied && <span
                      className={style.text_copied}
                      id="myTooltip">Copied !</span>}
                  </AlertTitle>
                )}
                <pre style={{
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  textAlign: 'left',
                  margin: '0px 10px 0px 0px',
                  overflowX: 'hidden',
                  padding: '0',
                }}>{executionMessageChain}</pre>
              </Alert>
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
                {toggleHashS ? (
                  <AlertTitle sx={{
                    fontSize: '13px',
                    fontWeight: '600',
                    margin: '0px 10px 0px 0px',
                    color: 'green',
                    textAlign: 'center',
                    padding: '0',
                  }}>
                    Success
                    {!isCopied &&
                      <svg onClick={() => handleCopyAccountClickS()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                        <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                      </svg>
                    }
                    {isCopied && <span
                      className={style.text_copied}
                      id="myTooltip">Copied !</span>}
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
                    Error
                    {!isCopied &&
                      <svg onClick={() => handleCopyAccountClickS()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                        <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                      </svg>
                    }
                    {isCopied && <span
                      className={style.text_copied}
                      id="myTooltip">Copied !</span>}
                  </AlertTitle>
                )}
                <pre style={{
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  textAlign: 'left',
                  margin: '0px 10px 0px 0px',
                  overflowX: 'hidden',
                  padding: '0',
                }}>{executionMessageChainS}</pre>
              </Alert>
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
