"use client";
import React, { useState } from "react";
import AlertComponent from "@/components/mainLayout/Alert";
import ContinueTestBtn from "../mainLayout/ContinueTestBtn";

//Web3
import * as Web3Utils from "@/utils/web3";

//MUI
import { Tooltip } from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

export default function RunBypass({ address, chipherText }) {
  const [toggleHashZero, setToggleHashZero] = useState({
    v1: false,
    v2: false,
    v3: false,
    v4: false,
    v5: false,
    v6: false,
    v7: false,
    v8: false,
    v9: false,
    v10: false,
  });
  const [isCopied, setIsCopied] = useState({
    v1: false,
    v2: false,
    v3: false,
    v4: false,
    v5: false,
    v6: false,
    v7: false,
    v8: false,
    v9: false,
    v10: false,
  });

  const [accountsResult, setAccountsResult] = useState("");

  const [executionMessageChain, setExecutionMessageChain] = useState("");
  const [executionMessageChainS, setExecutionMessageChainS] = useState("");

  const [executionMessage, setExecutionMessage] = useState("");

  const [encryptionKey, setEncryptionKey] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const [signTypedDataV3, setSignTypedDataV3] = useState("");
  const [signTypedDataV4, setSignTypedDataV4] = useState("");

  const [personalSignResult, setPersonalSignResult] = useState("");
  const [sendTransactionResult, setSendTransactionResult] = useState("");
  const [to, setTo] = useState("0x873050043AF661fe9d5633369B10139eb7b4Da54");
  const [selectedOption, setSelectedOption] = useState("0x2");
  const [maxFeePerGas, setMaxFeePerGas] = useState("");
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState("0");
  const [valueInHex, setValueInHex] = useState("0x0");
  const [data, setData] = useState("0x");
  const [gasLimit, setGasLimit] = useState("19000");
  const [nonce, setNonce] = useState("0x0");
  const [chainId, setChainId] = useState("137");

  const [continueTest, setContinueTest] = useState(true);
  const [toggleButton, setToggleButton] = useState(false);

  const handleLockedWallets = async () => {
    await handleGetEthAccountss();
    setContinueTest(false);
  };

  const handleRunAll = async () => {
    await handleGetEthAccountss();
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

  const handleGetEthAccountss = async () => {
    try {
      const provider = window.ethereum;
      const _accounts = await provider.request({
        method: "eth_accounts",
      });

      if (_accounts && _accounts.length > 0) {
        setAccountsResult(_accounts.join(", "));
        setToggleHashZero((prevState) => ({ ...prevState, v1: true }));
      } else {
        setAccountsResult("No Ethereum Accounts Found");
      }
    } catch (err) {
      console.error("Error executing eth_accounts FAILED" + err);
      setAccountsResult(` ${err.message}`);
      setToggleHashZero((prevState) => ({ ...prevState, v1: false }));
    }
  };
  const handleAddChain = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x89`,
            chainName: "Polygon Mainnet",
            nativeCurrency: {
              name: "MATIC",
              decimals: 18,
              symbol: "MATIC",
            },
            rpcUrls: ["https://polygon-rpc.com/"],
            blockExplorerUrls: ["https://polygonscan.com/"],
          },
        ],
      });
      setToggleHashZero((prevState) => ({ ...prevState, v2: true }));
      setExecutionMessageChain("wallet_addEthereumChain executed correctly");
      setContinueTest(false);
    } catch (error) {
      setExecutionMessageChain(` ${error.message}`);
      console.error("Error executing wallet_addEthereumChain FAILED:", error);
      setToggleHashZero((prevState) => ({ ...prevState, v2: false }));
    }
  };
  const handleSwitchChain = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: `0x89`,
          },
        ],
      });
      setToggleHashZero((prevState) => ({ ...prevState, v3: true }));

      setExecutionMessageChainS("wallet_switchEthereumChain executed correctly");
    } catch (error) {
      console.error("Error executing wallet_switchEthereumChain FAILED:", error);
      setExecutionMessageChainS(` ${error.message}`);
      setToggleHashZero((prevState) => ({ ...prevState, v3: false }));
    }
  };
  const handleWatchAsset = async () => {
    try {
      const watchAssetResult = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: address,
            symbol: "USDT",
            decimals: 6,
            image: "https://example.com/token-image.png",
          },
        },
      });

      console.log(watchAssetResult);
      setToggleHashZero((prevState) => ({ ...prevState, v4: true }));
      setExecutionMessage("watchAssetButton executed correctly");
      setContinueTest(false);
    } catch (error) {
      console.error(error);
      setExecutionMessage(`${error.message}`);
      setToggleHashZero((prevState) => ({ ...prevState, v4: false }));
    }
  };
  const getEncryptionKey = async () => {
    try {
      const provider = window.ethereum;
      setToggleHashZero((prevState) => ({ ...prevState, v5: true }));
      setEncryptionKey(
        await provider.request({
          method: "eth_getEncryptionPublicKey",
          params: [address],
        })
      );
      setContinueTest(false);
    } catch (error) {
      setEncryptionKey(` ${error.message}`);
      console.error(` ${error.message}`);
      setToggleHashZero((prevState) => ({ ...prevState, v5: false }));
    }
  };
  const handleDecrypt = async () => {
    try {
      const provider = window.ethereum;
      const decryptedMessage = await provider.request({
        method: "eth_decrypt",
        params: [chipherText, address],
      });
      setToggleHashZero((prevState) => ({ ...prevState, v6: true }));

      setDecryptedText(decryptedMessage);
      setContinueTest(false);
    } catch (error) {
      setDecryptedText(` ${error.message}`);
      console.error(` ${error.message}`);
      setToggleHashZero((prevState) => ({ ...prevState, v6: false }));
    }
  };
  const handleSignTypedDataV3 = async () => {
    const msgParams = {
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        Person: [
          { name: "name", type: "string" },
          { name: "wallet", type: "address" },
        ],
        Mail: [
          { name: "from", type: "Person" },
          { name: "to", type: "Person" },
          { name: "contents", type: "string" },
        ],
      },
      primaryType: "Mail",
      domain: {
        name: "Ether Mail",
        version: "1",
        chainId: chainId,
        verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
      },
      message: {
        from: {
          name: "Cow",
          wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
        },
        to: {
          name: "Bob",
          wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
        },
        contents: "Hello, Bob!",
      },
    };

    try {
      const sign = await window.ethereum.request({
        method: "eth_signTypedData_v3",
        params: [address, JSON.stringify(msgParams)],
      });
      setSignTypedDataV3(sign);
      setToggleHashZero((prevState) => ({ ...prevState, v7: true }));
      setContinueTest(false);
    } catch (err) {
      console.error(err.message);
      setSignTypedDataV3(` ${err.message}`);
      setToggleHashZero((prevState) => ({ ...prevState, v7: false }));
    }
  };
  const handleSignTypedDataV4 = async () => {
    const msgParams = {
      domain: {
        chainId: chainId,
        name: "Ether Mail",
        verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
        version: "1",
      },
      message: {
        contents: "Hello, Bob!",
        from: {
          name: "Cow",
          wallets: ["0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826", "0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF"],
        },
        to: [
          {
            name: "Bob",
            wallets: [
              "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
              "0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57",
              "0xB0B0b0b0b0b0B000000000000000000000000000",
            ],
          },
        ],
        attachment: "0x",
      },
      primaryType: "Mail",
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        Group: [
          { name: "name", type: "string" },
          { name: "members", type: "Person[]" },
        ],
        Mail: [
          { name: "from", type: "Person" },
          { name: "to", type: "Person[]" },
          { name: "contents", type: "string" },
          { name: "attachment", type: "bytes" },
        ],
        Person: [
          { name: "name", type: "string" },
          { name: "wallets", type: "address[]" },
        ],
      },
    };
    try {
      const sign = await window.ethereum.request({
        method: "eth_signTypedData_v4",
        params: [address, JSON.stringify(msgParams)],
      });
      setSignTypedDataV4(sign);
      setToggleHashZero((prevState) => ({ ...prevState, v8: true }));
      setContinueTest(false);
    } catch (err) {
      console.error(err);
      setSignTypedDataV4(`${err.message}`);
      setToggleHashZero((prevState) => ({ ...prevState, v8: false }));
    }
  };
  const handlePersonalSign = async () => {
    const exampleMessage = "Example `personal_sign` message";
    try {
      const msg = `0x${Buffer.from(exampleMessage, "utf8").toString("hex")}`;
      const sign = await window.ethereum.request({
        method: "personal_sign",
        params: [msg, address, "Example password"],
      });
      setPersonalSignResult(sign);
      setToggleHashZero((prevState) => ({ ...prevState, v9: true }));
      setContinueTest(false);
    } catch (err) {
      console.error(err);
      setPersonalSignResult(` ${err.message}`);
      setToggleHashZero((prevState) => ({ ...prevState, v9: false }));
    }
  };

  const handleSendTransaction = async () => {
    if (!window.ethereum) {
      setSendTransactionResult("No Ethereum Wallet Found");
      setToggleHashZero((prevState) => ({ ...prevState, v10: false }));
      return;
    }
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.requestAccounts();
      //         const accounts = await web3.eth.getAccounts();
      //         const nonce = await web3.eth.getTransactionCount(accounts[0]);
      if (accounts.length === 0) {
        setSendTransactionResult("No Ethereum accounts found.");
        setToggleHashZero((prevState) => ({ ...prevState, v10: false }));
        return;
      }
      const fromm = address || accounts[0];
      const maxFee = await Web3Utils.fetchMaxFees(setMaxFeePerGas);
      const gasLimitt = await Web3Utils.fetchGasLimit(address, to, valueInHex, data, setGasLimit);
      const chainIdd = await Web3Utils.getBlockchainData(setChainId);
      // await Web3Utils.getNonce(fromm, setNonce)
      const noncee = await web3.eth.getTransactionCount(accounts[0]);
      setNonce(nonce);
      const transactionParams = {
        from: fromm,
        to: to,
        gas: gasLimitt,
        maxFeePerGas: maxFee,
        maxPriorityFeePerGas: maxPriorityFeePerGas,
        nonce: noncee,
        value: valueInHex,
        type: selectedOption,
        data: data,
        // chainId: chainIdd,
      };
      // const result = await window.ethereum.request({
      //     method: 'eth_sendTransaction',
      //     params: [transactionParams],
      // });
      const result = await web3.eth.sendTransaction(transactionParams);
      setSendTransactionResult(result.transactionHash);
      setToggleHashZero((prevState) => ({ ...prevState, v10: true }));
      setContinueTest(false);
    } catch (error) {
      console.error("Error sending EIP-1559 transaction:", error);
      setSendTransactionResult(error.message);
      setToggleHashZero((prevState) => ({ ...prevState, v10: false }));
    }
  };

  return (
    <div className="form_run_bypass">
      <div className="runTest_buttons_wrapper">
        {toggleButton ? (
          <button className="button" onClick={handleLockedWallets}>
            RUN AUTHORIZATION BYPASS TEST (MANUAL)
          </button>
        ) : (
          <button className="button" onClick={handleRunAll}>
            RUN AUTHORIZATION BYPASS TEST (AUTO)
          </button>
        )}
        <Tooltip title={toggleButton ? "Change to auto test" : "Change to manual test"}>
          <ChangeCircleIcon className="toggle_material_icon" onClick={() => setToggleButton(!toggleButton)} />
        </Tooltip>
      </div>
      {accountsResult && (
        <div className="formu">
          <h3 className="sub_title">Get Eth Account</h3>
          <AlertComponent toggle={toggleHashZero.v1} message={accountsResult} isCopied={isCopied.v1} setIsCopied={setIsCopied.v1} />
        </div>
      )}
      {!continueTest && accountsResult && !executionMessageChain ? <ContinueTestBtn fn={handleAddChain} /> : null}
      {executionMessageChain && (
        <div className="formu">
          <h3 className="sub_title">Add Chain</h3>
          <AlertComponent toggle={toggleHashZero.v2} message={executionMessageChain} isCopied={isCopied.v2} setIsCopied={setIsCopied.v2} />
        </div>
      )}
      {!continueTest && accountsResult && executionMessageChain && !executionMessageChainS ? <ContinueTestBtn fn={handleSwitchChain} /> : null}
      {executionMessageChainS && (
        <div className="formu">
          <h3 className="sub_title">Switch Chain</h3>
          <AlertComponent toggle={toggleHashZero.v3} message={executionMessageChainS} isCopied={isCopied.v3} setIsCopied={setIsCopied.v3} />
        </div>
      )}
      {!continueTest && accountsResult && executionMessageChain && executionMessageChainS && !executionMessage ? (
        <ContinueTestBtn fn={handleWatchAsset} />
      ) : null}
      {executionMessage && (
        <div className="formu">
          <h3 className="sub_title">Watch Asset</h3>
          <AlertComponent toggle={toggleHashZero.v4} message={executionMessage} isCopied={isCopied.v4} setIsCopied={setIsCopied.v4} />
        </div>
      )}
      {!continueTest && accountsResult && executionMessageChain && executionMessageChainS && executionMessage && !encryptionKey ? (
        <ContinueTestBtn fn={getEncryptionKey} />
      ) : null}
      {encryptionKey && (
        <div className="formu">
          <h3 className="sub_title">Get Encryption Key</h3>
          <AlertComponent toggle={toggleHashZero.v5} message={encryptionKey} isCopied={isCopied.v5} setIsCopied={setIsCopied.v5} />
        </div>
      )}
      {!continueTest && accountsResult && executionMessageChain && executionMessageChainS && executionMessage && encryptionKey && !decryptedText ? (
        <ContinueTestBtn fn={handleDecrypt} />
      ) : null}
      {decryptedText && (
        <div className="formu">
          <h3 className="sub_title">Decrypt</h3>
          <AlertComponent toggle={toggleHashZero.v6} message={decryptedText} isCopied={isCopied.v6} setIsCopied={setIsCopied.v6} />
        </div>
      )}
      {!continueTest &&
      accountsResult &&
      executionMessageChain &&
      executionMessageChainS &&
      executionMessage &&
      encryptionKey &&
      decryptedText &&
      !signTypedDataV3 ? (
        <ContinueTestBtn fn={handleSignTypedDataV3} />
      ) : null}
      {signTypedDataV3 && (
        <div className="formu">
          <h3 className="sub_title">Sign Typed Data v3</h3>
          <AlertComponent toggle={toggleHashZero.v7} message={signTypedDataV3} isCopied={isCopied.v7} setIsCopied={setIsCopied.v7} />
        </div>
      )}
      {!continueTest &&
      accountsResult &&
      executionMessageChain &&
      executionMessageChainS &&
      executionMessage &&
      encryptionKey &&
      decryptedText &&
      signTypedDataV3 &&
      !signTypedDataV4 ? (
        <ContinueTestBtn fn={handleSignTypedDataV4} />
      ) : null}
      {signTypedDataV4 && (
        <div className="formu">
          <h3 className="sub_title">Sign Typed Data v4</h3>
          <AlertComponent toggle={toggleHashZero.v8} message={signTypedDataV4} isCopied={isCopied.v8} setIsCopied={setIsCopied.v8} />
        </div>
      )}
      {!continueTest &&
      accountsResult &&
      executionMessageChain &&
      executionMessageChainS &&
      executionMessage &&
      encryptionKey &&
      decryptedText &&
      signTypedDataV3 &&
      signTypedDataV4 &&
      !personalSignResult ? (
        <ContinueTestBtn fn={handlePersonalSign} />
      ) : null}
      {personalSignResult && (
        <div className="formu">
          <h3 className="sub_title">Personal Sign</h3>
          <AlertComponent toggle={toggleHashZero.v9} message={personalSignResult} isCopied={isCopied.v9} setIsCopied={setIsCopied.v9} />
        </div>
      )}
      {!continueTest &&
      accountsResult &&
      executionMessageChain &&
      executionMessageChainS &&
      executionMessage &&
      encryptionKey &&
      decryptedText &&
      signTypedDataV3 &&
      signTypedDataV4 &&
      personalSignResult &&
      !sendTransactionResult ? (
        <ContinueTestBtn fn={handleSendTransaction} />
      ) : null}
      {sendTransactionResult && (
        <div className="formu">
          <h3 className="sub_title">Send Transaction</h3>
          <AlertComponent toggle={toggleHashZero.v10} message={sendTransactionResult} isCopied={isCopied.v10} setIsCopied={setIsCopied.v10} />
        </div>
      )}
    </div>
  );
}
