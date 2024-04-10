"use client"
import React, { useState, useMemo } from 'react';
import Web3 from 'web3';
import MyTokenABI from '../.././api/abiDeployContract.json';
import MyTokenBytecode from '../.././api/bytecodeDeployContract.json';
import PermitAllowance from './Allowance';
import AlertComponent from '@/components/mainLayout/Alert';

const DeployContract = () => {
    const [contract, setContract] = useState("0xBf7F7560063b38b7ffE972C9401AC7a6aBaA7659");
    const [error, setError] = useState(false);
    const [transfer, setTransfer] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toggleHashZero, setToggleHashZero] = useState(null);
    const [toggleHash, setToggleHash] = useState(null);
    const memoizedContract = useMemo(() => contract, [contract]);
    const [isCopied, setIsCopied] = useState(false);

    const deployContract = async () => {
        setLoading(true);

        try {
            if (!window.ethereum) {
                throw new Error('MetaMask is not installed');
            }

            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(window.ethereum);

            const accounts = await web3.eth.getAccounts();
            const deployedContract = await new web3.eth.Contract(MyTokenABI)
                .deploy({ data: MyTokenBytecode.object, arguments: [] })
                .send({ from: accounts[0], gas: 1000000 });

            setContract(deployedContract.options.address);
            setToggleHashZero(true)
        } catch (err) {
            setError(err.message)
            setToggleHashZero(false)
        } finally {
            setLoading(false);
        }
    };
    const handleTransfer = async () => {
        try {
            if (!window.ethereum) {
                throw new Error('MetaMask is not installed');
            }

            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(window.ethereum);

            const accounts = await web3.eth.getAccounts();

            const contractTransfer = new web3.eth.Contract(MyTokenABI, contract);

            const transfered= await contractTransfer.methods.transfer('0x462A0d4fE4C2b10aadFBD4628f697d09a76Cd954', '1000000000000000000') // Replace '0xReceiverAddress' with the recipient's address and '1000000000000000000' with the amount
                .send({ from: accounts[0] });
            setTransfer(transfered)
            setToggleHash(true);
        } catch (err) {
            setToggleHash(false);
            setError(err.message)            
        } 
    };
    return (
        <div className="formulario1">
            <button className="button" onClick={deployContract} disabled={loading}>
                {loading ? 'Deploying...' : 'DEPLOY MY TOKEN'}
            </button>
            {(toggleHashZero != null) && (
                <div>
                    <AlertComponent
                        toggle={toggleHashZero}
                        message={contract}
                        error={error}
                        isCopied={isCopied}
                        setIsCopied={setIsCopied}
                    />
                </div>
            )}
            <button className="button" onClick={handleTransfer}>TRANSFER</button>
            {(toggleHash != null) && (
                <div>
                    <AlertComponent
                        toggle={toggleHash}
                        message={transfer}        
                        error={error}           
                        isCopied={isCopied}
                        setIsCopied={setIsCopied}
                    />
                </div>
            )}
            <PermitAllowance contract={memoizedContract} />
        </div>
    );
};

export default DeployContract;