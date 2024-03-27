"use client"
import React, { useState } from 'react';
import Web3 from 'web3';

const TransactionForm = ({
  from,
  address,
  viewCheckSum,
  nonce,
  chainId,
  maxFeePerGas,
  maxPriorityFeePerGas,
  isAutoMaxFee,
  setIsAutoMaxFee,
  onSendTransaction,
}) => {
  const [to, setTo] = useState('0x873050043AF661fe9d5633369B10139eb7b4Da54');
  const [toSUM, setToSUM] = useState('0xA62A0d4fE4C2b10aadFBD4628f697d09a76Cd954');
  const [valueInWei, setValueInWei] = useState('0');
  const [valueInHex, setValueInHex] = useState('0x0');
  const [displayWei, setDisplayWei] = useState(true);
  const [gasLimit, setGasLimit] = useState('19000');
  const [data, setData] = useState('0x');
  const [selectedOption, setSelectedOption] = useState('0x2');

  const toggleOption = () => {
    const newOption = selectedOption === '0x2' ? '0x0' : '0x2';
    setSelectedOption(newOption);
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

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const transactionParams = {
      from: from || address,
      to: viewCheckSum ? toSUM : to,
      value: valueInHex,
      gasLimit,
      type: selectedOption,
      data,
      nonce,
      chainId,
      maxFeePerGas,
      maxPriorityFeePerGas,
    };

    onSendTransaction(transactionParams);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="fromInput">From:</label>
      <input
        type="text"
        id="fromInput"
        value={from}
        disabled
      />

      <label htmlFor="toInput">To:</label>
      <input
        type="text"
        id="toInput"
        value={viewCheckSum ? toSUM : to}
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
                } else {
                  firstChar = firstChar.toUpperCase();
                }
              } else {
                firstChar = 'A';
              }
              setToSUM(`0x${firstChar}${inputValue.slice(3)}`);
            }
            setTo(modifiedValue);
          }
        }}
      />

      <label htmlFor="valueInput">Value:</label>
      <div>
        <input
          type="text"
          id="valueInput"
          value={displayWei ? valueInWei : valueInHex}
          onChange={(e) =>
            displayWei
              ? setValueInWei(e.target.value)
              : setValueInHex(e.target.value)
          }
        />
        <button type="button" onClick={convertValue}>
          {displayWei ? 'WEI' : 'HEX'}
        </button>
      </div>

      <div>
        <label htmlFor="type">Type:</label>
        <div>
          <input
            type="radio"
            id="type1"
            name="type"
            value="0x2"
            checked={selectedOption === '0x2'}
            onChange={toggleOption}
          />
          <label htmlFor="type1">EIP-1559</label>

          <input
            type="radio"
            id="type2"
            name="type"
            value="0x0"
            checked={selectedOption === '0x0'}
            onChange={toggleOption}
          />
          <label htmlFor="type2">Standard</label>
        </div>
      </div>

      {selectedOption === '0x2' ? (
        <>
          <label htmlFor="MaxFeePerGasInput">Max Fee:</label>
          <div>
            <input
              type="text"
              id="MaxFeePerGasInput"
              value={maxFeePerGas}
              onChange={(e) => setMaxFeePerGas(e.target.value)}
              disabled={isAutoMaxFee}
            />
            <button
              type="button"
              onClick={() => {
                setIsAutoMaxFee(!isAutoMaxFee);
                Web3Utils.fetchMaxFees(setMaxFeePerGas);
              }}
            >
              {isAutoMaxFee ? 'AUTO' : 'MANUAL'}
            </button>
          </div>

          <label htmlFor="setMaxPriorityFeePerGas">Priority:</label>
          <input
            type="text"
            id="MaxPriorityFeePerGasInput"
            value={maxPriorityFeePerGas}
            onChange={(e) => setMaxPriorityFeePerGas(e.target.value)}
          />
        </>
      ) : (
        <>
          <label htmlFor="gasPriceInput">Gas Price:</label>
          <input
            type="text"
            id="gasPriceInput"
            value={gasPrice}
            onChange={(e) => setGasPrice(e.target.value)}
          />
        </>
      )}

      <label htmlFor="gasLimitInput">Gas Limit:</label>
      <input
        type="text"
        id="gasLimitInput"
        value={gasLimit}
        onChange={(e) => setGasLimit(e.target.value)}
      />

      <label htmlFor="data">Data:</label>
      <input
        type="text"
        id="data"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <label htmlFor="nonce">Nonce:</label>
      <input
        type="text"
        id="nonce"
        value={nonce}
        disabled
      />

      <label htmlFor="chain">Chain ID:</label>
      <input
        type="text"
        id="chain"
        value={chainId}
        disabled
      />

      <button type="submit">Send Transaction</button>
    </form>
  );
};

export default TransactionForm;