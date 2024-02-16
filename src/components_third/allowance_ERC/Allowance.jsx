"use client"
import style from './juan2pepito.module.css';
import React, { useState } from 'react';
import Web3 from 'web3';
import contractAbi from './contractAbi.json';
import erc20Abi from './erc20PermitAbi.json';
import { Alert } from '@mui/material';


const Juan2pepito = () => {
    const [erc20Allow, setERC20Allow] = useState("")

    const [tokenContractAddress, setTokenContractAddress] = useState('0xBf7F7560063b38b7ffE972C9401AC7a6aBaA7659');
    const [owner, setOwner] = useState('0x462A0d4fE4C2b10aadFBD4628f697d09a76Cd954');
    const [spender, setSpender] = useState('0x3b539558c6465968ccfde3a731bf63d6d4d8b85d');
    const [value1, setValue] = useState('1000000000000000000');
    const [deadline, setDeadline] = useState(9999999999);
    const [signature, setSignature] = useState('0xfcf6af9335fa6b0a63ef0f2128fb923a810e1f575cf6565fe0e474352763e1287eb0750cd9755b59ed9ad301b6489d591736c071494ad2cef9629a6fd41f0dcf1b');
    const [r1, setR] = useState('');
    const [s1, setS] = useState('');
    const [v1, setV] = useState('');

    const [erc721TokenAddress, setErc721TokenAddress] = useState('0x54Ad10aAf97875385e3415314a43AA4c87597Fa0');
    const [operator, setOperator] = useState('0x3b539558c6465968ccfde3a731bf63d6d4d8b85d');
    const [contractAddress, setContractAddress] = '0xE4A3464499562127C3049517066B5Cb409521906';
    const contractABI = contractAbi; // Your contract ABI here

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    const setERC20Allowance = async () => {
        const web3 = new Web3(window.ethereum);
        const tokenContract = new web3.eth.Contract(erc20Abi, tokenContractAddress);
        const value = web3.utils.toBN(value1);
        const r = "0x" + signature.slice(2, 66);
        setR(r);
        const s = "0x" + signature.slice(66, 130);
        setS(s);
        const v = parseInt(signature.slice(130, 132), 16);
        setV(v);
        if (!web3.utils.isHexStrict(r) || !web3.utils.isHexStrict(s) || isNaN(v)) {
            console.error("Invalid signature format.");
            return;
        }

        try {
            const estimatedGas = await tokenContract.methods.permit(owner, spender, value, deadline, v, r, s).estimateGas({ from: owner });
            const tx = await tokenContract.methods.permit(owner, spender, value, deadline, v, r, s)
                .send({
                    from: owner,
                    gas: estimatedGas
                });
            setERC20Allow(tx);
            console.log("owner:", owner);
            console.log("spender:", spender);
            console.log("value:", value);
            console.log("deadline:", deadline);
            console.log("v:", v);
            console.log("r:", r);
            console.log("s:", s);
            console.log("estimatedGas:", estimatedGas);
            console.log("Permit succeeded", tx);
        } catch (error) {
            console.error("Permit failed:", error);
        }
    };

    // Handling the signature to automatically split it into r, s, and v
    const handleSignatureChange = (e) => {
        const sig = e.target.value;
        setSignature(sig);
        setR("0x" + sig.slice(2, 66));
        setS("0x" + sig.slice(66, 130));
        setV(parseInt(sig.slice(130, 132), 16));
    };

    const checkERC20Allowance = async () => {
        const web3 = new Web3(window.ethereum);
        const tokenContract = new web3.eth.Contract(erc20Abi, tokenContractAddress);

        try {
            // Query the allowance
            const allowance = await tokenContract.methods.allowance(owner, spender).call();
            const formattedAllowance = new web3.utils.BN(allowance).div(divisor);
            console.log(formattedAllowance.toString());
            console.log(`Allowance from ${owner} to ${spender}: ${formattedAllowance} tokens `);
            setERC20Allow(`Allowance from ${owner} to ${spender}: ${allowance} tokens`);
        } catch (error) {
            console.error("Error checking allowance:", error);
        }
    };

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

    const [showForm, setShowForm] = useState(false);

    const toggleFormDisplay = () => {
        setShowForm(!showForm);
    };
    return (

        <div className={style.container}>
            <div className={style.formu}>
                <button className={style.bouton} onClick={setERC20Allowance}>ERC20 ALLOWANCE</button>
                {erc20Allow && (
                    <div>
                        <Alert severity="" sx={{
                            width: "14.5rem",
                            maxWidth: "14.5rem",
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

                        }}>{erc20Allow}</Alert>
                    </div>
                )}
            </div>
            <div className={style.formu}>
                <button className={style.bouton} onClick={checkERC20Allowance}>ERC20 VERIFY</button>
            </div>
            <button onClick={toggleFormDisplay} className={style.toggleButton}>
                {showForm ? 'Hide Form' : 'Show Form'}
            </button>
            {showForm ? (
                <div className={style.formulario}>
                    <label htmlFor="ownerInput">Owner:</label>
                    <input
                        type="text"
                        className={style.formulario_input}
                        id="ownerInput"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                    />
                    <label htmlFor="spenderInput">Spender:</label>
                    <input
                        type="text"
                        className={style.formulario_input}
                        id="spenderInput"
                        value={spender}
                        onChange={(e) => setSpender(e.target.value)}
                    />
                    <label htmlFor="valueInput">Value (in Ether):</label>
                    <input
                        type="text"
                        className={style.formulario_input}
                        id="valueInput"
                        value={value1}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <label htmlFor="deadlineInput">Deadline:</label>
                    <input
                        type="text"
                        className={style.formulario_input}
                        id="deadlineInput"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                    <label htmlFor="signatureInput">Signature:</label>
                    <input
                        type="text"
                        className={style.formulario_input}
                        id="signatureInput"
                        value={signature}
                        onChange={handleSignatureChange}
                    />
                    <label htmlFor="rInput">r:</label>
                    <input
                        type="text"
                        className={style.formulario_input}
                        id="rInput"
                        value={r1}
                    />
                    <label htmlFor="sInput">s:</label>
                    <input
                        type="text"
                        className={style.formulario_input}
                        id="sInput"
                        value={s1}
                    />
                    <label htmlFor="vInput">v:</label>
                    <input
                        type="text"
                        className={style.formulario_input}
                        id="vInput"
                        value={v1}
                    />

                </div>) : ""}
            <div className={style.formu}>
                <button className={style.bouton} onClick={setERC721Allowance}>ERC721 ALLOWANCE</button>
            </div>
        </div>
    );
};


export default Juan2pepito;
