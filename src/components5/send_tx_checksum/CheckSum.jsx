"use client";
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import style from './checkSum.module.css';
import { Alert, TextField, AlertTitle } from '@mui/material';

export default function CheckSum() {
    const [address, setAddress] = useState('');
    const [isValid, setIsValid] = useState(false);

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('0x3b539558C6465968ccfDe3A731bF63d6d4D8B85D');
    const [gasLimit, setGasLimit] = useState('19000');
    const [gasPrice, setGasPrice] = useState('');
    const [data, setData] = useState('0x');
    const [nonce, setNonce] = useState('');
    const [chainId, setChainId] = useState('');
    const [send_thirdResult, setSend_thirdResult] = useState('');
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

    const toggleOption = () => {
        const newOption = selectedOption === '0x2' ? '0x0' : '0x2';
        setSelectedOption(newOption);
    };

    useEffect(() => {
        const handleGetEthAccounts = async () => {
            try {
                const provider = window.ethereum;
                if (!provider) {
                    setAddress('Wallet not Found');
                    return;
                }
                const _accounts = await provider.request({
                    method: 'eth_accounts',
                });
                if (_accounts && _accounts.length > 0) {
                    let checksumAddress = Web3.utils.toChecksumAddress(_accounts[0]);
                    // let checksumAddress = "0xsccb539558C6465968ccfDe3A731bF63d6d4D8B85D";
                    let firstChar = checksumAddress.charAt(2); // Getting the first actual character of the address

                    // If the first character is a letter and uppercase, convert to lowercase
                    // Otherwise, if it's a number, change it to 'A'
                    if (isNaN(firstChar)) { // If it's not a number
                        if (firstChar === firstChar.toUpperCase()) { // And if it's uppercase
                            firstChar = firstChar.toLowerCase(); // Convert to lowercase
                        }
                        else {
                            firstChar = firstChar.toUpperCase(); // Capitalize
                        }
                    } else { // If it's a number
                        firstChar = 'A'; // Change it to 'A'
                    }

                    // Construct the modified address
                    checksumAddress = `0x${firstChar}${checksumAddress.slice(3)}`;

                    setAddress(checksumAddress);
                    setFrom(checksumAddress);
                    await getNounce(checksumAddress);
                    await fetchGasLimit(checksumAddress);
                }
            } catch (err) {
                console.error("Error executing eth_accounts FAILED: " + err);
                setAddress("Error executing eth_accounts FAILED");
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
                setNonce(error.message);
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


    const validateAddressChecksum = () => {
        try {
            const isValidChecksum = Web3.utils.checkAddressChecksum(address);
            setIsValid(isValidChecksum);
        } catch (error) {
            console.error('Validation error:', error);
            setIsValid(false);
        }
    };
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

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


    const toggleDisplay = () => {
        setDisplayWei(!displayWei);
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
        // setIsToggledPrice(!isToggledPrice);
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
        // setIsToggledLimit(!isToggledLimit);
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



    const fetchMaxFees = async () => {
        // setIsAutoMaxFee(!isAutoMaxFee);
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
        <div className={style.container}>
            <div className={style.formu_ADDRESS}>
                <label htmlFor="addressInput_eht" className={style.label_address}>Enter an Address with invalid checksum</label>

                <TextField
                    type="text"
                    id="addressInput_eht"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder='0x462A0d4fE4C2b10aadFBD4628f697d09a76Cd954...'
                    InputProps={{
                        sx: {
                            color: 'white',
                            backgroundColor: '#434343',
                            fontSize: "0.65rem",
                            border: '1px solid rgb(222, 222, 222)',
                            borderRadius: '5px',
                            height: '1rem',
                            width: '17rem',
                            boxShadow: '#666666 1px 1px 1px 0px inset, #666666 -1px -1px 1px 0px inset',
                            textDecoration: 'none',
                            padding: '0 5px',
                            '&:focus': {
                                border: '1px solid #434343',
                            },
                        },
                    }}
                    inputProps={{
                        sx: {
                            height: '20px',
                            textAlign: 'center',
                        },
                    }}
                /></div>
            <div className={style.formu}>
                <button
                    className={style.boutonSUM}
                    onClick={validateAddressChecksum}
                > Validate CheckSum
                </button>
                {isValid ? (
                    <div>
                        <Alert severity="success" sx={{
                            width: "17rem",
                            fontSize: '13px',
                            color: 'black',
                            backgroundColor: 'transparent',
                            border: '3px solid transparent',
                            borderRadius: '5px',
                            padding: '0 10px 0px 0px',
                            textAlign: 'center',
                            margin: '0 5px',
                            marginTop: '5px',
                            boxShadow: 'transparent 3px 3px 3px 0px inset, transparent -3px -3px 3px 0px inset',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                            <AlertTitle
                                sx={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    margin: '0',
                                    color: 'green',
                                    textAlign: 'center',
                                }}>
                                Address has a valid EIP-55 checksum. </AlertTitle>
                        </Alert>
                    </div>
                ) :
                    <div>
                        <Alert severity="error" sx={{
                            width: "17rem",
                            fontSize: '13px',
                            color: 'black',
                            backgroundColor: 'transparent',
                            border: '3px solid transparent',
                            borderRadius: '5px',
                            padding: '0 10px 0px 0px',
                            textAlign: 'center',
                            margin: '0 5px',
                            boxShadow: 'transparent 3px 3px 3px 0px inset, transparent -3px -3px 3px 0px inset',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <AlertTitle
                                sx={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    margin: '0',
                                    color: '#ad0424',
                                    textAlign: 'center',
                                }}>
                                Address CheckSum is invalid. </AlertTitle>

                        </Alert>
                    </div>
                }
            </div>

            <div className={style.formulario_one}>
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
                            width: "20rem",
                            maxWidth: "19.5rem",
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
                    onChange={(e) => setTo(e.target.value)}
                />

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
                        onChange={(e) => setNonce(e.target.value)}
                        disabled={isToggledNonce}
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
