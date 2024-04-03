"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import * as Web3Utils from '@/utils/web3';
import { getBlockchainData } from '@/utils/web3';
import AlertComponent from '@/components/mainLayout/Alert';

const SendTransaction = ({ address, viewForm, viewScamButton, viewCheckSum }) => {
    const [from, setFrom] = useState();
    const [to, setTo] = useState('0x873050043AF661fe9d5633369B10139eb7b4Da54');
    const [toScan, setToScan] = useState('0x873050043AF661fE9d5611369B10139eB7B4Da54');
    const [toSUM, setToSUM] = useState('0xA62A0d4fE4C2b10aadFBD4628f697d09a76Cd954');
    const [toScamAddress, setToScamAddress] = useState('0x592340957eBC9e4Afb0E9Af221d06fDDDF789de9');
    const [gasLimit, setGasLimit] = useState('19000');
    const [gasPrice, setGasPrice] = useState('');
    const [data, setData] = useState('0x');
    const [nonce, setNonce] = useState('0x0');
    const [chainId, setChainId] = useState("1");
    const [send_thirdResult, setSend_thirdResult] = useState('');
    const [send_thirdResultZero, setSend_thirdResultZero] = useState('');
    const [isToggledLimit, setIsToggledLimit] = useState(false);
    const [isToggledPrice, setIsToggledPrice] = useState(false);
    const [isToggledNonce, setIsToggledNonce] = useState(true);
    const [isToggledChain, setIsToggledChain] = useState(true);
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
            await Web3Utils.fetchMaxFees(setMaxFeePerGas);
            await Web3Utils.getBlockchainData(setChainId);
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
        if (!window.ethereum) {
            setSend_thirdResult("No Ethereum Wallet Found");
            setToggleHash(false);
            return;
        }
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
            setToggleHash(false);
            console.error(error);
        }
    };

    const handleSendEIP1559Transacction = async () => {
        if (!window.ethereum) {
            setSend_thirdResult("No Ethereum Wallet Found");
            setToggleHash(false);
            return;
        }
        if (from == null) {
            setFrom(address);
        }
        Web3Utils.fetchMaxFees(setMaxFeePerGas);
        Web3Utils.fetchGasLimit(from, to, valueInHex, data, setGasLimit);
        getBlockchainData(setChainId);
        try {
            const provider = window.ethereum;
            const result = await provider.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: from || address,
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
            setToggleHash(false)
            console.error(error);
        }
    };
    const handleSendStandardTxUnknow = async () => {
        if (!window.ethereum) {
            setSend_thirdResultZero("No Ethereum Wallet Found");
            setToggleHashZero(false);
            return;
        }
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
        if (!window.ethereum) {
            setSend_thirdResultZero("No Ethereum Wallet Found");
            setToggleHashZero(false);
            return;
        }
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
        <div className="formulario1">
            {showScamButton && (
                <>
                    {toggleScam ? (
                        <div className="formulario">
                            <h4>Zero Value Transfer Scam</h4>
                            <h5>1st step</h5>
                            <h6>Send transaction to some address</h6>
                            <h5>2nd step</h5>
                            <h6>Send transaction to another address with same beginning/ending bytes</h6>

                        </div>
                    ) : (
                        <div className="formulario">
                            <h4>Transfer to Attacker/Scam Address</h4>
                            <h6>Attempt sending a transaction to well-known scam/attacker address</h6>
                        </div>
                    )}
                    <button onClick={toggleScamZero} className="toggleButton">
                        {toggleScam ? 'Switch To Scam Address' : 'Switch To Zero Value'}
                    </button>
                </>
            )}
            {!showScamButton && (<>
                <div className="formulario_one">
                    {selectedOption === '0x2' ? (
                        <button
                            className="button"
                            onClick={handleSendEIP1559Transacction}
                        >SEND TRANSACTION
                        </button>
                    ) : (
                        <button
                            className="button"
                            onClick={handleSendStandardTransacction}
                        >SEND TRANSACTION
                        </button>
                    )}
                </div>

                {send_thirdResult && (
                    <div className="formu">
                        <AlertComponent
                            toggle={toggleHash}
                            message={send_thirdResult}
                            isCopied={isCopied}
                            setIsCopied={setIsCopied}
                        />
                    </div>
                )}
            </>)}

            <button onClick={toggleFormDisplay} className="toggleButton">
                {showForm ? 'Hide Params' : 'Show Params'}
            </button>
            {showForm && (<div className="formulario_grid">
                <label htmlFor="fromInput">From:</label>
                <input
                    type="text"
                    className="formulario_grid_input"
                    id="fromInput"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                />
                {toggleScam && (
                    <>
                        <label htmlFor="toInput">To: </label>
                        <input
                            type="text"
                            className="formulario_grid_input"
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
                                        setToSUM(`0x${firstChar}${inputValue.slice(3)}`)
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
                        <div className="formulario_one">
                            {selectedOption === '0x2' ? (
                                <button
                                    className="button"
                                    onClick={handleSendEIP1559Transacction}
                                >SEND TRANSACTION
                                </button>
                            ) : (
                                <button
                                    className="button"
                                    onClick={handleSendStandardTransacction}
                                >SEND TRANSACTION
                                </button>
                            )}
                        </div>
                    )}
                    {send_thirdResult && (
                        <div className="formu">
                            <AlertComponent
                                toggle={toggleHash}
                                message={send_thirdResult}
                                isCopied={isCopied}
                                setIsCopied={setIsCopied}
                            />
                        </div>
                    )}

                    {showForm && (<div className="formulario_grid">
                        <label htmlFor="toInputScam" style={{ color: "blue" }}>To Scam: </label>
                        <input
                            type="text"
                            className="formulario_grid_input"
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

                    <div className="formulario_one">
                        {selectedOption === '0x2' ? (
                            <button
                                className="button"
                                onClick={handleSendTxEIP1559Unknow}
                            >SEND SCAM TRANSACTION
                            </button>
                        ) : (
                            <button
                                className="button"
                                onClick={handleSendStandardTxUnknow}
                            >SEND SCAM TRANSACTION
                            </button>
                        )}


                    </div>

                    {send_thirdResultZero && (
                        <div className="formu">
                            <AlertComponent
                                toggle={toggleHashZero}
                                message={send_thirdResultZero}
                                isCopied={isCopied}
                                setIsCopied={setIsCopied}
                            />
                        </div>
                    )}
                </>)}


            {showForm && (
                <div className="formulario_grid">
                    <label htmlFor="valueInput">Value: </label>
                    <div className="input_button_toggle">
                        <input
                            type="text"
                            className="input_button"
                            id="valueInput"
                            value={displayWei ? valueInWei : valueInHex}
                            onChange={(e) =>
                                displayWei
                                    ? setValueInWei(e.target.value)
                                    : setValueInHex(e.target.value)
                            }
                        />
                        <button className="toggle_auto_button" onClick={convertValue}>
                            {displayWei ? 'WEI' : 'HEX'}
                        </button>
                    </div>


                    <label htmlFor="type">Type: </label>
                    <div className="input_checkbox_type" >
                        <div >
                            <input type="checkbox" 
                            value={selectedOption}                            
                            checked={selectedOption === '0x2'} 
                            onChange={toggleOption} />
                            <span className="sub_title"> EIP-1559</span></div>

                        <div >
                            <input type="checkbox" value={selectedOption} checked={selectedOption === '0x0'} onChange={toggleOption} />
                            <span className="sub_title"> Standard</span></div>
                    </div>

                    {selectedOption === '0x2' ? (

                        <label htmlFor="MaxFeePerGasInput">Max Fee: </label>

                    ) : (
                        <label htmlFor="gasPriceInput">Gas Price: </label>

                    )}
                    {selectedOption === '0x2' ? (
                        <div className="input_button_toggle">
                            <input
                                type="text"
                                id="MaxFeePerGasInput"
                                value={maxFeePerGas}
                                onChange={(e) => setMaxFeePerGas(e.target.value)}
                                disabled={isAutoMaxFee}
                                className="input_button"
                            />
                            <button
                                className={`toggle_auto_button ${isAutoMaxFee ? "toggleOn" : "toggleOff"}`}
                                onClick={() => {
                                    setIsAutoMaxFee(!isAutoMaxFee);
                                    Web3Utils.fetchMaxFees(setMaxFeePerGas);
                                }
                                }
                            >
                                {isAutoMaxFee ? 'AUTO' : 'AUTO'}
                            </button>
                        </div>
                    ) : (
                        <div className="input_button_toggle">
                            <input
                                type="text"
                                className="input_button"
                                id="gasPriceInput"
                                value={gasPrice}
                                onChange={(e) => setGasPrice(e.target.value)}
                                disabled={isToggledPrice}
                            />
                            <button
                                className={`toggle_auto_button ${isToggledPrice ? "toggleOn" : "toggleOff"}`}
                                onClick={() => {
                                    setIsToggledPrice(!isToggledPrice);
                                    Web3Utils.fetchGasPrice(setGasPrice);
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
                            className="formulario_grid_input"
                        />
                    ) : ("")}

                    <label htmlFor="gasLimitInput">Gas Limit:</label>
                    <div className="input_button_toggle">
                        <input
                            type="text"
                            id="gasLimitInput"
                            value={gasLimit}
                            onChange={(e) => setGasLimit(parseInt(e.target.value))}
                            disabled={isToggledLimit}
                            className="input_button"
                        />
                        <button className={`toggle_auto_button ${isToggledLimit ? "toggleOn" : "toggleOff"}`}
                            onClick={() => {
                                setIsToggledLimit(!isToggledLimit);
                                Web3Utils.fetchGasLimit(from, to, valueInHex, data, setGasLimit);
                            }}>
                            {isToggledLimit ? 'AUTO' : 'AUTO'}
                        </button>
                    </div>



                    <label htmlFor="data">Data: </label>
                    <input
                        type="text"
                        className="formulario_grid_input"
                        id="data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />

                    <label htmlFor="nonce">Nonce:</label>
                    <div className="input_button_toggle">
                        <input
                            type="text"
                            className="input_button"
                            id="nonce"
                            value={nonce}
                            disabled={isToggledNonce}
                            onChange={(e) => setNonce(e.target.value)}
                        />
                        <button
                            className={`toggle_auto_button ${isToggledNonce ? "toggleOn" : "toggleOff"}`}
                            onClick={() => {
                                setIsToggledNonce(!isToggledNonce);
                                Web3Utils.getNonce(from, setNonce);
                            }}>
                            {isToggledNonce ? 'AUTO' : 'AUTO'}
                        </button>
                    </div>


                    <label htmlFor="chain">Chain ID: </label>
                    <div className="input_button_toggle">
                        <input
                            type="text"
                            className="input_button"
                            id="chain"
                            value={chainId}
                            disabled={isToggledChain}
                            onChange={(e) => setChainId(e.target.value)}
                        />
                        <button
                            className={`toggle_auto_button ${isToggledChain ? "toggleOn" : "toggleOff"}`}
                            onClick={() => {
                                setIsToggledChain(!isToggledChain);
                                getBlockchainData(setChainId);
                            }}>
                            {isToggledChain ? 'AUTO' : 'AUTO'}
                        </button>
                    </div>

                </div>)}


        </div>
    );
}
export default SendTransaction;