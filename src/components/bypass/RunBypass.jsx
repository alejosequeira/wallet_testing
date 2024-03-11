"use client"
import React from 'react'
import { Alert, AlertTitle } from '@mui/material';
import { useState } from 'react';
import Web3 from 'web3';
import style from './runbypass.module.css'




export default function RunBypass({ address, chipherText }) {
    const [isCopied, setIsCopied] = useState(false);
    const [toggleHashZero, setToggleHashZero]= useState({
        v1:false,
        v2: false,
        v3: false,
        v4: false,
        v5: false,
        v6: false,
        v7: false,
        v8: false,
        v9: false,
        v10: false
    })
    const handleCopyAccountClick = () => {
        const textArea = document.createElement('textarea');
        textArea.value = accountsResult;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            setIsCopied(true);
        } catch (err) {
            console.error('Unable to copy text:', err);
        } finally {
            document.body.removeChild(textArea);
        }
    };
    const handleCopyEncryptionKeyClick = () => {
        const textArea = document.createElement('textarea');
        textArea.value = encryptionKey;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            setIsCopied(true);
        } catch (err) {
            console.error('Unable to copy text:', err);
        } finally {
            document.body.removeChild(textArea);
        }
    };


    const handleAllActions = async () => {
        await handleGetEthAccounts();
        await handleAddChain();
        await handleSwitchChain();
        await handleWatchAsset();
        await getEncryptionKey();
        await handleDecrypt();
        await handleSignTypedDataV3();
        await handleSignTypedDataV4();
        await handlePersonalSign();
        await handleSendTransaction();
    };
    const [accountsResult, setAccountsResult] = useState('');

    const [executionMessageChain, setExecutionMessageChain] = useState('');
    const [executionMessageChainS, setExecutionMessageChainS] = useState('');


    const [executionMessage, setExecutionMessage] = useState('');

    const [encryptionKey, setEncryptionKey] = useState('');
    const [decryptedText, setDecryptedText] = useState('');

    const [signTypedDataV3, setSignTypedDataV3] = useState('');
    const [signTypedDataV4, setSignTypedDataV4] = useState('');

    const [personalSignResult, setPersonalSignResult] = useState('');

    const [sendTransactionResult, setSendTransactionResult] = useState('');

    const handleGetEthAccounts = async () => {
        try {
            const provider = window.ethereum;
            const _accounts = await provider.request({
                method: 'eth_accounts',
            });

            if (_accounts && _accounts.length > 0) {
                setAccountsResult(_accounts.join(', '))
                setToggleHashZero(prevState => ({ ...prevState,v1:true}))
            } else {
                setAccountsResult('No Ethereum accounts found')
            }
        } catch (err) {
            console.error("Error executing eth_accounts FAILED" + err);
            setAccountsResult(`Error: ${err.message}`)
            setToggleHashZero(prevState => ({ ...prevState,v1:false}))
        }
        console.log("pressing the button eth_accounts");

    };


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
                        chainId: `0x89`,
                        chainName: 'Polygon Mainnet',
                        nativeCurrency: {
                            name: 'MATIC',
                            decimals: 18,
                            symbol: 'MATIC',
                        },
                        rpcUrls: ['https://polygon-rpc.com/'],
                        blockExplorerUrls: ['https://polygonscan.com/'],
                    },
                ],
            });
            setToggleHashZero(prevState => ({ ...prevState,v2:true}))
            setExecutionMessageChain('wallet_addEthereumChain executed correctly');
        } catch (error) {
            setExecutionMessageChain(`Error: ${error.message}`);
            console.error('Error executing wallet_addEthereumChain FAILED:', error);
            setToggleHashZero(prevState => ({ ...prevState,v2:false}))
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
                        chainId: `0x89`,
                    },
                ],
            });
            setToggleHashZero(prevState => ({ ...prevState,v3:true}))

            setExecutionMessageChainS('wallet_switchEthereumChain executed correctly')
        } catch (error) {
            console.error('Error executing wallet_switchEthereumChain FAILED:', error);
            setExecutionMessageChainS(`Error: ${error.message}`)
            setToggleHashZero(prevState => ({ ...prevState,v3:false}))
        }
    }



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
                        address: address,
                        symbol: 'USDT',
                        decimals: 6,
                        image: 'https://example.com/token-image.png',
                    },
                },
            });

            console.log(watchAssetResult);
            setToggleHashZero(prevState => ({ ...prevState,v4:true}))
            setExecutionMessage('watchAssetButton executed correctly');
        } catch (error) {
            console.error(error);
            setExecutionMessage(`Error: ${error.message}`);
            setToggleHashZero(prevState => ({ ...prevState,v4:false}))
        }
    };


    const getEncryptionKey = async () => {
        try {
            const provider = window.ethereum;
            setToggleHashZero(prevState => ({ ...prevState,v5:true}))
            setEncryptionKey(await provider.request({
                method: 'eth_getEncryptionPublicKey',
                params: [address]
            }));

        } catch (error) {
            setEncryptionKey(`Error: ${error.message}`);
            console.error(`Error: ${error.message}`);
            setToggleHashZero(prevState => ({ ...prevState,v5:false}))
        }
    };

    const handleDecrypt = async () => {
        try {
            const provider = window.ethereum;

            const decryptedMessage = await provider.request({
                method: 'eth_decrypt',
                params: [chipherText, address]
            });
            setToggleHashZero(prevState => ({ ...prevState,v6:true}))

            setDecryptedText(decryptedMessage);
        } catch (error) {
            setDecryptedText(`Error: ${error.message}`);
            console.error(`Error: ${error.message}`);
            setToggleHashZero(prevState => ({ ...prevState,v6:false}))
        }
    };


    const handleSignTypedDataV3 = async () => {
        const chainIdInt = 137;

        const msgParams = {
            types: {
                EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    { name: 'verifyingContract', type: 'address' },
                ],
                Person: [
                    { name: 'name', type: 'string' },
                    { name: 'wallet', type: 'address' },
                ],
                Mail: [
                    { name: 'from', type: 'Person' },
                    { name: 'to', type: 'Person' },
                    { name: 'contents', type: 'string' },
                ],
            },
            primaryType: 'Mail',
            domain: {
                name: 'Ether Mail',
                version: '1',
                chainId: chainIdInt,
                verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
            },
            message: {
                from: {
                    name: 'Cow',
                    wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
                },
                to: {
                    name: 'Bob',
                    wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                },
                contents: 'Hello, Bob!',
            },
        };

        try {
            const provider = window.ethereum;
            const sign = await provider.request({
                method: 'eth_signTypedData_v3',
                params: [address, JSON.stringify(msgParams)],
            });
            setSignTypedDataV3(sign);
            setToggleHashZero(prevState => ({ ...prevState,v7:true}))
        } catch (err) {
            console.error(err);
            setSignTypedDataV3(`Error: ${err.message}`);
            setToggleHashZero(prevState => ({ ...prevState,v7:false}))
        }
    };
    const handleSignTypedDataV4 = async () => {
        const chainIdInt = 137;

        const msgParams = {
            domain: {
                chainId: chainIdInt.toString(),
                name: 'Ether Mail',
                verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
                version: '1',
            },
            message: {
                contents: 'Hello, Bob!',
                from: {
                    name: 'Cow',
                    wallets: [
                        '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
                        '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
                    ],
                },
                to: [
                    {
                        name: 'Bob',
                        wallets: [
                            '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                            '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
                            '0xB0B0b0b0b0b0B000000000000000000000000000',
                        ],
                    },
                ],
                attachment: '0x',
            },
            primaryType: 'Mail',
            types: {
                EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    { name: 'verifyingContract', type: 'address' },
                ],
                Group: [
                    { name: 'name', type: 'string' },
                    { name: 'members', type: 'Person[]' },
                ],
                Mail: [
                    { name: 'from', type: 'Person' },
                    { name: 'to', type: 'Person[]' },
                    { name: 'contents', type: 'string' },
                    { name: 'attachment', type: 'bytes' },
                ],
                Person: [
                    { name: 'name', type: 'string' },
                    { name: 'wallets', type: 'address[]' },
                ],
            },
        };

        try {
            const provider = window.ethereum;
            const sign = await provider.request({
                method: 'eth_signTypedData_v4',
                params: [address, JSON.stringify(msgParams)],
            });
            setSignTypedDataV4(sign);
            setToggleHashZero(prevState => ({ ...prevState,v8:true}))
        } catch (err) {
            console.error(err);
            setSignTypedDataV4(`Error: ${err.message}`);
            setToggleHashZero(prevState => ({ ...prevState,v8:false}))
        }
    };

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
            setToggleHashZero(prevState => ({ ...prevState,v9:true}))
        } catch (err) {
            console.error(err);
            setPersonalSignResult(`Error: ${err.message}`);
            setToggleHashZero(prevState => ({ ...prevState,v9:false}))
        }
    };

    const handleSendTransaction = async () => {
        try {
            const provider = window.ethereum;
            const result = await provider.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: address,
                        to: '0x0c54FcCd2e384b4BB6f2E405Bf5Cbc15a017AaFb',
                        value: '0x0',
                        gasLimit: '0x5208',
                        gasPrice: '0x2540be370',
                        type: '0x0',
                    },
                ],
            });
            setSendTransactionResult(result);
            setToggleHashZero(prevState => ({ ...prevState,v10:true}))
            console.log(result);
        } catch (error) {
            setSendTransactionResult(`Error: ${error.message}`);
            console.error(error);
            setToggleHashZero(prevState => ({ ...prevState,v10:false}))
        }
    };

    return (
        <div className={style.formu2}>
            <button
                className={style.bouton}
                onClick={handleAllActions}
            >
                RUN AUTHORIZATION BYPASS TEST
            </button>

            {accountsResult && (
                <div className={style.formu}>
                    <div className={style.subb_title}>
                        <h3 className={style.sub_title}>Get Eth Account</h3>
                        <div className={style.container}>

                            <svg onClick={handleCopyAccountClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                                <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                                <span className={style.tooltiptext} id="myTooltip">Copy to clipboard</span>
                            </svg>
                            {isCopied ? (<p className={style.text_copied}>copied</p>) : ''}
                        </div>
                    </div>
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
                        {toggleHashZero.v1 ? (
                            <AlertTitle sx={{
                                fontSize: '13px',
                                fontWeight: '600',
                                margin: '0px 10px 0px 0px',
                                color: 'blue',
                                textAlign: 'center',
                                padding: '0',
                            }}>
                                Correct Executed:
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
                        }}></pre>
                        {accountsResult}


                    </Alert>

                </div>
            )}

            {executionMessageChain && (
                <div className={style.formu}>
                    <div className={style.subb_title}>
                        <h3 className={style.sub_title}>Add Chain</h3>
                    </div>

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
                        {toggleHashZero.v2 ? (
                            <AlertTitle sx={{
                                fontSize: '13px',
                                fontWeight: '600',
                                margin: '0px 10px 0px 0px',
                                color: 'blue',
                                textAlign: 'center',
                                padding: '0',
                            }}>
                                Correct Executed:
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
                        }}></pre>{executionMessageChain}</Alert>
                </div>
            )}
            {executionMessageChainS && (
                <div className={style.formu}>
                    <div className={style.subb_title}>
                        <h3 className={style.sub_title}>Switch Chain</h3>
                    </div>

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
                        {toggleHashZero.v3 ? (
                            <AlertTitle sx={{
                                fontSize: '13px',
                                fontWeight: '600',
                                margin: '0px 10px 0px 0px',
                                color: 'blue',
                                textAlign: 'center',
                                padding: '0',
                            }}>
                                Correct Executed:
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
                        }}></pre>{executionMessageChainS}</Alert>
                </div>
            )}

            {executionMessage && (
                <div className={style.formu}>
                    <div className={style.subb_title}>
                        <h3 className={style.sub_title}>Watch Asset</h3>
                    </div>

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
                        {toggleHashZero.v4 ? (
                            <AlertTitle sx={{
                                fontSize: '13px',
                                fontWeight: '600',
                                margin: '0px 10px 0px 0px',
                                color: 'blue',
                                textAlign: 'center',
                                padding: '0',
                            }}>
                                Correct Executed:
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
                        }}></pre>{executionMessage}</Alert>
                </div>
            )}


            {encryptionKey && (
                <div className={style.formu}>
                    <div className={style.subb_title}>
                        <h3 className={style.sub_title}>Get Encryption Key</h3>
                        <div className={style.container}>

                            <svg onClick={handleCopyEncryptionKeyClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                                <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                                <span className={style.tooltiptext} id="myTooltip">Copy to clipboard</span>
                            </svg>
                            {isCopied ? (<p className={style.text_copied}>copied</p>) : ''}
                        </div>
                    </div>
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
                        {toggleHashZero.v5 ? (
                            <AlertTitle sx={{
                                fontSize: '13px',
                                fontWeight: '600',
                                margin: '0px 10px 0px 0px',
                                color: 'blue',
                                textAlign: 'center',
                                padding: '0',
                            }}>
                                Correct Executed:
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
                        }}></pre>{encryptionKey}</Alert>
                </div>
            )}

            {decryptedText && (
                <div className={style.formu}>
                    <div className={style.subb_title}>
                        <h3 className={style.sub_title}>Decrypt</h3>
                    </div>

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
                        {toggleHashZero.v6 ? (
                            <AlertTitle sx={{
                                fontSize: '13px',
                                fontWeight: '600',
                                margin: '0px 10px 0px 0px',
                                color: 'blue',
                                textAlign: 'center',
                                padding: '0',
                            }}>
                                Correct Executed:
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
                        }}></pre>{decryptedText}</Alert>
                </div>
            )}

            {signTypedDataV3 && (
                <div className={style.formu}>
                    <div className={style.subb_title}>
                        <h3 className={style.sub_title}>Sign Typed Data v3</h3>
                    </div>

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
                        {toggleHashZero.v7 ? (
                            <AlertTitle sx={{
                                fontSize: '13px',
                                fontWeight: '600',
                                margin: '0px 10px 0px 0px',
                                color: 'blue',
                                textAlign: 'center',
                                padding: '0',
                            }}>
                                Correct Executed:
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
                        }}></pre>{signTypedDataV3}</Alert>
                </div>
            )}


            {signTypedDataV4 && (
                <div className={style.formu}>
                    <div className={style.subb_title}>
                        <h3 className={style.sub_title}>Sign Typed Data v4</h3>
                    </div>

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
                        {toggleHashZero.v8 ? (
                            <AlertTitle sx={{
                                fontSize: '13px',
                                fontWeight: '600',
                                margin: '0px 10px 0px 0px',
                                color: 'blue',
                                textAlign: 'center',
                                padding: '0',
                            }}>
                                Correct Executed:
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
                        }}></pre>{signTypedDataV4}</Alert>
                </div>
            )}

            {personalSignResult && (
                <div className={style.formu}>
                    <div className={style.subb_title}>
                        <h3 className={style.sub_title}>Personal Sign</h3>
                    </div>

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
                        {toggleHashZero.v9 ? (
                            <AlertTitle sx={{
                                fontSize: '13px',
                                fontWeight: '600',
                                margin: '0px 10px 0px 0px',
                                color: 'blue',
                                textAlign: 'center',
                                padding: '0',
                            }}>
                                Correct Executed:
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
                        }}></pre>{personalSignResult}</Alert>
                </div>
            )}

            {sendTransactionResult && (
                <div className={style.formu}>
                    <div className={style.subb_title}>
                        <h3 className={style.sub_title}>Send Transaction</h3>
                    </div>

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
                        {toggleHashZero.v10 ? (
                            <AlertTitle sx={{
                                fontSize: '13px',
                                fontWeight: '600',
                                margin: '0px 10px 0px 0px',
                                color: 'blue',
                                textAlign: 'center',
                                padding: '0',
                            }}>
                                Correct Executed:
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
                        }}></pre>{sendTransactionResult}</Alert>
                </div>
            )}
        </div>
    )
}
