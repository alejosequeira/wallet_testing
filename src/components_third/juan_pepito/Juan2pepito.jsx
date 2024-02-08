"use client"
import style from './juan2pepito.module.css';


// export default function Juan2pepito() {

//     async function connectAndSetOperator() {
//         if (window.ethereum) {
//             try {
//                 // Request account access if needed
//                 await window.ethereum.request({ method: 'eth_requestAccounts' });

//                 // We use Web3
//                 const web3 = new Web3(window.ethereum);

//                 const contractAddress = "0xfC286F9Cd63603b0538a6726eE63928FABdAD8EE";
//                 const contractABI = [{ "type": "constructor", "payable": false, "inputs": [{ "type": "address", "name": "initialOwner" }] }, { "type": "error", "name": "ERC721IncorrectOwner", "inputs": [{ "type": "address", "name": "sender" }, { "type": "uint256", "name": "tokenId" }, { "type": "address", "name": "owner" }] }, { "type": "error", "name": "ERC721InsufficientApproval", "inputs": [{ "type": "address", "name": "operator" }, { "type": "uint256", "name": "tokenId" }] }, { "type": "error", "name": "ERC721InvalidApprover", "inputs": [{ "type": "address", "name": "approver" }] }, { "type": "error", "name": "ERC721InvalidOperator", "inputs": [{ "type": "address", "name": "operator" }] }, { "type": "error", "name": "ERC721InvalidOwner", "inputs": [{ "type": "address", "name": "owner" }] }, { "type": "error", "name": "ERC721InvalidReceiver", "inputs": [{ "type": "address", "name": "receiver" }] }, { "type": "error", "name": "ERC721InvalidSender", "inputs": [{ "type": "address", "name": "sender" }] }, { "type": "error", "name": "ERC721NonexistentToken", "inputs": [{ "type": "uint256", "name": "tokenId" }] }, { "type": "error", "name": "OwnableInvalidOwner", "inputs": [{ "type": "address", "name": "owner" }] }, { "type": "error", "name": "OwnableUnauthorizedAccount", "inputs": [{ "type": "address", "name": "account" }] }, { "type": "event", "anonymous": false, "name": "Approval", "inputs": [{ "type": "address", "name": "owner", "indexed": true }, { "type": "address", "name": "approved", "indexed": true }, { "type": "uint256", "name": "tokenId", "indexed": true }] }, { "type": "event", "anonymous": false, "name": "ApprovalForAll", "inputs": [{ "type": "address", "name": "owner", "indexed": true }, { "type": "address", "name": "operator", "indexed": true }, { "type": "bool", "name": "approved", "indexed": false }] }, { "type": "event", "anonymous": false, "name": "OwnershipTransferred", "inputs": [{ "type": "address", "name": "previousOwner", "indexed": true }, { "type": "address", "name": "newOwner", "indexed": true }] }, { "type": "event", "anonymous": false, "name": "TokenMinted", "inputs": [{ "type": "uint256", "name": "tokenId", "indexed": true }] }, { "type": "event", "anonymous": false, "name": "Transfer", "inputs": [{ "type": "address", "name": "from", "indexed": true }, { "type": "address", "name": "to", "indexed": true }, { "type": "uint256", "name": "tokenId", "indexed": true }] }, { "type": "function", "name": "approve", "constant": false, "payable": false, "inputs": [{ "type": "address", "name": "to" }, { "type": "uint256", "name": "tokenId" }], "outputs": [] }, { "type": "function", "name": "balanceOf", "constant": true, "stateMutability": "view", "payable": false, "inputs": [{ "type": "address", "name": "owner" }], "outputs": [{ "type": "uint256" }] }, { "type": "function", "name": "getApproved", "constant": true, "stateMutability": "view", "payable": false, "inputs": [{ "type": "uint256", "name": "tokenId" }], "outputs": [{ "type": "address" }] }, { "type": "function", "name": "isApprovedForAll", "constant": true, "stateMutability": "view", "payable": false, "inputs": [{ "type": "address", "name": "owner" }, { "type": "address", "name": "operator" }], "outputs": [{ "type": "bool" }] }, { "type": "function", "name": "name", "constant": true, "stateMutability": "view", "payable": false, "inputs": [], "outputs": [{ "type": "string" }] }, { "type": "function", "name": "owner", "constant": true, "stateMutability": "view", "payable": false, "inputs": [], "outputs": [{ "type": "address" }] }, { "type": "function", "name": "ownerOf", "constant": true, "stateMutability": "view", "payable": false, "inputs": [{ "type": "uint256", "name": "tokenId" }], "outputs": [{ "type": "address" }] }, { "type": "function", "name": "renounceOwnership", "constant": false, "payable": false, "inputs": [], "outputs": [] }, { "type": "function", "name": "safeMint", "constant": false, "payable": false, "inputs": [{ "type": "address", "name": "to" }], "outputs": [] }, { "type": "function", "name": "safeTransferFrom", "constant": false, "payable": false, "inputs": [{ "type": "address", "name": "from" }, { "type": "address", "name": "to" }, { "type": "uint256", "name": "tokenId" }], "outputs": [] }, { "type": "function", "name": "safeTransferFrom", "constant": false, "payable": false, "inputs": [{ "type": "address", "name": "from" }, { "type": "address", "name": "to" }, { "type": "uint256", "name": "tokenId" }, { "type": "bytes", "name": "data" }], "outputs": [] }, { "type": "function", "name": "setApprovalForAll", "constant": false, "payable": false, "inputs": [{ "type": "address", "name": "operator" }, { "type": "bool", "name": "approved" }], "outputs": [] }, { "type": "function", "name": "supportsInterface", "constant": true, "stateMutability": "view", "payable": false, "inputs": [{ "type": "bytes4", "name": "interfaceId" }], "outputs": [{ "type": "bool" }] }, { "type": "function", "name": "symbol", "constant": true, "stateMutability": "view", "payable": false, "inputs": [], "outputs": [{ "type": "string" }] }, { "type": "function", "name": "tokenURI", "constant": true, "stateMutability": "view", "payable": false, "inputs": [{ "type": "uint256", "name": "tokenId" }], "outputs": [{ "type": "string" }] }, { "type": "function", "name": "transferFrom", "constant": false, "payable": false, "inputs": [{ "type": "address", "name": "from" }, { "type": "address", "name": "to" }, { "type": "uint256", "name": "tokenId" }], "outputs": [] }, { "type": "function", "name": "transferNFTAndETH", "constant": false, "stateMutability": "payable", "payable": true, "inputs": [{ "type": "address", "name": "nftRecipient" }, { "type": "uint256", "name": "tokenId" }, { "type": "address", "name": "ethRecipient" }], "outputs": [] }, { "type": "function", "name": "transferOwnership", "constant": false, "payable": false, "inputs": [{ "type": "address", "name": "newOwner" }], "outputs": [] }];

