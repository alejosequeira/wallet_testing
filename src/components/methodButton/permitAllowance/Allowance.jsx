"use client"
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import contractAbi from '../../../api/abiContractFunction.json';
import erc20ABI from '../../../api/abiContractErc20.json';
import { handleGetEthAccounts } from '@/utils/web3';
import AlertComponent from '@/components/mainLayout/Alert';

const PermitAllowance = ({ contract }) => {
    const [erc20Approve, setERC20Approve] = useState("");
    const [erc20Allow, setERC20Allow] = useState("");
    const [erc20Check, setERC20Check] = useState("");
    const [erc721Allow, setERC721Allow] = useState("");
    const [tokenContractAddress, setTokenContractAddress] = useState(contract);
    const [owner, setOwner] = useState('');
    const [spender, setSpender] = useState('0x3b539558C6465968ccfDe3A731bF63d6d4D8B85D');
    const [value1, setValue] = useState('1000000000000000000');
    const [deadline, setDeadline] = useState(9999999999);
    const [signature, setSignature] = useState('0xfcf6af9335fa6b0a63ef0f2128fb923a810e1f575cf6565fe0e474352763e1287eb0750cd9755b59ed9ad301b6489d591736c071494ad2cef9629a6fd41f0dcf1b');
    const [r1, setR] = useState('');
    const [s1, setS] = useState('');
    const [v1, setV] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showFormAllowance, setShowFormAllowance] = useState(false);
    const [showForm721, setShowForm721] = useState(false);
    const [toggleHashApprove, setToggleHashApprove] = useState(false);
    const [toggleHash, setToggleHash] = useState(false);
    const [toggleCheck, setToggleCheck] = useState();
    const [toggleHash721, setToggleHash721] = useState(false);
    const [erc721TokenAddress, setErc721TokenAddress] = useState('0x54Ad10aAf97875385e3415314a43AA4c87597Fa0');
    const [operator, setOperator] = useState('0x3b539558c6465968ccfde3a731bf63d6d4d8b85d');
    const [contractAddress, setContractAddress] = useState('0xE4A3464499562127C3049517066B5Cb409521906');
    const contractABI = contractAbi;
    const erc20Abi = erc20ABI;
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
        const extractSignatureParts = async (signature) => {
            setR("0x" + signature.slice(2, 66))
            setS("0x" + signature.slice(66, 130))
            setV(parseInt(signature.slice(130, 132), 16))
        }
        handleGetEthAccounts(setOwner);
        extractSignatureParts(signature);
    }, []);
    useEffect(() => {
        setTokenContractAddress(contract);
    }, [contract]);

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
            setToggleHash(true)
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
            setERC20Allow("Permit failed, view console for more details.");
            setToggleHash(false);
        }
    };
    const approveERC20Token = async () => {
        const web3 = new Web3(window.ethereum);
        const tokenContract = new web3.eth.Contract(erc20Abi, tokenContractAddress);

        const value = web3.utils.toBN(value1);

        try {
            const estimatedGas = await tokenContract.methods
                .approve(spender, value)
                .estimateGas({ from: owner });

            const tx = await tokenContract.methods
                .approve(spender, value)
                .send({ from: owner, gas: estimatedGas });

            setERC20Approve(tx);
            setToggleHashApprove(true);
            console.log("Approval succeeded", tx);
        } catch (error) {
            setERC20Approve("Approval failed, view console for more details.");
            setToggleHashApprove(false);
            console.error("Approval failed:", error);
        }
    };

    const checkERC20Allowance = async () => {
        const web3 = new Web3(window.ethereum);
        const tokenContract = new web3.eth.Contract(erc20Abi, tokenContractAddress);

        try {
            // Fetch the current allowance
            const currentAllowance = await tokenContract.methods.allowance(owner, spender).call();
            console.log(`Current allowance for spender is: ${currentAllowance}`);
            setERC20Check(`allowance for spender is: ${currentAllowance}`);
            setToggleCheck(true);
            // Optionally, convert the allowance to a more readable format
            const readableAllowance = web3.utils.fromWei(currentAllowance, 'ether');
            console.log(`Readable allowance for spender is: ${readableAllowance} tokens`);
        } catch (error) {
            console.error("Error checking allowance:", error);
            setERC20Check("Failed to check allowance. See console for more details.");
            setToggleCheck(false);
        }
    };

    async function setERC721Allowance() {

        try {
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            const accounts = await web3.eth.getAccounts();

            const tx = await contract.methods.setERC721Allowance(erc721TokenAddress, operator)
                .send({ from: accounts[0] });
            setERC721Allow(tx);
            setToggleHash721(true);
        } catch (error) {
            console.error('Error setting ERC721 allowance:', error);
            setERC721Allow('setting ERC721 allowance', error);
            setToggleHash721(false);
        }
    }

    const handleSignatureChange = (e) => {
        const sig = e.target.value;
        setSignature(sig);
        setR("0x" + sig.slice(2, 66));
        setS("0x" + sig.slice(66, 130));
        setV(parseInt(sig.slice(130, 132), 16));
    };

    const toggleFormDisplay = () => {
        setShowForm(!showForm);
    };
    const toggleFormDisplayAllowance = () => {
        setShowFormAllowance(!showFormAllowance);
    };
    const toggleFormDisplay721 = () => {
        setShowForm721(!showForm721);
    };
    return (

        <div className="formu">
            <button className="button" onClick={approveERC20Token}>ERC20 APPROVE</button>
            {erc20Approve && (
                <div className="formulario_grid">
                    <AlertComponent
                        toggle={toggleHashApprove}
                        message={erc20Approve}
                        isCopied={isCopied}
                        setIsCopied={setIsCopied}
                    />
                </div>
            )}
            <div className="formulario">
                <button className="button" onClick={setERC20Allowance}>ERC20 PERMIT</button>
                {erc20Allow && (
                    <div className="formulario">
                        <AlertComponent
                            toggle={toggleHash}
                            message={erc20Allow}
                            isCopied={isCopied}
                            setIsCopied={setIsCopied}
                        />
                    </div>
                )}
            </div>

            <button onClick={toggleFormDisplay} className="toggleButton">
                {showForm ? 'Hide Params' : 'Show Params'}
            </button>
            {showForm ? (
                <div className="formulario_grid">
                    <label htmlFor="TokenContractAddress">Token:</label>
                    <textarea
                        rows="1"
                        type="text"
                        className="formulario_grid_input"
                        id="TokenContractAddress"
                        value={tokenContractAddress}
                        onChange={(e) => setTokenContractAddress(e.target.value)}
                    />
                    <label htmlFor="ownerInput">Owner:</label>
                    <textarea
                        rows="1"
                        type="text"
                        className="formulario_grid_input"
                        id="ownerInput"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                    />
                    <label htmlFor="spenderInput">Spender:</label>
                    <textarea
                        rows="1"
                        type="text"
                        className="formulario_grid_input"
                        id="spenderInput"
                        value={spender}
                        onChange={(e) => setSpender(e.target.value)}
                    />
                    <label htmlFor="valueInput">Value:</label>
                    <textarea
                        rows="1"
                        type="text"
                        className="formulario_grid_input"
                        id="valueInput"
                        value={value1}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <label htmlFor="deadlineInput">Deadline:</label>
                    <textarea
                        rows="1"
                        type="text"
                        className="formulario_grid_input"
                        id="deadlineInput"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                    <label htmlFor="signatureInput">Signature:</label>
                    <textarea
                        type="text"
                        className="formulario_grid_input"
                        id="signatureInput"
                        value={signature}
                        onChange={handleSignatureChange}
                        rows="3"
                    />
                    <label htmlFor="rInput">r :</label>
                    <textarea
                        rows="2"
                        type="text"
                        className="formulario_grid_input"
                        id="rInput"
                        value={r1}
                    />
                    <label htmlFor="sInput">s :</label>
                    <textarea
                        rows="2"
                        type="text"
                        className="formulario_grid_input"
                        id="sInput"
                        value={s1}
                    />
                    <label htmlFor="vInput">v :</label>
                    <textarea
                        rows="1"
                        type="text"
                        className="formulario_grid_input"
                        id="vInput"
                        value={v1}
                    />

                </div>) : ""}
            <div className="formulario">
                <button className="button" onClick={checkERC20Allowance}>ERC20 ALLOWANCE</button>
                {erc20Check && (
                    <div className="formulario_grid">
                        <AlertComponent
                            toggle={toggleCheck}
                            message={erc20Check}
                            isCopied={isCopied}
                            setIsCopied={setIsCopied}
                        />
                    </div>
                )}
            </div>
            <button onClick={toggleFormDisplayAllowance} className="toggleButton">
                {showFormAllowance ? 'Hide  Params' : 'Show  Params'}
            </button>
            {showFormAllowance ? (
                <div className="formulario_grid">
                    <label htmlFor="TokenContractAddress">Token:</label>
                    <textarea
                        rows="1"
                        type="text"
                        className="formulario_grid_input"
                        id="TokenContractAddress"
                        value={tokenContractAddress}
                        onChange={(e) => setTokenContractAddress(e.target.value)}
                    />
                    <label htmlFor="ownerInput">Owner:</label>
                    <textarea
                        rows="1"
                        type="text"
                        className="formulario_grid_input"
                        id="ownerInput"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                    />
                    <label htmlFor="spenderInput">Spender:</label>
                    <textarea
                        rows="1"
                        type="text"
                        className="formulario_grid_input"
                        id="spenderInput"
                        value={spender}
                        onChange={(e) => setSpender(e.target.value)}
                    />
                </div>) : ""}

            <div className="formulario">
                <button className="button" onClick={setERC721Allowance}>ERC721 PERMIT</button>
                {erc721Allow && (
                    <div className="formulario_grid">
                        <AlertComponent
                            toggle={toggleHash721}
                            message={erc721Allow}
                            isCopied={isCopied}
                            setIsCopied={setIsCopied}
                        />
                    </div>
                )}
            </div>
            <button onClick={toggleFormDisplay721} className="toggleButton">
                {showForm721 ? 'Hide Params' : 'Show Params'}
            </button>
            {showForm721 ? (
                <div className="formulario_grid">
                    <label htmlFor="ERC721TokenAddress">Token:</label>
                    <textarea
                        rows="1"
                        type="text"
                        className="formulario_grid_input"
                        id="ERC721TokenAddress"
                        value={erc721TokenAddress}
                        onChange={(e) => setErc721TokenAddress(e.target.value)}
                    />
                    <label htmlFor="Operator">Operator:</label>
                    <textarea
                        rows="1"
                        type="text"
                        className="formulario_grid_input"
                        id="Operator"
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                    />
                    <label htmlFor="contractAddress">Contract:</label>
                    <textarea
                        rows="1"
                        type="text"
                        className="formulario_grid_input"
                        id="contractAddress"
                        value={contractAddress}
                        onChange={(e) => setContractAddress(e.target.value)}
                    />
                </div>) : ""}
        </div>
    );
};
export default PermitAllowance;