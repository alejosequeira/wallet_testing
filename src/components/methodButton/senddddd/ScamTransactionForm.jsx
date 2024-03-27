"use client"
import React, { useState } from 'react';
import Web3 from 'web3';

const ScamTransactionForm = ({
  from,
  nonce,
  chainId,
  maxFeePerGas,
  maxPriorityFeePerGas,
  isAutoMaxFee,
  setIsAutoMaxFee,
  onSendTransaction,
}) => {
  const [to, setTo] = useState('0x873050043AF661fE9d5611369B10139eB7B4Da54');
  const [toScamAddress, setToScamAddress] = useState('0x592340957eBC9e4Afb0E9Af221d06fDDDF789de9');
  const [valueInWei, setValueInWei] = useState('0');
  const [valueInHex, setValueInHex] = useState('0x0');
  const [displayWei, setDisplayWei] = useState(true);
  const [gasLimit, setGasLimit] = useState('19000');
  const [data, setData] = useState('0x');
  const [selectedOption, setSelectedOption] = useState('0x2');
  const [toggleScam, setToggleScam] = useState(true);

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
      from,
      to: toggleScam ? to : toScamAddress,
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
        value={toggleScam ? to : toScamAddress}
        onChange={(e) => {
          const inputValue = e.target.value;
          if (toggleScam) {
            setTo(inputValue);
          } else {
            setToScamAddress(inputValue);
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

      <button type="submit">Send Scam Transaction</button>
    </form>
  );
};

export default ScamTransactionForm;