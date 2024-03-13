"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import style from './unknown.module.css'
import Web3 from 'web3';
import { Alert, AlertTitle } from '@mui/material';

export default function ZeroScan() {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('0x462----------------------------------954');
    const [toScan, setToScan] = useState('0x462----------AAAAA-------------------954');
    const [gasLimit, setGasLimit] = useState('19000');
    const [gasPrice, setGasPrice] = useState('');
    const [data, setData] = useState('0x');
    const [nonce, setNonce] = useState('0x0');
    const [chainId, setChainId] = useState('1');
    const [send_thirdResult, setSend_thirdResult] = useState('');
    const [send_thirdResultZero, setSend_thirdResultZero] = useState('');
    const [isToggledLimit, setIsToggledLimit] = useState(false);
    const [isToggledPrice, setIsToggledPrice] = useState(false);
    const [isToggledNonce, setIsToggledNonce] = useState(false);
    const [maxFeePerGas, setMaxFeePerGas] = useState('');
    const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState('0');
    const [isAutoMaxFee, setIsAutoMaxFee] = useState(true);

    const [valueInWei, setValueInWei] = useState('0');
    const [valueInHex, setValueInHex] = useState('0x0');
    const [displayWei, setDisplayWei] = useState(true);

    const [selectedOption, setSelectedOption] = useState('0x2');

    const [toggleHash, setToggleHash] = useState(false);
    const [toggleHashZero, setToggleHashZero] = useState(false);

    useEffect(() => {
        const handleGetEthAccounts = async () => {
            try {
                const provider = window.ethereum;
                if (!provider) {
                    setFrom('Wallet not Found');
                    return;
                }
                const _accounts = await provider.request({
                    method: 'eth_accounts',
                });
                if (_accounts && _accounts.length > 0) {
                    const checksumAddress = Web3.utils.toChecksumAddress(_accounts[0]);
                    setFrom(checksumAddress);
                    await getNounce(checksumAddress);
                    await fetchGasLimit(checksumAddress);
                }
            } catch (err) {
                console.error("Error executing eth_accounts FAILED: " + err);
                setFrom("Error eth_accounts FAILED")
            }
        };

        const getNounce = async (address) => {
            setIsToggledNonce(!isToggledNonce);
            try {
                const provider = window.ethereum;
                const web3 = new Web3(provider);
                const nonce = await web3.eth.getTransactionCount(address, 'latest');
                setNonce(`${nonce.toString()}`);
            } catch (error) {
                setNonce("Provided Address invalid");
                console.error('Error fetching nonce:', error);
            }
        };
        const fetchGasLimit = async (address) => {
            setIsToggledLimit(!isToggledLimit);
            try {
                const provider = window.ethereum;
                const web3 = new Web3(provider);

                const transaction = {
                    from: address,
                    to: to,
                    value: valueInHex,
                    data: data,
                };

                const estimatedGas = await window.ethereum.request({
                    method: 'eth_estimateGas',
                    params: [transaction],
                });
                const estimatedGasNumber = web3.utils.hexToNumber(estimatedGas);

                setGasLimit(`${estimatedGasNumber}`);

            } catch (error) {
                setGasLimit(error.message)
                console.error('Error estimating gas:', error);
            }
        };

        handleGetEthAccounts();
        fetchMaxFees();
        loadBlockchainData();
    }, []);


    const toggleOption = () => {
        const newOption = selectedOption === '0x2' ? '0x0' : '0x2';
        setSelectedOption(newOption);
    };

    const toggleDisplay = () => {
        setDisplayWei(!displayWei);
    };

    const loadBlockchainData = async () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable(); // Request access if needed
                const currentChainId = await web3.eth.getChainId();
                setChainId(currentChainId);
            } catch (error) {
                console.error("Could not get chain ID:", error);
                setChainId("Could not get chain ID")
            }
        } else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            setChainId("Non-Ethereum browser detected. You should consider trying MetaMask!")
        }
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

    const getNonce = async () => {
        try {
            const provider = window.ethereum;
            const web3 = new Web3(provider);
            const nuonce = await web3.eth.getTransactionCount(from, 'latest');
            setNonce(`${nuonce.toString()}`);
        } catch (error) {
            setNonce(error.message);
            console.error('Error fetching nonce:', error);
        }
    };

    const fetchGasPrice = async () => {
        try {
            const provider = window.ethereum;
            const web3 = new Web3(provider);
            const currentGasPrice = await window.ethereum.request({ method: 'eth_gasPrice' });
            const gasPricee = web3.utils.hexToNumber(currentGasPrice);
            setGasPrice(`${gasPricee}`);
        } catch (error) {
            setGasPrice({ error })
            console.error('Error fetching gas price:', error);
        }
    };

    const fetchGasLimit = async () => {
        try {
            const provider = window.ethereum;
            const web3 = new Web3(provider);

            const transaction = {
                from: from,
                to: to,
                value: valueInHex,
                data: data,
            };

            const estimatedGas = await window.ethereum.request({
                method: 'eth_estimateGas',
                params: [transaction],
            });
            const estimatedGasNumber = web3.utils.hexToNumber(estimatedGas);

            setGasLimit(`${estimatedGasNumber}`);

        } catch (error) {
            setGasLimit(error.message)
            console.error('Error estimating gas:', error);
        }
    };

    const handleSend_standard = async () => {
        fetchGasLimit();
        fetchGasPrice();
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

    const handleSend_EIP = async () => {
        fetchMaxFees();
        fetchGasLimit();
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
            setSend_thirdResult(`${error.message}`);
            console.error(error);
        }
    };
    const handleSend_standardzero = async () => {
        fetchGasLimit();
        fetchGasPrice();
        try {
            const provider = window.ethereum;
            const result = await provider.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: from,
                        to: toScan,
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
    const handleSend_EIPzero = async () => {
        fetchMaxFees();
        fetchGasLimit();
        try {
            const provider = window.ethereum;
            const result = await provider.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: from,
                        to: toScan,
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



    const fetchMaxFees = async () => {
        try {
            const provider = window.ethereum;
            const web3 = new Web3(provider);
            const latestBlock = await web3.eth.getBlock('latest');
            const baseFeePerGas = latestBlock.baseFeePerGas;

            const baseFeeBigInt = BigInt(baseFeePerGas);

            const estimatedMaxFeePerGas = baseFeeBigInt * BigInt(2);

            setMaxFeePerGas(estimatedMaxFeePerGas.toString());
        } catch (error) {
            console.error('Error fetching max fees:', error);
        }
    };
    return (
        <div className={style.formu}>
            <div className={style.formulario_one}>
                <h4>Unknown Address Detection</h4>
                <div className={style.align_fetchh}>
                    <h5>1st step-</h5>
                    <h6>Send transaction to some address</h6>

                    <h5>2nd step-</h5>
                    <h6>Send transaction to another address with same beginning/ending bytes</h6>
                </div>
            </div>
            <div className={style.formulario}>
                <label htmlFor="fromInput">From:</label>
                <input
                    type="text"
                    className={style.formulario_input}
                    id="fromInput"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                />
                <label htmlFor="toInput">To: </label>
                <input
                    type="text"
                    className={style.formulario_input}
                    id="toInput"
                    value={to}
                    placeholder={to}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        setTo(inputValue);
                        if (inputValue.length >= 18) {
                            const start = inputValue.substring(0, 15);
                            const end = inputValue.substring(20);
                            const modifiedValue = `${start}AAAAA${end}`;
                            setToScan(modifiedValue);
                        } else {
                            setToScan(inputValue);
                        }
                    }}
                />
            </div>
            <div className={style.formulario_oneZ}>
                {selectedOption === '0x2' ? (
                    <button
                        className={style.bouton}
                        onClick={handleSend_EIP}
                    >SEND TRANSACTION
                    </button>
                ) : (
                    <button
                        className={style.bouton}
                        onClick={handleSend_standard}
                    >SEND TRANSACTION
                    </button>
                )}
            </div>

            {send_thirdResult && (
                <div className={style.formu}>
                    <Alert

                        severity=""

                        sx={{
                            width: "10rem",
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
                                Tnx Hash: </AlertTitle>

                        ) : (
                            <AlertTitle
                                sx={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    margin: '0',
                                    color: '#ad0424',
                                    textAlign: 'center',
                                }}>
                                Error: </AlertTitle>)}


                        {send_thirdResult}</Alert>
                </div>
            )}
            <div className={style.formulario}>
                <label htmlFor="toInputScam" style={{ color: "blue" }}>To Scam: </label>
                <input
                    type="text"
                    className={style.formulario_input}
                    id="toInputScam"
                    value={toScan}                
                    placeholder={toScan}                    
                    onChange={(e) => setToScan(e.target.value)}
                />
            </div>

            <div className={style.formulario_oneZ}>
                {selectedOption === '0x2' ? (
                    <button
                        className={style.bouton}
                        onClick={handleSend_EIPzero}
                    >SEND SCAM TRANSACTION
                    </button>
                ) : (
                    <button
                        className={style.bouton}
                        onClick={handleSend_standardzero}
                    >SEND SCAM TRANSACTION
                    </button>
                )}
            </div>
            {send_thirdResultZero && (
                <div className={style.formu}>
                    <Alert

                        severity=""

                        sx={{
                            width: "10rem",
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
                                Tnx Hash: </AlertTitle>

                        ) : (
                            <AlertTitle
                                sx={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    margin: '0',
                                    color: '#ad0424',
                                    textAlign: 'center',
                                }}>
                                Error: </AlertTitle>)}


                        {send_thirdResultZero}</Alert>
                </div>
            )}

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




            </div>


        </div>
    );
}
