"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import style from './sendTransaction.module.css'
import Web3 from 'web3';
import { Alert, AlertTitle } from '@mui/material';
import * as Web3Utils from '@/utils/web3';
import { handleCopyAccountClick } from '@/utils/buttons';


const SendTransaction = ({ viewForm, viewScamButton, viewCheckSum }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('0x873050043AF661fe9D5633369B10139eb7b4Da54');
    const [toScan, setToScan] = useState('0x873050043AF661fE9d5611369B10139eB7B4Da54');
    const [toSUM, setToSUM] = useState('0xA62A0d4fE4C2b10aadFBD4628f697d09a76Cd954');
    const [toScamAddress, setToScamAddress] = useState('0x592340957eBC9e4Afb0E9Af221d06fDDDF789de9');
    const [gasLimit, setGasLimit] = useState('19000');
    const [gasPrice, setGasPrice] = useState('');
    const [data, setData] = useState('0x');
    const [nonce, setNonce] = useState('0x0');
    const [chainId, setChainId] = useState('1');
    const [send_thirdResult, setSend_thirdResult] = useState('');
    const [send_thirdResultZero, setSend_thirdResultZero] = useState('');
    const [isToggledLimit, setIsToggledLimit] = useState(true);
    const [isToggledPrice, setIsToggledPrice] = useState(false);
    const [isToggledNonce, setIsToggledNonce] = useState(true);
    const [maxFeePerGas, setMaxFeePerGas] = useState('');
    const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState('0');
    const [isAutoMaxFee, setIsAutoMaxFee] = useState(true);

    const [valueInWei, setValueInWei] = useState("0");
    const [valueInHex, setValueInHex] = useState('0x0');
    const [displayWei, setDisplayWei] = useState(true);

    const [selectedOption, setSelectedOption] = useState('0x2');

    const [toggleHash, setToggleHash] = useState(false);
    const [toggleHashZero, setToggleHashZero] = useState(false);
    const [toggleScam, setToggleScam] = useState(true);


    const [isCopied, setIsCopied] = useState(false)
    const [showForm, setShowForm] = useState(viewForm);
    const [showScamButton, setShowScamButton] = useState(viewScamButton);

    useEffect(() => {
        const fetchData = async () => {
            const fromResult = await Web3Utils.handleGetEthAccounts(setFrom);
            await Web3Utils.getNonce(fromResult, setNonce);
            await Web3Utils.fetchGasLimit(fromResult, to, valueInHex, data, setGasLimit);
            await Web3Utils.fetchMaxFees(setMaxFeePerGas);
            await Web3Utils.getBlockchainData(setChainId)
        };
        fetchData();
    }, []);

    const toggleOption = () => {
        const newOption = selectedOption === '0x2' ? '0x0' : '0x2';
        setSelectedOption(newOption);
    };
    const toggleScamZero = () => {
        setToggleScam(!toggleScam);
    };
    const toggleDisplay = () => {
        setDisplayWei(!displayWei);
    };
    const toggleFormDisplay = () => {
        setShowForm(!showForm);
    };

    const convertValue = () => {
        const input = parseFloat(valueInWei);
        if (!isNaN(input)) {
            if (displayWei) {
                const hexValue = Web3.utils.toHex(input);

                setValueInHex(hexValue);
            } else {
                const weiValue = Web3.utils.hexToNumber(valueInHex);
                setValueInWei(weiValue.toFixed(0));

            }
            toggleDisplay();
        } else {
            if (displayWei) {
                setValueInWei('Invalid Input');
            } else {
                setValueInHex('Invalid Input');
            }
        }
    };

    const handleSendStandardTransacction = async () => {
        Web3Utils.fetchGasPrice(setGasPrice);
        Web3Utils.fetchGasLimit(from, to, valueInHex, data, setGasLimit);
        try {
            const provider = window.ethereum;
            const result = await provider.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: from,
                        to: to,
                        value: valueInHex,
                        gasLimit: gasLimit,
                        gasPrice: gasPrice,
                        type: selectedOption,
                        data: data,
                        nonce: nonce,
                        chainId: chainId,
                    },
                ],
            });
            setSend_thirdResult(`0x${result}`);
            console.log(result);
            setToggleHash(true)
        } catch (error) {
            setSend_thirdResult(`${error.message}`);
            console.error(error);
        }
    };

    const handleSendEIP1559Transacction = async () => {
        Web3Utils.fetchMaxFees(setMaxFeePerGas);
        Web3Utils.fetchGasLimit(from, to, valueInHex, data, setGasLimit);
        try {

            const provider = window.ethereum;
            const result = await provider.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: from,
                        to: viewCheckSum ? toSUM : to,
                        value: valueInHex,
                        gasLimit: gasLimit,
                        type: selectedOption,
                        data: data,
                        nonce: nonce,
                        chainId: chainId,
                        maxFeePerGas: maxFeePerGas,
                        maxPriorityFeePerGas: maxPriorityFeePerGas,
                    },
                ],
            });
            setSend_thirdResult(`0x${result}`);
            console.log(result);
            setToggleHash(true)
        } catch (error) {
            setSend_thirdResult(error.message);
            console.error(error);
        }
    };
    const handleSendStandardTxUnknow = async () => {
        Web3Utils.fetchGasPrice(setGasPrice);
        Web3Utils.fetchGasLimit(from, to, valueInHex, data, setGasLimit);
        try {
            const provider = window.ethereum;
            const result = await provider.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: from,
                        to: toggleScam ? (toScan) : (toScamAddress),
                        value: valueInHex,
                        gasLimit: gasLimit,
                        gasPrice: gasPrice,
                        type: selectedOption,
                        data: data,
                        nonce: nonce,
                        chainId: chainId,
                    },
                ],
            });
            setSend_thirdResultZero(`0x${result}`);
            console.log(result);
            setToggleHashZero(true)
        } catch (error) {
            setSend_thirdResultZero(`${error.message}`);
            console.error(error);
            setToggleHashZero(false)
        }
    };
    const handleSendTxEIP1559Unknow = async () => {
        Web3Utils.fetchMaxFees(setMaxFeePerGas);
        Web3Utils.fetchGasLimit(from, to, valueInHex, data, setGasLimit);
        try {
            const provider = window.ethereum;
            const result = await provider.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: from,
                        to: toggleScam ? (toScan) : (toScamAddress),
                        value: valueInHex,
                        gasLimit: gasLimit,
                        type: selectedOption,
                        data: data,
                        nonce: nonce,
                        chainId: chainId,
                        maxFeePerGas: maxFeePerGas,
                        maxPriorityFeePerGas: maxPriorityFeePerGas,
                    },
                ],
            });

            setSend_thirdResultZero(`0x${result}`);
            console.log(result);
            setToggleHashZero(true)
        } catch (error) {
            setSend_thirdResultZero(`${error.message}`);
            console.error(error);
            setToggleHashZero(false)
        }
    };
    return (
        <div className={style.formu}>
            {showScamButton && (
                <>
                    {toggleScam ? (
                        <div className={style.formulario_one}>
                            <h4>Zero Value Transfer Scam</h4>
                            <div className={style.align_fetchh}>
                                <h5>1st step-</h5>
                                <h7>Send transaction to some address</h7>
                                <h5>2nd step-</h5>
                                <h7>Send transaction to another address with same beginning/ending bytes</h7>
                            </div>
                        </div>
                    ) : (
                        <div className={style.formulario_one}>
                            <h4>Transfer to Attacker/Scam Address</h4>
                            <h6>Attempt sending a transaction to well-known scam/attacker address</h6>
                        </div>
                    )}
                    <button onClick={toggleScamZero} style={{ color: "blue" }} className={style.toggleeButton}>
                        {toggleScam ? 'switch to scam address' : 'switch to zero value'}
                    </button>
                </>
            )}
            {!showScamButton && (<>
                <div className={style.formulario_oneZ}>
                    {selectedOption === '0x2' ? (
                        <button
                            className={style.bouton}
                            onClick={handleSendEIP1559Transacction}
                        >SEND TRANSACTION
                        </button>
                    ) : (
                        <button
                            className={style.bouton}
                            onClick={handleSendStandardTransacction}
                        >SEND TRANSACTION
                        </button>
                    )}
                </div>

                {send_thirdResult && (
                    <div className={style.formu}>
                        <Alert

                            severity=""

                            sx={{
                                width: "17.5rem",
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
                                justifyContent: 'center',
                            }}

                        >
                            {toggleHash ? (
                                <AlertTitle
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        margin: '0',
                                        color: 'blue',
                                        textAlign: 'center',
                                    }}>
                                    Tnx Hash:
                                    {!isCopied &&
                                        <svg onClick={() => handleCopyAccountClick(send_thirdResult, setIsCopied)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
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
                                        margin: '0',
                                        color: '#ad0424',
                                        textAlign: 'center',
                                    }}>
                                    Error:
                                    {!isCopied &&
                                        <svg onClick={() => handleCopyAccountClick(send_thirdResult, setIsCopied)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                                            <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                                        </svg>
                                    }
                                    {isCopied && <span
                                        className={style.text_copied}
                                        id="myTooltip">Copied !</span>}
                                </AlertTitle>)}


                            {send_thirdResult}</Alert>
                    </div>
                )}
            </>)}

            <button onClick={toggleFormDisplay} className={style.toggleeButton}>
                {showForm ? 'Hide Tx Params' : 'Show Tx Params'}
            </button>
            {showForm && (<div className={style.formulario}>
                <label htmlFor="fromInput">From:</label>
                <input
                    type="text"
                    className={style.formulario_input}
                    id="fromInput"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                />
                {toggleScam && (
                    <>
                        <label htmlFor="toInput">To: </label>
                        <input
                            type="text"
                            className={style.formulario_input}
                            id="toInput"
                            value={
                                viewCheckSum ? toSUM : to
                            }
                            placeholder={to}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                setTo(inputValue);
                                if (inputValue.length >= 18) {
                                    const start = inputValue.substring(0, 17);
                                    const end = inputValue.substring(20);
                                    const modifiedValue = `${start}AAA${end}`;
                                    let firstChar = inputValue.charAt(2);
                                    if (viewCheckSum) {
                                        if (isNaN(firstChar)) {
                                            if (firstChar === firstChar.toUpperCase()) {
                                                firstChar = firstChar.toLowerCase();
                                            }
                                            else { firstChar = firstChar.toUpperCase(); }
                                        } else { firstChar = 'A'; }
                                        setTo(`0x${firstChar}${inputValue.slice(2)}`)
                                    }
                                    setToScan(modifiedValue);
                                } else {
                                    setToScan(inputValue);
                                }
                            }}
                        />
                    </>
                )}
            </div>)}
            {showScamButton && (
                <>
                    {toggleScam && (
                        <div className={style.formulario_oneZ}>
                            {selectedOption === '0x2' ? (
                                <button
                                    className={style.bouton}
                                    onClick={handleSendEIP1559Transacction}
                                >SEND TRANSACTION
                                </button>
                            ) : (
                                <button
                                    className={style.bouton}
                                    onClick={handleSendStandardTransacction}
                                >SEND TRANSACTION
                                </button>
                            )}
                        </div>
                    )}
                    {send_thirdResult && (
                        <div className={style.formu}>
                            <Alert

                                severity=""

                                sx={{
                                    width: "17.5rem",
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
                                    justifyContent: 'center',
                                }}

                            >
                                {toggleHash ? (
                                    <AlertTitle
                                        sx={{
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            margin: '0',
                                            color: 'blue',
                                            textAlign: 'center',
                                        }}>
                                        Tnx Hash:
                                        {!isCopied &&
                                            <svg onClick={() => handleCopyAccountClick(send_thirdResult, setIsCopied)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
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
                                            margin: '0',
                                            color: '#ad0424',
                                            textAlign: 'center',
                                        }}>
                                        Error:
                                        {!isCopied &&
                                            <svg onClick={() => handleCopyAccountClick(send_thirdResult, setIsCopied)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                                                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                                                <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                                            </svg>
                                        }
                                        {isCopied && <span
                                            className={style.text_copied}
                                            id="myTooltip">Copied !</span>}
                                    </AlertTitle>)}


                                {send_thirdResult}</Alert>
                        </div>
                    )}

                    {showForm && (<div className={style.formulario}>
                        <label htmlFor="toInputScam" style={{ color: "blue" }}>To Scam: </label>
                        <input
                            type="text"
                            className={style.formulario_input}
                            id="toInputScam"
                            value={
                                toggleScam ? (toScan) : (toScamAddress)
                            }
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (toggleScam) {
                                    setToScan(inputValue);
                                } else {
                                    setToScamAddress(inputValue);
                                }
                            }} />



                    </div>)}

                    <div className={style.formulario_oneZ}>
                        {selectedOption === '0x2' ? (
                            <button
                                className={style.bouton}
                                onClick={handleSendTxEIP1559Unknow}
                            >SEND SCAM TRANSACTION
                            </button>
                        ) : (
                            <button
                                className={style.bouton}
                                onClick={handleSendStandardTxUnknow}
                            >SEND SCAM TRANSACTION
                            </button>
                        )}


                    </div>

                    {send_thirdResultZero && (
                        <div className={style.formu}>
                            <Alert

                                severity=""

                                sx={{
                                    width: "17.5rem",
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

                            >
                                {toggleHashZero ? (
                                    <AlertTitle
                                        sx={{
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            margin: '0',
                                            color: 'blue',
                                            textAlign: 'center',
                                        }}>
                                        Tnx Hash:
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
                                    <AlertTitle
                                        sx={{
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            margin: '0',
                                            color: '#ad0424',
                                            textAlign: 'center',
                                        }}>
                                        Error:
                                        {!isCopied &&
                                            <svg onClick={() => handleCopyAccountClick()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor" className={style.clipboard}>
                                                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                                                <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                                            </svg>
                                        }
                                        {isCopied && <span
                                            className={style.text_copied}
                                            id="myTooltip">Copied !</span>}
                                    </AlertTitle>)}


                                {send_thirdResultZero}</Alert>
                        </div>
                    )}
                </>)}


            {showForm && (
                <div className={style.formulario}>
                    <label htmlFor="valueInput">Value: </label>
                    <div className={style.botton_toggle}>
                        <input
                            type="text"
                            className={style.input_botton}
                            id="valueInput"
                            value={displayWei ? valueInWei : valueInHex}
                            onChange={(e) =>
                                displayWei
                                    ? setValueInWei(e.target.value)
                                    : setValueInHex(e.target.value)
                            }
                        />
                        <button className={style.toggleButton} onClick={convertValue}>
                            {displayWei ? 'WEI' : 'HEX'}
                        </button>
                    </div>


                    <label htmlFor="type">Type: </label>


                    <div className={style.type_check} >

                        <div className={style.type_checkk}>
                            <input className={style.input_check} type="checkbox" checked={selectedOption === '0x2'} onChange={toggleOption} />
                            <span className={style.labelText}> EIP-1559</span></div>

                        <div className={style.type_checkk}>
                            <input className={style.input_check} type="checkbox" checked={selectedOption === '0x0'} onChange={toggleOption} />
                            <span className={style.labelText}> Standard</span></div>
                    </div>

                    {selectedOption === '0x2' ? (

                        <label htmlFor="MaxFeePerGasInput">Max Fee: </label>

                    ) : (
                        <label htmlFor="gasPriceInput">Gas Price: </label>

                    )}
                    {selectedOption === '0x2' ? (
                        <div className={style.botton_toggle}>
                            <input
                                type="text"
                                id="MaxFeePerGasInput"
                                value={maxFeePerGas}
                                onChange={(e) => setMaxFeePerGas(e.target.value)}
                                disabled={isAutoMaxFee}
                                className={style.input_botton}
                            />
                            <button
                                className={`${style.toggleButton} ${isAutoMaxFee ? style.toggleOn : style.toggleOff}`}
                                onClick={() => {
                                    setIsAutoMaxFee(!isAutoMaxFee);
                                    fetchMaxFees();
                                }
                                }
                            >
                                {isAutoMaxFee ? 'AUTO' : 'AUTO'}
                            </button>
                        </div>
                    ) : (
                        <div className={style.botton_toggle}>
                            <input
                                type="text"
                                className={style.input_botton}
                                id="gasPriceInput"
                                value={gasPrice}
                                onChange={(e) => setGasPrice(e.target.value)}
                                disabled={isToggledPrice}
                            />
                            <button
                                className={`${style.toggleButton} ${isToggledPrice ? style.toggleOn : style.toggleOff}`}
                                onClick={() => {
                                    setIsToggledPrice(!isToggledPrice);
                                    fetchGasPrice();
                                }}>
                                {isToggledPrice ? 'AUTO' : 'AUTO'}
                            </button>
                        </div>

                    )}
                    {selectedOption === '0x2' ? (
                        <label htmlFor="setMaxPriorityFeePerGas">Priority: </label>
                    ) : ("")}
                    {selectedOption === '0x2' ? (
                        <input
                            type="text"
                            id="MaxPriorityFeePerGasInput"
                            value={maxPriorityFeePerGas}
                            onChange={(e) => setMaxPriorityFeePerGas(e.target.value)}
                            className={style.formulario_input}
                        />
                    ) : ("")}

                    <label htmlFor="gasLimitInput">Gas Limit:</label>
                    <div className={style.botton_toggle}>
                        <input
                            type="text"
                            id="gasLimitInput"
                            value={gasLimit}
                            onChange={(e) => setGasLimit(parseInt(e.target.value))}
                            disabled={isToggledLimit}
                            className={style.input_botton}
                        />
                        <button className={`${style.toggleButton} ${isToggledLimit ? style.toggleOn : style.toggleOff}`}
                            onClick={() => {
                                setIsToggledLimit(!isToggledLimit);
                                fetchGasLimit();
                            }}>
                            {isToggledLimit ? 'AUTO' : 'AUTO'}
                        </button>
                    </div>



                    <label htmlFor="data">Data: </label>
                    <input
                        type="text"
                        className={style.formulario_input}
                        id="data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />

                    <label htmlFor="nonce">Nonce:</label>
                    <div className={style.botton_toggle}>
                        <input
                            type="text"
                            className={style.input_botton}
                            id="nonce"
                            value={nonce}
                            disabled={isToggledNonce}
                            onChange={(e) => setNonce(e.target.value)}
                        />
                        <button
                            className={`${style.toggleButton} ${isToggledNonce ? style.toggleOn : style.toggleOff}`}
                            onClick={() => {
                                setIsToggledNonce(!isToggledNonce);
                                getNonce();
                            }}>
                            {isToggledNonce ? 'AUTO' : 'AUTO'}
                        </button>
                    </div>


                    <label htmlFor="chainId">Chain ID: </label>
                    <input
                        type="text"
                        className={style.formulario_input}
                        id="chainId"
                        value={chainId}
                        onChange={(e) => setChainId(e.target.value)}
                    />




                </div>)}


        </div>
    );
}
export default SendTransaction;