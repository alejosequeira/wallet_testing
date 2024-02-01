"use client"
import React, { useState } from 'react';
import Web3 from 'web3';
import { Alert, AlertTitle, Stack, Switch, Typography } from '@mui/material';
import style from './send_thirdd.module.css'


// const label = { inputProps: { 'aria-label': 'Switch demo' } };

function Send_thirdd() {

  const [from, setFrom] = useState('0x462A0d4fE4C2b10aadFBD4628f697d09a76Cd954');
  const [to, setTo] = useState('0x3b539558c6465968ccfde3a731bf63d6d4d8b85d');
  const [value, setValue] = useState('0x0');
  const [gasLimit, setGasLimit] = useState('19000');
  const [gasPrice, setGasPrice] = useState('6876489100');
  const [type, setType] = useState('0x0');
  const [data, setData] = useState('0x');
  const [nonce, setNonce] = useState('0x0');
  const [chainId, setChainId] = useState('1');
  const [send_thirdResult, setSend_thirdResult] = useState('');
  const [isToggledLimit, setIsToggledLimit] = useState(false);
  const [isToggledPrice, setIsToggledPrice] = useState(false);

  const [maxFeePerGas, setMaxFeePerGas] = useState('');
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState('0');
  const [isAutoMaxFee, setIsAutoMaxFee] = useState(false);

  const [valueInWei, setValueInWei] = useState('0');
  const [valueInHex, setValueInHex] = useState('0x0');
  const [displayWei, setDisplayWei] = useState(true);

  const [selectedOption, setSelectedOption] = useState('0x2');

  const [toggleHash, setToggleHash] = useState(false);

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
    setIsToggledPrice(!isToggledPrice);
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
    setIsToggledLimit(!isToggledLimit);
    try {
      const provider = window.ethereum;
      const web3 = new Web3(provider);

      const transaction = {
        from: from,
        to: to,
        value: value,
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
    try {
      const provider = window.ethereum;
      const result = await provider.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: from,
            to: to,
            value: value,
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
    try {
      const provider = window.ethereum;
      const result = await provider.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: from,
            to: to,
            value: value,
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
          <label htmlFor="gasLimitInput">Gas Limit:</label>
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
              onClick={() => { fetchMaxFees(); setIsAutoMaxFee(!isAutoMaxFee); }}
            >
              {isAutoMaxFee ? 'AUTO' : 'AUTO'}
            </button>
          </div>
        ) : (
          <div className={style.botton_toggle}>
            <input
              type="text"
              id="gasLimitInput"
              value={gasLimit}
              onChange={(e) => setGasLimit(parseInt(e.target.value))}
              disabled={isToggledLimit}
              className={style.input_botton}
            />
            <button className={`${style.toggleButton} ${isToggledLimit ? style.toggleOn : style.toggleOff}`} onClick={fetchGasLimit}>
              {isToggledLimit ? 'AUTO' : 'AUTO'}
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

        <label htmlFor="gasPriceInput">Gas Price: </label>
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
            onClick={fetchGasPrice}
          >
            {isToggledPrice ? 'AUTO' : 'AUTO'}
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
          />
          <button className={style.toggleButton} onClick={getNonce}>
            GET
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
                    textAlign: 'start',
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

    </div>
  );
}

export default Send_thirdd;