//                 const myTokenContract = new web3.eth.Contract(contractABI, contractAddress);

//                 // Get the current user's address
//                 const accounts = await web3.eth.getAccounts();
//                 const account = accounts[0];

//                 // Assuming "setDelegatedOperator" is the method you want to call
//                 // and "PEPITO_ADDRESS" is the address to be set as the operator


//                 // Correct method call with "transferNFTAndETH"
//                 const receipt = await myTokenContract.methods.transferNFTAndETH(
//                     "0x3b539558c6465968ccfde3a731bf63d6d4d8b85d", // NFT recipient address
//                     0,                       // Token ID, assuming the first minted token has ID 0
//                     "0x3b539558c6465968ccfde3a731bf63d6d4d8b85d"  // ETH recipient address, could be the same as NFT recipient
//                 ).send({ from: account, value: web3.utils.toWei("0.1", "ether") });
//                 console.log('Transaction receipt:', receipt);
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         } else {
//             console.log('MetaMask is required to perform this action.');
//         }
//     }

//     return (
//         <div>
//             <h1>Set Delegated Operator</h1>
//             <button className={style.bouton} onClick={connectAndSetOperator}>Set Delegated Operator</button>
//         </div>
//     );
// }
import React, { useState } from 'react';
import Web3 from 'web3';

const Juan2pepito = () => {
    const [erc20TokenAddress, setErc20TokenAddress] = useState('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48');
    const [erc721TokenAddress, setErc721TokenAddress] = useState('0x54Ad10aAf97875385e3415314a43AA4c87597Fa0');
    const [spender, setSpender] = useState('0x3b539558c6465968ccfde3a731bf63d6d4d8b85d');
    const [operator, setOperator] = useState('0x3b539558c6465968ccfde3a731bf63d6d4d8b85d');
    const [amount, setAmount] = useState('3');
    const contractAddress = '0xE4A3464499562127C3049517066B5Cb409521906';
    const contractABI = [{ "type": "function", "name": "setERC20Allowance", "constant": false, "payable": false, "inputs": [{ "type": "address", "name": "token" }, { "type": "address", "name": "spender" }, { "type": "uint256", "name": "amount" }], "outputs": [] }, { "type": "function", "name": "setERC721Allowance", "constant": false, "payable": false, "inputs": [{ "type": "address", "name": "token" }, { "type": "address", "name": "operator" }], "outputs": [] }]; // Your contract ABI here

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function setERC20Allowance() {
        await requestAccount();
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();

        try {
            await contract.methods.setERC20Allowance(erc20TokenAddress, spender, web3.utils.toWei(amount, 'ether'))
                .send({ from: accounts[0] });
            alert('ERC20 Allowance Set Successfully!');
        } catch (error) {
            console.error('Error setting ERC20 allowance:', error);
            alert('Error setting ERC20 allowance.');
        }
    }

    async function setERC721Allowance() {
        await requestAccount();
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();

        try {
            await contract.methods.setERC721Allowance(erc721TokenAddress, operator)
                .send({ from: accounts[0] });
            alert('ERC721 Allowance Set Successfully!');
        } catch (error) {
            console.error('Error setting ERC721 allowance:', error);
            alert('Error setting ERC721 allowance.');
        }
    }

    return (
        <div className={style.formu}>
            <button className={style.bouton} onClick={setERC20Allowance}>ERC20 ALLOWANCE</button>
            <div className={style.formulario}>
                <label htmlFor="fromInput">Token:</label>
                <input className={style.formulario_input} value={erc20TokenAddress} onChange={(e) => setErc20TokenAddress(e.target.value)} placeholder="ERC20 Token Address" />
                <label htmlFor="spenderInput">Spender:</label>
                <input className={style.formulario_input} value={spender} onChange={(e) => setSpender(e.target.value)} placeholder="Spender Address" />
                <label htmlFor="amountInput">Amount:</label>
                <input className={style.formulario_input} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
            </div>


            <button className={style.bouton} onClick={setERC721Allowance}>ERC721 ALLOWANCE</button>
            <div className={style.formularioE}>
                <label htmlFor="erc721TokenInput">Token:</label>
                <input className={style.formulario_input} value={erc721TokenAddress} onChange={(e) => setErc721TokenAddress(e.target.value)} placeholder="ERC721 Token Address" />
                <label htmlFor="operatorInput">Operator:</label>
                <input className={style.formulario_input} value={operator} onChange={(e) => setOperator(e.target.value)} placeholder="Operator Address" />
            </div>
        </div>
    );
};


export default Juan2pepito;
