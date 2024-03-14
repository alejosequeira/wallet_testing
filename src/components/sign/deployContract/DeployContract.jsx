"use client"
import React, { useState } from 'react';
import Web3 from 'web3';
import MyTokenABI from './abi.json';
import MyTokenBytecode from './bytecode.json';
import style from './deploy.module.css';
import { Alert, AlertTitle } from '@mui/material';


const MyTokenDeployer = () => {
    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toggleHashZero, setToggleHashZero] = useState(false);

    const [isCopied, setIsCopied] = useState(false);

    const handleCopyAccountClick = async () => {
        if (!navigator.clipboard) {
            console.error('Clipboard API not available.');
            return;
        }
        try {
            await navigator.clipboard.writeText(contract.options.address);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };
    // MetaMask Tx Signature: User denied transaction signature.

    const deployContract = async () => {
        setLoading(true);

        try {
            if (!window.ethereum) {
                throw new Error('MetaMask is not installed');
            }

            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(window.ethereum);

            const accounts = await web3.eth.getAccounts();
            const deployedContract = await new web3.eth.Contract(MyTokenABI)
                .deploy({ data: MyTokenBytecode.object, arguments: [] })
                .send({ from: accounts[0], gas: 1000000 });

            setContract(deployedContract);
            setToggleHashZero(true)
        } catch (err) {
            setContract(err)
            setToggleHashZero(false)
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className={style.formu}>
            <button className={style.bouton} onClick={deployContract} disabled={loading}>
                {loading ? 'Deploying...' : 'Deploy MyToken'}
            </button>
            {contract && (
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
                            <AlertTitle
                                sx={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    margin: '0px 10px 0px 0px',
                                    color: 'blue',
                                    textAlign: 'center',
                                    padding: '0',
                                }}>
                                Contract deployed at
                                {!isCopied &&
                                    <svg onClick={handleCopyAccountClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                                        <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                                    </svg>
                                }
                                {isCopied && <span
                                    className={style.text_copied}
                                    id="myTooltip">Copied !</span>}
                            </AlertTitle>

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
                                Error                                
                            </AlertTitle>)}
                        <pre style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            textAlign: 'left',
                            margin: '0px 10px 0px 0px',
                            overflowX: 'hidden',
                            padding: '0',
                        }}>{toggleHashZero ? (
                            <div>
                                {contract.options.address}
                            </div>)
                            : (
                                <div>
                                    Error: {contract.message}
                                </div>
                            )}
                        </pre>
                    </Alert>
                </div>
            )}
        </div>
    );
};

export default MyTokenDeployer;
